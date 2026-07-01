import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role") || "STUDENT";

  const userName =
  localStorage.getItem("studentName") ||
  localStorage.getItem("adminName") ||
  "User";

const profileImage =
  localStorage.getItem("profileImage") ||
  localStorage.getItem("adminProfileImage") ||
  "";

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "15px 25px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >

      <h2
        style={{
          margin: 0,
          color: "#111827"
        }}
      >
        🚀 ProjectSphere AI
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >

        {profileImage ? (

          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #2563eb"
            }}
          />

        ) : (

          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#2563eb",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              fontWeight: "bold"
            }}
          >
            👤
          </div>

        )}

        <div>

          <div
            style={{
              fontWeight: "600",
              color: "#111827"
            }}
          >
            {userName}
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#6b7280"
            }}
          >
            {role}
          </div>

        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;

