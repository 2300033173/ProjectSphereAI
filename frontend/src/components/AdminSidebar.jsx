import { Link, useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  const menuItem = (path, icon, text) => (
    <Link
      to={path}
      style={{
        textDecoration: "none",
        color: "white",
        background:
          location.pathname === path
            ? "#2563eb"
            : "transparent",
        padding: "12px 15px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transition: "0.3s"
      }}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  );

  return (
    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        borderRight: "1px solid #374151",
        display: "flex",
        flexDirection: "column"
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        <h2
          style={{
            color: "#60a5fa",
            marginBottom: "5px"
          }}
        >
          🚀 ProjectSphere AI
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "14px"
          }}
        >
          Admin Management Panel
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        {menuItem(
          "/admin-dashboard",
          "📊",
          "Dashboard"
        )}

        {menuItem(
          "/students",
          "👨‍🎓",
          "Students"
        )}

        {menuItem(
          "/projects",
          "📁",
          "Projects"
        )}

        {menuItem(
          "/milestones",
          "🎯",
          "Milestones"
        )}

        {menuItem(
          "/portfolio",
          "💼",
          "Portfolio Reviews"
        )}

        {menuItem(
          "/feedback",
          "📝",
          "Feedback"
        )}

        {menuItem(
          "/leaderboard",
          "🏆",
          "Leaderboard"
        )}

        {menuItem(
          "/ai-analyzer",
          "🤖",
          "AI Reviews"
        )}

      </div>

      <div
        style={{
          marginTop: "auto"
        }}
      >

        <div
          style={{
            background: "#1e293b",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "15px"
          }}
        >
          <h4
            style={{
              margin: 0,
              color: "#60a5fa"
            }}
          >
            Admin Access
          </h4>

          <p
            style={{
              fontSize: "13px",
              color: "#cbd5e1",
              marginTop: "8px"
            }}
          >
            Monitor student progress,
            projects, portfolios,
            milestones and AI evaluations.
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#dc2626",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px"
          }}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default AdminSidebar;