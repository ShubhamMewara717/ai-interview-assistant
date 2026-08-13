from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
import os

from app.database import SessionLocal
from app.models import InterviewHistory
from app.schemas import InterviewResultCreate

from app.services.pdf_reader import read_pdf
from app.services.skill_extractor import extract_skills
from app.services.question_generator import generate_questions
from app.services.answer_evaluator import evaluate_answer

router = APIRouter()


# ---------------- Database ---------------- #

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- Request Models ---------------- #

class AnswerRequest(BaseModel):
    question: str
    answer: str


# ---------------- Generate Questions ---------------- #

@router.get("/generate-questions")
def interview_questions():

    files = os.listdir("uploads")

    if not files:
        return {
            "error": "Please upload a resume first."
        }

    pdf_path = os.path.join("uploads", files[0])

    text = read_pdf(pdf_path)

    skills = extract_skills(text)

    questions = generate_questions(skills)

    return {
        "skills": skills,
        "questions": questions
    }


# ---------------- Evaluate Answer ---------------- #

@router.post("/evaluate-answer")
def evaluate(data: AnswerRequest):

    return evaluate_answer(
        data.question,
        data.answer
    )


# ---------------- Save Interview Result ---------------- #

@router.post("/save-result")
def save_result(
    data: InterviewResultCreate,
    db: Session = Depends(get_db)
):

    interview = InterviewHistory(
        username=data.username,
        total_score=data.total_score,
        total_questions=data.total_questions,
        percentage=data.percentage,
        performance=data.performance
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)

    return {
        "message": "Interview result saved successfully."
    }


# ---------------- Interview History ---------------- #

@router.get("/history/{username}")
def history(username: str, db: Session = Depends(get_db)):

    history = db.query(InterviewHistory).filter(
        InterviewHistory.username == username
    ).all()

    return history


# ---------------- Performance Dashboard ---------------- #

@router.get("/performance/{username}")
def performance(username: str, db: Session = Depends(get_db)):

    interviews = db.query(InterviewHistory).filter(
        InterviewHistory.username == username
    ).all()

    if not interviews:
        return {
            "total_interviews": 0,
            "best_score": 0,
            "average_score": 0,
            "average_percentage": 0,
            "scores": []
        }

    total_interviews = len(interviews)

    best_score = max(
        interview.total_score
        for interview in interviews
    )

    average_score = round(
        sum(interview.total_score for interview in interviews)
        / total_interviews,
        2
    )

    average_percentage = round(
        sum(interview.percentage for interview in interviews)
        / total_interviews,
        2
    )

    scores = []

    for interview in interviews:
        scores.append({
            "id": interview.id,
            "score": interview.total_score,
            "percentage": interview.percentage
        })

    return {
        "total_interviews": total_interviews,
        "best_score": best_score,
        "average_score": average_score,
        "average_percentage": average_percentage,
        "scores": scores
    }