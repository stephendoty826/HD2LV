import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const WeaponCustomizationModal = ({
  show,
  onHide,
}) => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const closeModal = () => {
    setSelected({});
    setShowDetails(false);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
      fullscreen="lg-down"
      style={{ zIndex: 1300 }}
    >
      <Modal.Header closeButton>
        {selected.name ? (
          <div className="d-flex align-items-center" style={{ padding: "0px" }}>
            <img
              src={selected.image}
              alt=""
              className="me-2"
              style={{ height: "5vh" }}
            />
            <div className="d-flex">
              <div className="fs-5">{selected.name?.toUpperCase()}</div>
            </div>
          </div>
        ) : (
          <div
            className="d-flex align-items-center fs-3"
            style={{ height: "5vh" }}
          >
            MAKE SELECTION
          </div>
        )}
      </Modal.Header>
      <Modal.Body style={{ padding: "0px" }}>
        This is the modal body
      </Modal.Body>
      <Modal.Footer
        className={selected.name ? "d-flex justify-content-between" : ""}
      >
        {selected.name && (
          <Button
            variant="secondary"
          >
            {showDetails ? "Hide" : "Show"} Details
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default WeaponCustomizationModal;