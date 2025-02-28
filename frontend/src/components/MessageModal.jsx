import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function MessageModal() {
  const [show, setShow] = useState(true);
  const [doNotShow, setDoNotShow] = useState(false);

  useEffect(() => {
    let tempDoNotShow = localStorage.getItem("doNotShow");
    if (tempDoNotShow) {
      setShow(false);
    }
  }, []);

  const handleCloseModal = () => {
    setShow(false);
    if (doNotShow) {
      localStorage.setItem("doNotShow", true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Just so you're aware...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This website currently stores your saved loadouts locally. If you
          manually clear the browsers cookies, your saved loadouts will be lost.
          <Form.Group className="mt-3">
            <Form.Check // prettier-ignore
              type="checkbox"
              id="messageModalCheckbox"
              label="Don't show me again."
              checked={doNotShow}
              onChange={() => {
                setDoNotShow(!doNotShow);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModal;
