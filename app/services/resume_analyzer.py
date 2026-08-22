import os
import json
from google import genai


# ---------------- Gemini Client ---------------- #

API_KEY = os.getenv("GEMINI_API_KEY")

client = None

if API_KEY:
    client = genai.Client(api_key=API_KEY)


# ---------------- Resume Analysis ---------------- #

def analyze_resume(resume_text: str, skills: list):

    if not client:
        return {
            "ats_score": 0,
            "summary": "Gemini API is not configured.",
            "strengths": skills,
            "weaknesses": [],
            "missing_skills": [],
            "suggestions": [
                "Configure GEMINI_API_KEY to enable AI resume analysis."
            ]
        }

    try:

        skill_text = ", ".join(skills)

        prompt = f"""
You are an expert Resume Reviewer and ATS system.

Analyze the following candidate resume.

RESUME:
{resume_text}

DETECTED SKILLS:
{skill_text}

Return ONLY valid JSON in exactly this structure:

{{
    "ats_score": 0,
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "suggestions": []
}}

Rules:

- ats_score must be a number between 0 and 100.
- summary should be a short professional summary.
- strengths should contain important strengths from the resume.
- weaknesses should contain realistic weaknesses or missing areas.
- missing_skills should contain useful skills that would improve the candidate's profile.
- suggestions should contain practical resume improvement suggestions.
- Do not add markdown.
- Do not add ```json.
- Return only JSON.
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        # Remove markdown JSON block if Gemini returns it
        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        result = json.loads(text)

        return {
            "ats_score": int(result.get("ats_score", 0)),
            "summary": result.get("summary", ""),
            "strengths": result.get("strengths", []),
            "weaknesses": result.get("weaknesses", []),
            "missing_skills": result.get("missing_skills", []),
            "suggestions": result.get("suggestions", [])
        }

    except Exception as e:

        print("Resume Analyzer Error:", e)

        return {
            "ats_score": 0,
            "summary": "Unable to analyze resume using Gemini.",
            "strengths": skills,
            "weaknesses": [],
            "missing_skills": [],
            "suggestions": [
                "Try analyzing the resume again."
            ]
        }