
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './DeleteBtn.css'; // Create this CSS file

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function DeleteBtn({ itemId }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_BASE_URL}/deleteItem/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if(response.status === 200) {
        handleClose();
        alert("Item deleted successfully");
        navigate('/dashboard');
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <>
      <button className="delete-btn" onClick={handleShow}>
        <i className="bi bi-trash"></i> Delete
      </button>

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="delete-modal"
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <i className="bi bi-exclamation-triangle-fill warning-icon"></i>
          <p>Are you sure you want to delete this item?</p>
          <p className="warning-text">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="confirm-delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteBtn;