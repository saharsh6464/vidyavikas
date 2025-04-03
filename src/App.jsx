import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Questions from './mainquestions/questions';
import ResizableLayout from './componenets/Layout/ResizableLayout';
import { QuestionsProvider } from "./context/questionContext";
import TopBar from "./componenets/Layout/TopBar";

function App() {
  return (
    <Router>
      <TopBar />
      <QuestionsProvider>
        <Routes>
          <Route path="/" element={<Questions />} />
          <Route path="/solve/:questionId" element={<ResizableLayout />} />
        </Routes>
      </QuestionsProvider>
    </Router>
  );
}

export default App;