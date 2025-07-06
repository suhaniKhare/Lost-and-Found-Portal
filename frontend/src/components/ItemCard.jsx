import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../components/ItemCard.css";

function ItemCard({ item }) {
  const { _id, title, description, imageUrl, type, createdAt } = item;

  return (
    <div className="d-flex justify-content-center p-3">
      <Link
        to={`/item/${_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card
          style={{
            width: "350px",
            backgroundColor: "#fff",
            color: "#4f5b8c",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(79, 91, 140, 0.1)",
            overflow: "hidden",
            transition: "all 0.3s ease",
            border: "none",
          }}
          className="item-card"
        >
          <Card.Img
            variant="top"
            src={imageUrl}
            style={{
              height: "220px",
              objectFit: "cover",
              borderBottom: "1px solid #f0f0f0",
            }}
          />
          <Card.Body style={{ padding: "1.25rem" }}>
            <Card.Title
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.75rem",
                color: "#3a3252",
                fontWeight: "600",
              }}
            >
              {title}
            </Card.Title>

            <Card.Text
              style={{
                marginBottom: "0.75rem",
                color: "#6c757d",
                fontSize: "0.9rem",
              }}
            >
              {description}
            </Card.Text>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <span
                style={{
                  backgroundColor: "#f0f5ff",
                  color: "#4f5b8c",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                }}
              >
                {type}
              </span>
              <span
                style={{
                  color: "#7ca4dc",
                  fontSize: "0.85rem",
                }}
              >
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default ItemCard;
