import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../components/ItemForm.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ItemForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const MAX_FILE_SIZE = 100 * 1024 * 1024;

  const handleImageChange = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert("Image size should be less than 100MB");
      e.target.value = null;
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        // "http://localhost:3000/api/v1/items/postItem",
        API_BASE_URL ,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );
      console.log(response);
      if (response.status === 201) {
        alert("Item posted successfully");
        setFormData({
          title: "",
          description: "",
          type: "",
        });
        setImage(null);
        setMessage("Item poster Successfully");
      } else {
        alert("Failed to post item");
      }
    } catch (error) {
      console.error("Error posting item:", error);
      alert("Failed to post item");
    }
  };

  return (
    <div className="post-item-container">
      <Card className="post-item-card">
        <Card.Header className="post-item-header">
          <h2>Post New Item</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data" className="post-item-form">
            
            <Form.Group className="mb-4 form-group-custom">
              <Form.Label className="form-label-custom">Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input-custom"
                placeholder="Enter item title"
              />
            </Form.Group>

            <Form.Group className="mb-4 form-group-custom">
              <Form.Label className="form-label-custom">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-input-custom"
                placeholder="Describe the item in detail"
              />
            </Form.Group>

            <Form.Group className="mb-4 form-group-custom">
              <Form.Label className="form-label-custom">Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="form-select-custom"
              >
                <option value="">Select item type</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4 form-group-custom">
              <Form.Label className="form-label-custom">Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                required
                className="form-file-custom"
                accept="image/*"
              />
              <Form.Text className="text-muted">
                Max file size: 100MB (JPEG,JPG)
              </Form.Text>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit"
                className="submit-button"
              >
                Post Item
              </Button>
            </div>

            {message && (
              <div className="form-message success">
                {message}
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ItemForm;