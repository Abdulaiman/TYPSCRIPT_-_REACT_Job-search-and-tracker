import { Container, Form, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();

      const data = await axios.post(`${DOMAIN.URL}/api/v1/users/login`, input);

      localStorage.setItem("token", data.data.token);

      navigate("/");
    } catch (err) {
      alert("incorrect email address or password please check and try again");
    }
  };
  const onDemo = async () => {
    const data = await axios.post(`${DOMAIN.URL}/api/v1/users/login`, {
      email: "aiman@email.com",
      password: "test1234",
    });

    localStorage.setItem("token", data.data.token);

    navigate("/");
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#BE93D4",
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          borderRadius: "2rem",
        }}
      >
        <Card.Title
          style={{
            textAlign: "center",
            color: "#BE93D4",
            height: "3rem",
            borderBottom: "1px solid grey",
            fontSize: "2rem",
          }}
        >
          Login
        </Card.Title>
        <Card.Body>
          <Form style={{ width: "20rem" }}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor={"emailAddress"}>email adress</Form.Label>
              <Form.Control
                id={"emailAddress"}
                placeholder={"example@example.com"}
                value={input?.email}
                onChange={handleChange}
                name={"email"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor={"password"}>password</Form.Label>
              <Form.Control
                id={"password"}
                placeholder={"password"}
                value={input?.password}
                onChange={handleChange}
                type="password"
                name={"password"}
              />
            </Form.Group>
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <Form.Text>
                don't have an account? <Link to={"/sign-up"}>sign up </Link>
              </Form.Text>
            </div>
            <Button
              type="submit"
              onClick={onSubmitHandler}
              style={{
                backgroundColor: "#BE93D4",
                cursor: "pointer",
                border: "none",
                marginRight: "2rem",
              }}
            >
              Login
            </Button>
            <Button variant="info" onClick={onDemo}>
              Demo Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
