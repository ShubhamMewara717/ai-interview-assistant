def generate_questions(skills):

    questions = []

    question_bank = {
        "python": [
            "What is Python?",
            "Explain OOP in Python.",
            "Difference between List and Tuple."
        ],

        "sql": [
            "What are SQL Joins?",
            "Difference between DELETE, DROP and TRUNCATE?",
            "What is Primary Key?"
        ],

        "fastapi": [
            "Why is FastAPI faster than Flask?",
            "Explain REST API.",
            "What is APIRouter?"
        ],

        "machine learning": [
            "What is Machine Learning?",
            "Difference between Supervised and Unsupervised Learning?",
            "Explain Overfitting."
        ],

        "data science": [
            "Explain Data Science.",
            "Difference between Data Science and Data Analytics."
        ],

        "pandas": [
            "What is DataFrame?",
            "Difference between loc and iloc."
        ],

        "numpy": [
            "Why NumPy is faster than Python List?",
            "Explain ndarray."
        ]
    }

    for skill in skills:

        skill = skill.lower()

        if skill in question_bank:
            questions.extend(question_bank[skill])

    if len(questions) == 0:

        questions = [
            "Tell me about yourself.",
            "Why should we hire you?",
            "What are your strengths?"
        ]

    return questions
