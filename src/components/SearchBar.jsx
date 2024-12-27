import React from "react";
import Form from "react-bootstrap/Form";

const SearchBar = ({ filterShownLoadouts, searchTerm, setSearchTerm }) => {

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      filterShownLoadouts();
    }
  };

  return (
    <div className="d-flex pb-3">
      <Form.Control
        type="text"
        placeholder="Search Loadouts"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onKeyUp={(e) => handleKeyUp(e)}
      />
    </div>
  );
};

export default SearchBar;
