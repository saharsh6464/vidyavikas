import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { LANGUAGE_VERSIONS } from "../../constants";
import { runCode } from "../../services/codeRunner.js";
import { useQuestions } from "../../context/questionContext";

const TopPanel = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("c");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const { selectedQuestion, currentCode, setCurrentCode } = useQuestions();
  const [mergedCode, setMergedCode] = useState("");

  useEffect(() => {
    if (
      selectedQuestion &&
      selectedLanguage &&
      selectedQuestion.codeTemplate[selectedLanguage]
    ) {
      setCode(
        selectedQuestion.codeTemplate[selectedLanguage].functionSignature
      );
      setCurrentCode(
        selectedQuestion.codeTemplate[selectedLanguage].functionSignature
      );
    } else {
      setCode(`// Start coding in ${selectedLanguage}...`);
      setCurrentCode(`// Start coding in ${selectedLanguage}...`);
    }
  }, [selectedQuestion, selectedLanguage, setCurrentCode]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    if (selectedQuestion && selectedQuestion.codeTemplate[newLanguage]) {
      setCode(selectedQuestion.codeTemplate[newLanguage].functionSignature);
      setCurrentCode(
        selectedQuestion.codeTemplate[newLanguage].functionSignature
      );
    } else {
      setCode(`// Start coding in ${newLanguage}...`);
      setCurrentCode(`// Start coding in ${newLanguage}...`);
    }
  };
  function convertStringToTuple(str) {
    // Remove the outermost brackets and replace with parentheses
    if (str.startsWith('[') && str.endsWith(']')) {
      str = '(' + str.slice(1, -1) + ')';
    }
  
    // Check for nested array and replace with "myArray"
    const regex = /^\((.*?)\[(.*?)\](?:,\s*)?(.*)\)$/;
    const match = str.match(regex);
  
    if (match) {
      const beforeArray = match[1];
      const arrayPart = match[2];
      const afterArray = match[3] ? ',' + match[3] : ''; // Add comma if afterArray exists
  
      return `(${beforeArray}myArray${afterArray})`;
    }
  
    return str; // Return the modified string (or original if no match)
  }
function processInput(input) {
  const regex = /\[\[(.*?)\](?:,\s*)?(.*?)\]/;
  const match = input.match(regex);

  if (match) {
    const arrayStr = match[1];

    // Convert array string to a properly formatted C-style array
    return `int myArray[] = {${arrayStr}};`;
  }
  return ""; // Return an empty string if the input format is invalid.
}
const boolArray2 = [false, false, true, true];

  const handleRun = async () => {
    setCurrentCode(code); // Save current code globally

    let merged = code; // Default: User's code remains unchanged

    // **Extract Function Name Safely**
    let functionName = "myFunction"; // Default if extraction fails
    const functionRegex = /\b(?:def|function|public static|int|float|void|char)\s+(\w+)\s*\(/;
    const match = code.match(functionRegex);
    if (match) {
        functionName = match[1]; // Extracted function name
    }
   
    for (const a of selectedQuestion.testCases) {
        let s = convertStringToTuple(a.input);
        console.log("s:", s);

        let mainCode = selectedQuestion.codeTemplate[selectedLanguage].mainFunction;
        let mainCodeb = selectedQuestion.codeTemplate[selectedLanguage].mainfunctionb;
        let mainCode2 = selectedQuestion.codeTemplate[selectedLanguage].mainFunction2 || "";

        if (selectedLanguage === "javascript" || selectedLanguage === "python" || selectedLanguage === "c" || selectedLanguage === "cpp") {

        if(selectedQuestion.Array){
          let varResult = processInput(a.input);
          // console.log("varResult:", varResult);
          // console.log(mainCodeb);
          merged = `${code}\n\n${mainCode}${varResult}${mainCodeb}${s}${mainCode2}`; // Remove extra `)`
        }else{
          console.log(s);
          merged = `${code}\n\n${mainCode}${s}${mainCode2}`; // Remove extra `)`
        }
        // console.log("s"+merged);
       }
       else if (selectedLanguage === "java") {
            merged = `public class Main {
                public static void main(String[] args) {
                    System.out.println("Running your code:");
                    System.out.println(${functionName}(1,2));
                }
                ${code}
            }`;
        }
        setMergedCode(merged);
        // console.log("Merged Code:", merged);

        // **Pass the merged code instead of the original code**
        const result = await runCode(merged, selectedLanguage, "");
        setOutput(result);
        console.log("Output:", result);
    }
};


  return (
    <div
      style={{
        background: "#282c34",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "10px",
          background: "#1e1e2f",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ color: "white" }}>Language:</label>
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{
            padding: "4px",
            borderRadius: "4px",
            background: "#333545",
            color: "white",
            border: "none",
            fontSize: "14px",
          }}
        >
          {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()} ({LANGUAGE_VERSIONS[lang]})
            </option>
          ))}
        </select>
        <button
          onClick={handleRun}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            background: "#5A20CB",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Run
        </button>
        <button
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            background: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Editor
          height="100%"
          width="100%"
          language={selectedLanguage}
          value={code}
          onChange={(newCode) => {
            setCode(newCode);
            setCurrentCode(newCode);
          }}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>
      {/* <div
        style={{
          padding: "10px",
          background: "#1e1e2f",
          color: "white",
          minHeight: "50px",
          overflowY: "auto",
          paddingBottom: "30px",
        }}
      >
        <strong>Output:</strong>
        <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
      </div> */}
    </div>
  );
};

export default TopPanel;
