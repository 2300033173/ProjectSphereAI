import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Leaderboard() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    fetch("http://localhost:9094/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });

  }, []);

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
            fontSize: "40px",
            marginBottom: "20px"
          }}
        >
          🏆 Student Leaderboard
        </h1>

        <div
          style={{
            background: "#1e293b",
            borderRadius: "15px",
            padding: "20px"
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "white"
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#2563eb"
                }}
              >
                <th style={{ padding: "15px" }}>Rank</th>
                <th style={{ padding: "15px" }}>Student</th>
                <th style={{ padding: "15px" }}>Email</th>
                <th style={{ padding: "15px" }}>Department</th>
              </tr>
            </thead>

            <tbody>

              {students.length > 0 ? (

                students.map((student, index) => (

                  <tr
                    key={student.id}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #334155"
                    }}
                  >
                    <td style={{ padding: "15px" }}>
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : index + 1}
                    </td>

                    <td>{student.name}</td>

                    <td>{student.email}</td>

                    <td>{student.department}</td>
                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="4">
                    No Students Registered
                  </td>
                </tr>

              )}

            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default Leaderboard;