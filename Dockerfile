# 1. Use a stable Python base
FROM python:3.9-slim

# 2. Install SYSTEM level engines (The "Brains" for your tools)
# We need:
# - wkhtmltopdf for Webpage-to-PDF
# - tesseract-ocr for OCR (Reading text from images)
# - libgl1 for OpenCV (Image processing)
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
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your website backend code
COPY . .

# 6. Start the server (Using port 7860 for Hugging Face compatibility)
# If using Render, it will override this with its own PORT env variable.
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "main:app"]
