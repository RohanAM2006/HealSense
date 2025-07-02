import fitz  # PyMuPDF
from paddleocr import PaddleOCR
import os

# Initialize PaddleOCR once
ocr = PaddleOCR(use_angle_cls=True, lang='en')

def extract_text_from_file(filepath: str) -> str:
    """Decide whether it's a PDF or image and extract text accordingly."""
    if filepath.lower().endswith(".pdf"):
        return extract_text_from_pdf(filepath)
    else:
        return extract_text_from_image(filepath)

def extract_text_from_pdf(filepath: str) -> str:
    """Extracts text from all pages of a PDF using PyMuPDF."""
    text = ""
    try:
        doc = fitz.open(filepath)
        for page in doc:
            text += page.get_text()
    except Exception as e:
        print(f"❌ Error reading PDF: {e}")
    return text.strip()

def extract_text_from_image(filepath: str) -> str:
    """Uses PaddleOCR to extract text from an image."""
    try:
        result = ocr.ocr(filepath, cls=True)
        text = ""
        for line in result[0]:
            text += line[1][0] + "\n"
        return text.strip()
    except Exception as e:
        print(f"❌ OCR failed: {e}")
        return ""
