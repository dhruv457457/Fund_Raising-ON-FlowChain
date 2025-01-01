import React, { useEffect, useState } from "react";
import { initializeConnection, getAllQuestions } from "../utils/contract.js"; // Make sure this is the correct path
import QuestionCard from "../components/QuestionCard.jsx";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Initialize the connection to the contract before fetching questions
        await initializeConnection(); 

        const fetchedQuestions = await getAllQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        setErrorMessage("Error loading questions. Please try again.");
        console.error("Error loading questions:", error);
      }
    };

    fetchQuestions();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-800 via-pink-600 to-green-400 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 border-2 border-gray-300 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-pink-600 mb-6">Quiz</h3>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <p className="text-center text-gray-700">No questions available</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
