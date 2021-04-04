import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "./logo.svg";
import tmdb from "./tmdb.svg";
import "../../styles/Footer.css";
function Footer() {
  const getYear = new Date();
  return (
    <footer>
      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>
      <Container fluid>
        <Row className="text-center mt-3 mb-3">
          <Col xs={6} className="mt-5" style={{ color: "#5a606b" }}>
            <div>
              <img className="footer-logo" alt={'brand-logo'} src={Logo} />
            </div>
            <p>© {getYear.getFullYear()} Copyright muvee stop</p>
          </Col>
          <Col xs={6} style={{ color: "#5a606b" }}>
            <div>
              <p>Powered by:</p>
              <img className="tmdb-logo" alt={'tmdb-logo'}  src={tmdb} />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
