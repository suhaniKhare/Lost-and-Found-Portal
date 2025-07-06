import { Col, Container, Row } from "react-bootstrap";
import ItemCard from "./ItemCard";

function ItemList({ items }) {
  return (
    <Container className="mt-4">
      <Row>
        {items.map((item) => (
          <Col key={item._id} xs={12} sm={6} md={4} className="mb-4">
            <ItemCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ItemList;