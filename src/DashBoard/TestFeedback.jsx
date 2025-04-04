 import { useState, useEffect } from "react";
import { questionsData } from "../questionsdata";
import { useQuestions } from "../context/questionContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const TestFeedback = () => {
  const [questions, setQuestions] = useState([]);
  const { handleSelectQuestion } = useQuestions(); // Import the function to handle question selection
  const navigate = useNavigate(); // Initialize useNavigate
  const handleSolveClick1 = (questionId) => {
    handleSelectQuestion(questionId);
    navigate(`/solve/${questionId}`);
  };
  useEffect(() => {
    const extractedQuestions = questionsData.map((question) => ({
      id: question.id,
      title: question.title,
      difficulty: question.difficulty,
      complexity: question.complexity,
    }));
    setQuestions(extractedQuestions);
  }, []);

  // Function to handle button click
  const handleAttempt = (id) => {
    console.log("Selected Question ID:", id);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-400 border-b-2 border-purple-600 pb-2">
        Test Feedback
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-purple-800 text-white">
              {Object.keys(questions[0] || {}).map((header, index) => (
                <th key={index} className="px-4 py-2 border border-gray-700 text-center">
                  {header}
                </th>
              ))}
              <th className="px-4 py-2 border border-gray-700 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-800 even:bg-gray-900 text-gray-200 hover:bg-gray-700 transition duration-150"
                >
                  {Object.keys(item).map((key, idx) => (
                    <td key={idx} className="px-4 py-2 border border-gray-700 text-center">
                      {typeof item[key] === "object"
                        ? JSON.stringify(item[key], null, 2)
                        : item[key]}
                    </td>
                  ))}
                  <td className="px-4 py-2 border border-gray-700 text-center">
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700 transition duration-150"
                      onClick={() => handleSolveClick1(item.id)} // Call the function to handle question selection
                    >
                      Attempt
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Object.keys(questions[0] || {}).length + 1}
                  className="px-4 py-2 border border-gray-700 text-center text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestFeedback;

// import React, { useState, useEffect } from "react";
// import { questionsData } from "../questionsdata";

// const TestFeedback = () => {
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         const extractedQuestions = questionsData.map((question) => ({
//             id: question.id,
//             title: question.title,
//             difficulty: question.difficulty,
//             complexity: question.complexity,
//         }));
//         setQuestions(extractedQuestions);
//     }, []);

//     return (
//         <div className="container mx-auto p-8">
//             <h2 className="text-2xl font-semibold mb-6 text-white text-center"> {/* White heading */}
//                 Test Feedback
//             </h2>

//             <div className="overflow-x-auto rounded-lg border border-gray-800"> {/* Dark border */}
//                 <table className="min-w-full divide-y divide-gray-800"> {/* Dark dividers */}
//                     <thead className="bg-gray-900"> {/* Dark header background */}
//                         <tr>
//                             {Object.keys(questions[0] || {}).map((header, index) => (
//                                 <th
//                                     key={index}
//                                     scope="col"
//                                     className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" // Lighter header text
//                                 >
//                                     {header}
//                                 </th>
//                             ))}
//                             <th
//                                 scope="col"
//                                 className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
//                             >
//                                 Action
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-gray-800 divide-y divide-gray-800"> {/* Dark body background */}
//                         {questions.length > 0 ? (
//                             questions.map((item, index) => (
//                                 <tr
//                                     key={index}
//                                     className={`hover:bg-gray-700 ${index % 2 === 0 ? "" : "bg-gray-800"}`} // Darker row highlighting
//                                 >
//                                     {Object.keys(item).map((key, idx) => (
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200"> {/* Lighter data text */}
//                                             {typeof item[key] === "object"
//                                                 ? JSON.stringify(item[key], null, 2)
//                                                 : item[key]}
//                                         </td>
//                                     ))}
//                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                         <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"> {/* Purple button */}
//                                             Attempt
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td
//                                     colSpan={Object.keys(questions[0] || {}).length + 1}
//                                     className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center"
//                                 >
//                                     No data available
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default TestFeedback;