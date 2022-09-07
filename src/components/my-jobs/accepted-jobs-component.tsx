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

const AcceptedJobs: React.FC = (): JSX.Element => {
  const [jobs, setJobs] = useState<Istate["cards"]>([]);
  const myJob: Boolean = true;
  const jobText: String = "Accepted Jobs";
  const additionalQuery: String = "/get-accepted-jobs";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `${DOMAIN.URL}/api/v1/save-job/get-accepted-jobs`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setJobs(data.data.jobs);
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
              style={{ marginTop: "22rem", marginLeft: "22rem" }}
            />
          ) : (
            <JobCard
              cards={jobs}
              setJobs={setJobs}
              myJob={myJob}
              jobText={jobText}
              additionalQuery={additionalQuery}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default AcceptedJobs;
