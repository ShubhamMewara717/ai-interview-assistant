import os
from google import genai

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

response = client.models.generate_content(
    model="models/gemini-3-flash-preview",
    contents="Say Hello"
)

print(response.text)
