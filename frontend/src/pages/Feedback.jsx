import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";

function Feedback() {

  const role = localStorage.getItem("role") || "STUDENT";

  const [feedbacks, setFeedbacks] = useState([]);

  const [search, setSearch] = useState("");

  const [feedback, setFeedback] = useState({
    studentId: Number(localStorage.getItem("studentId")),
    studentName: localStorage.getItem("studentName") || "",
    projectTitle: "",
    rating: "",
    comments: ""
});

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {

      const result = await axios.get(
        "http://localhost:9094/feedback"
      );

      setFeedbacks(result.data);

    } catch (error) {
      console.error(error);
    }
  };

  const submitFeedback = async () => {

    try {

      await axios.post(
        "http://localhost:9094/feedback",
        feedback
      );

      alert("Feedback Submitted Successfully");

      loadFeedback();
setFeedback({
    studentId: Number(localStorage.getItem("studentId")),
    studentName: localStorage.getItem("studentName") || "",
    projectTitle: "",
    rating: "",
    comments: ""
});

    } catch (error) {
      console.error(error);
      alert("Failed to Submit Feedback");
    }
  };

  const filteredFeedbacks =
    role === "ADMIN"
        ? feedbacks.filter(
              (f) =>
                  f.studentName
                      ?.toLowerCase()
                      .includes(search.toLowerCase()) ||
                  f.projectTitle
                      ?.toLowerCase()
                      .includes(search.toLowerCase())
          )
        : feedbacks.filter(
              (f) =>
                  f.studentId ===
                  Number(localStorage.getItem("studentId"))
          );

  return (
    <div style={{ display: "flex" }}>

      {role === "ADMIN"
        ? <AdminSidebar />
        : <Sidebar />
      }

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#0f172a",
          minHeight: "100vh",
          color: "white"
        }}
      >

        <Navbar />

        <h1
          style={{
            color: "#60a5fa",
            marginBottom: "20px"
          }}
        >
          {
            role === "ADMIN"
              ? "📝 Student Feedback Reviews"
              : "💬 Project Feedback"
          }
        </h1>

        {role === "STUDENT" && (

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "12px",
              marginBottom: "30px"
            }}
          >

            <input
              placeholder="Project Title"
              value={feedback.projectTitle}
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  projectTitle: e.target.value
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px"
              }}
            />

            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              value={feedback.rating}
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  rating: e.target.value
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px"
              }}
            />

            <textarea
              rows="5"
              placeholder="Comments"
              value={feedback.comments}
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  comments: e.target.value
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px"
              }}
            />

            <button
              onClick={submitFeedback}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Submit Feedback
            </button>

          </div>

        )}

        {role === "ADMIN" && (

          <input
            type="text"
            placeholder="Search Student or Project..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px"
            }}
          />

        )}

        <h2
          style={{
            color: "#60a5fa"
          }}
        >
          {
            role === "ADMIN"
              ? "All Student Feedback"
              : "Feedback History"
          }
        </h2>

        {filteredFeedbacks.length > 0 ? (

          filteredFeedbacks.map((f) => (

            <div
              key={f.id}
              style={{
                background: "#1e293b",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px",
                border: "1px solid #334155"
              }}
            >

              <h3>
                📁 {f.projectTitle}
              </h3>

              <p>
                👤 Student:
                {" "}
                {f.studentName}
              </p>

              <p>
                ⭐ Rating:
                {" "}
                {f.rating}/5
              </p>

              <p>
                💬 {f.comments}
              </p>

              {role === "ADMIN" && (

                <button
                  style={{
                    background: "#22c55e",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginTop: "10px"
                  }}
                >
                  View Student Details
                </button>

              )}

            </div>

          ))

        ) : (

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            No Feedback Available
          </div>

        )}

      </div>

    </div>
  );
}

export default Feedback;