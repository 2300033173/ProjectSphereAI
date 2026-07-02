import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    
    name: "",
    email: "",
    department: "",
    password: "",
    role: "STUDENT"
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    try {

     const response = await fetch(
    "https://projectsphereai-backend.onrender.com/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(student)
        }
      );

      if (response.ok) {

       const savedStudent = await response.json();

localStorage.setItem(
    "studentId",
    savedStudent.id
);

localStorage.setItem(
    "studentName",
    savedStudent.name
);

localStorage.setItem(
    "email",
    savedStudent.email
);

localStorage.setItem(
    "role",
    savedStudent.role
);
        alert("Registration Successful");

        navigate("/");

      } else {

        alert("Registration Failed");

      }

    } catch (error) {

      console.error(error);
      alert("Server Error");

    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "450px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >
        <h1
          style={{
            color: "#111827",
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "10px"
          }}
        >
          🚀 ProjectSphere AI
        </h1>

        <h3
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#6b7280"
          }}
        >
          Student Registration
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={student.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        />

        <select
          name="role"
          value={student.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        >
          <option value="STUDENT">
            Student
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={student.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Register
        </button>

        <p
          style={{
            marginTop: "15px",
            textAlign: "center"
          }}
        >
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
