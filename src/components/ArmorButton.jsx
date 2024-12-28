import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import SelectorModal from "./SelectorModal";

const ArmorButton = ({ armor, setArmor, armorArray }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        className="armorButton selectorBorder"
        onClick={() => setShowModal(true)}
      >
        {armor.image && (
          <img src={armor.image} alt="" className="equippedImageCropBorder" />
        )}
      </Button>
      <SelectorModal
        variant="armor"
        setItem={setArmor}
        show={showModal}
        onHide={() => setShowModal(false)}
        itemArray={armorArray}
      />
    </>
  );
};

export default ArmorButton;
