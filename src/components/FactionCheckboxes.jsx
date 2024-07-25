import React from 'react'
import Form from "react-bootstrap/Form";

const FactionCheckboxes = ({ id, faction , setFaction}) => {
  return (
    <div className="mb-4">
      <Form.Check
        inline
        type="radio"
        id={"all_" + id}
        label="ALL"
        checked={faction === "all"}
        onChange={() => {
          setFaction("all");
        }}
      />
      <Form.Check
        inline
        type="radio"
        id={"bugs_" + id}
        label={
          <img src="./images/terminid_logo.webp" style={{ width: "3vh" }} />
        }
        className="me-3"
        checked={faction === "bugs"}
        onChange={() => {
          setFaction("bugs");
        }}
      />
      <Form.Check
        inline
        type="radio"
        id={"bots_" + id}
        label={
          <img src="./images/automaton_logo.webp" style={{ width: "3.4vh" }} />
        }
        className="me-3"
        checked={faction === "bots"}
        onChange={() => {
          setFaction("bots");
        }}
      />
    </div>
  );
};

export default FactionCheckboxes