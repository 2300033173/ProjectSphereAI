import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const [students, setStudents] = useState([]);
const [projects, setProjects] = useState([]);
const [search, setSearch] = useState("");

const navigate = useNavigate();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const studentResponse = await axios.get("https://projectsphereai-backend.onrender.com/students");

      setStudents(studentResponse.data);

      try {
        const projectResponse = await axios.get("https://projectsphereai-backend.onrender.com/projects");

        setProjects(projectResponse.data);

      } catch {
        setProjects([]);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student.department
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const pendingProjects = projects.filter(
    (p) => p.status !== "Completed"
  ).length;

  return (
    <div style={{ display: "flex" }}>

      <AdminSidebar />

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
          👨‍🏫 Admin Dashboard
        </h1>

        {/* Analytics Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}
        >

          <DashboardCard
            title="👨‍🎓 Students"
            value={students.length}
          />

          <DashboardCard
            title="📁 Projects"
            value={totalProjects}
          />

          <DashboardCard
            title="✅ Completed"
            value={completedProjects}
          />

          <DashboardCard
            title="⏳ Pending"
            value={pendingProjects}
          />

        </div>

        {/* Search */}

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "25px"
          }}
        >

          <h2
            style={{
              color: "#60a5fa"
            }}
          >
            🔍 Search Students
          </h2>

          <input
            type="text"
            placeholder="Search by Name, Email or Department"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              marginTop: "10px"
            }}
          />

        </div>

        {/* Student List */}

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}
        >

          <h2
            style={{
              color: "#60a5fa",
              marginBottom: "20px"
            }}
          >
            👨‍🎓 Student Progress Tracking
          </h2>

          {filteredStudents.length > 0 ? (

            filteredStudents.map((student) => (

              <div
                key={student.id}
                style={{
                  background: "#334155",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "15px"
                }}
              >

                <h3>
                  {student.name}
                </h3>

                <p>
                  📧 {student.email}
                </p>

                <p>
                  🏢 {student.department}
                </p>

                <p>
                  🛠 Skills:
                  {" "}
                  {student.skills || "Not Updated"}
                </p>
<p>
🚀 Current Project:
{" "}
{student.currentProject || "Not Assigned"}
</p>

<p>
📌 Status:
{" "}
{student.projectStatus || "Pending"}
</p>
                <p>
                  📊 Portfolio Score:
                  {" "}
                  {student.portfolioScore || 0}
                </p>

                <p>
                  📁 Projects:
                  {" "}
                  {student.projectsCount || 0}
                </p>

                <p>
                  ✅ Completed:
                  {" "}
                  {student.completedProjects || 0}
                </p>

                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    background: "#475569",
                    borderRadius: "10px",
                    marginTop: "10px"
                  }}
                >

                  <div
                    style={{
                      width: `${student.overallProgress || 0}%`,
                      height: "100%",
                      background: "#22c55e",
                      borderRadius: "10px"
                    }}
                  />

                </div>

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}
                >
<button
  style={buttonStyle}
  onClick={() =>
    navigate(`/students?id=${student.id}`)
  }
>
  View Profile
</button>

<button
  style={buttonStyle}
  onClick={() =>
    navigate(`/projects?studentId=${student.id}`)
  }
>
  View Projects
</button>

<button
  style={buttonStyle}
  onClick={() =>
    navigate(`/portfolio?studentId=${student.id}`)
  }
>
  View Portfolio
</button>

<button
  style={{
    ...buttonStyle,
    background: "#16a34a"
  }}onClick={() => {
  const score = student.portfolioScore || 0;

  let review = "";

  if (score >= 90) {
    review = "Excellent Portfolio";
  } else if (score >= 70) {
    review = "Very Good Portfolio";
  } else if (score >= 50) {
    review = "Good Portfolio. Add more projects.";
  } else {
    review = "Needs Improvement. Complete projects and update profile.";
  }

  alert(
    `AI Review for ${student.name}

Portfolio Score : ${score}

Projects : ${student.projectsCount || 0}

Completed : ${student.completedProjects || 0}

Result : ${review}`
  );
}}
>
  AI Review
</button>
                </div>

              </div>

            ))

          ) : (

            <div
              style={{
                textAlign: "center",
                padding: "20px"
              }}
            >
              No Students Found
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center"
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color: "#60a5fa"
        }}
      >
        {value}
      </h1>
    </div>
  );
}

const buttonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AdminDashboard;