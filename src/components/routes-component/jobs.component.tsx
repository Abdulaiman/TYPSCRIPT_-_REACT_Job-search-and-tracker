import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../sidebar/sidebar-component";

const Jobs = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <SideBar />
        </Col>
        <Col sm={9}> hello from the Jobs page</Col>
      </Row>
    </Container>
  );
};

export default Jobs;
