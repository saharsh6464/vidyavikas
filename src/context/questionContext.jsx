import React, { createContext, useState, useContext } from "react";
import { questionsData } from "../questionsdata";

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(questionsData[0] || null); // Set the first object as default
  const [currentCode, setCurrentCode] = useState(selectedQuestion ? selectedQuestion.code : ""); // Store current code
  const [results, setResults] = useState([
    { id: '', case: 1, user: '', expected: '', code: '' },
    { id: '', case: 2, user: '', expected: '', code: '' },
    { id: '', case: 3, user: '', expected: '', code: '' },
    { id: '', case: 4, user: '', expected: '', code: '' },
  ]);
  
  const updateExpectedAndCode = (id, caseNum, newUser, newExpected, newCode) => {
    setResults(r => r.map(res =>
      res.id === id && res.case === caseNum
        ? { ...res, user: newUser, expected: newExpected, code: newCode }
        : res
    ));
  };
  
  const handleSelectQuestion = (questionId) => {
    const question = questionsData.find((q) => q.id === questionId);
    setSelectedQuestion(question);
    setCurrentCode(question ? question.code : ""); // Update current code when question changes
  };

  return (
    <QuestionsContext.Provider
      value={{
        results,
        setResults,
        updateExpectedAndCode,
        selectedQuestion,
        setSelectedQuestion,
        currentCode,
        setCurrentCode, // Expose function to update code
        questionsData,
        handleSelectQuestion, 
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  return useContext(QuestionsContext);
};
