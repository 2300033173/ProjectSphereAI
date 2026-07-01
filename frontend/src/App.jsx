
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Portfolio from "./pages/Portfolio";
import Milestones from "./pages/Milestones";
import Feedback from "./pages/Feedback";
import Leaderboard from "./pages/Leaderboard";
import AIAnalyzer from "./pages/AIAnalyzer";

import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Student Pages */}

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute role="STUDENT">
      <Dashboard />
    </ProtectedRoute>
  }
/>

 <Route
  path="/profile"
  element={
    <ProtectedRoute role={["STUDENT", "ADMIN"]}>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/projects"
  element={
    <ProtectedRoute role={["STUDENT", "ADMIN"]}>
      <Projects />
    </ProtectedRoute>
  }
/>
<Route
  path="/portfolio"
  element={
    <ProtectedRoute role={["STUDENT", "ADMIN"]}>
      <Portfolio />
    </ProtectedRoute>
  }
/>

<Route
  path="/milestones"
  element={
    <ProtectedRoute role={["STUDENT", "ADMIN"]}>
      <Milestones />
    </ProtectedRoute>
  }
/>
<Route
  path="/feedback"
  element={
    <ProtectedRoute role={["STUDENT", "ADMIN"]}>
      <Feedback />
    </ProtectedRoute>
  }
/>
<Route
  path="/leaderboard"
  element={
    <ProtectedRoute role={["STUDENT", "ADMIN"]}>
      <Leaderboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/ai-analyzer"
  element={
    <ProtectedRoute role={["STUDENT", "ADMIN"]}>
      <AIAnalyzer />
    </ProtectedRoute>
  }
/>

        {/* Admin Pages */}

 <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute role="ADMIN">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/students"
  element={
    <ProtectedRoute role="ADMIN">
      <Students />
    </ProtectedRoute>
  }
/>

        {/* 404 */}

        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "32px",
                fontWeight: "bold"
              }}
            >
              404 - Page Not Found
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

