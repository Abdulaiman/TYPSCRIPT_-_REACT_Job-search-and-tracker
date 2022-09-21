import { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { useEffect } from "react";
import SideBar from "../sidebar/sidebar-component";
import DOMAIN from "../../utils/proxy";
import "./profile-styles.css";

interface Iuser {
  name: String;
  email: String;
}

const Profile: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<Iuser>();
  const [show, setShow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [passwordUpdateDetails, setPasswordUpdateDetails] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const token = localStorage.getItem("token");

  const onEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordUpdateDetails({
      ...passwordUpdateDetails,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${DOMAIN.URL}/api/v1/users/me`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setUser(data.data.user);
    };
    fetchData();
  }, [token]);





  const onUpdateProfileHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await axios.patch(
      `${DOMAIN.URL}/api/v1/users/update-me`,
      {
        name: userInfo.name === "" ? undefined : userInfo.name,
        email: userInfo.email === "" ? undefined : userInfo.email,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    setUserInfo({
      name: "",
      email: "",
    });
    setUser(data.data.user);
  };

  const onUPdatePassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${DOMAIN.URL}/api/v1/users/update-password`,
        passwordUpdateDetails,
        { headers: { authorization: `Bearer ${token}` } }
      );
      alert("password updated succesfully");
      setShow(false);
    } catch (err: any) {
      if (
        err?.response?.data?.message.startsWith(
          "Member validation failed: passwordConfirm:"
        )
      )
        alert(
          "password and confirm password are not the same please check and try again"
        );
      if (
        err?.response?.data?.message.startsWith(
          "password, new password and new password confirm must all be present"
        )
      )
        alert("wrong input please check ant try again");

      alert(err?.response?.data?.message);

      console.log(err?.response);
    }
  };
  console.log(passwordUpdateDetails);
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          <SideBar />
        </Col>
        <Col sm={9}>
          <Row className="profile-parent-container">
            <Card className="profile-container">
              <Card.Body style={{ color: "grey" }}>
                <Card.Title className="card-title">PROFILE INFO</Card.Title>
                <Row className="card-row">
                  <Col className="card-col">Name:</Col>
                  <Col className="name-col">{user?.name?.toUpperCase()}</Col>
                </Row>
                <Row className="card-row">
                  <Col className="card-col">EMAIL:</Col>
                  <Col className="name-col">{user?.email}</Col>
                </Row>

                <Row className="update-info">
                  <Col className="card-col">Update User Info:</Col>
                  <Col className="user-info"></Col>
                </Row>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="changeProjectName">
                      Edit Name
                    </Form.Label>
                    <Form.Control
                      placeholder="new name"
                      name="name"
                      id={"changeProjectName"}
                      onChange={onEditChange}
                      value={userInfo.name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="changeProject description">
                      Edit Email
                    </Form.Label>
                    <Form.Control
                      placeholder="new Email"
                      name="email"
                      id={"changeProject description"}
                      onChange={onEditChange}
                      value={userInfo.email}
                    />
                  </Form.Group>
                  <Button
                    type={"submit"}
                    style={{
                      backgroundColor: "#BE93D4",
                      border: "none",
                      marginBottom: "2rem",
                    }}
                    onClick={onUpdateProfileHandler}
                  >
                    UPDATE Profile
                  </Button>
                </Form>
                <Row>
                  <Button onClick={() => setShow(true)}>
                    update your password
                  </Button>
                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>PASSWORD UPDATE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Card
                        style={{
                          color: "darkGrey",
                          marginTop: "5rem",
                          border: "none",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        }}
                      >
                        <Card.Body>
                          <Card.Title
                            style={{ color: "grey", fontSize: "2rem" }}
                          >
                            UPDATE MY PASSWORD
                          </Card.Title>
                          <Form>
                            <fieldset>
                              <Form.Group className="mb-3">
                                <Form.Label htmlFor="passwordInput">
                                  Password
                                </Form.Label>
                                <Form.Control
                                  type={"password"}
                                  id="passwordInput"
                                  placeholder="password"
                                  name="password"
                                  onChange={onUpdatePassword}
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label htmlFor="newPasswordInput">
                                  New Password
                                </Form.Label>
                                <Form.Control
                                  type={"password"}
                                  id="newPasswordInput"
                                  placeholder="new password"
                                  name="newPassword"
                                  onChange={onUpdatePassword}
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label htmlFor="newPasswordConfirm">
                                  New Password Confirm
                                </Form.Label>
                                <Form.Control
                                  type={"password"}
                                  id="newPasswordConfirm"
                                  placeholder="new Password confirm"
                                  name="newPasswordConfirm"
                                  onChange={onUpdatePassword}
                                />
                              </Form.Group>
                            </fieldset>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant={"secondary"}
                        onClick={() => setShow(false)}
                      >
                        close
                      </Button>
                      <Button
                        onClick={onUPdatePassword}
                        type="submit"
                        style={{ backgroundColor: "blue" }}
                      >
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;
