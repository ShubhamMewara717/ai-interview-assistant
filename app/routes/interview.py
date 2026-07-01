from fastapi import APIRouter
from app.services.question_generator import generate_questions
import os
from app.services.pdf_reader import read_pdf
from app.services.skill_extractor import extract_skills
from app.services.question_generator import generate_questions

router = APIRouter()

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
def evaluate_answer(answer: str):

    if len(answer) < 30:
        score = 3
        feedback = "Answer is too short."

    elif len(answer) < 100:
        score = 6
        feedback = "Good answer but add more details."

    else:
        score = 9
        feedback = "Excellent answer."

    return {
        "score": score,
        "feedback": feedback
    }
