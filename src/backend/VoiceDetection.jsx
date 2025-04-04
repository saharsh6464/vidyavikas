import React, { useEffect, useState, useRef } from "react";
import { useQuestions } from "../context/questionContext";
const VoiceDetection = () => {
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const isManuallyStopped = useRef(false);
    const restartTimerRef = useRef(null);
    const {setVoiceData} = useQuestions();

    // Function to create a new recognition instance
    const createRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        return recognition;
    };

    // Function to start listening with fresh instance
    const startRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.onresult = null;
            recognitionRef.current.onend = null;
            recognitionRef.current.onerror = null;
            recognitionRef.current.stop();
        }

        const recognition = createRecognition();
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            console.log("✅ Speech recognition started");
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            let latestTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                latestTranscript += event.results[i][0].transcript + " ";
            }
            setTranscript(latestTranscript.trim());
            setVoiceData(latestTranscript.trim()); // Update voice data in context
        };

        recognition.onerror = (event) => {
            console.error("❌ Speech recognition error:", event.error);
            setError(`Error: ${event.error}`);
        };

        recognition.onend = () => {
            setIsListening(false);
            console.warn("⚠ Speech recognition ended.");
            if (!isManuallyStopped.current) {
                // Restart after a short delay
                setTimeout(() => startRecognition(), 1000);
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error("Start error:", e);
        }
    };

    useEffect(() => {
        if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            setError("SpeechRecognition API is not supported in this browser.");
            return;
        }

        isManuallyStopped.current = false;
        startRecognition();

        // Restart fresh every 30 seconds to avoid lock-up
        restartTimerRef.current = setInterval(() => {
            if (!isManuallyStopped.current) {
                //setVoiceData(transcript)
                console.log("🔁 Forcing recognition restart to avoid lock-up...");
                startRecognition();
            }
        }, 5000); // 30 seconds

        return () => {
            isManuallyStopped.current = true;
            clearInterval(restartTimerRef.current);
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    return (
        <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
            <h3>🎤 Voice Detection</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!error && (
                <p style={{ color: isListening ? "green" : "gray" }}>
                    {isListening ? "Listening for speech..." : "Not listening"}
                </p>
            )}
            {transcript && (
                <p>
                    <strong>Detected Speech:</strong> {transcript}
                </p>
            )}
        </div>
    );
};

export default VoiceDetection;



// import React, { useEffect } from "react";

// const VoiceDetection = () => {
//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//         if (!SpeechRecognition) {
//             console.error("SpeechRecognition API is not supported in this browser.");
//             return;
//         }

//         const recognition = new SpeechRecognition();
//         recognition.continuous = true;

//         recognition.onresult = (event) => {
//             console.log("Speech detected:", event.results[0][0].transcript);
//         };

//         recognition.onerror = (event) => {
//             if (event.error === "no-speech") {
//                 console.warn("No speech detected. Please try speaking again.");
//             } else {
//                 console.error("Speech recognition error:", event.error);
//             }
//         };

//         recognition.start();

//         return () => recognition.stop();
//     }, []);

//     return <h3>Listening for Speech...</h3>;
// };

// export default VoiceDetection;
