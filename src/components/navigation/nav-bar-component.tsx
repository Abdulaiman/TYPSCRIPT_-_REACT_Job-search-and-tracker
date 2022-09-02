import { Navbar as NavbarBs, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import { FaUserAltSlash, FaHome } from "react-icons/fa";

const Navbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const onLogOutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };
  return (
    <NavbarBs
      className="shadow-sm"
      fixed={"top"}
      style={{ backgroundColor: "#BE93D4", color: "red" }}
    >
      <Container>
        <Nav className={"me-auto"}>
          <Nav.Link
            to={"/"}
            as={NavLink}
            style={{ color: "#FFFAFA", fontSize: "2rem" }}
          >
            <FaHome />
          </Nav.Link>
        </Nav>

        <NavLink
          style={{
            textDecoration: "none",
            color: "#FFFAFA",
            fontSize: "1.5rem",
          }}
          to={"/login"}
          onClick={onLogOutHandler}
        >
          LOGOUT {<FaUserAltSlash />}
        </NavLink>
      </Container>
    </NavbarBs>
  );
};
export default Navbar;
