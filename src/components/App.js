import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    prompt: "",
    answers: [],
    correctIndex: 0,
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setNewQuestion({
          prompt: "",
          answers: [],
          correctIndex: 0,
        });
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error adding question:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleUpdateCorrectIndex = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          questions.map((question) =>
            question.id === id ? { ...question, correctIndex } : question
          )
        );
      })
      .catch((error) => {
        console.error("Error updating correctIndex:", error);
      });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <button onClick={toggleForm}>New Question</button>

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          {}
        </form>
      )}

      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdateCorrectIndex={handleUpdateCorrectIndex}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
