import React, { useState } from 'react';
import axios from 'axios';

function QuizCreationPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Create quiz object
    const quiz = {
      title,
      description,
      questions,
    };
    // Send quiz data to the backend API
    axios.post('/quizzes', quiz)
      .then(response => {
        console.log('Quiz created:', response.data);
        // Reset form fields
        setTitle('');
        setDescription('');
        setQuestions([]);
      })
      .catch(error => console.error(error));
  };
  
  // Handle adding a new question
  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', answers: [] }]);
  };
  
  // Handle question text change
  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = event.target.value;
    setQuestions(updatedQuestions);
  };
  
  // Handle adding a new answer
  const handleAddAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };
  
  // Handle answer text change
  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].text = event.target.value;
    setQuestions(updatedQuestions);
  };
  
  // Handle answer correctness change
  const handleAnswerCorrectnessChange = (questionIndex, answerIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect = event.target.checked;
    setQuestions(updatedQuestions);
  };
  
  return (
    <div>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div>
          <h2>Questions</h2>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <div>
                <label htmlFor={`question-${questionIndex}`}>Question {questionIndex + 1}:</label>
                <input
                  type="text"
                  id={`question-${questionIndex}`}
                  value={question.text}
                  onChange={(event) => handleQuestionChange(questionIndex, event)}
                />
              </div>
              <div>
                <h3>Answers</h3>
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <label htmlFor={`answer-${questionIndex}-${answerIndex}`}>Answer {answerIndex + 1}:</label>
                    <input
                      type="text"
                      id={`answer-${questionIndex}-${answerIndex}`}
                      value={answer.text}
                      onChange={(event) => handleAnswerChange(questionIndex, answerIndex, event)}
                    />
                    <label htmlFor={`correct-${questionIndex}-${answerIndex}`}>Correct:</label>
                    <input
                      type="checkbox"
                      id={`correct-${questionIndex}-${answerIndex}`}
                      checked={answer.isCorrect}
                      onChange={(event) => handleAnswerCorrectnessChange(questionIndex, answerIndex, event)}
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleAddAnswer(questionIndex)}>
                  Add Answer
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
}

export default QuizCreationPage;
