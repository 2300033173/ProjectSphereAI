import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";

function Projects() {

  const role = localStorage.getItem("role") || "STUDENT";

  const studentName =
    localStorage.getItem("studentName") || "";

  const studentId =
    Number(localStorage.getItem("studentId"));

  const [search, setSearch] = useState("");

  const [projects, setProjects] = useState([]);

  const [project, setProject] = useState({
    reviewStatus: "Pending",
    
    studentId,
    studentName,
    title: "",
    description: "",
    technology: "",
    category: "",
    status: "Pending",
    progress: 0,
    githubLink: "",
    demoLink: "",
    projectImage: "",
    projectPdf: "",
    projectZip: "",
    submissionDate:
      new Date().toLocaleDateString()
  });

  useEffect(() => {
    loadProjects();
  }, []);
const loadProjects = async () => {

  try {

    let result;

    if (role === "ADMIN") {

    result = await axios.get(
  "https://projectsphereai-backend.onrender.com/projects"
);

    } else {

      result = await axios.get(
  `https://projectsphereai-backend.onrender.com/projects/student/${studentId}`
);
    }

    setProjects(result.data);

  } catch (error) {

    console.error(error);

  }

};
  const addProject = async () => {

    try {

     await axios.post(
  "https://projectsphereai-backend.onrender.com/projects",
  project
);
      alert("Project Added Successfully");

      loadProjects();

     setProject({
  reviewStatus: "Pending",
  
  studentId,
  studentName,
  title: "",
  description: "",
  technology: "",
  category: "",
  status: "Pending",
  progress: 0,
  githubLink: "",
  demoLink: "",
  projectImage: "",
  projectPdf: "",
  projectZip: "",
  submissionDate:
    new Date().toLocaleDateString()
});

    } catch (error) {

      console.error(error);

      alert("Failed To Add Project");

    }

  };

  const deleteProject = async (id) => {

    try {

      await axios.delete(
  `https://projectsphereai-backend.onrender.com/projects/${id}`
);
      loadProjects();

    } catch (error) {

      console.error(error);

    }

  };
  const approveProject = async (id) => {

  try {

    await axios.put(
  `https://projectsphereai-backend.onrender.com/projects/approve/${id}`
);

    loadProjects();

  } catch (error) {

    console.error(error);

  }

};

const rejectProject = async (id) => {

  try {

    await axios.put(
  `https://projectsphereai-backend.onrender.com/projects/reject/${id}`
);

    loadProjects();

  } catch (error) {

    console.error(error);

  }

};

  const filteredProjects =
    role === "ADMIN"
      ? projects.filter(
          (p) =>
            p.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            p.studentName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
        )
      : projects.filter(
    (p) =>
      p.studentId === studentId &&
      p.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
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
          color: "white",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <h1
          style={{
            color: "#60a5fa",
            marginBottom: "25px"
          }}
        >
          📁 Project Management
        </h1>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap"
          }}
        >

          <div style={statCard}>
            <h2>{filteredProjects.length}</h2>
            <p>Total Projects</p>
          </div>

          <div style={statCard}>
            <h2>
              {
                filteredProjects.filter(
  p => p.status === "Completed"

                ).length
              }
            </h2>
            <p>Completed</p>
          </div>

          <div style={statCard}>
            <h2>
              {
                filteredProjects.filter(
  p => p.status === "In Progress"
).length
              }
            </h2>
            <p>In Progress</p>
          </div>

        </div>

        <input
          type="text"
          placeholder="Search Projects..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={inputStyle}
        />

        {role === "STUDENT" && (

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "30px"
            }}
          >

            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                setProject({
                  ...project,
                  title: e.target.value
                })
              }
              style={inputStyle}
            />

            <textarea
              rows="4"
              placeholder="Description"
              value={project.description}
              onChange={(e) =>
                setProject({
                  ...project,
                  description:
                    e.target.value
                })
              }
              style={inputStyle}
            />

            <input
  type="text"
  placeholder="Technology Stack"
  value={project.technology}
  onChange={(e) =>
    setProject({
      ...project,
      technology: e.target.value
    })
  }
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Project Category"
  value={project.category}
  onChange={(e) =>
    setProject({
      ...project,
      category: e.target.value
    })
  }
  style={inputStyle}
/>

<input
  type="text"
  placeholder="GitHub Link"
  value={project.githubLink}
  onChange={(e) =>
    setProject({
      ...project,
      githubLink: e.target.value
    })
  }
  style={inputStyle}
/>


            <input
              type="text"
              placeholder="Demo Link"
              value={project.demoLink}
              onChange={(e) =>
                setProject({
                  ...project,
                  demoLink:
                    e.target.value
                })
              }
              style={inputStyle}
            />
           <label>Project Image</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setProject({
      ...project,
      projectImage: e.target.files[0]?.name || ""
    })
  }
  style={inputStyle}
/>

<label>Project Report PDF</label>
<input
  type="file"
  accept=".pdf"
  onChange={(e) =>
    setProject({
      ...project,
      projectPdf: e.target.files[0]?.name || ""
    })
  }
  style={inputStyle}
/>

<label>Project Source Code (ZIP)</label>
<input
  type="file"
  accept=".zip,.rar"
  onChange={(e) =>
    setProject({
      ...project,
      projectZip: e.target.files[0]?.name || ""
    })
  }
  style={inputStyle}
/>

<select
  value={project.status}
  onChange={(e) =>
    setProject({
      ...project,
      status: e.target.value
    })
  }
  style={inputStyle}
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

<input
  type="number"
  min="0"
  max="100"
  placeholder="Progress %"
  value={project.progress}
  onChange={(e) =>
    setProject({
      ...project,
      progress: e.target.value
    })
  }
  style={inputStyle}
/>

            <button
              onClick={addProject}
              style={buttonStyle}
            >
              Add Project
            </button>

          </div>

        )}

        {filteredProjects.map((p) => (

          <div
            key={p.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px"
            }}
          >

            {role === "ADMIN" &&
 p.reviewStatus === "Pending" && (
  <p>
    👨‍🎓 Student:
    {p.studentName}
  </p>
)}

{p.projectImage && (
  <img
    src={p.projectImage}
    alt="Project"
    style={{
      width: "100%",
      maxHeight: "250px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "15px"
    }}
  />
)}

<h2
  style={{
    color: "#60a5fa",
    marginBottom: "10px"
  }}
>
  {p.title}
</h2>

<p
  style={{
    marginBottom: "15px"
  }}
>
  {p.description}
</p>

<p>
  ⚙ Technology: {p.technology}
</p>

<p>
  📂 Category: {p.category}
</p>

            <p>
  📅 Submitted:
  {p.submissionDate}
</p>

          <p>
  📌 Status: {p.status}
</p>

<p>
  📝 Review:
  <span
    style={{
      marginLeft: "8px",
      color:
        p.reviewStatus === "Approved"
          ? "#22c55e"
          : p.reviewStatus === "Rejected"
          ? "#ef4444"
          : "#f59e0b",
      fontWeight: "bold"
    }}
  >
    {p.reviewStatus || "Pending"}
  </span>
</p>
<p>
  💬 Feedback:
  {" "}
  {p.adminFeedback || "No Feedback"}
</p>

<p>
  👨‍🏫 Reviewed By Admin
</p>{p.reviewStatus === "Approved" && (
  <p style={{ color: "#22c55e" }}>
    ✔ Approved Project
  </p>
)}
            <p>
              📊 {p.progress}%
            </p>

            <div
              style={{
                width: "100%",
                height: "12px",
                background:
                  "#334155",
                borderRadius: "10px",
                overflow:
                  "hidden",
                marginBottom:
                  "15px"
              }}
            >
              <div
                style={{
                  width:
                    `${p.progress}%`,
                  height:
                    "100%",
                  background:
                    "#3b82f6"
                }}
              />
            </div>

            <a
              href={p.githubLink}
              target="_blank"
              rel="noreferrer"
              style={{
                color:
                  "#60a5fa"
              }}
            >
              GitHub Repository
            </a>

            <br />
            <br />

            <a
              href={p.demoLink}
              target="_blank"
              rel="noreferrer"
              style={{
                color:
                  "#60a5fa"
              }}
            >
              Live Demo
            </a>
            <br />
<br />

{p.projectPdf && (
  <a
    href={p.projectPdf}
    target="_blank"
    rel="noreferrer"
    style={{
      color: "#22c55e"
    }}
  >
    📄 View Project PDF
  </a>
)}<br />
<br />

{p.projectZip && (
  <a
    href={p.projectZip}
    target="_blank"
    rel="noreferrer"
    style={{
      color: "#f59e0b"
    }}
  >
    📦 Download Source Code
  </a>
)}

            <br />
            <br />
{role === "ADMIN" && (

  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "15px"
    }}
  >
<button
  onClick={() =>
    approveProject(p.id)
  }
  style={{
    background: "#16a34a",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer"
      }}
    >
      Approve
    </button>

  <button
  onClick={() =>
    rejectProject(p.id)
  }
  style={{
    background: "#dc2626",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer"
      }}
    >
      Reject
    </button>

  </div>

)}
          {(
  role === "ADMIN" ||
  p.studentName === studentName
) && (
  <button
    onClick={() =>
      deleteProject(p.id)
    }
    style={{
      background: "#ef4444",
      border: "none",
      color: "white",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    Delete
  </button>
)}          </div>

        ))}

      </div>

    </div>
  );
}

const statCard = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  minWidth: "180px",
  textAlign: "center"
};

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
  padding: "14px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};


export default Projects;