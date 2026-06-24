import pdfplumber
from fastapi import FastAPI, UploadFile, File
from fastapi import FastAPI
from sqlalchemy.orm import Session
from app.auth import hash_password, verify_password
from app.database import engine, SessionLocal
from app.models import Base, User
from app.schemas import UserCreate,  UserLogin
from fastapi import FastAPI
import os

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def home():
    return {"message": "AI Interview Preparation Assistant Running"}


@app.post("/register")
def register(user: UserCreate):

    db: Session = SessionLocal()

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    db.close()

    return {
        "message": "User registered successfully",
        "username": new_user.username
    }
@app.post("/login")
def login(user: UserLogin):

    db: Session = SessionLocal()

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        db.close()
        return {"error": "User not found"}

    if not verify_password(
        user.password,
        db_user.password
    ):
        db.close()
        return {"error": "Invalid password"}

    db.close()

    return {
        "message": "Login successful",
        "username": db_user.username
    }
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_location = f"uploads/{file.filename}"

    with open(file_location, "wb") as f:
        f.write(await file.read())

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }
import os

@app.get("/read-resume")
def read_resume():

    files = os.listdir("uploads")

    if not files:
        return {"error": "No resume uploaded"}

    pdf_path = os.path.join("uploads", files[0])

    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return {
        "filename": files[0],
        "resume_text": text[:3000]
    }
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
@app.get("/generate-questions")
def generate_questions():

    questions = [
        "Tell me about yourself.",
        "What are your strengths?",
        "What are your weaknesses?",
        "Why should we hire you?",
        "Explain Python.",
        "What is Machine Learning?",
        "Difference between List and Tuple?",
        "What is SQL?",
        "Explain FastAPI."
    ]

    return {
        "questions": questions
    }
@app.post("/evaluate-answer")
def evaluate_answer(answer: str):

    score = 0

    if len(answer) > 50:
        score += 5

    if len(answer) > 100:
        score += 5

    return {
        "answer": answer,
        "score": score,
        "feedback": "Good answer" if score >= 5 else "Need improvement"
    }
