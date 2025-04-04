import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import PracticeInstructions from "./instructionpage/setShowInstructions";
import VoiceDetection from "./backend/VoiceDetection";
import EyeBallTrack from "./backend/EyeBallTrack";
import WideTracking from "./backend/WideTracking";
import WebcamCapture from "./backend/WebCamCapture";
function AppContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Check if background trackers should run
  const isTrackingPath =
    location.pathname.startsWith("/solve/") ||
    location.pathname === "/practice-tests";

  // Hide top bar only on solve path
  const hideTopBar = location.pathname.startsWith("/solve/");

  return (
    <div className="flex h-screen bg-darkBg">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {!hideTopBar && <TopBar1 />}

      <div className="flex-1 flex flex-col min-h-screen">
        <QuestionsProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/practice-tests" element={<PracticeTests />} />
            <Route path="/mock-exams" element={<MockExams />} />
            <Route path="/refer-and-rule" element={<ReferAndRule />} />
            <Route path="/instructionset" element={<PracticeInstructions />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/solve/:questionId" element={<ResizableLayout />} />
            <Route path="/voice" element={<VoiceDetection />} />
            <Route path="/wide" element={<WideTracking />} />
            <Route path="/Eye" element={<EyeBallTrack />} />
          </Routes>

          {/* ✅ Run tracking components in background if solving or practicing */}
          {isTrackingPath && (
            <>
              <EyeBallTrack />
              <WideTracking />
            </>
          )}
        </QuestionsProvider>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
