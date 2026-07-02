import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";

function Portfolio() {
const studentId =
  Number(localStorage.getItem("studentId"));
  const role = localStorage.getItem("role") || "STUDENT";

  const [portfolios, setPortfolios] = useState([]);

  const [portfolio, setPortfolio] = useState({
    studentId: localStorage.getItem("studentId") || "",
    studentName: localStorage.getItem("studentName") || "",
    skills: "",
    github: "",
    linkedin: "",
    portfolioUrl: "",
    resume: "",
    portfolioFile: "",
    screenshot: "",
    portfolioScore: 0
});
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const result = await axios.get(
  "https://projectsphereai-backend.onrender.com/portfolio"
);
      setPortfolios(result.data);

    } catch (error) {
      console.error(error);
    }
  };

  const addPortfolio = async () => {

    try {
let score = 0;

if (portfolio.skills) score += 20;
if (portfolio.github) score += 20;
if (portfolio.linkedin) score += 20;
if (portfolio.portfolioUrl) score += 20;
if (portfolio.resume) score += 10;
if (portfolio.screenshot) score += 10;

const updatedPortfolio = {
  ...portfolio,
  portfolioScore: score
};

await axios.post(
  "https://projectsphereai-backend.onrender.com/portfolio",
  updatedPortfolio
);
      alert("Portfolio Saved Successfully");

      loadPortfolio();

    setPortfolio({
    studentId: localStorage.getItem("studentId") || "",
    studentName: localStorage.getItem("studentName") || "",
    skills: "",
    github: "",
    linkedin: "",
    portfolioUrl: "",
    resume: "",
    portfolioFile: "",
    screenshot: "",
    portfolioScore: 0
});
    } catch (error) {

      console.error(error);
      alert("Failed to Save Portfolio");
    }
  };

const filteredPortfolios =
  role === "ADMIN"
    ? portfolios.filter((p) =>
        p.studentName
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    : portfolios.filter(
        (p) => p.studentId === studentId
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
            marginBottom: "20px"
          }}
        >
          {
            role === "ADMIN"
              ? "💼 Student Portfolio Reviews"
              : "💼 My Portfolio"
          }
        </h1>

        {role === "STUDENT" && (

          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "12px",
              marginBottom: "30px"
            }}
          >

            <input
              placeholder="Skills"
              value={portfolio.skills}
              onChange={(e) =>
                setPortfolio({
                  ...portfolio,
                  skills: e.target.value
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="GitHub URL"
              value={portfolio.github}
              onChange={(e) =>
                setPortfolio({
                  ...portfolio,
                  github: e.target.value
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="LinkedIn URL"
              value={portfolio.linkedin}
              onChange={(e) =>
                setPortfolio({
                  ...portfolio,
                  linkedin: e.target.value
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Portfolio Website URL"
              value={portfolio.portfolioUrl}
              onChange={(e) =>
                setPortfolio({
                  ...portfolio,
                  portfolioUrl: e.target.value
                })
              }
              style={inputStyle}
            />

            <label style={{ color: "white" }}>
              Upload Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setPortfolio({
                  ...portfolio,
                  resume:
                    e.target.files[0]?.name || ""
                })
              }
              style={inputStyle}
            />

            <label style={{ color: "white" }}>
              Upload Portfolio ZIP
            </label>

            <input
              type="file"
              accept=".zip,.rar"
              onChange={(e) =>
                setPortfolio({
                  ...portfolio,
                  portfolioFile:
                    e.target.files[0]?.name || ""
                })
              }
              style={inputStyle}
            />

            <label style={{ color: "white" }}>
              Upload Portfolio Screenshot
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file = e.target.files[0];

                if (file) {

                  setPortfolio({
                    ...portfolio,
                    screenshot:
                      URL.createObjectURL(file)
                  });
                }
              }}
              style={inputStyle}
            />

            

            <button
              onClick={addPortfolio}
              style={buttonStyle}
            >
              Save Portfolio
            </button>

          </div>

        )}

        {role === "ADMIN" && (

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={inputStyle}
          />

        )}

        <h2
          style={{
            color: "#60a5fa"
          }}
        >
          {
            role === "ADMIN"
              ? "All Student Portfolios"
              : "My Portfolio Records"
          }
        </h2>

        {filteredPortfolios.length > 0 ? (

          filteredPortfolios.map((p) => (

            <div
              key={p.id}
              style={{
                background: "#1e293b",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px",
                border: "1px solid #334155"
              }}
            >

              {p.screenshot && (
                <img
                  src={p.screenshot}
                  alt="Portfolio"
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px"
                  }}
                />
              )}

              <h3>
                👤 {p.studentName}
              </h3>

              <p>🛠 Skills: {p.skills}</p>

              <p>
  ⭐ Portfolio Score:

  <span
    style={{
      color:
        p.portfolioScore >= 90
          ? "#22c55e"
          : p.portfolioScore >= 70
          ? "#3b82f6"
          : p.portfolioScore >= 50
          ? "#f59e0b"
          : "#ef4444",
      fontWeight: "bold"
    }}
  >
    {" "}
    {p.portfolioScore}/100
  </span>

</p>

              <p>
                💻 GitHub:
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#60a5fa",
                    marginLeft: "10px"
                  }}
                >
                  Open GitHub
                </a>
              </p>

              <p>
                🔗 LinkedIn:
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#60a5fa",
                    marginLeft: "10px"
                  }}
                >
                  Open LinkedIn
                </a>
              </p>

              <p>
                🌐 Portfolio:
                <a
                  href={p.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#60a5fa",
                    marginLeft: "10px"
                  }}
                >
                  Open Portfolio
                </a>
              </p>
<p>📄 Resume: {p.resume || "Not Uploaded"}</p>

<p>📦 Portfolio File: {p.portfolioFile || "Not Uploaded"}</p>

            </div>

          ))

        ) : (

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            No Portfolio Records Found
          </div>

        )}

      </div>
    </div>
  );
}

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
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Portfolio;