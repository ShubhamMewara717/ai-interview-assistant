def extract_skills(text):

    skill_list = [
        "python",
        "sql",
        "machine learning",
        "deep learning",
        "fastapi",
        "django",
        "flask",
        "tensorflow",
        "pandas",
        "numpy",
        "data science",
        "java",
        "c++",
        "html",
        "css",
        "javascript",
        "react",
        "node",
        "git",
        "github",
        "excel",
        "power bi"
    ]

    text = text.lower()

    skills = []

    for skill in skill_list:
        if skill in text:
            skills.append(skill)

    return skills
