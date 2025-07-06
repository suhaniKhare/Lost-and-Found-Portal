import { Col, Container, Row } from "react-bootstrap";
import "../components/AuthImagePattern.css";

const AuthImagePattern = ({ title, subtitle }) => {
  // Enhanced color palette with opacity variations
  const colors = [
    { base: "#c4d9f0", light: "#c4d9f099" }, // Soft pastel sky blue
    { base: "#7ca4dc", light: "#7ca4dc99" }, // Medium periwinkle blue
    { base: "#4f5b8c", light: "#4f5b8c99" }, // Dusty indigo
    { base: "#3a3252", light: "#3a325299" }, // Deep plum purple
    { base: "#b194d8", light: "#b194d899" }, // Soft lavender
    { base: "#d5b8ec", light: "#d5b8ec99" }, // Light orchid lavender
  ];

  return (
    <div
      className="d-flex align-items-center justify-content-center w-100 h-100"
      style={{
        background: "linear-gradient(135deg, #3a3252 0%, #4f5b8c 100%)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.3)",
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `
            radial-gradient(circle at 30% 30%, ${colors[5].light} 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, ${colors[1].light} 0%, transparent 50%)
          `,
          animation: "rotate 60s linear infinite",
          opacity: 0.4,
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor:
              colors[Math.floor(Math.random() * colors.length)].base,
            borderRadius: "50%",
            opacity: 0.3,
            animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <Container
        style={{
          maxWidth: "450px",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          padding: "2rem",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Animated tiles grid */}
        <Row className="mb-5 g-3">
          {[...Array(9)].map((_, i) => {
            const colorIndex = i % colors.length;
            const pulseClass = i % 2 === 0 ? "pulse" : "";
            const rotation = ((i % 3) - 1) * 5; // -5, 0, or 5 degrees
            const tileText = i % 2 === 0 ? "Lost" : "Found";

            return (
              <Col xs={4} key={i}>
                <div
                  className={`rounded-4 tile-square ${pulseClass}`}
                  style={{
                    backgroundColor: `${colors[colorIndex].light}`,
                    boxShadow: `0 4px 20px ${colors[colorIndex].base}80`,
                    border: `1px solid ${colors[colorIndex].base}`,
                    transform: `rotate(${rotation}deg)`,
                    transition: "all 0.5s ease",
                    aspectRatio: "1/1",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.1)`;
                    e.currentTarget.style.boxShadow = `0 8px 25px ${colors[colorIndex].base}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${rotation}deg)`;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${colors[colorIndex].base}80`;
                  }}
                >
                  <span
                    style={{
                      color: colors[colorIndex].base,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                      transform: `rotate(${-rotation}deg)`, // Counter-rotate text
                    }}
                  >
                    {tileText}
                  </span>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Text content */}
        <div
          style={{
            backgroundColor: "rgba(58, 50, 82, 0.7)",
            padding: "2rem",
            borderRadius: "1rem",
            border: "1px solid #4f5b8c",
          }}
        >
          <h2
            className="display-5 fw-bold mb-3"
            style={{
              color: "#d5b8ec",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {title}
          </h2>
          <p
            className="lead"
            style={{
              color: "#c4d9f0",
              opacity: 0.9,
              lineHeight: "1.6",
            }}
          >
            {subtitle}
          </p>

          {/* Decorative icon */}
          <div className="mt-4">
            <div
              style={{
                display: "inline-block",
                padding: "1.5rem",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #b194d844 0%, transparent 70%)",
                animation: "pulse 3s infinite alternate",
              }}
            >
              <i
                className="bi bi-search-heart-fill fs-1"
                style={{
                  color: colors[5].base,
                  textShadow: `0 0 15px ${colors[5].base}`,
                }}
              ></i>
            </div>
          </div>
        </div>
      </Container>

      {/* CSS animations */}
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-50px) translateX(20px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;
