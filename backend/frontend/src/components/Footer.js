import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col className="text-center py-3">Copyright &copy; 3RMZ-SHOP</Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
