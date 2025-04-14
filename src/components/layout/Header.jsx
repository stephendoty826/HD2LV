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
          <Nav.Link as={Link} to="/" className="d-none d-md-block"><strong>Home</strong></Nav.Link>
          <span className="border-start border-2 mx-2 d-none d-md-block"></span>
          <Nav.Link as={Link} to="/loadout_builder" className="d-none d-md-block">Loadout Builder</Nav.Link>
          <span className="border-start border-2 mx-2 d-none d-md-block"></span>
          <Nav.Link as={Link} to="/saved_loadouts" className="d-none d-md-block">Saved Loadouts</Nav.Link>
          <span className="border-start border-2 mx-2 d-none d-md-block"></span>
          <Nav.Link as={Link} to="/randomizer" className="d-none d-md-block">Randomizer</Nav.Link>
          <span className="border-start border-2 mx-2 d-none d-md-block"></span>
          <Nav.Link as={Link} to="/feedback" className="d-none d-md-block">Feedback</Nav.Link>
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="d-md-none"
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
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
