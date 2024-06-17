# Gujarati Quiz App

**⚠️ NOTE**: THIS IS JUST A TEMPLATE TO HELP A GUY GET STARTED ON HIS WEBSITE AND IT IS NOT COMPLETE.**

A web application for creating and sharing Gujarati language quizzes.

## Features

- Teachers can create and upload quizzes
- Users can search for and view quizzes
- Semantic and classic text search for quizzes

## Technologies Used

- Backend: FastAPI, Pydantic, SQLModel
- Frontend: React
- Database: MySQL
- Authentication: Clerk
- Deployment: Kubernetes

## Getting Started

### Prerequisites

- Python 3.7+
- Node.js 14+
- MySQL
- Clerk account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/gujarati-quiz-app.git
   ```

2. Set up the backend:
   - Navigate to the backend directory:
     ```
     cd gujarati-quiz-app/backend
     ```
   - Create a virtual environment and activate it:
     ```
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install the dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Set up the database connection in `database.py`
   - Run the backend server:
     ```
     uvicorn main:app --reload
     ```

3. Set up the frontend:
   - Navigate to the frontend directory:
     ```
     cd gujarati-quiz-app/frontend
     ```
   - Install the dependencies:
     ```
     npm install
     ```
   - Set up the Clerk frontend API key in `App.js`
   - Run the frontend development server:
     ```
     npm start
     ```

4. Set up the database:
   - Create a MySQL database
   - Execute the SQL script in `database/schema.sql` to create the required tables

5. Set up deployment:
   - Update the deployment files in the `deployment` directory with your backend and frontend image names
   - Deploy the application to a Kubernetes cluster

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
