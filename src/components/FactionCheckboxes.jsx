import React from 'react'
import Form from "react-bootstrap/Form";

const FactionCheckboxes = ({ id, faction , setFaction}) => {

  const handleCheckboxClick = (e) => {
    let factionSelection = e.target.id.split("_")[0] // grabs the faction from the id (i.e. "bugs_builder" -> "bugs")
    let tempFaction = faction

    console.log('factionSelection', factionSelection);
    

    if(tempFaction.includes(factionSelection)){
      // remove it 
      tempFaction = tempFaction.replace(factionSelection, "") //TODO when repeatedly adding and removing a faction, an additional space is left each time
    } 
    else {
      // add it
      tempFaction = tempFaction === "" ? factionSelection : tempFaction.concat(` ${factionSelection}`)
    }
    console.log("tempFaction", tempFaction)
    setFaction(tempFaction)
  }

  return (
    <div className="mb-4">
      <Form.Check
        inline
        type="checkbox"
        id={"bots_" + id}
        label={
          <img
            src="./images/bots_logo.webp"
            style={{ width: "3.4vh" }}
            alt="automaton logo"
          />
        }
        className="me-3"
        checked={faction.includes("bots")}
        onChange={handleCheckboxClick}
      />
      <Form.Check
        inline
        type="checkbox"
        id={"bugs_" + id}
        label={
          <img
            src="./images/bugs_logo.webp"
            style={{ width: "3vh" }}
            alt="terminid logo"
          />
        }
        className="me-3"
        checked={faction.includes("bugs")}
        onChange={handleCheckboxClick}
      />
      <Form.Check
        inline
        type="checkbox"
        id={"illuminate_" + id}
        label={
          <img
            src="./images/illuminate_logo.webp"
            style={{ width: "3.4vh" }}
            alt="illuminate logo"
          />
        }
        className="me-3"
        checked={faction.includes("illuminate")}
        onChange={handleCheckboxClick}
      />
    </div>
  );
};

export default FactionCheckboxes