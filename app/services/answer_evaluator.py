def evaluate_answer(question: str, answer: str):
    score = 0
    feedback = []

    answer = answer.lower()

    # Answer length
    if len(answer) >= 50:
        score += 3
    else:
        feedback.append("Answer is too short.")

    # Technical keywords
    keywords = [
        "python",
        "machine learning",
        "data",
        "algorithm",
        "model",
        "fastapi",
        "sql",
        "api"
    ]

    found = 0
    for keyword in keywords:
        if keyword in answer:
            found += 1

    score += min(found, 5)

    if found == 0:
        feedback.append("Add more technical keywords.")
    else:
        feedback.append(f"Found {found} technical keywords.")

    if score >= 7:
        feedback.append("Excellent answer.")
    elif score >= 5:
        feedback.append("Good answer.")
    else:
        feedback.append("Needs improvement.")

    return {
        "score": score,
        "technical_keywords": found,
        "feedback": feedback
    }
