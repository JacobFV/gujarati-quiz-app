import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch quizzes from the backend API
  useEffect(() => {
    axios.get('/quizzes')
      .then(response => setQuizzes(response.data))
      .catch(error => console.error(error));
  }, []);
  
  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Send search query to the backend API
    axios.get(`/quizzes/search?query=${searchQuery}`)
      .then(response => setQuizzes(response.data))
      .catch(error => console.error(error));
  };
  
  return (
    <div>
      <h1>Gujarati Language Quizzes</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <Link to={}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
