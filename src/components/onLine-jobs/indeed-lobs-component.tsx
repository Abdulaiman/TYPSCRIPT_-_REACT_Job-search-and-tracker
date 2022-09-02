import { useState } from "react";
import JobCard from "../job-card/job-card-component";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import SideBar from "../sidebar/sidebar-component";
import DOMAIN from "../../utils/proxy";

interface Istate {
  cards: {
    companyName: String;
    jobTitle: String;
    anchorTag: String;
    postDate: String;
    location: String;
    description: String;
  }[];
}

const IndeedJobs: React.FC = (): JSX.Element => {
  const [jobs, setJobs] = useState<Istate["cards"]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `${DOMAIN.URL}/api/v1/get-jobs-indeed/react`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setJobs(data.data.myData);
    };
    fetchData();
  }, [token]);

  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <SideBar />
        </Col>
        <Col sm={9}>
          {!jobs[0] ? (
            <Spinner
              animation="border"
              style={{ marginTop: "30rem", marginLeft: "30rem" }}
            />
          ) : (
            <JobCard
              cards={jobs}
              url={"/api/v1/get-jobs-indeed"}
              setJobs={setJobs}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default IndeedJobs;
