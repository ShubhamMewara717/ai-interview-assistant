import os
from google import genai

# ---------------- Gemini Client ---------------- #

API_KEY = os.getenv("GEMINI_API_KEY")

client = None

if API_KEY:
    client = genai.Client(api_key=API_KEY)


# ---------------- Main Evaluation ---------------- #

def evaluate_answer(question: str, answer: str):

    if client:

        try:

            prompt = f"""
You are an expert technical interviewer.

Evaluate the following interview answer.

Question:
{question}

Candidate Answer:
{answer}

Return ONLY in this format.

Score: X/10

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...

Correct Answer:
...
"""

            response = client.models.generate_content(
                model="models/gemini-3.5-flash-lite",
                contents=prompt
            )

            text = response.text

            score = 5

            for line in text.split("\n"):

                if line.lower().startswith("score"):

                    digits = "".join(c for c in line if c.isdigit())

                    if digits:

                        score = min(int(digits), 10)

                    break

            return {

                "score": score,

                "technical_keywords": 0,

                "feedback": [

                    "AI Evaluation",

                    text

                ]

            }

        except Exception as e:

            print("Gemini Error:", e)

    return keyword_evaluation(question, answer)


# ---------------- Backup Evaluation ---------------- #

def keyword_evaluation(question: str, answer: str):

    score = 0

    feedback = []

    answer = answer.lower()

    keywords = [

        "python",

        "sql",

        "database",

        "class",

        "object",

        "function",

        "api",

        "fastapi",

        "machine learning",

        "model",

        "algorithm",

        "numpy",

        "pandas",

        "git",

        "github"

    ]

    found = 0

    for word in keywords:

        if word in answer:

            found += 1

    if len(answer.split()) >= 40:

        score += 2

    else:

        feedback.append("Answer is too short.")

    score += min(found, 5)

    if len(answer.split()) >= 60:

        score += 2

    else:

        feedback.append("Explain in more detail.")

    if any(x in answer for x in [

        "example",

        "for example",

        "for instance",

        "such as"

    ]):

        score += 1

    else:

        feedback.append("Try giving an example.")

    if found:

        feedback.append(f"Found {found} technical keywords.")

    else:

        feedback.append("Use more technical keywords.")

    if score >= 9:

        feedback.append("Excellent Answer.")

    elif score >= 7:

        feedback.append("Very Good Answer.")

    elif score >= 5:

        feedback.append("Good Answer.")

    else:

        feedback.append("Needs Improvement.")

    return {

        "score": score,

        "technical_keywords": found,

        "feedback": feedback

    }