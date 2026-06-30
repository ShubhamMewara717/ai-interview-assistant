from fastapi import APIRouter

router = APIRouter()

@router.get("/generate-questions")
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
