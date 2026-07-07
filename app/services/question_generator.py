def generate_questions(skills):
    question_bank = {
        "python": [
            "Explain Python decorators.",
            "What are generators in Python?",
            "Difference between list and tuple."
        ],

        "sql": [
            "Difference between INNER JOIN and LEFT JOIN.",
            "What is normalization?",
            "Explain GROUP BY."
        ],

        "machine learning": [
            "What is supervised learning?",
            "Difference between classification and regression.",
            "Explain overfitting."
        ],

        "deep learning": [
            "What is CNN?",
            "Difference between CNN and RNN.",
            "Explain backpropagation."
        ],

        "fastapi": [
            "Explain dependency injection in FastAPI.",
            "Difference between GET and POST.",
            "What is APIRouter?"
        ],

        "pandas": [
            "Difference between loc and iloc.",
            "How do you handle missing values?",
            "What is a DataFrame?"
        ],

        "numpy": [
            "Difference between array and list.",
            "Explain vectorization.",
            "What is broadcasting?"
        ]
    }

    questions = []

    for skill in skills:
        if skill in question_bank:
            questions.extend(question_bank[skill])

    if not questions:
        questions = [
            "Tell me about yourself.",
            "Why should we hire you?",
            "What are your strengths?"
        ]

    return questions
