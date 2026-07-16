from fastapi import APIRouter
from pydantic import BaseModel
import os

from app.services.pdf_reader import read_pdf
from app.services.skill_extractor import extract_skills
from app.services.question_generator import generate_questions
from app.services.answer_evaluator import evaluate_answer

router = APIRouter()


# Request Model
class AnswerRequest(BaseModel):
    question: str
    answer: str


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


@router.post("/evaluate-answer")
def evaluate(data: AnswerRequest):

    return evaluate_answer(
        data.question,
        data.answer
    )