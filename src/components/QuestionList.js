import React, { useState, useEffect } from 'react';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the API and update state
  }, []);

  return (
    <div>
      <h2>All Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            {/* Render other details of the question */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
