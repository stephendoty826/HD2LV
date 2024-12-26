import { useState } from "react";
import Button from "react-bootstrap/Button";
import SelectorModal from "./SelectorModal";
import { Container } from "react-bootstrap";

const EquipmentDetails = ({
  equipment,
  setEquipment,
  variant
}) => {

  const [showModal, setShowModal] = useState(false);

  function displayTraits(traitsArray) {
    return traitsArray.map((trait, idx) => {
      if(idx === traitsArray.length - 1){ // last one return without comma
        return <span>{trait}</span>
      }
      return <span>{trait}, </span>
    })
  }

  return (
    <div className="pb-4">
      <Container className="d-flex">
        <Button
          variant="secondary"
          className="armorButton selectorBorder"
          onClick={() => setShowModal(true)}
        >
          {equipment.image && (
            <img src={equipment.image} alt="" className="equippedImage" />
          )}
        </Button>
        <ul>
            {equipment.name.toUpperCase()}
          <li>
            {equipment.description}
          </li>
          {equipment.damage && <li>
            DAMAGE: {equipment.damage}
          </li>}
          {equipment["durability damage"] && <li>
            DURABILITY DAMAGE: {equipment["durability damage"]}
          </li>}
          {equipment["armor penetration"] && <li>
            ARMOR PENETRATION: {equipment["armor penetration"]}
          </li>}
          {equipment["call-in time"] && <li>
            CALL-IN TIME: {equipment["call-in time"]}
          </li>}
          {equipment["rearm time"] && <li>
            USES: {equipment.uses}
          </li>}
          {equipment.capacity && <li>
            CAPACITY: {equipment.capacity}
          </li>}
          {equipment["fire rate"] && <li>
            FIRE RATE (RPM): {equipment["fire rate"]}
          </li>}
          {equipment["charge time"] && <li>
            CHARGE TIME: {equipment["charge time"]}
          </li>}
          {equipment["recharge time"] && <li>
            RECHARGE TIME: {equipment["recharge time"]}
          </li>}
          {equipment["fire limit"] && <li>
            FIRE LIMIT: {equipment["fire limit"]}
          </li>}
          {equipment["spare magazines"] && <li>
            SPARE MAGAZINES: {equipment["spare magazines"]}
          </li>}
          {equipment["reload time"] && <li>
            RELOAD TIME: {equipment["reload time"]}
          </li>}
          {equipment["tactical reload"] && <li>
            TACTICAL RELOAD: {equipment["tactical reload"]}
          </li>}
          {equipment["rearm time"] && <li>
            REARM TIME: {equipment["rearm time"]}
          </li>}
          {equipment["cooldown time"] && <li>
            COOLDOWN TIME: {equipment["cooldown time"]}
          </li>}
          {equipment["equipment traits"] && <li>
            STRATAGEM TRAITS: {displayTraits(equipment["equipment traits"])}
          </li>}
        </ul>
      </Container>
      {/* <SelectorModal
        setItem={setEquipment}
        show={showModal}
        onHide={() => setShowModal(false)}
        itemArray={stratagemArray}
        variant={variant}
      /> */}
    </div>
  );
};

export default EquipmentDetails;
