import React from 'react'
import Form from "react-bootstrap/Form";

const FactionCheckboxes = ({ id, faction , setFaction}) => {

  

  const handleCheckboxClick = (e) => {
    let factionSelection = e.target.id.split("_")[0] // grabs the faction from the id (i.e. "bugs_builder" -> "bugs")
    let factionArray = faction === "" ? [] : faction.split(" ") // factionArray set to empty array or array filled with elements split by a space

    if(factionArray.includes(factionSelection)){
      // remove it
      factionArray  = factionArray.filter(faction => faction !== factionSelection)
    } 
    else {
      // add it
      factionArray.push(factionSelection)
    }

    setFaction(factionArray.join(" "))
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