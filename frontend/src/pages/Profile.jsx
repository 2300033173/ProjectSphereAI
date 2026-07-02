import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {

const studentId = Number(localStorage.getItem("studentId"));

const [editing, setEditing] = useState(false);

const [profile, setProfile] = useState({
id: studentId,
name: localStorage.getItem("studentName") || "",
email: localStorage.getItem("email") || "",
department: "",
github: "",
linkedin: "",
skills: "",
resume: "",
profileImage: "",


projectsCount: 0,
completedProjects: 0,
portfolioScore: 0,

currentProject: "",
overallProgress: 0,
projectStatus: "Not Started",

profileCompleted: false


});

useEffect(() => {
if (studentId) {
loadProfile();
}
}, [studentId]);

const loadProfile = async () => {
try {


 const response = await axios.get(
  `https://projectsphereai-backend.onrender.com/students/${studentId}`
);

 if (response.data && response.data.id) {
    setProfile(response.data);
}

} catch (error) {
  console.error(error);
}


};

const handleChange = (e) => {
setProfile({
...profile,
[e.target.name]: e.target.value
});
};

const handleImageUpload = (e) => {


const file = e.target.files[0];

if (file) {

  setProfile({
    ...profile,
    profileImage: URL.createObjectURL(file)
  });
}


};

const handleResumeUpload = (e) => {


const file = e.target.files[0];

if (file) {

  setProfile({
    ...profile,
    resume: file.name
  });
}


};

const updateProfile = async () => {


try {

  const updatedProfile = {
  ...profile,
  id: studentId,
  profileCompleted: true
};
if (
    profile.github &&
    !profile.github.startsWith("http")
) {
    alert("Enter a valid GitHub URL");
    return;
}

if (
    profile.linkedin &&
    !profile.linkedin.startsWith("http")
) {
    alert("Enter a valid LinkedIn URL");
    return;
}
 await axios.put(
  `https://projectsphereai-backend.onrender.com/students/${studentId}`,
  updatedProfile
);

  setProfile(updatedProfile);

localStorage.setItem(
  "studentName",
  updatedProfile.name
);

localStorage.setItem(
  "email",
  updatedProfile.email
);

localStorage.setItem(
  "profileImage",
  updatedProfile.profileImage || ""
);

  alert("Profile Saved Successfully");

  setEditing(false);

} catch (error) {

  console.error(error);

  alert("Profile Update Failed");
}


};

const readOnly =
profile.profileCompleted && !editing;

return (
<div
style={{
display: "flex",
background: "#0f172a",
minHeight: "100vh"
}}
> <Sidebar />


  <div
    style={{
      flex: 1,
      padding: "30px"
    }}
  >
    <Navbar />

    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        background: "#1e293b",
        borderRadius: "20px",
        padding: "30px",
        color: "white"
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >

        <img
          src={
            profile.profileImage ||
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

          }
          alt="Profile"
          width="150"
          height="150"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #3b82f6"
          }}
        />

        <h1
          style={{
            color: "#60a5fa",
            marginTop: "15px"
          }}
        >
          {profile.name || "Student Profile"}
        </h1>

        <p>{profile.department}</p>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: "15px",
          marginBottom: "30px"
        }}
      >

        <div style={statCard}>
          <h2>{profile.projectsCount}</h2>
          <p>Total Projects</p>
        </div>

        <div style={statCard}>
          <h2>{profile.completedProjects}</h2>
          <p>Completed Projects</p>
        </div>

        <div style={statCard}>
          <h2
  style={{
    color:
      profile.portfolioScore >= 80
        ? "#22c55e"
        : profile.portfolioScore >= 50
        ? "#f59e0b"
        : "#ef4444"
  }}
>
  {profile.portfolioScore}
</h2>
          <p>Portfolio Score</p>
        </div>

        <div style={statCard}>
          <h2>{profile.overallProgress}%</h2>
          <p>Overall Progress</p>
        </div>
        </div>
<h3
  style={{
    color: "#60a5fa",
    marginTop: "20px"
  }}
>
  Profile Completion
</h3>

<div
  style={{
    width: "100%",
    height: "12px",
    background: "#334155",
    borderRadius: "10px",
    marginBottom: "25px"
  }}
>
  <div
    style={{
      width: profile.profileCompleted
        ? "100%"
        : "60%",
      height: "100%",
      background: "#22c55e",
      borderRadius: "10px"
    }}
  />
</div>
      </div>

      <h2
        style={{
          color: "#60a5fa",
          marginBottom: "20px"
        }}
      >
        Profile Information
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={profile.name || ""}
        onChange={handleChange}
        disabled={readOnly}
        style={inputStyle}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={profile.email || ""}
        onChange={handleChange}
        disabled={readOnly}
        style={inputStyle}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={profile.department || ""}
        onChange={handleChange}
        disabled={readOnly}
        style={inputStyle}
      />

      <textarea
        rows="4"
        name="skills"
        placeholder="Skills"
        value={profile.skills || ""}
        onChange={handleChange}
        disabled={readOnly}
        style={textareaStyle}
      />

      <input
        type="text"
        name="github"
        placeholder="GitHub URL"
        value={profile.github || ""}
        onChange={handleChange}
        disabled={readOnly}
        style={inputStyle}
      />
      {profile.github && (
    <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#60a5fa" }}
    >
        🔗 Open GitHub
    </a>
)}

      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={profile.linkedin || ""}
        onChange={handleChange}
        disabled={readOnly}
        style={inputStyle}
      />
{profile.linkedin && (
    <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#60a5fa" }}
    >
        🔗 Open LinkedIn
    </a>
)}
      <input
        type="text"
        name="currentProject"
        placeholder="Current Project"
        value={profile.currentProject || ""}
        onChange={handleChange}
        disabled={readOnly}
        style={inputStyle}
      />

      <select
        name="projectStatus"
        value={profile.projectStatus || ""}
        onChange={handleChange}
        disabled={readOnly}
        style={inputStyle}
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
  type="number"
  name="overallProgress"
  min="0"
  max="100"
  placeholder="Overall Progress"
  value={profile.overallProgress || 0}
  onChange={handleChange}
  disabled={readOnly}
  style={inputStyle}
/>

      {!readOnly && (
        <>
          <label style={labelStyle}>
            Upload Profile Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={inputStyle}
          />

          <label style={labelStyle}>
            Upload Resume
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            style={inputStyle}
          />
        </>
      )}

     {profile.resume && (
  <div style={{ color: "#93c5fd", marginTop: "15px" }}>
    Resume:
    {" "}
    <a
      href={profile.resume}
      download
      style={{ color: "#60a5fa" }}
    >
      Download Resume
    </a>
  </div>
)}

      {!profile.profileCompleted || editing ? (

        <button
          onClick={updateProfile}
          style={saveButton}
        >
          Save Profile
        </button>

      ) : (

        <button
          onClick={() =>
            setEditing(true)
          }
          style={editButton}
        >
          Edit Profile
        </button>

      )}

    </div>
  </div>
);
}

const statCard = {
background: "#334155",
padding: "20px",
borderRadius: "12px",
textAlign: "center"
};

const labelStyle = {
color: "#93c5fd",
display: "block",
marginTop: "15px",
marginBottom: "10px"
};

const inputStyle = {
width: "100%",
padding: "12px",
marginBottom: "15px",
borderRadius: "8px",
border: "1px solid #475569",
background: "#334155",
color: "white"
};

const textareaStyle = {
width: "100%",
padding: "12px",
marginBottom: "15px",
borderRadius: "8px",
border: "1px solid #475569",
background: "#334155",
color: "white"
};

const saveButton = {
width: "100%",
marginTop: "20px",
padding: "14px",
background: "#2563eb",
border: "none",
borderRadius: "10px",
color: "white",
fontSize: "16px",
fontWeight: "bold",
cursor: "pointer"
};

const editButton = {
width: "100%",
marginTop: "20px",
padding: "14px",
background: "#f59e0b",
border: "none",
borderRadius: "10px",
color: "white",
fontSize: "16px",
fontWeight: "bold",
cursor: "pointer"
};

export default Profile;
