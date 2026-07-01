import { useEffect, useState } from "react";
import axios from "axios";

function ProjectTable() {

  const [projects, setProjects] = useState([]);

  const role =
    localStorage.getItem("role");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:9094/projects"
        );

      setProjects(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {

    if (status === "Completed")
      return "#22c55e";

    if (status === "In Progress")
      return "#f59e0b";

    return "#ef4444";
  };

  return (
    <div
      style={{
        marginTop: "20px"
      }}
    >

      {projects.length > 0 ? (

        projects.map((project) => (

          <div
            key={project.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "15px",
              border: "1px solid #334155",
              color: "white"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center"
              }}
            >

              <h2
                style={{
                  color: "#60a5fa"
                }}
              >
                {project.title}
              </h2>

              <span
                style={{
                  background:
                    getStatusColor(
                      project.status
                    ),
                  padding:
                    "6px 12px",
                  borderRadius:
                    "20px",
                  fontSize: "13px"
                }}
              >
                {project.status}
              </span>

            </div>

            <p>
              {project.description}
            </p>

            {role === "ADMIN" && (

              <p>
                👨‍🎓 Student:
                {" "}
                {
                  project.studentName ||
                  "Unknown"
                }
              </p>

            )}

            <p>
              📊 Progress:
              {" "}
              {project.progress}%
            </p>

            <div
              style={{
                width: "100%",
                height: "12px",
                background:
                  "#334155",
                borderRadius:
                  "10px",
                marginBottom:
                  "15px"
              }}
            >

              <div
                style={{
                  width:
                    `${project.progress}%`,
                  height: "100%",
                  background:
                    "#22c55e",
                  borderRadius:
                    "10px"
                }}
              />

            </div>

            {project.projectImage && (

              <img
                src={project.projectImage}
                alt="Project"
                style={{
                  width: "250px",
                  borderRadius:
                    "10px",
                  marginBottom:
                    "15px"
                }}
              />

            )}

            {project.githubLink && (

              <p>
                💻 GitHub:
                {" "}
                <a
                  href={
                    project.githubLink
                  }
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color:
                      "#60a5fa"
                  }}
                >
                  Open Repository
                </a>
              </p>

            )}

            {project.demoLink && (

              <p>
                🎥 Demo:
                {" "}
                <a
                  href={
                    project.demoLink
                  }
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color:
                      "#60a5fa"
                  }}
                >
                  Watch Demo
                </a>
              </p>

            )}

            {project.projectFile && (

              <p>
                📄 Project File:
                {" "}
                {project.projectFile}
              </p>

            )}

            {project.projectFolder && (

              <p>
                📁 Project Folder:
                {" "}
                {project.projectFolder}
              </p>

            )}

          </div>

        ))

      ) : (

        <div
          style={{
            background:
              "#1e293b",
            padding: "20px",
            borderRadius:
              "15px",
            color: "white"
          }}
        >
          No Projects Available
        </div>

      )}

    </div>
  );
}

export default ProjectTable;