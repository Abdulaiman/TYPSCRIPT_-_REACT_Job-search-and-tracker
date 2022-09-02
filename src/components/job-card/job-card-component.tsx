import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { FaHeart, FaLocationArrow, FaBox, FaClock } from "react-icons/fa";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import { useState } from "react";
import "./job-card-styles.css";
interface Iprops {
  cards: {
    companyName: String;
    jobTitle: String;
    anchorTag: String;
    postDate: String;
    location: String;
    description: String;
  }[];
  url: String;
  setJobs: React.Dispatch<
    React.SetStateAction<
      {
        companyName: String;
        jobTitle: String;
        anchorTag: String;
        postDate: String;
        location: String;
        description: String;
      }[]
    >
  >;
}

const JobCard: React.FC<Iprops> = ({ cards, url, setJobs }) => {
  const [search, setSearch] = useState<String>("react");

  const onSearchJob = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setJobs([]);
    const token = localStorage.getItem("token");

    const data = await axios.get(`${DOMAIN.URL}${url}/${search}`, {
      headers: { authorization: `Bearer ${token}` },
    });

    setJobs(data.data.myData);
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="input-container">
        <input
          type={"text"}
          placeholder={"search jobs"}
          className="search-input"
          onChange={onChangeInput}
        />
        <Button className="search-btn" onClick={onSearchJob}>
          search
        </Button>
      </div>
      <Container className="parent-container">
        <div className={"cards-container"}>
          {cards?.map((card, i) => {
            return (
              <Card className="card-container" key={`${i}`}>
                <Card.Title className={"job-title"}>
                  <a
                    target={"_blank"}
                    rel={"noreferrer"}
                    href={`${card?.anchorTag}`}
                  >
                    <FaHeart /> {card?.jobTitle}
                  </a>
                </Card.Title>
                <div className="job-info">
                  <Card.Title className={"company-info"}>
                    <FaLocationArrow /> {card?.location}
                  </Card.Title>
                  <Card.Title className={"company-info"}>
                    <FaBox /> {card?.companyName}
                  </Card.Title>
                </div>
                <Card.Title className={"company-info post-date"}>
                  <FaClock /> {card?.postDate}
                </Card.Title>
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Text>description</Form.Text>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        defaultValue={`${card?.description}`}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default JobCard;
