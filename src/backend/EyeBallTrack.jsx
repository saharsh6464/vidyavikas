import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useQuestions } from "../context/questionContext";

const EyeBallTrack = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const resultRef = useRef({
        gaze_detection: "Waiting...",
        device_detection: "Waiting...",
        multiple_faces: "Waiting...",
        identity_verification: "Waiting...",
        liveness: "Waiting..."
    });
    const { setRiskScoreData } = useQuestions();

    const analyzeSecondResult = (result) => {
      const {
        device_detection,
        face_detection,
        gaze_detection,
        identity_verification,
        liveness_detection,
        multiple_faces,
      } = result;
    
      // Check for device detection issues
      if (device_detection?.device_detection !== "No Device Detected") {
        setRiskScoreData(10);
      }
    
      // Check face detection (assuming "No Face Detected" is a violation)
      if (face_detection !== "One Face Detected") {
        setRiskScoreData(4);
      }
    
      // Check gaze detection
      if (gaze_detection?.gaze_status === "No Face Detected") {
        setRiskScoreData(1);
      }
    
      // Check identity verification
      if (identity_verification?.identity_status === "Different Face Detected") {
        setRiskScoreData(2);
      }
    
      // Check liveness detection (parse JSON string safely)
      try {
        const parsedLiveness = JSON.parse(liveness_detection);
        if (!parsedLiveness.face_detected || parsedLiveness.liveness_status !== "Real Face Detected") {
          setRiskScoreData(2);
        }
      } catch (error) {
      }
    
      // Check multiple faces
      if (multiple_faces?.multiple_faces !== "One Face Detected") {
        setRiskScoreData(1);
      }
    };
    

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startCamera();
        const interval = setInterval(captureFrame, 10000);
        return () => clearInterval(interval);
    }, []);

    const captureFrame = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("frame", blob, "frame.jpg");
            formData.append("userId", 3); // Add userId to formData

            try {
                const response = await axios.post("https://nq0cbk32-5001.inc1.devtunnels.ms/process", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // Update values without re-rendering
                resultRef.current = {
                    gaze_detection: response.data.gaze_detection?.gaze_status || "Unknown",
                    device_detection: response.data.device_detection?.device_detection || "Unknown",
                    multiple_faces: response.data.multiple_faces?.multiple_faces || "Unknown",
                    identity_verification: response.data.identity_verification?.identity_status || "Unknown",
                    liveness: response.data.liveness_detection || "Unknown",
                };

                // Manually trigger a UI update
                document.getElementById("gaze_detection").innerText = resultRef.current.gaze_detection;
                document.getElementById("device_detection").innerText = resultRef.current.device_detection;
                document.getElementById("multiple_faces").innerText = resultRef.current.multiple_faces;
                document.getElementById("identity_verification").innerText = resultRef.current.identity_verification;
                document.getElementById("liveness_detection").innerText = resultRef.current.liveness;

                analyzeSecondResult(resultRef.current);

                console.log("Response from server:", response.data);
            } catch (error) {
                console.error("Error sending frame:", error.message);
            }
        }, "image/jpeg");
    };

    return (
        <div className="flex flex-col items-center p-5">
            <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border" hidden />
            <canvas ref={canvasRef} width="640" height="480" hidden />
        </div>
    );
};

export default EyeBallTrack;
