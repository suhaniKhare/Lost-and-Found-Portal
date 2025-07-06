import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../components/DashbrdNavbar.css";
import LogoutBtn from "./LogoutBtn";

function DashNavbar({ onSearch }) {
  const [searchItem, setSearchItem] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchItem);
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#3a3252",
        padding: "0.75rem 0",
        borderBottom: "1px solid #4f5b8c",
        boxShadow: "0 2px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center">
          <Navbar.Brand
            href="#"
            style={{
              color: "#d5b8ec",
              fontWeight: "700",
              fontSize: "1.5rem",
              marginRight: "2rem",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i
              className="bi bi-search-heart-fill me-2"
              style={{ color: "#b194d8", fontSize: "1.8rem" }}
            ></i>
            Lost&Found
          </Navbar.Brand>

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search items..."
              className="me-2"
              aria-label="Search"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              style={{
                minWidth: "250px",
                borderRadius: "8px",
                border: "1px solid #4f5b8c",
                padding: "0.5rem 1rem",
                backgroundColor: "#4f5b8c",
                color: "#ffffff",
              }}
            />
            <Button
              variant="primary"
              type="submit"
              style={{
                background: "linear-gradient(135deg, #7ca4dc 0%, #b194d8 100%)",
                border: "none",
                borderRadius: "8px",
                padding: "0.5rem 1.25rem",
                fontWeight: "500",
              }}
            >
              Search
            </Button>
          </Form>
        </div>

        <div className="d-flex align-items-center">
          <Nav className="me-4">
            <Nav.Link
              href="/myListings"
              style={{
                color: "#c4d9f0",
                marginRight: "1.5rem",
                fontWeight: "500",
                fontSize: "0.95rem",
              }}
              className="nav-link-custom"
            >
              My Listings
            </Nav.Link>
            <Nav.Link
              href="/postItem"
              style={{
                color: "#c4d9f0",
                marginRight: "1.5rem",
                fontWeight: "500",
                fontSize: "0.95rem",
              }}
              className="nav-link-custom"
            >
              Post Item
            </Nav.Link>
          </Nav>
          <LogoutBtn />
        </div>
      </Container>
    </Navbar>
  );
}

export default DashNavbar;


