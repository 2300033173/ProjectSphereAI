function StatCard({ title, value, icon }) {
  return (
    <div
      style={{
        background: "#1e293b",
        color: "white",
        padding: "25px",
        borderRadius: "16px",
        minWidth: "220px",
        flex: "1",
        border: "1px solid #334155",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        transition: "0.3s"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            color: "#cbd5e1"
          }}
        >
          {title}
        </h3>

        <span
          style={{
            fontSize: "28px"
          }}
        >
          {icon}
        </span>
      </div>

      <h1
        style={{
          marginTop: "20px",
          color: "#60a5fa",
          fontSize: "38px",
          fontWeight: "bold"
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;