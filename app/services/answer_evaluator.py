def evaluate_answer(question: str, answer: str):

    score = 0
    feedback = []

    question = question.lower()
    answer = answer.lower()

    # ---------------- Keyword Bank ---------------- #

    keyword_bank = {

        "python": [
            "python", "interpreter", "object", "function",
            "class", "list", "dictionary", "tuple"
        ],

        "sql": [
            "sql", "table", "database", "join",
            "select", "where", "group by", "primary key"
        ],

        "git": [
            "git", "repository", "commit", "branch",
            "push", "pull", "merge", "clone"
        ],

        "fastapi": [
            "fastapi", "api", "router", "endpoint",
            "request", "response", "uvicorn"
        ],

        "machine learning": [
            "model", "training", "dataset",
            "prediction", "algorithm",
            "classification", "regression"
        ],

        "pandas": [
            "dataframe", "series", "dropna",
            "loc", "iloc", "csv"
        ],

        "numpy": [
            "array", "vectorization",
            "broadcasting", "ndarray"
        ]
    }

    # ---------------- Find Question Topic ---------------- #

    selected_keywords = []

    for topic in keyword_bank:

        if topic in question:

            selected_keywords = keyword_bank[topic]

            break

    # ---------------- Length ---------------- #

    if len(answer) >= 250:

        score += 2

    else:

        feedback.append("Answer is too short.")

    # ---------------- Keyword Matching ---------------- #

    found = 0

    for keyword in selected_keywords:

        if keyword in answer:

            found += 1

    score += min(found, 5)

    # ---------------- Explanation ---------------- #

    if len(answer.split(".")) >= 3:

        score += 2

    else:

        feedback.append("Explain in more detail.")

    # ---------------- Example ---------------- #

    if "example" in answer or "for example" in answer:

        score += 1

    else:

        feedback.append("Try giving an example.")

    # ---------------- Feedback ---------------- #

    if found == 0:

        feedback.append("Use more technical keywords.")

    else:

        feedback.append(f"Found {found} relevant keywords.")

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