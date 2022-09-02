import { Container, Form, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import DOMAIN from "../../utils/proxy";
import { useNavigate, Link } from "react-router-dom";

const SignUp: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
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

      const data = await axios.post(
        `${DOMAIN.URL}/api/v1/users/Sign-up`,
        input
      );

      localStorage.setItem("token", data.data.token);
      console.log(data);
      navigate("/");
    } catch (err) {
      alert("incorrect email address or password please check and try again");
    }
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
          Sign Up
        </Card.Title>
        <Card.Body>
          <Form style={{ width: "20rem" }}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor={"name"}>name</Form.Label>
              <Form.Control
                id={"name"}
                placeholder={"name"}
                value={input?.name}
                onChange={handleChange}
                name={"name"}
              />
            </Form.Group>
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
            <Form.Group className="mb-3">
              <Form.Label htmlFor={"password"}>confirm password</Form.Label>
              <Form.Control
                id={"confirm password"}
                placeholder={"confirm password"}
                value={input?.passwordConfirm}
                onChange={handleChange}
                type="password"
                name={"passwordConfirm"}
              />
            </Form.Group>
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <Form.Text>
                go back to? <Link to={"/login"}>login</Link>
              </Form.Text>
            </div>
            <Button
              type="submit"
              onClick={onSubmitHandler}
              style={{
                backgroundColor: "#BE93D4",
                cursor: "pointer",
                border: "none",
              }}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
