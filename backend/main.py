from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session
from models import Quiz, Question
from database import engine
from embedding import generate_embedding
from clerk import clerk

app = FastAPI()

@app.post("/quizzes")
def create_quiz(quiz: Quiz, user: User = Depends(clerk.auth_required)):
    # Check if the user is a teacher
    if not user.is_teacher:
        raise HTTPException(status_code=403, detail="Only teachers can create quizzes")
    
    # Generate embeddings for each question
    for question in quiz.questions:
        question.embedding = generate_embedding(question.text)
    
    # Save quiz to the database
    with Session(engine) as session:
        session.add(quiz)
        session.commit()
        session.refresh(quiz)
    
    return quiz

@app.get("/quizzes/{quiz_id}")
def get_quiz(quiz_id: int):
    with Session(engine) as session:
        quiz = session.get(Quiz, quiz_id)
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found")
        return quiz

@app.get("/quizzes/search")
def search_quizzes(query: str):
    # Generate embedding for the search query
    query_embedding = generate_embedding(query)
    
    with Session(engine) as session:
        # Perform semantic search
        semantic_results = session.exec(
            select(Question)
            .where(func.cosine_similarity(Question.embedding, query_embedding) > 0.8)
        ).all()
        
        # Perform classic text search
        classic_results = session.exec(
            select(Question)
            .where(Question.text.contains(query))
        ).all()
    
    # Combine and return the results
    results = semantic_results + classic_results
    return results
