import React, { useState, useEffect } from "react";
import { useQuestions } from "../../context/questionContext";
import "./BottomPanel.css"; // Import your CSS file for styling
// import {results} from "../../context/questionContext";
const BottomPanel = () => {
    const { selectedQuestion } = useQuestions();
    const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);
    const [yourOutput, setYourOutput] = useState("");

    useEffect(() => {
        setSelectedTestCaseIndex(0);
        setYourOutput("");
    }, [selectedQuestion]);

    const handleTestCaseChange = (index) => {
        setSelectedTestCaseIndex(index);
        setYourOutput("");
    };

    if (!selectedQuestion || !selectedQuestion.testCases) {
        return (
            <div className="no-test-cases">
                <p>No test cases available.</p>
            </div>
        );
    }

    const selectedTestCase = selectedQuestion.testCases[selectedTestCaseIndex];

    return (
        <div className="bottom-panel">
            <div className="test-case-selector">
                <label>Test Case:</label>
                <div className="test-case-buttons">
                    {selectedQuestion.testCases.map((testCase, index) => (
                        <button
                            key={index}
                            className={`test-case-btn ${selectedTestCaseIndex === index ? "active" : ""}`}
                            onClick={() => handleTestCaseChange(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="test-case-details">
                <div className="detail-row">
                    <strong>Input:</strong>
                    <span>{selectedTestCase.input}</span>
                </div>
                <div className="detail-row">
                    <strong>Expected Output:</strong>
                    <span>{selectedTestCase.output}</span>
                </div>
                <div className="output-box">
                    <strong>Output:</strong>
                    <pre>{yourOutput}</pre>
                </div>
            </div>
        </div>
    );
};

export default BottomPanel;
