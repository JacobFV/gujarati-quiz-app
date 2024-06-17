import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
import QuizCreationPage from './pages/QuizCreationPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ClerkProvider frontendApi="your_frontend_api_key">
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/create-quiz" component={QuizCreationPage} />
            <Route path="/quizzes/:id" component={QuizDetailsPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
