import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../components/FilterBar.css";

function Filterbar({ filters, onFilterChange }) {
  const handleSelect = (eventKey) => {
    onFilterChange("type", eventKey);
  };

  return (
    <Container fluid className="px-0">
      <Navbar expand="lg" className="py-2 filter-bar-container">
        <Container className="justify-content-center">
          <NavDropdown
            title="Filter Items"
            onSelect={handleSelect}
            id="filter-dropdown"
            className="text-center filter-dropdown-toggle"
          >
            <NavDropdown.Item eventKey="" className="filter-dropdown-item">
              All Items
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="lost" className="filter-dropdown-item">
              Lost Items
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="found" className="filter-dropdown-item">
              Found Items
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Filterbar;
