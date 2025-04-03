// LeftPanel.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuestions } from "../../context/questionContext";

const LeftPanel = () => {
  const { selectedQuestion } = useQuestions();

  if (!selectedQuestion) {
    return (
      <div
        className="container-fluid text-white p-4"
        style={{
          backgroundColor: "#181818",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div
          className="border p-4 rounded h-100 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#222232", borderColor: "#444" }}
        >
          <p className="text-light">Select a question to view details.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid text-white p-4"
      style={{
        backgroundColor: "#181818",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        className="border p-4 rounded h-100 d-flex flex-column"
        style={{ backgroundColor: "#222232", borderColor: "#444" }}
      >
        <h3 className="fw-bold text-light mb-3" style={{ fontSize: "1.8rem" }}>
          {selectedQuestion.id}. {selectedQuestion.title}
        </h3>
        <div className="d-flex flex-wrap align-items-center mb-3">
          <span
            className="badge rounded-pill bg-warning text-dark me-2 mb-2"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
          >
            {selectedQuestion.difficulty}
          </span>
          <span
            className="badge rounded-pill bg-secondary mb-2"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
          >
            Complexity: {selectedQuestion.complexity.time} | {selectedQuestion.complexity.space}
          </span>
        </div>
        <p className="text-light mb-3" style={{ fontSize: "0.95rem", color: "#b0b0b0" }}>
          {selectedQuestion.description}
        </p>
        <hr className="border-secondary" />
        <h5 className="text-light mb-2" style={{ fontSize: "1.1rem" }}>
          Test Cases
        </h5>
        <div className="flex-grow-1 overflow-auto">
          {selectedQuestion.testCases.map((testCase, index) => (
            <div
              key={index}
              className="mb-3 p-3 rounded"
              style={{ backgroundColor: "#2a2a3b", borderColor: "#555", borderWidth: "1px" }}
            >
              <strong className="text-warning">
                <span style={{ color: "#ffc107" }}>{testCase.example}</span>
              </strong>
              <br />
              <strong className="text-info">
                <span style={{ color: "#0dcaf0" }}>Input:</span>
              </strong>{" "}
              {testCase.input}
              <br />
              <strong className="text-success">
                <span style={{ color: "#28a745" }}>Output:</span>
              </strong>{" "}
              {testCase.output}
              <br />
              <p className="text-light mt-2" style={{ fontSize: "0.9rem" }}>
                {testCase.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;