import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import StratBuilder from "./StratBuilder";
import EquipmentBuilder from "./EquipmentBuilder";
import FactionCheckboxes from "./FactionCheckboxes"
import Form from "react-bootstrap/Form";
import NotesButton from "./NotesButton";
import { v4 as uuidv4 } from "uuid";

const CopyOrEditModal = ({
  loadout,
  onHide,
  show,
  savedLoadouts,
  setSavedLoadouts,
  variant,
}) => {
  const [stratagem1, setStratagem1] = useState(loadout.stratagems[0]);
  const [stratagem2, setStratagem2] = useState(loadout.stratagems[1]);
  const [stratagem3, setStratagem3] = useState(loadout.stratagems[2]);
  const [stratagem4, setStratagem4] = useState(loadout.stratagems[3]);
  const [helmet, setHelmet] = useState(loadout.armorSet[0]);
  const [armor, setArmor] = useState(loadout.armorSet[1]);
  const [cape, setCape] = useState(loadout.armorSet[2]);
  const [primary, setPrimary] = useState(loadout.equipment[0]);
  const [secondary, setSecondary] = useState(loadout.equipment[1]);
  const [throwable, setThrowable] = useState(loadout.equipment[2]);
  const [faction, setFaction] = useState(loadout.faction);
  const [loadoutName, setLoadoutName] = useState(
    variant === "edit" ? loadout.loadoutName : loadout.loadoutName + " copy"
  );
  const [notes, setNotes] = useState(loadout.notes);

  function updateLoadout() {
    let loadoutIndex = savedLoadouts.findIndex(
      (savedloadout) => loadout.id === savedloadout.id
    );

    let updatedLoadout = {
      loadoutName,
      faction,
      stratagems: [stratagem1, stratagem2, stratagem3, stratagem4],
      armorSet: [helmet, armor, cape],
      equipment: [primary, secondary, throwable],
      notes,
      id: loadout.id,
    };

    // using temp array to not edit state
    let tempSavedLoadouts = savedLoadouts;
    // update loadout at index
    tempSavedLoadouts[loadoutIndex] = updatedLoadout;
    // use setSavedLoadouts to update state
    setSavedLoadouts([...tempSavedLoadouts]);
    // stringify array
    let savedLoadoutsJSON = JSON.stringify(tempSavedLoadouts);
    // save array to local storage
    localStorage.setItem("savedLoadouts", savedLoadoutsJSON);
    onHide();
  }

  const saveLoadout = () => {
    let loadout = {
      loadoutName,
      faction,
      stratagems: [stratagem1, stratagem2, stratagem3, stratagem4],
      armorSet: [helmet, armor, cape],
      equipment: [primary, secondary, throwable],
      notes,
      id: uuidv4(),
    };

    setSavedLoadouts([loadout, ...savedLoadouts]);
    // stringify array
    let savedLoadoutsJSON = JSON.stringify([loadout, ...savedLoadouts]);
    // save array to local storage
    localStorage.setItem("savedLoadouts", savedLoadoutsJSON);
    onHide();
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      variant === "edit" ? updateLoadout() : saveLoadout()
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
      fullscreen="lg-down"
    >
      {variant === "edit" ? (
        <Modal.Header closeButton>Editing {loadoutName}</Modal.Header>
      ) : (
        <Modal.Header closeButton>{loadoutName}</Modal.Header>
      )}
      <Modal.Body style={{ padding: "0px" }}>
        <Container className="overflow-scroll">
          <div className="d-flex align-items-center flex-column vh-85">
            <div className="text-center w-100">
              <StratBuilder
                stratagem1={stratagem1}
                setStratagem1={setStratagem1}
                stratagem2={stratagem2}
                setStratagem2={setStratagem2}
                stratagem3={stratagem3}
                setStratagem3={setStratagem3}
                stratagem4={stratagem4}
                setStratagem4={setStratagem4}
              />
              <EquipmentBuilder
                armor={armor}
                setArmor={setArmor}
                helmet={helmet}
                setHelmet={setHelmet}
                cape={cape}
                setCape={setCape}
                primary={primary}
                setPrimary={setPrimary}
                secondary={secondary}
                setSecondary={setSecondary}
                throwable={throwable}
                setThrowable={setThrowable}
              />
              <div className="d-flex flex-column align-items-center w-100">
                <Form.Group className="mb-4 mt-5  w-75">
                  <label className="h3">Faction</label>
                  <FactionCheckboxes
                    id="edit/copy"
                    faction={faction}
                    setFaction={setFaction}
                  />
                  <NotesButton notes={notes} setNotes={setNotes}/>
                  <Form.Label>Loadout Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setLoadoutName(e.target.value)}
                    value={loadoutName}
                    placeholder="Enter loadout name"
                    onKeyUp={(e) => handleKeyUp(e)}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        {variant === "edit" ? (
          <Button variant="primary" onClick={updateLoadout}>
            Update Loadout
          </Button>
        ) : (
          <Button variant="primary" onClick={saveLoadout}>
            Save Loadout Copy
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CopyOrEditModal;
