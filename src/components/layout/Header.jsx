import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

// todo figure out a way to not have two versions of the navbar (one for large screen, and another for mobile)
const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="d-none d-lg-block"><strong>Home</strong></Nav.Link>
            <span className="border-start border-2 mx-2 d-none d-lg-block"></span>
            <Nav.Link as={Link} to="/loadout_builder" className="d-none d-lg-block">Loadout Builder</Nav.Link>
            <span className="border-start border-2 mx-2 d-none d-lg-block"></span>
            <Nav.Link as={Link} to="/saved_loadouts" className="d-none d-lg-block">Saved Loadouts</Nav.Link>
            <span className="border-start border-2 mx-2 d-none d-lg-block"></span>
            <Nav.Link as={Link} to="/strat_info" className="d-none d-lg-block">Stratagems</Nav.Link>
            <span className="border-start border-2 mx-2 d-none d-lg-block"></span>
            <Nav.Link as={Link} to="/randomizer" className="d-none d-lg-block">Randomizer</Nav.Link>
            <span className="border-start border-2 mx-2 d-none d-lg-block"></span>
            <Nav.Link as={Link} to="/feedback" className="d-none d-lg-block">Feedback</Nav.Link>
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="d-lg-none"
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
              <NavDropdown.Item as={Link} to="/strat_info">
                Stratagems
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
