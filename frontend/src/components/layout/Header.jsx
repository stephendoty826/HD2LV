import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Header = () => {

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
            {/* can use redirect_uri to put the authorization token in the url. Is that secure? or is it better to have the user manually input it? Does that matter? */}
            <Nav.Link href="https://www.dropbox.com/oauth2/authorize?client_id=6tp50cpnwmi7y1g&redirect_uri=http://localhost:3000/db_authorization_code&token_access_type=offline&response_type=code">Link to Dropbox</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
