import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage("Signup successful");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div className="vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <Container fluid className="my-auto h-100">
        <Row className="g-0 h-100">
          {/* Left Pattern */}
          <Col lg={6} className="d-none d-lg-block position-relative">
            <div
              style={{
                backgroundColor: "#e9ecef",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <AuthImagePattern
                title="Join the community!"
                subtitle="Create your account to help and be helped."
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, rgba(179,148,216,0.1) 0%, rgba(116,143,220,0.2) 100%)",
                  zIndex: 1,
                }}
              />
            </div>
          </Col>

          {/* Signup Form */}
          <Col
            xs={12}
            lg={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Card
              className="p-4 p-lg-5 border-0 shadow-sm w-100"
              style={{
                maxWidth: "500px",
                backgroundColor: "white",
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="text-center mb-4">
                <div
                  className="mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    backgroundColor: "#f0f5ff",
                    borderRadius: "50%",
                    boxShadow: "0 4px 12px rgba(116,143,220,0.15)",
                  }}
                >
                  <i
                    className="bi bi-person-plus-fill fs-3"
                    style={{ color: "#4f5b8c" }}
                  ></i>
                </div>
                <h3 className="fw-semibold mb-2" style={{ color: "#3a3252" }}>
                  Sign Up
                </h3>
                <p className="mb-4" style={{ color: "#7ca4dc" }}>
                  Create a new account
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group className="mb-4" controlId="name">
                  <Form.Label style={{ color: "#4f5b8c" }}>Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        backgroundColor: "#f0f5ff",
                        borderColor: "#d5e0ff",
                        color: "#4f5b8c",
                      }}
                    >
                      <i className="bi bi-person-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#d5e0ff",
                        color: "#3a3252",
                        borderLeft: "none",
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label style={{ color: "#4f5b8c" }}>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        backgroundColor: "#f0f5ff",
                        borderColor: "#d5e0ff",
                        color: "#4f5b8c",
                      }}
                    >
                      <i className="bi bi-envelope-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#d5e0ff",
                        color: "#3a3252",
                        borderLeft: "none",
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label style={{ color: "#4f5b8c" }}>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        backgroundColor: "#f0f5ff",
                        borderColor: "#d5e0ff",
                        color: "#4f5b8c",
                      }}
                    >
                      <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#d5e0ff",
                        color: "#3a3252",
                        borderLeft: "none",
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                {/* Submit Button with your custom styling */}
                <Button
                  type="submit"
                  className="login-button w-100 py-3 rounded-pill"
                  style={{
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  Sign Up
                </Button>

                {/* Feedback with custom alert styling */}
                {message && (
                  <Alert
                    variant={message.includes("success") ? "success" : "danger"}
                    className="alert-custom mt-3 text-center border-0"
                    style={{
                      backgroundColor: message.includes("success")
                        ? "#d4edda"
                        : "#f8d7da",
                      color: message.includes("success")
                        ? "#155724"
                        : "#721c24",
                    }}
                  >
                    {message}
                  </Alert>
                )}

                {/* Already have account */}
                <p
                  className="text-center mt-4 mb-0"
                  style={{ color: "#7ca4dc" }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-decoration-none"
                    style={{ color: "#4f5b8c" }}
                  >
                    Login
                  </Link>
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Add your CSS styles */}
      <style jsx>{`
        .login-button {
          background: linear-gradient(135deg, #7ca4dc 0%, #b194d8 100%);
          border: none;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          color: white;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(124, 164, 220, 0.4);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .alert-custom {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default Signup;
