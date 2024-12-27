import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import SavedLoadout from "./SavedLoadout";
import FilterFactionCheckboxes from "./FilterFactionCheckboxes";
import SearchBar from "./SearchBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { searchLoadouts } from "../misc/utils";

const SavedLoadouts = () => {
  const [savedLoadouts, setSavedLoadouts] = useState([]);
  const [showFaction, setShowFaction] = useState("");
  const [shownLoadouts, setShownLoadouts] = useState([]);
  const [randomLoadout, setRandomLoadout] = useState([]);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    let savedLoadoutsJSON = localStorage.getItem("savedLoadouts");

    if (savedLoadoutsJSON) {
      setSavedLoadouts(JSON.parse(savedLoadoutsJSON));
    }
  }, []);

  useEffect(() => {
    filterShownLoadouts();
  }, [showFaction, savedLoadouts]);

  const filterShownLoadouts = () => {
    let filteredLoadouts = savedLoadouts.filter((loadout) => {
      if(loadout.faction.includes(showFaction)){
        return loadout
      }
    });
    filteredLoadouts = searchLoadouts(filteredLoadouts, searchTerm);
    setShownLoadouts(filteredLoadouts);
  };

  const getRandomLoadout = () => {
    setShow(false);
    setRandomLoadout(shownLoadouts[(shownLoadouts.length * Math.random()) | 0]);
    setShow(true);
  };

  return (
    <div>
      <Container className="savedLoadoutContainer">
        <div className="d-flex align-items-center flex-column vh-85">
          <p className="display-6 mt-2">Saved Loadouts</p>
          <Button
            variant="outline-light"
            onClick={getRandomLoadout}
            className="d-flex flex-column align-items-center fs-6 mb-3"
          >
            <FontAwesomeIcon icon={faShuffle} className="py-1 px-2" />
          </Button>
          <div className="d-flex">
            <SearchBar
              filterShownLoadouts={filterShownLoadouts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <FilterFactionCheckboxes
            id="saved"
            showFaction={showFaction}
            setShowFaction={setShowFaction}
          />
          <div className="text-center w-100">
            {shownLoadouts.length > 0 ? (
              shownLoadouts.map((savedLoadout) => {
                return (
                  <div key={savedLoadout.id}>
                    <SavedLoadout
                      savedLoadout={savedLoadout}
                      savedLoadouts={savedLoadouts}
                      setSavedLoadouts={setSavedLoadouts}
                    />
                    <br />
                  </div>
                );
              })
            ) : (
              <p>
                {showFaction === "all"
                  ? "No loadouts saved"
                  : `No loadouts saved for ${showFaction}`}
              </p>
            )}
          </div>
        </div>
      </Container>
      <Modal
        centered
        size="lg"
        fullscreen="lg-down"
        show={show}
        onHide={() => setShow(false)}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Here is your loadout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center w-100">
            <SavedLoadout
              savedLoadout={randomLoadout}
              savedLoadouts={savedLoadouts}
              setSavedLoadouts={setSavedLoadouts}
              defaultActiveKey={"0"}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-light"
            onClick={getRandomLoadout}
            className="d-flex flex-column align-items-center fs-6"
          >
            <FontAwesomeIcon icon={faShuffle} className="py-1 px-2" />
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SavedLoadouts;
