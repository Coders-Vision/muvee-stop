import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/NotFound.css"
function NotFoundPage() {
  return (
    <div className="not-found">
      <Container fluid>
        <Row className="text-center">
          <Col className="text-center">
            <h1 className="display-1">Oops!, 404!</h1>
            <p>The Page your looking for could not be found.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NotFoundPage;
