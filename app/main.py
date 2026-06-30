import pdfplumber
from fastapi import FastAPI, UploadFile, File
from sqlalchemy.orm import Session
from app.auth import hash_password, verify_password
from app.database import engine, SessionLocal
from app.models import Base, User
from app.schemas import UserCreate,  UserLogin
import os
from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router
from app.routes.interview import router as interview_router

Base.metadata.create_all(bind=engine)


app = FastAPI()
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(interview_router)

@app.get("/")
def home():
    return {"message": "AI Interview Preparation Assistant Running"}


@app.get("/extract-skills")
def extract_skills():

    files = os.listdir("uploads")

    if not files:
        return {"error": "No resume uploaded"}

    pdf_path = os.path.join("uploads", files[0])

    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text.lower()
    skills = []

    skill_list = [
        "python",
        "sql",
        "machine learning",
        "deep learning",
        "fastapi",
        "django",
        "flask",
        "tensorflow",
        "pandas",
        "numpy",
        "data science",
        "java",
        "c++",
        "html",
        "css",
        "javascript",
        "react",
        "node",
        "git",
        "github",
        "excel",
        "power bi"
    ]

    for skill in skill_list:
        if skill in text:
            skills.append(skill)

    return {
        "skills_found": skills
    }
