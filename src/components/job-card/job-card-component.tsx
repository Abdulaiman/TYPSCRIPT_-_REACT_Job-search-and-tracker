import { Container, Alert, Button, Card, Form, Modal } from "react-bootstrap";
import {
  FaHeart,
  FaLocationArrow,
  FaBox,
  FaClock,
  FaGem,
  FaCheck,
  FaHourglassStart,
  FaUserCheck,
  FaRegEdit,
} from "react-icons/fa";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import { useState } from "react";
import "./job-card-styles.css";

interface card {
  companyName: String;
  jobTitle: String;
  anchorTag: String;
  postDate: String;
  location: String;
  description: String;
  status?: String;
  _id?: String;
}

interface Iprops {
  cards: {
    companyName: String;
    jobTitle: String;
    anchorTag: String;
    postDate: String;
    location: String;
    description: String;
    status?: String;
  }[];
  myJob?: Boolean;
  url?: String;
  jobText?: String;
  additionalQuery?: String;
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

const JobCard: React.FC<Iprops> = ({
  cards,
  url,
  setJobs,
  myJob,
  jobText,
  additionalQuery,
}) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [search, setSearch] = useState<String>("react");
  const [show, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<String>("");
  const [currentCard, setCurrentCard] = useState<card | undefined>();
  const token = localStorage.getItem("token");

  const onSearchJob = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setJobs([]);

    const data = await axios.get(`${DOMAIN.URL}${url}/${search}`, {
      headers: { authorization: `Bearer ${token}` },
    });

    setJobs(data.data.myData);
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onAddHandlerAddJob = async (
    e: React.MouseEvent<HTMLButtonElement>,
    card: {
      companyName: String;
      jobTitle: String;
      anchorTag: String;
      postDate: String;
      location: String;
      description: String;
      status?: String;
    }
  ) => {
    e.preventDefault();
    const data = await axios.post(`${DOMAIN.URL}/api/v1/save-job`, card, {
      headers: { authorization: `Bearer ${token}` },
    });
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 1500);
  };

  const onHandleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    card: card | undefined
  ) => {
    e.preventDefault();
    await axios.delete(`${DOMAIN.URL}/api/v1/save-job/${card?._id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await axios.get(`${DOMAIN.URL}/api/v1/save-job`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 1500);
    setJobs(data.data.jobs);
    console.log(data);
  };

  const onHandleEdit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    card: card | undefined
  ) => {
    e.preventDefault();
    await axios.patch(
      `${DOMAIN.URL}/api/v1/save-job/${card?._id}`,
      {
        status,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const data = await axios.get(
      `${DOMAIN.URL}/api/v1/save-job${additionalQuery ? additionalQuery : ""}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    setShow(false);
    setJobs(data.data.jobs);
  };

  const openModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    card: card
  ): void => {
    e.preventDefault();
    setCurrentCard(card);
    setShow(true);
  };
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Update Status</Form.Label>
              <Form.Select onChange={(e) => setStatus(e.target.value)}>
                <option>Select</option>
                <option>waiting</option>
                <option>applied</option>
                <option>interview-scheduled</option>
                <option>interviewed</option>
                <option>declined</option>
                <option>accepted</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              onHandleEdit(e, currentCard);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert
        className="alert-box"
        show={openAlert}
        variant={"success"}
        onClose={() => setOpenAlert(false)}
        dismissible
      >
        <Alert.Heading>done</Alert.Heading>
      </Alert>
      {!myJob ? (
        <div className="input-container">
          {" "}
          <h1 className="header"> {url?.toUpperCase().split("-")[2]} JOBS</h1>
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
      ) : (
        <div className={"input-container my-job"}>
          <h1>{jobText}</h1>
        </div>
      )}
      <Container className="parent-container">
        <div className={"cards-container"}>
          {cards?.map((card, i) => {
            let icon: JSX.Element | undefined = undefined;

            if (card?.status === "waiting") {
              icon = <FaHourglassStart />;
            } else if (card?.status === "applied") {
              icon = <FaRegEdit />;
            } else if (card?.status === "interview-scheduled") {
              icon = <FaGem />;
            } else if (card?.status === "interviewed") {
              icon = <FaUserCheck />;
            } else if (card?.status === "accepted") {
              icon = <FaCheck />;
            }

            return (
              <Card className="card-container" key={`${i}`}>
                <Card.Title className={"job-title"}>
                  <a
                    className={"link"}
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

                <div className="job-info lower">
                  <Card.Title className={"company-info"}>
                    <FaClock /> {card?.postDate}
                  </Card.Title>
                  {myJob ? (
                    <Card.Title className={"company-info post-date"}>
                      {icon}
                      {card?.status}
                    </Card.Title>
                  ) : (
                    ""
                  )}
                </div>

                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Text>description</Form.Text>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        defaultValue={`${card?.description
                          .trim()
                          .replace("\n", "")}`}
                      />
                    </Form.Group>
                  </Form>

                  {!myJob ? (
                    <div className="btn-container">
                      <Button
                        onClick={(e) => {
                          onAddHandlerAddJob(e, card);
                        }}
                        className={"add-btn"}
                      >
                        add to jobs
                      </Button>
                    </div>
                  ) : (
                    <div className="btn-container">
                      <Button
                        variant="success"
                        className={"custom"}
                        onClick={(e) => {
                          openModal(e, card);
                        }}
                      >
                        edit
                      </Button>
                      <Button
                        variant="danger"
                        className={"custom"}
                        onClick={(e) => {
                          onHandleDelete(e, card);
                        }}
                      >
                        delete
                      </Button>
                    </div>
                  )}
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
