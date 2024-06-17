from typing import List
from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

class QuestionBase(BaseModel):
    text: str

class Question(QuestionBase, SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    embedding: List[float] = Field(sa_column=Column(ARRAY(Float)))
    quiz_id: int = Field(foreign_key="quiz.id")
    quiz: "Quiz" = Relationship(back_populates="questions")

class AnswerBase(BaseModel):
    text: str
    is_correct: bool

class Answer(AnswerBase, SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    question_id: int = Field(foreign_key="question.id")
    question: Question = Relationship(back_populates="answers")

class QuizBase(BaseModel):
    title: str
    description: str

class Quiz(QuizBase, SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    questions: List[Question] = Relationship(back_populates="quiz")
