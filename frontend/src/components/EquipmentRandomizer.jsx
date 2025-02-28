import React from "react";
import Form from "react-bootstrap/Form";
import ArmorButton from "./ArmorButton";
import HelmetButton from "./HelmetButton";
import CapeButton from "./CapeButton";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import ThrowableButton from "./ThrowableButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import helldivers2Data from "../gameData/helldivers2.json";

const EquipmentRandomizer = ({
  armor,
  setArmor,
  isArmorLocked,
  setIsArmorLocked,
  helmet,
  setHelmet,
  isHelmetLocked,
  setIsHelmetLocked,
  cape,
  setCape,
  isCapeLocked,
  setIsCapeLocked,
  primary,
  setPrimary,
  isPrimaryLocked,
  setIsPrimaryLocked,
  secondary,
  setSecondary,
  isSecondaryLocked,
  setIsSecondaryLocked,
  throwable,
  setThrowable,
  isThrowableLocked,
  setIsThrowableLocked,
}) => {
  return (
    <div className="mt-4">
      <label className="h3">Equipment</label>
      <div className="d-flex justify-content-around mt-3">
        <div className="d-flex flex-column">
          <Form.Label className="d-flex justify-content-center">
            Helmet
            <FontAwesomeIcon
              icon={isHelmetLocked ? faLock : faLockOpen}
              className={isHelmetLocked ? "fs-4 ms-2 text-danger" : "fs-4 ms-2"}
              onClick={() => {
                setIsHelmetLocked(!isHelmetLocked);
              }}
            />
          </Form.Label>
          <HelmetButton
            disabled={isHelmetLocked}
            helmet={helmet}
            setHelmet={setHelmet}
            helmetArray={helldivers2Data.helmets}
          />
        </div>
        <div className="d-flex flex-column">
          <Form.Label className="d-flex justify-content-center">
            Armor
            <FontAwesomeIcon
              icon={isArmorLocked ? faLock : faLockOpen}
              className={isArmorLocked ? "fs-4 ms-2 text-danger" : "fs-4 ms-2"}
              onClick={() => {
                setIsArmorLocked(!isArmorLocked);
              }}
            />
          </Form.Label>
          <ArmorButton
            disabled={isArmorLocked}
            armor={armor}
            setArmor={setArmor}
            armorArray={helldivers2Data.armor}
          />
        </div>
        <div className="d-flex flex-column">
          <Form.Label className="d-flex justify-content-center">
            Cape
            <FontAwesomeIcon
              icon={isCapeLocked ? faLock : faLockOpen}
              className={isCapeLocked ? "fs-4 ms-2 text-danger" : "fs-4 ms-2"}
              onClick={() => {
                setIsCapeLocked(!isCapeLocked);
              }}
            />
          </Form.Label>
          <CapeButton
            disabled={isCapeLocked}
            cape={cape}
            setCape={setCape}
            capesArray={helldivers2Data.capes}
          />
        </div>
      </div>
      <div className="d-flex justify-content-around mt-3">
        <div className="d-flex flex-column align-items-center">
          <Form.Label className="d-flex justify-content-center">
            Primary
            <FontAwesomeIcon
              icon={isPrimaryLocked ? faLock : faLockOpen}
              className={
                isPrimaryLocked ? "fs-4 ms-2 text-danger" : "fs-4 ms-2"
              }
              onClick={() => {
                setIsPrimaryLocked(!isPrimaryLocked);
              }}
            />
          </Form.Label>
          <PrimaryButton
            disabled={isPrimaryLocked}
            primary={primary}
            setPrimary={setPrimary}
            primaryArray={helldivers2Data.primaries}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <Form.Label className="d-flex justify-content-center">
            Secondary
            <FontAwesomeIcon
              icon={isSecondaryLocked ? faLock : faLockOpen}
              className={
                isSecondaryLocked ? "fs-4 ms-2 text-danger" : "fs-4 ms-2"
              }
              onClick={() => {
                setIsSecondaryLocked(!isSecondaryLocked);
              }}
            />
          </Form.Label>
          <SecondaryButton
            disabled={isSecondaryLocked}
            secondary={secondary}
            setSecondary={setSecondary}
            secondaryArray={helldivers2Data.secondaries}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <Form.Label className="d-flex justify-content-center">
            Throwable
            <FontAwesomeIcon
              icon={isThrowableLocked ? faLock : faLockOpen}
              className={
                isThrowableLocked ? "fs-4 ms-2 text-danger" : "fs-4 ms-2"
              }
              onClick={() => {
                setIsThrowableLocked(!isThrowableLocked);
              }}
            />
          </Form.Label>
          <ThrowableButton
            disabled={isThrowableLocked}
            throwable={throwable}
            setThrowable={setThrowable}
            throwableArray={helldivers2Data.throwables}
          />
        </div>
      </div>
    </div>
  );
};

export default EquipmentRandomizer;
