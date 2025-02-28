import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import SelectorModal from "./SelectorModal";

const HelmetButton = ({ helmet, setHelmet, helmetArray }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        className="armorButton selectorBorder"
        onClick={() => setShowModal(true)}
      >
        {helmet.image && (
          <img src={helmet.image} alt="" className="equippedImageCropBorder" />
        )}
      </Button>
      <SelectorModal
        show={showModal}
        setItem={setHelmet}
        itemArray={helmetArray}
        onHide={() => setShowModal(false)}
        variant="helmet"
      />
    </>
  );
};

export default HelmetButton;
