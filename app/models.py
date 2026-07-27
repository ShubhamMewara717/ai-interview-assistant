from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)


class InterviewHistory(Base):
    __tablename__ = "interview_history"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, index=True)

    total_score = Column(Integer)

    total_questions = Column(Integer)

    percentage = Column(Integer)

    performance = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)