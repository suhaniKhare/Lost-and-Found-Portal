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
import "../pages/loginPage.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container fluid className="h-100">
        <Row className="g-0 h-100">
          {/* Left Pattern */}
          <Col lg={6} className="d-none d-lg-block pattern-column">
            <AuthImagePattern
              title="Welcome back!"
              subtitle="Reuniting people with their lost items from 2025"
            />
          </Col>

          {/* Login Form */}
          <Col
            xs={12}
            lg={6}
            className="d-flex align-items-center justify-content-center form-column"
          >
            <Card className="login-card">
              <div className="text-center mb-4">
                <div className="app-icon mb-3">
                  <i className="bi bi-search-heart-fill"></i>
                </div>
                <h3 className="fw-bold mb-1">FindMy</h3>
                <p className="text-muted mb-4">Login to continue</p>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label className="fw-medium">Email Address</Form.Label>
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text>
                      <i className="bi bi-envelope-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control-custom"
                    />
                  </InputGroup>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4" controlId="password">
                  <div className="d-flex justify-content-between">
                    <Form.Label className="fw-medium">Password</Form.Label>
                  </div>
                  <InputGroup className="input-group-custom">
                    <InputGroup.Text>
                      <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-control-custom"
                    />
                  </InputGroup>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-3 login-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                {/* Error Alert */}
                {message && (
                  <Alert variant="danger" className="mt-3 alert-custom">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {message}
                  </Alert>
                )}

                {/* Signup Link */}
                <p className="text-center mt-3 text-muted">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Sign up
                  </Link>
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
