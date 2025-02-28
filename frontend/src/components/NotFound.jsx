import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Container>
      <div className="d-flex align-items-center flex-column vh-85">
        <p className="display-6 mt-3">Not Found</p>
        <p className="homePageFont saira-font">
          The page you are trying to visit does not exist.
        </p>
        <p className="homePageFont saira-font">
          <Link to="/">Click here</Link> to return to the home page.
        </p>
        <img
          src="/images/sweet_liberty_not_found.gif"
          alt=""
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </Container>
  );
};

export default NotFound;
