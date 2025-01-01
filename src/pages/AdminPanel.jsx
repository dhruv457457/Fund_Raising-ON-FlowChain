import React, { useState } from "react";
import { initializeConnection, addQuestion } from "../utils/contract.js"; // Update this import

const AdminPanel = () => {
  const [quizName, setQuizName] = useState(""); // Added state for quiz name
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: 0, timeLimit: 0 }
  ]); // Array to store multiple questions
  const [dailyLimit, setDailyLimit] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Add new question form to the questions array
  const handleAddNewQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: 0, timeLimit: 0 }
    ]);
  };

  // Handle adding a specific question
  const handleAddQuestion = async (index) => {
    try {
      // Make sure the contract is initialized before using it
      await initializeConnection();
      
      const { questionText, options, correctAnswer, timeLimit } = questions[index];
      // Add the question using the contract
      await addQuestion(questionText, options, correctAnswer, timeLimit);
      alert("Question added successfully");
    } catch (error) {
      console.error("Error adding question:", error);
      setErrorMessage("Error adding question: " + error.message);
    }
  };

  // Update question values dynamically based on index
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-800 via-pink-600 to-green-400 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 border-2 border-gray-300 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-pink-600 mb-6">Add Question to Quiz</h3>

        {/* Quiz Name */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">Quiz Name</label>
          <input
            className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            placeholder="Enter the quiz name"
          />
        </div>

        {/* Loop over questions and display a form for each */}
        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Question Text</label>
              <input
                className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
                placeholder="Enter your question"
              />
            </div>

            {/* Options */}
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">Option {optionIndex + 1}</label>
                <input
                  className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleQuestionChange(index, "options", [
                      ...question.options.slice(0, optionIndex),
                      e.target.value,
                      ...question.options.slice(optionIndex + 1)
                    ])
                  }
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}

            {/* Correct Answer */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Correct Answer (0-3)</label>
              <input
                className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="number"
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, "correctAnswer", parseInt(e.target.value))}
                placeholder="Enter correct option index"
              />
            </div>

            {/* Time Limit */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Time Limit (seconds)</label>
              <input
                className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="number"
                value={question.timeLimit}
                onChange={(e) => handleQuestionChange(index, "timeLimit", parseInt(e.target.value))}
                placeholder="Enter time limit"
              />
            </div>

            <button
              className="w-full p-3 mt-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={() => handleAddQuestion(index)}
            >
              Add Question {index + 1}
            </button>
          </div>
        ))}

        {/* Button to Add More Questions */}
        <button
          className="w-full p-3 mt-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={handleAddNewQuestion}
        >
          Add More Question
        </button>

        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AdminPanel;
