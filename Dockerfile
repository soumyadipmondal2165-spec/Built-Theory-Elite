# 1. Use a stable Python base
FROM python:3.10-slim

# 2. Install SYSTEM level engines (The "Brains" for your tools)
# - wkhtmltopdf: Power for Webpage-to-PDF
# - tesseract-ocr: Power for OCR (Reading text from images)
# - libgl1: Power for OpenCV and AI image processing
RUN apt-get update && apt-get install -y \
    wkhtmltopdf \
    tesseract-ocr \
    libtesseract-dev \
    libgl1-mesa-glx \
    libxrender1 \
    libxext6 \
    libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*

# 3. Set up the working directory
WORKDIR /app

# 4. Copy and install Python libraries
# Ensure your requirements.txt has 'pytesseract', 'pdfkit', and 'Pillow'
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your website backend code
COPY . .

# 6. Start the server (Using port 7860 for Hugging Face)
# This port is mandatory for Hugging Face Spaces
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "main:app"]
