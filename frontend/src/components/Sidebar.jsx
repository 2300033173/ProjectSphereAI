import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    alert("Logged Out Successfully");

    navigate("/");
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>

        <h2 style={{ marginBottom: "30px" }}>
          🚀 ProjectSphere AI
        </h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <Link
            to="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/profile"
            style={{ color: "white", textDecoration: "none" }}
          >
            👤 Profile
          </Link>

          <Link
            to="/projects"
            style={{ color: "white", textDecoration: "none" }}
          >
            📁 Projects
          </Link>

          <Link
            to="/portfolio"
            style={{ color: "white", textDecoration: "none" }}
          >
            💼 Portfolio
          </Link>

          <Link
            to="/milestones"
            style={{ color: "white", textDecoration: "none" }}
          >
            🎯 Milestones
          </Link>

          <Link
            to="/feedback"
            style={{ color: "white", textDecoration: "none" }}
          >
            ⭐ Feedback
          </Link>

          <Link
            to="/leaderboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            🏆 Leaderboard
          </Link>

          <Link
            to="/ai-analyzer"
            style={{ color: "white", textDecoration: "none" }}
          >
            🤖 AI Analyzer
          </Link>
        </nav>

      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;