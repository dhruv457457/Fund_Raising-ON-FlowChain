import React, { useState } from "react";

const AdminPanel = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Array of 4 options
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = () => {
    if (!question || !options.some(option => option) || correctAnswer === "") {
      alert("Please complete all fields.");
      return;
    }
    // Handle submission logic
    console.log({ question, options, correctAnswer });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Question</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={question || ""}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter question"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Options</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            className="w-full p-2 mb-2 border rounded"
            value={option || ""}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
        ))}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Correct Answer</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={correctAnswer || ""}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Enter correct answer"
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default AdminPanel;
