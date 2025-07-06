// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchSingleItem } from "../api/ItemApi";

// const EditItemPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     type: "",
//   });
//   const [image, setImage] = useState(null);
//   const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

//   // Fetch item data on mount
//   useEffect(() => {
//     const loadItem = async () => {
//       try {
//         const data = await fetchSingleItem(id);
//         setItem(data);
//         setFormData({
//           title: data.title,
//           description: data.description,
//           type: data.type,
//         });
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load item");
//         setLoading(false);
//       }
//     };
//     loadItem();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size > MAX_FILE_SIZE) {
//       alert("Image size should be less than 100MB");
//       return;
//     }
//     setImage(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const form = new FormData();
//     form.append("title", formData.title);
//     form.append("description", formData.description);
//     form.append("type", formData.type);
//     if (image) form.append("image", image);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `http://localhost:3000/api/v1/items/updateItem/${id}`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
            
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Item updated successfully!");
//         navigate('/dashboard'); // Redirect to item details
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       setError(err.response?.data?.msg || "Failed to update item");
//     }
//   };

//   if (loading) return <Spinner animation="border" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (!item) return <div>Item not found</div>;

//   return (
//     <Card
//       border="secondary"
//       style={{ width: "50rem" }}
//       className="mx-auto mt-4"
//     >
//       <Card.Header>Edit Item</Card.Header>
//       <Card.Body>
//         <Form onSubmit={handleSubmit} encType="multipart/form-data">
//           <Form.Group className="mb-3">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Type</Form.Label>
//             <Form.Select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               required
//             >
//               <option value="lost">Lost</option>
//               <option value="found">Found</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Current Image</Form.Label>
//             <div>
//               <img
//                 src={item.imageUrl}
//                 alt="Current item"
//                 style={{ maxWidth: "200px", maxHeight: "200px" }}
//               />
//             </div>
//             <Form.Label className="mt-2">New Image (Optional)</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Update Item
//           </Button>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default EditItemPage;


import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleItem } from "../api/ItemApi";
import "../components/ItemForm.css";

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
  });
  const [image, setImage] = useState(null);
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

  // Fetch item data on mount
  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchSingleItem(id);
        setItem(data);
        setFormData({
          title: data.title,
          description: data.description,
          type: data.type,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load item");
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert("Image size should be less than 100MB");
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("type", formData.type);
    if (image) form.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/v1/items/updateItem/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Item updated successfully!");
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.msg || "Failed to update item");
    }
  };

  if (loading) return (
    <div className="post-item-container">
      <Spinner animation="border" variant="primary" className="m-auto" />
    </div>
  );
  
  if (error) return (
    <div className="post-item-container">
      <Alert variant="danger" className="w-100 max-w-700">{error}</Alert>
    </div>
  );
  
  if (!item) return (
    <div className="post-item-container">
      <Alert variant="warning" className="w-100 max-w-700">Item not found</Alert>
    </div>
  );

  return (
    <div className="post-item-container">
      <Card className="post-item-card">
        <Card.Header className="post-item-header">
          <h2>Edit Item</h2>
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
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4 form-group-custom">
              <Form.Label className="form-label-custom">Current Image</Form.Label>
              <div className="mb-3">
                <img
                  src={item.imageUrl}
                  alt="Current item"
                  className="img-thumbnail"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
              <Form.Label className="form-label-custom">New Image (Optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-file-custom"
              />
              <Form.Text className="text-muted">
                Max file size: 100MB (JPEG, PNG)
              </Form.Text>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit"
                className="submit-button"
              >
                Update Item
              </Button>
            </div>

            {error && (
              <div className="form-message error">
                {error}
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditItemPage;
