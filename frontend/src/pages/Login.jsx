import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "STUDENT"
  });

  useEffect(() => {

   const isLoggedIn =
  localStorage.getItem("isLoggedIn");
    const role =
      localStorage.getItem("role");

    if (isLoggedIn) {

      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

    }

  }, [navigate]);

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

  };

  const handleLogin = async () => {

  try {

    const response = await fetch(
      "http://localhost:9094/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  email: loginData.email,
  password: loginData.password,
  role: loginData.role
})
      }
    );
let data = null;

try {
  data = await response.json();
} catch (e) {
  console.error("Invalid JSON response", e);
}

if (!response.ok || !data) {
  alert("Invalid Email or Password");
  return;
}
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("studentId", data.id);
localStorage.setItem("studentName", data.name);
localStorage.setItem("email", data.email);
localStorage.setItem("role", data.role);

    if (data.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }

  } catch (error) {
    console.error(error);
    alert("Login Failed");
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
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#111827"
          }}
        >
          🚀 ProjectSphere AI
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        />

        <select
          name="role"
          value={loginData.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
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

        <button
          onClick={handleLogin}
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
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          New User?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px"
          }}
        >
          <p>
            Admin Email:
            admin@projectsphere.com
          </p>

          <p>
            Admin Password:
            admin123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;