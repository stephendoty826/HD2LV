import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import SelectorModal from "./SelectorModal";

const PrimaryButton = ({ primary, setPrimary, primaryArray }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        className="weaponButton selectorBorder"
        onClick={() => setShowModal(true)}
      >
        {primary.image && (
          <img src={primary.image} alt="" className="equippedImageCropBorder" />
        )}
      </Button>
      <SelectorModal
        variant="primary"
        setItem={setPrimary}
        show={showModal}
        onHide={() => setShowModal(false)}
        itemArray={primaryArray}
      />
    </>
  );
};

export default PrimaryButton;
