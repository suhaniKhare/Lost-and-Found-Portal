import { useNavigate } from "react-router-dom";
import "./EditBtn.css";

function EditBtn({ itemId }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editItem/${itemId}`);
  };

  return (
    <button className="edit-btn" onClick={handleEdit}>
      <i className="bi bi-pencil-square"></i> Edit
    </button>
  );
}

export default EditBtn;
