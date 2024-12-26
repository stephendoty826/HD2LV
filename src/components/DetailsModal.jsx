import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DetailsStratagemButton from "./DetailsStratagemButton";
import helldivers2Data from "../gameData/helldivers2.json";

const DetailsModal = ({show, onHide, loadout}) => {

  const [stratagem1, setStratagem1] = useState(loadout.stratagems[0]);
  const [stratagem2, setStratagem2] = useState(loadout.stratagems[1]);
  const [stratagem3, setStratagem3] = useState(loadout.stratagems[2]);
  const [stratagem4, setStratagem4] = useState(loadout.stratagems[3]);

  function handleCancelClick() {
    onHide();
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal dropShadow"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <div
          className="d-flex align-items-center fs-3"
          style={{ height: "5vh" }}
        >
          {loadout.loadoutName.toUpperCase()}
        </div>
      </Modal.Header>
      <Modal.Body style={{ padding: "0px" }}>
      <div className="d-flex flex-column justify-content-around mt-3">
        <DetailsStratagemButton
          otherStratagems={[stratagem2.name, stratagem3.name, stratagem4.name]}
          stratagem={stratagem1}
          setStratagem={setStratagem1}
          stratagemArray={helldivers2Data.stratagems}
        />
        <DetailsStratagemButton
          otherStratagems={[stratagem1.name, stratagem3.name, stratagem4.name]}
          stratagem={stratagem2}
          setStratagem={setStratagem2}
          stratagemArray={helldivers2Data.stratagems}
        />
        <DetailsStratagemButton
          otherStratagems={[stratagem1.name, stratagem2.name, stratagem4.name]}
          stratagem={stratagem3}
          setStratagem={setStratagem3}
          stratagemArray={helldivers2Data.stratagems}
        />
        <DetailsStratagemButton
          otherStratagems={[stratagem1.name, stratagem2.name, stratagem3.name]}
          stratagem={stratagem4}
          setStratagem={setStratagem4}
          stratagemArray={helldivers2Data.stratagems}
        />
      </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button
          variant="primary"
          // onClick={variant === "edit" ? updateNotes : handleOKClick}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
