import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";

function Students() {

  const [students, setStudents] = useState([]);
const [search, setSearch] = useState("");
const [selectedStudent, setSelectedStudent] = useState(null);

const params = new URLSearchParams(window.location.search);
const selectedStudentId = params.get("id");
console.log("Student ID =", selectedStudentId);
  useEffect(() => {
  loadStudents();
}, []);

  const loadStudents = async () => {
    try {

      const response = await axios.get(
        "http://localhost:9094/students"
      );

      setStudents(response.data);

if (selectedStudentId) {
  const foundStudent = response.data.find(
    (s) => String(s.id) === String(selectedStudentId)
  );

  if (foundStudent) {
    setSelectedStudent(foundStudent);
  }
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

  return (
    <div style={{ display: "flex" }}>

      <AdminSidebar />

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
            marginBottom: "20px"
          }}
        >
          👨‍🎓 Student Management
        </h1>

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
            borderRadius: "10px",
            border: "none",
            marginBottom: "25px"
          }}
        />

        <div
          style={{
            display: "grid",
            gap: "15px"
          }}
        >

          {filteredStudents.map((student) => (

            <div
              key={student.id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #334155"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <div>

                  <h2
                    style={{
                      marginBottom: "10px",
                      color: "#60a5fa"
                    }}
                  >
                    {student.name}
                  </h2>

                  <p>📧 {student.email}</p>

                  <p>
                    🏢 Department:
                    {" "}
                    {student.department}
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

                  <p>
                    ⭐ Portfolio Score:
                    {" "}
                    {student.portfolioScore || 0}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSelectedStudent(student)
                  }
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

        {selectedStudent && (

          <div
            style={{
              marginTop: "30px",
              background: "#1e293b",
              padding: "25px",
              borderRadius: "12px"
            }}
          >

            <h2
              style={{
                color: "#60a5fa"
              }}
            >
              Student Profile
            </h2>

            <hr
              style={{
                borderColor: "#334155"
              }}
            />

            <p>
              👤 Name:
              {" "}
              {selectedStudent.name}
            </p>

            <p>
              📧 Email:
              {" "}
              {selectedStudent.email}
            </p>

            <p>
              🏢 Department:
              {" "}
              {selectedStudent.department}
            </p>

            <p>
              🛠 Skills:
              {" "}
              {selectedStudent.skills || "Not Updated"}
            </p>

            <p>
              💻 GitHub:
              {" "}
              {selectedStudent.github || "Not Updated"}
            </p>

            <p>
              🔗 LinkedIn:
              {" "}
              {selectedStudent.linkedin || "Not Updated"}
            </p>

            <p>
              📄 Resume:
              {" "}
              {selectedStudent.resume || "Not Uploaded"}
            </p>

            <p>
              🖼 Profile Image:
              {" "}
              {selectedStudent.profileImage || "Not Uploaded"}
            </p>

            <p>
              📁 Total Projects:
              {" "}
              {selectedStudent.projectsCount || 0}
            </p>

            <p>
              ✅ Completed Projects:
              {" "}
              {selectedStudent.completedProjects || 0}
            </p>

            <p>
              ⭐ Portfolio Score:
              {" "}
              {selectedStudent.portfolioScore || 0}
            </p>

            <div
              style={{
                marginTop: "15px"
              }}
            >

              <div
                style={{
                  width: "100%",
                  height: "12px",
                  background: "#334155",
                  borderRadius: "10px"
                }}
              >

                <div
                  style={{
                    width: `${selectedStudent.portfolioScore || 0}%`,
                    height: "100%",
                    background: "#22c55e",
                    borderRadius: "10px"
                  }}
                />

              </div>

            </div>

            <button
              onClick={() =>
                setSelectedStudent(null)
              }
              style={{
                marginTop: "20px",
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Close
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Students;