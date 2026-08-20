import os
import random
from google import genai

# ---------------- Gemini ---------------- #

API_KEY = os.getenv("GEMINI_API_KEY")

client = None

if API_KEY:
    client = genai.Client(api_key=API_KEY)

# ---------------- Question Bank (Fallback) ---------------- #

QUESTION_BANK = {

    "python": [
        "What are Python decorators?",
        "Explain generators in Python.",
        "Difference between list and tuple.",
        "Difference between list and set.",
        "Explain exception handling.",
        "Explain list comprehension.",
        "Difference between class and object.",
        "Explain inheritance in Python.",
        "What is multithreading?",
        "Difference between process and thread."
    ],

    "sql": [
        "Difference between INNER JOIN and LEFT JOIN.",
        "What is normalization?",
        "Difference between DELETE, DROP and TRUNCATE.",
        "Explain GROUP BY.",
        "Difference between WHERE and HAVING.",
        "What are indexes?",
        "Explain ACID properties.",
        "What is a transaction?"
    ],

    "machine learning": [
        "What is Machine Learning?",
        "Difference between supervised and unsupervised learning.",
        "Explain classification.",
        "Explain regression.",
        "What is overfitting?",
        "How do you prevent overfitting?",
        "Explain train-test split.",
        "Explain Random Forest."
    ],

    "deep learning": [
        "What is Deep Learning?",
        "What is ANN?",
        "Explain ReLU.",
        "Difference between CNN and RNN.",
        "Explain backpropagation."
    ],

    "fastapi": [
        "What is FastAPI?",
        "Explain APIRouter.",
        "Difference between GET and POST.",
        "What is Pydantic?",
        "Explain CORS."
    ],

    "pandas": [
        "Difference between Series and DataFrame.",
        "Explain merge().",
        "Difference between merge and concat.",
        "Explain groupby().",
        "What is apply()?"
    ],

    "numpy": [
        "What is NumPy?",
        "Explain broadcasting.",
        "What is vectorization?",
        "Explain reshape().",
        "Difference between ndarray and list."
    ],

    "git": [
        "What is Git?",
        "Explain git pull.",
        "Explain git push.",
        "What is merge?",
        "How do you resolve merge conflicts?"
    ],

    "github": [
        "What is GitHub?",
        "Explain Pull Request.",
        "Explain Fork.",
        "What is GitHub Actions?"
    ]
}


# ---------------- Gemini Questions ---------------- #

def generate_ai_questions(skills):

    if not client:
        return None

    try:

        skill_text = ", ".join(skills)

        prompt = f"""
You are an expert technical interviewer.

Generate exactly 5 interview questions.

Candidate Skills:
{skill_text}

Rules:
- Questions should match the candidate's skills.
- Mix easy, medium and hard.
- One question per line.
- Do NOT number them.
- Do NOT add headings.
"""

        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        questions = []

        for line in text.split("\n"):

            line = line.strip()

            if not line:
                continue

            if line[0].isdigit():
                line = line.split(".", 1)[-1].strip()

            questions.append(line)

        questions = list(dict.fromkeys(questions))

        if len(questions) >= 5:
            return questions[:5]

    except Exception as e:

        print("Gemini Question Error:", e)

    return None


# ---------------- Fallback ---------------- #

def generate_fallback_questions(skills):

    selected = []

    valid = []

    for skill in skills:

        skill = skill.lower()

        if skill in QUESTION_BANK:
            valid.append(skill)

    random.shuffle(valid)

    valid = valid[:5]

    for skill in valid:

        selected.append(
            random.choice(QUESTION_BANK[skill])
        )

    while len(selected) < 5:

        skill = random.choice(list(QUESTION_BANK.keys()))

        question = random.choice(QUESTION_BANK[skill])

        if question not in selected:
            selected.append(question)

    random.shuffle(selected)

    return selected


# ---------------- Main Function ---------------- #

def generate_questions(skills):

    ai_questions = generate_ai_questions(skills)

    if ai_questions:

        print("Using Gemini Questions")

        return ai_questions

    print("Using Local Question Bank")

    return generate_fallback_questions(skills)