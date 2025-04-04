import React, { useState, useEffect } from "react";
import { useQuestions } from "../../context/questionContext";
import "./BottomPanel.css"; // Import your CSS file for styling

const helper = (results, str) => {
  
  const randomInt = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  let passCnt = 0;
  let totalCnt = 0;
  console.log(results);
  for (let key in results) {
    if (results[key]) {
      totalCnt++; // Increment total test cases count
      if (results[key].userOutput.trim() === results[key].expectedOutput.trim()) {
        passCnt++; // Increment passed count if outputs match
      }
    }
  }

  let ans1 = passCnt * randomInt;
  let ans2 = totalCnt * randomInt;
  let diff = 0;
  if (str === "Easy") diff = 1;
  else if (str === "Medium") diff = 2;
  else if (str === "Hard") diff = 3;
  else diff = 0;
  let score = diff * passCnt;
  let tscore = diff * totalCnt;
  console.log("Score:", score, "Total Score:", tscore);
  return {
    "Test Passed:": ans1,
    "Test Total": ans2,
    "Score": score,
    "Total Score": tscore,
  };
};

const BottomPanel = () => {
  const { selectedQuestion, results, appendScore } = useQuestions();
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

  useEffect(() => {
    if (selectedQuestion && results) {
      const objt = helper(results, selectedQuestion.difficulty);
      const obj = {
        qu_id: selectedQuestion.id,
        ...objt,
      };
  console.log("obj:", obj);
      // Prevent unnecessary updates
      if (JSON.stringify(results) !== JSON.stringify(objt)) {
        appendScore(obj);
      }
    }
  }, [selectedQuestion, results]);
  

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
            const caseCorrect =
              caseData.userOutput?.trim() === caseData.expectedOutput?.trim();
            const statusIcon = caseData.userOutput
              ? caseCorrect
                ? "✅"
                : "❌"
              : "";

            return (
              <button
                key={index}
                className={`test-case-btn ${
                  selectedTestCaseIndex === index ? "active" : ""
                }`}
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
          <span>
            {selectedQuestion.testCases[selectedTestCaseIndex].output}
          </span>
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

// import React, { useState, useEffect } from "react";
// import { useQuestions } from "../../context/questionContext";
// import "./BottomPanel.css"; // Import your CSS file for styling

// const helper=(results,str) => {
//     const randomInt = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
//     let passCnt=0;
//     let totalCnt=0;
//     for (let i = 1; i <= randomInt; i++) {
//         if (results[i] && results[i].userOutput === results[i].expectedOutput) {
//             passCnt++;
//         }
//         totalCnt++;
//     }
//     let ans1=passCnt*randomInt;
//     let ans2=totalCnt*randomInt;
//     let diff=0;
//     if(str=="Easy")
//         diff=1;
//     else if(str=="Medium")
//         diff=2;
//     else if(str=="Hard")
//         diff=3;
//     else
//         diff=0;
//     let score=diff*passCnt;
//     let tscore=diff*totalCnt;
//     return {"Test Passed:":ans1,"Test Total":ans2,"Score":score,"Total Score":tscore};
// }

// const BottomPanel = () => {
//     const { selectedQuestion, results,appendScore} = useQuestions();
//     const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

//     const objt=helper(results,selectedQuestion.difficulty);
//     const obj = {
//         qu_id: selectedQuestion.id,
//         ...objt
//     }

//     appendScore(obj);

//     useEffect(() => {
//         setSelectedTestCaseIndex(0);
//     }, [selectedQuestion]);

//     if (!selectedQuestion || !selectedQuestion.testCases) {
//         return (
//             <div className="no-test-cases">
//                 <p>No test cases available.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="bottom-panel">
//             {/* Test Case Selector */}
//             <div className="test-case-selector">
//                 <label>Test Case:</label>
//                 <div className="test-case-buttons">
//                     {selectedQuestion.testCases.map((testCase, index) => {
//                         const caseData = results[index + 1] || {};
//                         const caseCorrect = caseData.userOutput?.trim() === caseData.expectedOutput?.trim();
//                         const statusIcon = caseData.userOutput ? (caseCorrect ? "✅" : "❌") : "";

//                         return (
//                             <button
//                                 key={index}
//                                 className={`test-case-btn ${selectedTestCaseIndex === index ? "active" : ""}`}
//                                 onClick={() => setSelectedTestCaseIndex(index)}
//                             >
//                                 {index + 1} {statusIcon}
//                             </button>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* Test Case Details */}
//             <div className="test-case-details">
//                 <div className="detail-row">
//                     <strong>Input:</strong>
//                     <span>{selectedQuestion.testCases[selectedTestCaseIndex].input}</span>
//                 </div>
//                 <div className="detail-row">
//                     <strong>Expected Output:</strong>
//                     <span>{selectedQuestion.testCases[selectedTestCaseIndex].output}</span>
//                 </div>
//                 <div className="detail-row">
//                     <strong>Your Output:</strong>
//                     <span>
//                         {results[selectedTestCaseIndex + 1]?.userOutput
//                             ? results[selectedTestCaseIndex + 1].userOutput
//                             : "No Output"}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BottomPanel;
