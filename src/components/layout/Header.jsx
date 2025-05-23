import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

// todo figure out a way to not have two versions of the navbar (one for large screen, and another for mobile)
const Header = () => {

  const renderLoadoutDropdownItems = () => (
    <>
      <NavDropdown.Item as={Link} to="/loadout_builder">
        Loadout Builder
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/saved_loadouts">
        Saved Loadouts
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/randomizer">
        Randomizer
      </NavDropdown.Item>
    </>
  )

  const renderArsenalDropdownItems = () => (
    <>
      <NavDropdown.Item as={Link} to="/strat_info">
      Stratagems
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/helmet_info">
        Helmets
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/armor_info">
        Armor
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/cape_info">
        Capes
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/primary_info">
        Primaries
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/secondary_info">
        Secondaries
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/throwable_info">
        Throwables
      </NavDropdown.Item>
    </>
  )

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="d-none d-lg-block"><strong>Home</strong></Nav.Link>
            <span className="border-start border-2 mx-2 d-none d-lg-block"></span>
            <NavDropdown
              title="Loadouts"
              id="basic-nav-dropdown"
              className="d-none d-lg-block fw-bold"
            >
              {renderLoadoutDropdownItems()}
            </NavDropdown>
            <span className="border-start border-2 mx-2 d-none d-lg-block"></span>
            <NavDropdown
              title="Arsenal"
              id="basic-nav-dropdown"
              className="d-none d-lg-block fw-bold"
            >
              {renderArsenalDropdownItems()}
            </NavDropdown>
            <span className="border-start border-2 mx-2 d-none d-lg-block"></span>
            <Nav.Link as={Link} to="/feedback" className="d-none d-lg-block">Feedback</Nav.Link>



            {/* Nav for small screens */}
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="d-lg-none"
            >
              <NavDropdown.Item as={Link} to="/">
                <strong>Home</strong>
              </NavDropdown.Item>
              <NavDropdown
                title="Loadouts"
                id="basic-nav-dropdown"
                className="ps-2 d-lg-none fw-bold"
                key="end_m1"
                drop="end"
              >
                {renderLoadoutDropdownItems()}
              </NavDropdown>
              <NavDropdown
                title="Arsenal"
                id="basic-nav-dropdown"
                className="ps-2 d-lg-none fw-bold"
                key="end_m2"
                drop="end"
              >
                {renderArsenalDropdownItems()}
              </NavDropdown>
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
