import { FaGem, FaHeart } from "react-icons/fa";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = (): JSX.Element => {
  return (
    <ProSidebar
      style={{
        paddingTop: "4.5rem",
        marginLeft: "-1rem",
        minHeight: "100vh",
        position: "fixed",
      }}
    >
      <Menu iconShape="square">
        <MenuItem icon={<FaGem />}>
          <Nav.Link
            to={"/"}
            as={NavLink}
            style={{ color: "#FFFAFA", fontSize: "1.2rem" }}
          >
            STATS
          </Nav.Link>
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          <Nav.Link
            to={"/jobs"}
            as={NavLink}
            style={{ color: "#FFFAFA", fontSize: "1.2rem" }}
          >
            JOBS
          </Nav.Link>
        </MenuItem>
        <SubMenu title="search-jobs" icon={<FaHeart />}>
          <MenuItem>
            <Nav.Link
              to={"/indeed-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              indeed-jobs
            </Nav.Link>
          </MenuItem>
          <MenuItem>
            <Nav.Link
              to={"/glassdoor-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              glassdoor-jobs
            </Nav.Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Nav.Link
              to={"/linkedIn-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              linkedIn-jobs
            </Nav.Link>
          </MenuItem>
        </SubMenu>
        <SubMenu title="my-jobs" icon={<FaHeart />}>
          <MenuItem>
            {" "}
            <Nav.Link
              to={"/waiting-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              waiting
            </Nav.Link>
          </MenuItem>
          <MenuItem>
            <Nav.Link
              to={"/applied-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              applied
            </Nav.Link>
          </MenuItem>
          <MenuItem>
            <Nav.Link
              to={"/interview-scheduled-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              interview-scheduled
            </Nav.Link>
          </MenuItem>
          <MenuItem>
            <Nav.Link
              to={"/interviewed-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              interviewed
            </Nav.Link>
          </MenuItem>
          <MenuItem>
            <Nav.Link
              to={"/declined-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              declined
            </Nav.Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Nav.Link
              to={"/accepted-jobs"}
              as={NavLink}
              style={{ color: "#FFFAFA", fontSize: "1rem" }}
            >
              accepted
            </Nav.Link>
          </MenuItem>
        </SubMenu>
        <MenuItem icon={<FaGem />}>
          <Nav.Link
            to={"/profile"}
            as={NavLink}
            style={{ color: "#FFFAFA", fontSize: "1rem" }}
          >
            PROFILE
          </Nav.Link>
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
};
export default SideBar;
