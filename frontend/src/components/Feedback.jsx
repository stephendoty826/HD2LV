import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Feedback = () => {
  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <div className="fs-3 px-5 text-center homePageFont saira-font">
        If you have any feedback or feature ideas for this website, you can join
        the discord server to communicate with the developer directly.
      </div>
      <Button
        className="my-4"
        as="a"
        variant="primary"
        href="https://discord.gg/fbfbtA2xjx"
      >
        Join the Discord Server
      </Button>
      <img
        src="/images/what_face.PNG"
        alt=""
        style={{ maxWidth: "650px", width: "75%", height: "auto" }}
      />
    </Container>
  );
}

export default Feedback
