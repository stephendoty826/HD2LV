import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StratagemDetails from "./StratagemDetails";
import ArmorSetDetails from "./ArmorSetDetails";
import EquipmentDetails from "./EquipmentDetails";

const DetailsModal = ({idx, loadout, show, onHide}) => {

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

  const savedLoadouts = useRef(null) // outside of functions to ensure it is available in other functions
  
  useEffect(() => {
    let savedLoadoutsJSON = localStorage.getItem("savedLoadouts");

    if (savedLoadoutsJSON) {
      savedLoadouts.current = JSON.parse(savedLoadoutsJSON);
    }

    setStratagem1(savedLoadouts.current[idx].stratagems[0])
    setStratagem2(savedLoadouts.current[idx].stratagems[1])
    setStratagem3(savedLoadouts.current[idx].stratagems[2])
    setStratagem4(savedLoadouts.current[idx].stratagems[3])
    setHelmet(savedLoadouts.current[idx].armorSet[0])
    setArmor(savedLoadouts.current[idx].armorSet[1])
    setCape(savedLoadouts.current[idx].armorSet[2])
    setPrimary(savedLoadouts.current[idx].equipment[0])
    setSecondary(savedLoadouts.current[idx].equipment[1])
    setThrowable(savedLoadouts.current[idx].equipment[2])

  }, [loadout, idx]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal dropShadow"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <div
          className="d-flex align-items-center fs-3"
          style={{ height: "5vh" }}
        >
          {savedLoadouts.current && savedLoadouts.current[idx].loadoutName.toUpperCase()}
        </div>
      </Modal.Header>
      <Modal.Body style={{ padding: "0px", height: "75vh", overflowY: "scroll" }}>
      <div className="d-flex flex-column justify-content-around mt-3 overflow-scroll">
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
