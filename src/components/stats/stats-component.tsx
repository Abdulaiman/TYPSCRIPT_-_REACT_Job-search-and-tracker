import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useEffect } from "react";
import SideBar from "../sidebar/sidebar-component";
import DOMAIN from "../../utils/proxy";
import PolarChart from "../charts/polar-area-chart-component";
import BarChart from "../charts/bar-chart-component";
import "./stats-styles.css";

const Stats: React.FC = (): JSX.Element => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <SideBar />
        </Col>
        <Col sm={9}>
          <h1 className="stats-text">Jobs Stats</h1>
          <div className="chart-container">
            <div className="chart">
              <BarChart />
            </div>

            {/* <div className="chart">
              <PolarChart />
            </div> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Stats;
