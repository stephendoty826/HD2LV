import React from 'react'
import Container from 'react-bootstrap/Container';

const Riddler = () => {
  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <img
        src="/images/riddler.jfif"
        alt=""
        style={{ maxWidth: "850px", width: "75%", height: "auto" }}
      />
    </Container>
  )
}

export default Riddler