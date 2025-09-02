import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StratagemDetails from "./StratagemDetails";
import ArmorSetDetails from "./ArmorSetDetails";
import EquipmentDetails from "./EquipmentDetails";

const DetailsModal = ({loadout, show, onHide}) => {

  const [stratagem1, setStratagem1] = useState([]);
  const [stratagem2, setStratagem2] = useState([]);
  const [stratagem3, setStratagem3] = useState([]);
  const [stratagem4, setStratagem4] = useState([]);
  const [helmet, setHelmet] = useState();
  const [armor, setArmor] = useState();
  const [cape, setCape] = useState();
  const [primary, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [throwable, setThrowable] = useState();
  const [notes, setNotes] = useState()
  
  useEffect(() => {

    setStratagem1(loadout.stratagems[0])
    setStratagem2(loadout.stratagems[1])
    setStratagem3(loadout.stratagems[2])
    setStratagem4(loadout.stratagems[3])
    setHelmet(loadout.armorSet[0])
    setArmor(loadout.armorSet[1])
    setCape(loadout.armorSet[2])
    setPrimary(loadout.equipment[0])
    setSecondary(loadout.equipment[1])
    setThrowable(loadout.equipment[2])
    setNotes(loadout.notes)

  }, [loadout.stratagems, loadout.armorSet, loadout.equipment, loadout.notes]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal dropShadow"
      fullscreen="lg-down"
      style={{ zIndex: 1200 }}
    >
      <Modal.Header closeButton>
        <div
          className="d-flex align-items-center fs-3"
          style={{ height: "5vh" }}
        >
          {loadout && loadout.loadoutName.toUpperCase()}
        </div>
      </Modal.Header>
      <Modal.Body style={{ padding: "0px", height: "75vh", overflowY: "scroll" }}>
      <div className="d-flex flex-column justify-content-around mt-3 overflowY-scroll">
        <StratagemDetails
          stratagem={stratagem1}
        />
        <StratagemDetails
          stratagem={stratagem2}
        />
        <StratagemDetails
          stratagem={stratagem3}
        />
        <StratagemDetails
          stratagem={stratagem4}
        />
        <ArmorSetDetails
          armorPiece={helmet}
        />
        <ArmorSetDetails
          armorPiece={armor}
        />
        <ArmorSetDetails
          armorPiece={cape}
        />
        <EquipmentDetails 
          equipment={primary}
          cssClass="equipmentDetails"
        />
        <EquipmentDetails 
          equipment={secondary}
          cssClass="equipmentDetails"
        />
        <EquipmentDetails 
          equipment={throwable}
          cssClass="stratDetails"
        />
        {notes && <div className="ps-3 pb-2">
          <h5>Notes</h5>
          {notes.split("\n").map(note => <div key={note}>{note}</div>)}
        </div>}
      </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
