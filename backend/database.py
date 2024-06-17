from sqlmodel import SQLModel, create_engine

# Import your models
from models import Question, Answer, Quiz

# Create an engine to your MySQL database
# Replace 'username', 'password', 'host', 'port', and 'database' with your database credentials
engine = create_engine("mysql+mysqlconnector://username:password@host:port/database")

# Generate SQL schema
SQLModel.metadata.create_all(engine)
