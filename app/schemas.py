from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class InterviewResultCreate(BaseModel):
    username: str
    total_score: int
    total_questions: int
    percentage: int
    performance: str