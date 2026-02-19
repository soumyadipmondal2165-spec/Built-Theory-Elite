import os
import io
import tempfile
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import pandas as pd
from pptx import Presentation
from docx import Document
from fpdf import FPDF
import pdfplumber
from pdf2docx import Converter
from pypdf import PdfReader, PdfWriter
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Helper: Create PDF from text (used for Office -> PDF)
def text_to_pdf_blob(text_content):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=11)
    for line in text_content.split('\n'):
        pdf.multi_cell(0, 10, text=line)
    return io.BytesIO(pdf.output())

# --- 1. OFFICE TO PDF ---
@app.route('/api/word2pdf', methods=['POST'])
def word_to_pdf():
    try:
        file = request.files['files']
        doc = Document(file)
        text = "\n".join([p.text for p in doc.paragraphs])
        return send_file(text_to_pdf_blob(text), mimetype='application/pdf')
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/api/excel2pdf', methods=['POST'])
def excel_to_pdf():
    try:
        file = request.files['files']
        df = pd.read_excel(file)
        return send_file(text_to_pdf_blob(df.to_string()), mimetype='application/pdf')
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/api/ppt2pdf', methods=['POST'])
def ppt_to_pdf():
    try:
        file = request.files['files']
        prs = Presentation(file)
        text = "\n".join([shape.text for slide in prs.slides for shape in slide.shapes if hasattr(shape, "text")])
        return send_file(text_to_pdf_blob(text), mimetype='application/pdf')
    except Exception as e: return jsonify({"error": str(e)}), 500

# --- 2. PDF TO OFFICE ---
@app.route('/api/pdf2word', methods=['POST'])
def pdf_to_word():
    try:
        file = request.files['files']
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tf:
            file.save(tf.name)
            out_path = tf.name.replace(".pdf", ".docx")
            cv = Converter(tf.name); cv.convert(out_path); cv.close()
            return send_file(out_path, as_attachment=True)
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/api/pdf2excel', methods=['POST'])
def pdf_to_excel():
    try:
        file = request.files['files']
        all_data = []
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                table = page.extract_table()
                if table: all_data.extend(table)
        output = io.BytesIO()
        pd.DataFrame(all_data).to_excel(output, index=False)
        output.seek(0)
        return send_file(output, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', as_attachment=True)
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/api/pdf2ppt', methods=['POST'])
def pdf_to_ppt():
    try:
        file = request.files['files']
        prs = Presentation()
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                slide = prs.slides.add_slide(prs.slide_layouts[1])
                slide.shapes.title.text = "Extracted Slide"
                slide.placeholders[1].text = text[:1000] if text else "No text found"
        output = io.BytesIO(); prs.save(output); output.seek(0)
        return send_file(output, mimetype='application/vnd.openxmlformats-officedocument.presentationml.presentation', as_attachment=True)
    except Exception as e: return jsonify({"error": str(e)}), 500

# --- 3. PDF TOOLS (COMPRESS, SPLIT, ROTATE) ---
@app.route('/api/compress', methods=['POST'])
def compress_pdf():
    try:
        reader = PdfReader(request.files['files']); writer = PdfWriter()
        for page in reader.pages:
            page.compress_content_streams()
            writer.add_page(page)
        out = io.BytesIO(); writer.write(out); out.seek(0)
        return send_file(out, mimetype='application/pdf')
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/api/split', methods=['POST'])
def split_pdf():
    try:
        reader = PdfReader(request.files['files']); writer = PdfWriter()
        # Extracts first page for demo - can be customized with page range logic
        writer.add_page(reader.pages[0])
        out = io.BytesIO(); writer.write(out); out.seek(0)
        return send_file(out, mimetype='application/pdf')
    except Exception as e: return jsonify({"error": str(e)}), 500

# --- 4. AI PRESENTATION GEN ---
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/api/ppt_gen', methods=['POST'])
def generate_ppt():
    try:
        topic = request.form.get('topic', 'Topic')
        count = int(request.form.get('slides', 5))
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(f"Presentation outline: {topic}, {count} slides. Bullet points.")
        prs = Presentation()
        slide = prs.slides.add_slide(prs.slide_layouts[0])
        slide.shapes.title.text = topic
        for i in range(count): prs.slides.add_slide(prs.slide_layouts[1])
        out = io.BytesIO(); prs.save(out); out.seek(0)
        return send_file(out, mimetype='application/vnd.openxmlformats-officedocument.presentationml.presentation', as_attachment=True)
    except Exception as e: return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
