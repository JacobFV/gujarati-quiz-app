import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuizDetailsPage({ match }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const quizId = match.params.id;
    setLoading(true);
    axios.get(`/quizzes/${quizId}`)
      .then(response => {
        setQuiz(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [match.params.id]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      <h2>Questions</h2>
      <ul>
        {quiz.questions.map((question, index) => (
          <li key={question.id}>
            <p>{`${index + 1}. ${question.text}`}</p>
            <ul>
              {question.answers.map(answer => (
                <li key={answer.id}>
                  <label>
                    <input type="radio" name={`question-${question.id}`} />
                    {answer.text}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizDetailsPage;
