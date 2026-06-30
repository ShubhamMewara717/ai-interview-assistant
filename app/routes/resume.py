from fastapi import APIRouter, UploadFile, File
from app.services.pdf_reader import read_pdf
from app.services.skill_extractor import extract_skills
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@router.post("/upload-resume")
def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }


@router.get("/read-resume")
def read_resume():

    files = os.listdir(UPLOAD_FOLDER)

    if not files:
        return {"error": "No resume uploaded"}

    pdf_path = os.path.join(UPLOAD_FOLDER, files[0])

    text = read_pdf(pdf_path)

    return {
        "filename": files[0],
        "resume_text": text
    }


@router.get("/extract-skills")
def extract_resume_skills():

    files = os.listdir(UPLOAD_FOLDER)

    if not files:
        return {"error": "No resume uploaded"}

    pdf_path = os.path.join(UPLOAD_FOLDER, files[0])

    text = read_pdf(pdf_path)

    skills = extract_skills(text)

    return {
        "skills_found": skills
    }
