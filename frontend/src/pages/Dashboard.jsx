
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import AdminSidebar from "../components/AdminSidebar";
import ProjectTable from "../components/ProjectTable";

function Dashboard() {

  const role = localStorage.getItem("role");
const studentId = localStorage.getItem("studentId");
  const [student, setStudent] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

  const [milestones, setMilestones] =
    useState([]);

  useEffect(() => {

  if (role === "ADMIN") {
    loadAdminData();
  } else {
    loadStudent();
    loadProjects();
    loadMilestones();
  }

}, []);

  const loadStudent = async () => {
  try {
    const studentResponse = await axios.get(
      `https://projectsphereai-backend.onrender.com/students/${studentId}`
    );

    setStudent(studentResponse.data);

  } catch (error) {
    console.log(error);
  }
};

  const loadProjects = async () => {
  try {
    const projectsResponse = await axios.get(
      `https://projectsphereai-backend.onrender.com/projects/student/${studentId}`
    );

    setProjects(projectsResponse.data);

  } catch (error) {
    console.log(error);
  }
};

  const loadMilestones = async () => {
  try {
    const milestonesResponse = await axios.get(
      `https://projectsphereai-backend.onrender.com/milestones/student/${studentId}`
    );

    setMilestones(milestonesResponse.data);

  } catch (error) {
    console.log(error);
  }
};
const loadAdminData = async () => {

  try {

    const studentsResponse = await axios.get(
      "https://projectsphereai-backend.onrender.com/students"
    );

    const projectsResponse = await axios.get(
      "https://projectsphereai-backend.onrender.com/projects"
    );

    const milestonesResponse = await axios.get(
      "https://projectsphereai-backend.onrender.com/milestones"
    );

    setStudent({
      name: "Administrator",
      portfolioScore: 100,
      department: "Administration",
      skills: "Management"
    });

    setProjects(projectsResponse.data);
    setMilestones(milestonesResponse.data);

  } catch (error) {
    console.log(error);
  }
};
  const completedProjects =
    projects.filter(
      (project) =>
        project.status === "Completed"
    ).length;

  const pendingProjects =
    projects.filter(
      (project) =>
        project.status === "Pending"
    ).length;

  const profileCompletion = student
    ? (
        (student.name ? 10 : 0) +
        (student.email ? 10 : 0) +
        (student.department ? 10 : 0) +
        (student.skills ? 20 : 0) +
        (student.github ? 15 : 0) +
        (student.linkedin ? 15 : 0) +
        (student.resume ? 10 : 0) +
        (student.profileImage ? 10 : 0)
      )
    : 0;
    const latestProject =
  projects.length > 0
    ? projects[projects.length - 1]
    : null;

  return (
    <div
      style={{
        display: "flex",
        background: "#0f172a",
        minHeight: "100vh"
      }}
    >
{
  role === "ADMIN"
    ? <AdminSidebar />
    : <Sidebar />
}
      

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >

        <Navbar />
        <h2 style={{ color: "white" }}>
Welcome,
{student?.name}
</h2>
<h1
  style={{
    color: "#60a5fa",
    marginBottom: "20px"
  }}
>
  {role === "ADMIN"
    ? "📊 Admin Dashboard"
    : "📊 Student Dashboard"}
</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px"
          }}
        >

          <StatCard
            title="Projects"
            value={projects.length}
            icon="📁"
          />

          <StatCard
            title="Milestones"
            value={milestones.length}
            icon="🎯"
          />

          <StatCard
            title="Completed"
            value={completedProjects}
            icon="✅"
          />

          <StatCard
            title="Pending"
            value={pendingProjects}
            icon="⏳"
          />

          <StatCard
            title="Portfolio Score"
            value={
              student?.portfolioScore || 0
            }
            icon="🏆"
          />

        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
            color: "white",
            marginBottom: "30px"
          }}
        >

          <h2
            style={{
              color: "#60a5fa"
            }}
          >
            👤 Profile Completion
          </h2>

          <div
            style={{
              width: "100%",
              height: "15px",
              background: "#334155",
              borderRadius: "10px"
            }}
          >

            <div
              style={{
                width: `${profileCompletion}%`,
                height: "100%",
                background: "#22c55e",
                borderRadius: "10px"
              }}
            />

          </div>

          <p
            style={{
              marginTop: "10px"
            }}
          >
            {profileCompletion}% Complete
          </p>

        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px",
            color: "white",
            marginBottom: "30px"
          }}
        >

          <h2
            style={{
              color: "#60a5fa"
            }}
          >
            🚀 Current Project
          </h2>
<p>
  Project:
  {" "}
  {latestProject?.title || "Not Assigned"}
</p>

<p>
  Status:
  {" "}
  {latestProject?.status || "Pending"}
</p>

<p>
  Progress:
  {" "}
  {latestProject?.progress || 0}
  %
</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "15px"
          }}
        >

          <h2
            style={{
              color: "#60a5fa"
            }}
          >
            📁 Recent Projects
          </h2>

          <ProjectTable projects={projects} />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

