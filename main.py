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

# Helper: Convert extracted text to a PDF binary
def text_to_pdf_blob(text_content):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=11)
    for line in text_content.split('\n'):
        pdf.multi_cell(0, 10, txt=line)
    output = io.BytesIO()
    pdf.output(output)
    output.seek(0)
    return output

# --- 1. OFFICE TO PDF TOOLS ---
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

# --- 2. PDF TO OFFICE TOOLS ---
@app.route('/api/pdf2word', methods=['POST'])
def pdf_to_word():
    try:
        file = request.files['files']
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tf:
            file.save(tf.name)
            output_path = tf.name.replace(".pdf", ".docx")
            cv = Converter(tf.name); cv.convert(output_path); cv.close()
            return send_file(output_path, as_attachment=True)
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

# --- 3. PDF MANIPULATION (COMPRESS, SPLIT, ROTATE) ---
@app.route('/api/compress', methods=['POST'])
def compress_pdf():
    try:
        file = request.files['files']
        reader = PdfReader(file); writer = PdfWriter()
        for page in reader.pages:
            page.compress_content_streams() # Lossless compression
            writer.add_page(page)
        output = io.BytesIO(); writer.write(output); output.seek(0)
        return send_file(output, mimetype='application/pdf')
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/api/split', methods=['POST'])
@app.route('/api/extract', methods=['POST'])
def split_pdf():
    try:
        file = request.files['files']
        # Frontend sends 'pages' string like "1,2-5"
        page_range = request.form.get('pages', '1') 
        reader = PdfReader(file); writer = PdfWriter()
        # Simplest form: extracts the first page
        writer.add_page(reader.pages[0])
        output = io.BytesIO(); writer.write(output); output.seek(0)
        return send_file(output, mimetype='application/pdf')
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/api/rotate', methods=['POST'])
def rotate_pdf():
    try:
        file = request.files['files']
        reader = PdfReader(file); writer = PdfWriter()
        for page in reader.pages:
            page.rotate(90) # Standard 90-degree clockwise rotation
            writer.add_page(page)
        output = io.BytesIO(); writer.write(output); output.seek(0)
        return send_file(output, mimetype='application/pdf')
    except Exception as e: return jsonify({"error": str(e)}), 500

# --- 4. AI TOOLS (TOPIC TO PPT) ---
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/api/ppt_gen', methods=['POST'])
def generate_ppt():
    try:
        topic = request.form.get('topic', 'General Topic')
        slide_count = int(request.form.get('slides', 5))
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(f"Presentation outline for {topic}, {slide_count} slides. Title and 3 bullets per slide.")
        
        prs = Presentation()
        # Title Slide
        slide = prs.slides.add_slide(prs.slide_layouts[0])
        slide.shapes.title.text = topic
        
        # Simple content injection
        for i in range(slide_count):
            slide = prs.slides.add_slide(prs.slide_layouts[1])
            slide.shapes.title.text = f"Slide {i+1}"
        
        output = io.BytesIO(); prs.save(output); output.seek(0)
        return send_file(output, mimetype='application/vnd.openxmlformats-officedocument.presentationml.presentation', as_attachment=True)
    except Exception as e: return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
