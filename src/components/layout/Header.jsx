import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { getAuthenticationUrl } from "../../misc/utils";

const Header = () => {

  const [authenticationUrl, setAuthenticationUrl] = useState(null)

  getAuthenticationUrl(setAuthenticationUrl)

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/">
                <strong>Home</strong>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/loadout_builder">
                Loadout Builder
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/saved_loadouts">
                Saved Loadouts
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/randomizer">
                Randomizer
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/feedback">
                Feedback
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href={authenticationUrl}>Link to Dropbox</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
