import React from "react";
import Form from "react-bootstrap/Form";
import ArmorButton from "./ArmorButton";
import HelmetButton from "./HelmetButton";
import CapeButton from "./CapeButton";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import ThrowableButton from "./ThrowableButton";
import helldivers2Data from "../gameData/helldivers2.json";

const EquipmentBuilder = ({
  armor,
  setArmor,
  helmet,
  setHelmet,
  cape,
  setCape,
  primary,
  setPrimary,
  secondary,
  setSecondary,
  throwable,
  setThrowable,
}) => {
  return (
    <div className="mt-4">
      <label className="h3">Equipment</label>
      <div className="d-flex justify-content-around mt-3">
        <div className="d-flex flex-column">
          <Form.Label>Helmet</Form.Label>
          <HelmetButton
            helmet={helmet}
            setHelmet={setHelmet}
            helmetArray={helldivers2Data.helmets}
          />
        </div>
        <div className="d-flex flex-column">
          <Form.Label>Armor</Form.Label>
          <ArmorButton
            armor={armor}
            setArmor={setArmor}
            armorArray={helldivers2Data.armor}
          />
        </div>
        <div className="d-flex flex-column">
          <Form.Label>Cape</Form.Label>
          <CapeButton
            cape={cape}
            setCape={setCape}
            capesArray={helldivers2Data.capes}
          />
        </div>
      </div>
      <div className="d-flex justify-content-around mt-3">
        <div className="d-flex flex-column align-items-center">
          <Form.Label>Primary</Form.Label>
          <PrimaryButton
            primary={primary}
            setPrimary={setPrimary}
            primaryArray={helldivers2Data.primaries}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <Form.Label>Secondary</Form.Label>
          <SecondaryButton
            secondary={secondary}
            setSecondary={setSecondary}
            secondaryArray={helldivers2Data.secondaries}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <Form.Label>Throwable</Form.Label>
          <ThrowableButton
            throwable={throwable}
            setThrowable={setThrowable}
            throwableArray={helldivers2Data.throwables}
          />
        </div>
      </div>
    </div>
  );
};

export default EquipmentBuilder;
