import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "../components/LogoutBtn.css";

function LogoutBtn() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setShowModal(false);
    navigate("/login");
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowModal(true)}
        className="logout-btn"
        style={{
          backgroundColor: "#4f5b8c",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          padding: "8px 20px",
          fontWeight: "500",
          transition: "all 0.2s ease",
          marginLeft: "8px",
          letterSpacing: "0.3px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        Logout
      </Button>

      <Modal show={showModal} onHide={handleClose} centered backdrop="static">
        <Modal.Body
          style={{
            padding: "24px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "24px",
              color: "#3a3252",
            }}
          >
            <h5 style={{ fontWeight: 600 }}>Ready to leave?</h5>
            <p style={{ marginBottom: 0 }}>Confirm you want to logout</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              style={{
                borderRadius: "6px",
                padding: "8px 20px",
                borderColor: "#dee2e6",
                color: "#6c757d",
                fontWeight: 500,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleLogout}
              style={{
                borderRadius: "6px",
                padding: "8px 20px",
                fontWeight: 500,
                backgroundColor: "#dc3545",
                borderColor: "#dc3545",
              }}
            >
              Logout
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LogoutBtn;
