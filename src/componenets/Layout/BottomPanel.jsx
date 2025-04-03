import React, { useState, useEffect } from "react";
import { useQuestions } from "../../context/questionContext";
import "./BottomPanel.css"; // Import your CSS file for styling

const BottomPanel = () => {
    const { selectedQuestion, results } = useQuestions();
    const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

    useEffect(() => {
        setSelectedTestCaseIndex(0);
    }, [selectedQuestion]);

    if (!selectedQuestion || !selectedQuestion.testCases) {
        return (
            <div className="no-test-cases">
                <p>No test cases available.</p>
            </div>
        );
    }

    return (
        <div className="bottom-panel">
            {/* Test Case Selector */}
            <div className="test-case-selector">
                <label>Test Case:</label>
                <div className="test-case-buttons">
                    {selectedQuestion.testCases.map((testCase, index) => {
                        const caseData = results[index + 1] || {};
                        const caseCorrect = caseData.userOutput?.trim() === caseData.expectedOutput?.trim();
                        const statusIcon = caseData.userOutput ? (caseCorrect ? "✅" : "❌") : "";

                        return (
                            <button
                                key={index}
                                className={`test-case-btn ${selectedTestCaseIndex === index ? "active" : ""}`}
                                onClick={() => setSelectedTestCaseIndex(index)}
                            >
                                {index + 1} {statusIcon}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Test Case Details */}
            <div className="test-case-details">
                <div className="detail-row">
                    <strong>Input:</strong>
                    <span>{selectedQuestion.testCases[selectedTestCaseIndex].input}</span>
                </div>
                <div className="detail-row">
                    <strong>Expected Output:</strong>
                    <span>{selectedQuestion.testCases[selectedTestCaseIndex].output}</span>
                </div>
                <div className="detail-row">
                    <strong>Your Output:</strong>
                    <span>
                        {results[selectedTestCaseIndex + 1]?.userOutput
                            ? results[selectedTestCaseIndex + 1].userOutput
                            : "No Output"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BottomPanel;
