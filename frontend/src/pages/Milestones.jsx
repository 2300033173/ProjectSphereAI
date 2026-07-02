import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Milestones() {

  const [milestones, setMilestones] = useState([]);

  const [milestone, setMilestone] = useState({
    studentId: Number(localStorage.getItem("studentId")),
    studentName: localStorage.getItem("studentName") || "",
    projectName: "",
    title: "",
    description: "",
    deadline: "",
    priority: "Medium",
    status: "Pending",
    progress: 0
  });

  useEffect(() => {
    loadMilestones();
  }, []);

  const loadMilestones = async () => {
  try {

    const result = await axios.get(
      `https://projectsphereai-backend.onrender.com/milestones/student/${localStorage.getItem("studentId")}`
    );
      setMilestones(result.data);

    } catch (error) {
      console.error(error);
    }
  };

  const addMilestone = async () => {

    try {

      await axios.post(
  "https://projectsphereai-backend.onrender.com/milestones",
  milestone
);

      alert("Milestone Added Successfully");

      loadMilestones();

      setMilestone({
    studentId: Number(localStorage.getItem("studentId")),
    studentName: localStorage.getItem("studentName") || "",
        projectName: "",
        title: "",
        description: "",
        deadline: "",
        priority: "Medium",
        status: "Pending",
        progress: 0
      });

    } catch (error) {
      console.error(error);
      alert("Failed To Add Milestone");
    }
  };

  const deleteMilestone = async (id) => {

    try {

     await axios.delete(
  `https://projectsphereai-backend.onrender.com/milestones/${id}`
);
      loadMilestones();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

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
            marginBottom: "25px"
          }}
        >
          🎯 Project Milestones
        </h1>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "30px"
          }}
        >

          <input
            type="text"
            placeholder="Project Name"
            value={milestone.projectName}
            onChange={(e) =>
              setMilestone({
                ...milestone,
                projectName: e.target.value
              })
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Milestone Title"
            value={milestone.title}
            onChange={(e) =>
              setMilestone({
                ...milestone,
                title: e.target.value
              })
            }
            style={inputStyle}
          />

          <textarea
            rows="4"
            placeholder="Milestone Description"
            value={milestone.description}
            onChange={(e) =>
              setMilestone({
                ...milestone,
                description: e.target.value
              })
            }
            style={inputStyle}
          />

          <input
            type="date"
            value={milestone.deadline}
            onChange={(e) =>
              setMilestone({
                ...milestone,
                deadline: e.target.value
              })
            }
            style={inputStyle}
          />

          <select
            value={milestone.priority}
            onChange={(e) =>
              setMilestone({
                ...milestone,
                priority: e.target.value
              })
            }
            style={inputStyle}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <select
            value={milestone.status}
            onChange={(e) =>
              setMilestone({
                ...milestone,
                status: e.target.value
              })
            }
            style={inputStyle}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

         <input
    type="number"
    min="0"
    max="100"
    placeholder="Progress %"
    value={milestone.progress}
    onChange={(e) =>
        setMilestone({
            ...milestone,
            progress: e.target.value
        })
    }
    style={inputStyle}
/>
          <button
            onClick={addMilestone}
            style={buttonStyle}
          >
            Add Milestone
          </button>

        </div>

        <h2
          style={{
            color: "#60a5fa"
          }}
        >
          All Milestones
        </h2>

        {milestones.length > 0 ? (

          milestones.map((m) => (

            <div
              key={m.id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "15px"
              }}
            >

              <h3>{m.title}</h3>

              <p>
                📁 Project:
                {m.projectName}
              </p>

              <p>
                📝 Description:
                {m.description}
              </p>

              <p>
                📅 Deadline:
                {m.deadline}
              </p>

              <p>
  🚨 Priority: {m.priority}
</p>

<p>
  📌 Status:
  <span
    style={{
      marginLeft: "10px",
      background:
        m.status === "Completed"
          ? "#22c55e"
          : m.status === "In Progress"
          ? "#f59e0b"
          : "#ef4444",
      padding: "5px 12px",
      borderRadius: "15px",
      color: "white"
    }}
  >
    {m.status}
  </span>
</p>
              <p>
                📊 Progress:
                {m.progress}%
              </p>

              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: "#334155",
                  borderRadius: "10px",
                  marginTop: "10px"
                }}
              >
                <div
                  style={{
                    width: `${m.progress}%`,
                    height: "100%",
                    background: "#22c55e",
                    borderRadius: "10px"
                  }}
                />
              </div>

              <button
                onClick={() =>
                  deleteMilestone(m.id)
                }
                style={{
                  marginTop: "15px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

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
            No Milestones Available
          </div>

        )}

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#334155",
  color: "white"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Milestones;