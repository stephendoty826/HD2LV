import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import SelectorModal from "./SelectorModal";

const SecondaryButton = ({
  secondary,
  setSecondary,
  secondaryArray,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        className="weaponButton selectorBorder"
        onClick={() => setShowModal(true)}
      >
        {secondary.image && (
          <img
            src={secondary.image}
            alt=""
            className="equippedImageCropBorder"
          />
        )}
      </Button>
      <SelectorModal
        variant="secondary"
        setItem={setSecondary}
        show={showModal}
        onHide={() => setShowModal(false)}
        itemArray={secondaryArray}
      />
    </>
  );
};

export default SecondaryButton;
