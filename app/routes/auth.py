from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import User
from app.schemas import UserCreate, UserLogin
from app.auth import hash_password, verify_password

router = APIRouter()


@router.post("/register")
def register(user: UserCreate):
    db: Session = SessionLocal()

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    db.close()

    return {
        "message": "User registered successfully",
        "username": new_user.username
    }

@router.post("/login")
def login(user: UserLogin):
    db: Session = SessionLocal()

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        db.close()
        return {"error": "User not found"}

    if not verify_password(
        user.password,
        db_user.password
    ):
        db.close()
        return {"error": "Incorrect password"}

    db.close()

    return {
        "message": "Login successful",
        "username": db_user.username
    }
