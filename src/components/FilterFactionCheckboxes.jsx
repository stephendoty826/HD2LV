import React from 'react'
import Form from "react-bootstrap/Form";

const FilterFactionCheckboxes = ({ id, showFaction , setShowFaction}) => {

  const handleCheckboxClick = (e) => {
    let factionSelection = e.target.id.split("_")[0] // grabs the faction from the id (i.e. "bugs_builder" -> "bugs")

    if(factionSelection === showFaction){
      setShowFaction("")
    }
    else{
      setShowFaction(factionSelection)
    }
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
        checked={showFaction === "bots"}
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
        checked={showFaction === "bugs"}
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
        checked={showFaction === "illuminate"}
        onChange={handleCheckboxClick}
      />
    </div>
  );
};

export default FilterFactionCheckboxes