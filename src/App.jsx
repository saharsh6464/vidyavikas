import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "./mainquestions/questions";
import ResizableLayout from "./componenets/Layout/ResizableLayout";
import { QuestionsProvider } from "./context/questionContext";
import TopBar1 from "./DashBoard/TopBar1";
import SideBar from "./DashBoard/SideBar";
import Dashboard from "./pages/Dashboard";
import PracticeTests from "./pages/PracticeTests";
import MockExams from "./pages/MockExams";
import ReferAndRule from "./pages/ReferAndRule";
import HowToUse from "./pages/HowToUse";
import Settings from "./pages/Settings";
import { useState } from "react";

// import "./App.css"; // Import your CSS file for styling
// import "./componenets/Layout/TopPanel.css"; // Import your CSS file for styling
// import "./componenets/Layout/BottomPanel.css"; // Import your CSS file for styling
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    // <Router>
    //   <TopBar />
    //   <QuestionsProvider>
    //     <Routes>
    //       {/* <Route path="/" element={<Questions />} /> */}
    //       {/* <Route path="/solve/:questionId" element={<ResizableLayout />} /> */}
    //       <Route path="/home" element = {<SideBar/>}/>
    //     </Routes>
    //   </QuestionsProvider>
    // </Router>
    <Router>
      <div className="flex h-screen bg-darkBg">
        {/* Sidebar remains fixed */}
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-screen">
        <QuestionsProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/" element={<PracticeTests />} />
            <Route path="/mock-exams" element={<MockExams />} />
            <Route path="/refer-and-rule" element={<ReferAndRule />} />
              <Route path="/q" element={<Questions />} />

            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/settings" element={<Settings />} />
             <Route path="/solve/:questionId" element={<ResizableLayout />} />
          </Routes>
          </QuestionsProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
