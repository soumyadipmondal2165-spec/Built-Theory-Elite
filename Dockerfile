# 1. Use a stable Python base (Bullseye is the stable foundation for engineering tools)
FROM python:3.10-slim-bullseye

# 2. Install SYSTEM level engines
# - wkhtmltopdf: Now available because we switched to Bullseye
# - libgl1: The rectified name for libgl1-mesa-glx
RUN apt-get update && apt-get install -y \
    wkhtmltopdf \
    tesseract-ocr \
    libtesseract-dev \
    libgl1 \
    libxrender1 \
    libxext6 \
    libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*

# 3. Set up the working directory
WORKDIR /app

# 4. Copy and install Python libraries
# This part of your logic was already structurally sound
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your website backend code
COPY . .

# 6. Start the server (Mandatory port 7860 for Hugging Face)
# Using gunicorn as the heavy-duty engine for your Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "2", "--threads", "4", "--timeout", "120", "main:app"]
