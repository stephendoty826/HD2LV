import Form from "react-bootstrap/Form";
import ArmorButton from "./ArmorButton";
import HelmetButton from "./HelmetButton";
import CapeButton from "./CapeButton";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import ThrowableButton from "./ThrowableButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import helldivers2Data from "../gameData";

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
  randomizeItem,
  ALL_HELMETS,
  ALL_ARMOR,
  ALL_CAPES,
  ALL_PRIMARIES,
  ALL_SECONDARIES,
  ALL_THROWABLES,
  runMultipleTimes,
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
              className={isHelmetLocked ? "fs-4 mx-2 text-danger" : "fs-4 mx-2"}
              onClick={() => {
                setIsHelmetLocked(!isHelmetLocked);
              }}
            />
            <FontAwesomeIcon
              icon={faShuffle}
              className={
                isHelmetLocked ? "fs-4 text-muted" : "fs-4 text-primary"
              }
              onClick={() => {
                if (!isHelmetLocked)
                  runMultipleTimes(
                    () => randomizeItem(ALL_HELMETS, "helmet"),
                    6,
                    150
                  );
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
              className={isArmorLocked ? "fs-4 mx-2 text-danger" : "fs-4 mx-2"}
              onClick={() => {
                setIsArmorLocked(!isArmorLocked);
              }}
            />
            <FontAwesomeIcon
              icon={faShuffle}
              className={
                isArmorLocked ? "fs-4 text-muted" : "fs-4 text-primary"
              }
              onClick={() => {
                if (!isArmorLocked)
                  runMultipleTimes(
                    () => randomizeItem(ALL_ARMOR, "armor"),
                    6,
                    150
                  );
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
              className={isCapeLocked ? "fs-4 mx-2 text-danger" : "fs-4 mx-2"}
              onClick={() => {
                setIsCapeLocked(!isCapeLocked);
              }}
            />
            <FontAwesomeIcon
              icon={faShuffle}
              className={isCapeLocked ? "fs-4 text-muted" : "fs-4 text-primary"}
              onClick={() => {
                if (!isCapeLocked)
                  runMultipleTimes(
                    () => randomizeItem(ALL_CAPES, "cape"),
                    6,
                    150
                  );
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
                isPrimaryLocked ? "fs-4 mx-2 text-danger" : "fs-4 mx-2"
              }
              onClick={() => {
                setIsPrimaryLocked(!isPrimaryLocked);
              }}
            />
            <FontAwesomeIcon
              icon={faShuffle}
              className={
                isPrimaryLocked ? "fs-4 text-muted" : "fs-4 text-primary"
              }
              onClick={() => {
                if (!isPrimaryLocked)
                  runMultipleTimes(
                    () => randomizeItem(ALL_PRIMARIES, "primary"),
                    6,
                    150
                  );
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
                isSecondaryLocked ? "fs-4 mx-2 text-danger" : "fs-4 mx-2"
              }
              onClick={() => {
                setIsSecondaryLocked(!isSecondaryLocked);
              }}
            />
            <FontAwesomeIcon
              icon={faShuffle}
              className={
                isSecondaryLocked ? "fs-4 text-muted" : "fs-4 text-primary"
              }
              onClick={() => {
                if (!isSecondaryLocked)
                  runMultipleTimes(
                    () => randomizeItem(ALL_SECONDARIES, "secondary"),
                    6,
                    150
                  );
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
                isThrowableLocked ? "fs-4 mx-2 text-danger" : "fs-4 mx-2"
              }
              onClick={() => {
                setIsThrowableLocked(!isThrowableLocked);
              }}
            />
            <FontAwesomeIcon
              icon={faShuffle}
              className={
                isThrowableLocked ? "fs-4 text-muted" : "fs-4 text-primary"
              }
              onClick={() => {
                if (!isThrowableLocked)
                  runMultipleTimes(
                    () => randomizeItem(ALL_THROWABLES, "throwable"),
                    6,
                    150
                  );
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
