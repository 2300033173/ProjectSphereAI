import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AIAnalyzer() {

  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "";

  const analyzeProject = async () => {

    if (!description.trim()) {
      alert("Please enter project details");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `
You are a Senior Software Architect and Technical Reviewer.

Analyze the following project professionally.

Project Details:
${description}

Provide:

1. Project Summary
2. Innovation Score (/10)
3. Technical Complexity Score (/10)
4. UI/UX Score (/10)
5. Scalability Score (/10)
6. Security Assessment
7. Industry Readiness
8. Strengths
9. Weaknesses
10. Suggested Improvements
11. Resume Impact
12. Job Readiness
13. Recommended Career Roles
14. Final Verdict

Give detailed professional feedback.
                  `
                }
              ]
            }
          ]
        }
      );

      setResult(
        response.data.candidates[0].content.parts[0].text
      );

    } catch (error) {

      console.error(error);

      setResult(
        "Unable to analyze project. Please check API Key or Internet Connection."
      );

    } finally {

      setLoading(false);

    }
  };

  const clearData = () => {
    setDescription("");
    setResult("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        padding: "40px",
        color: "white",
        fontFamily: "Poppins, sans-serif"
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px"
          }}
        >

          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "#475569",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            ← Back
          </button>

          <button
            onClick={clearData}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Clear
          </button>

        </div>

        <h1
          style={{
            fontSize: "42px",
            color: "#60a5fa",
            marginBottom: "15px"
          }}
        >
          🤖 AI Project Analyzer
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "25px",
            fontSize: "18px"
          }}
        >
          Analyze your projects using Gemini AI and get professional software engineering feedback.
        </p>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px"
          }}
        >

          <h2
            style={{
              color: "#60a5fa",
              marginBottom: "15px"
            }}
          >
            Project Description
          </h2>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Describe your project here...

Example:
ProjectSphere AI is a student project management platform built using React, Spring Boot, and MySQL. It includes project tracking, portfolio management, AI analysis, milestone tracking, and dashboard analytics."
            rows="12"
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
              background: "#334155",
              color: "white",
              resize: "vertical"
            }}
          />

          <button
            onClick={analyzeProject}
            disabled={loading}
            style={{
              marginTop: "20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 30px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            {loading
              ? "Analyzing Project..."
              : "🚀 Analyze Project"}
          </button>

        </div>

        {result && (

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #334155"
            }}
          >

            <h2
              style={{
                color: "#60a5fa",
                marginBottom: "20px"
              }}
            >
              📊 AI Evaluation Report
            </h2>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.8",
                fontSize: "15px",
                color: "#f8fafc"
              }}
            >
              {result}
            </pre>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIAnalyzer;