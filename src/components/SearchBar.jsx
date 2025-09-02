import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ filterShownLoadouts, searchTerm, setSearchTerm }) => {

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      filterShownLoadouts();
    }
  };

  return (
    <div className="d-flex">
      <Form.Control
        type="text"
        placeholder="Search Loadouts"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onKeyUp={(e) => handleKeyUp(e)}
      />
      <Button className="ms-2" onClick={filterShownLoadouts}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </div>
  );
};

export default SearchBar;