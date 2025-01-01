import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import contractABI from './quiz.json';  // Path to your contract's ABI file

const contractAddress = '0xb9bbB72224120AC77d3a99fc57C12C41cF6Cd1E6'; // Your contract address

let provider;
let signer;
let contract;

// Initialize the connection to the Ethereum network
const initializeConnection = async () => {
  try {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // Store the provider for reuse
      providerOptions: {
        // Customize this with wallet options like MetaMask, WalletConnect, etc.
      },
    });

    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("Connected to contract successfully");
  } catch (error) {
    console.error("Error initializing connection: ", error);
    throw new Error("Failed to initialize connection to Ethereum network.");
  }
};

// Fetch all questions
const getAllQuestions = async () => {
    try {
      // Ensure contract is initialized
      console.log("Initializing contract...");
      console.log("Contract instance: ", contract); // Debugging log
  
      if (!contract) {
        throw new Error("Contract is not initialized. Ensure you call initializeConnection first.");
      }
  
      // Fetch question count
      console.log("Attempting to call questionCount...");
      const questionCount = await contract.questionCount(); // Call the smart contract method
      console.log("Question count from contract:", questionCount.toString()); // Debugging log
  
      if (questionCount.toNumber() === 0) {
        console.log("No questions available in the contract.");
        return []; // No questions available
      }
  
      const questions = [];
      for (let i = 0; i < questionCount.toNumber(); i++) {
        try {
          console.log(`Fetching question ${i}...`);
          const question = await contract.getQuestion(i); // Fetch each question
  
          // Ensure the data is returned correctly before pushing it to questions
          if (question && question.questionText) {
            questions.push({
              id: i,
              questionText: question.questionText,
              options: question.options,
              correctAnswer: question.correctAnswer,
              timeLimit: question.timeLimit,
              active: question.active,
            });
            console.log(`Question ${i} fetched:`, question); // Debugging log
          } else {
            console.warn(`Question ${i} does not contain valid data.`);
          }
        } catch (error) {
          console.error(`Error fetching question ${i}: `, error);
        }
      }
  
      return questions;
    } catch (error) {
      console.error("Error in getAllQuestions:", error.message); // Catch and log any errors
      throw error;
    }
  };
  

// Fetch a specific question by its ID
const getQuestion = async (questionId) => {
  try {
    const [questionText, options, correctAnswer, timeLimit, active] = await contract.getQuestion(questionId);
    return {
      questionText,
      options,
      correctAnswer,
      timeLimit,
      active,
    };
  } catch (error) {
    console.error(`Error fetching question ${questionId}: `, error);
    throw new Error(`Failed to fetch question ${questionId}.`);
  }
};

// Submit an answer for a specific question
const submitAnswer = async (questionId, answer) => {
  try {
    const tx = await contract.submitAnswer(questionId, answer);
    await tx.wait();
    console.log(`Answer submitted for question ${questionId}`);
  } catch (error) {
    console.error("Error submitting answer: ", error);
    throw new Error("Failed to submit answer.");
  }
};

// Get stats for a specific player
const getPlayerStats = async (playerAddress) => {
  try {
    const stats = await contract.getPlayerStats(playerAddress);
    return stats;
  } catch (error) {
    console.error("Error fetching player stats: ", error);
    throw new Error("Failed to fetch player stats.");
  }
};

// Set the daily limit for attempts
const setDailyLimit = async (newLimit) => {
  try {
    const tx = await contract.setDailyLimit(newLimit);
    await tx.wait();
    console.log(`Daily limit set to ${newLimit}`);
  } catch (error) {
    console.error("Error setting daily limit: ", error);
    throw new Error("Failed to set daily limit.");
  }
};

// Add a new question to the quiz
const addQuestion = async (questionText, options, correctAnswer, timeLimit) => {
  try {
    const tx = await contract.addQuestion(questionText, options, correctAnswer, timeLimit);
    await tx.wait();
    console.log("Question added successfully");
  } catch (error) {
    console.error("Error adding question: ", error);
    throw new Error("Failed to add question.");
  }
};

// Export the functions to use them elsewhere
export { initializeConnection, getQuestion, submitAnswer, getPlayerStats, setDailyLimit, addQuestion, getAllQuestions };
