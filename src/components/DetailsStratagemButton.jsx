import { useState } from "react";
import Button from "react-bootstrap/Button";
import SelectorModal from "./SelectorModal";
import { Container } from "react-bootstrap";

const DetailsStratagemButton = ({
  otherStratagems,
  stratagem,
  setStratagem,
  stratagemArray
}) => {
  const [showModal, setShowModal] = useState(false);

  console.log('stratagem.image', stratagem.image);

  //TODO: Some of the images are getting cropped when they are in the Details Modal.

  return (
    <div className="pb-4">
      <Container className="d-flex">
        <Button
          variant="secondary"
          className="stratButton"
          onClick={() => setShowModal(true)}
        >
          {stratagem.image && (
            <img src={stratagem.image} alt="" className="equippedImage" />
          )}
        </Button>
        <ul>
          <li>
            {stratagem.description}
          </li>
          {stratagem["call-in time"] && <li>
            CALL-IN TIME: {stratagem["call-in time"]}
          </li>}
          {stratagem["rearm time"] && <li>
            USES: {stratagem.uses}
          </li>}
          {stratagem["rearm time"] && <li>
            REARM TIME: {stratagem["rearm time"]}
          </li>}
          <li>
            COOLDOWN TIME: {stratagem["cooldown time"]}
          </li>
          <li>
            STRATAGEM TRAITS: {stratagem["stratagem traits"]}
          </li>
        </ul>
      </Container>
      <SelectorModal
        variant="stratagem"
        otherStratagems={otherStratagems}
        setItem={setStratagem}
        show={showModal}
        onHide={() => setShowModal(false)}
        itemArray={stratagemArray}
      />
    </div>
  );
};

export default DetailsStratagemButton;
