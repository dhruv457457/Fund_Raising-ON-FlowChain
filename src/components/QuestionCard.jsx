import React, { useState } from "react";

const QuestionCard = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const checkAnswer = () => {
    if (parseInt(selectedAnswer) === question.correctAnswer) {
      alert("Correct Answer!");
    } else {
      alert("Incorrect Answer.");
    }
  };

  return (
    <div className="mb-6 bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md">
      <h4 className="text-xl font-bold text-gray-700 mb-4">{question.text}</h4>
      
      {/* Display options */}
      {question.options.map((option, index) => (
        <div key={index} className="mb-2">
          <input
            type="radio"
            id={`option-${index}`}
            name={`question-${question.id}`}
            value={index}
            onChange={handleOptionChange}
            className="mr-2"
          />
          <label htmlFor={`option-${index}`} className="text-gray-600">{option}</label>
        </div>
      ))}
      
      <button
        className="mt-4 p-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600"
        onClick={checkAnswer}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuestionCard;
