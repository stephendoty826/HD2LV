import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import SavedLoadout from "./SavedLoadout";
import FilterFactionCheckboxes from "./FilterFactionCheckboxes";
import SearchBar from "./SearchBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faArrowsUpDownLeftRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { searchLoadouts } from "../misc/utils";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const SavedLoadouts = () => {
  const [savedLoadouts, setSavedLoadouts] = useState([]);
  const [showFaction, setShowFaction] = useState("");
  const [shownLoadouts, setShownLoadouts] = useState([]);
  const [randomLoadout, setRandomLoadout] = useState([]);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isReorderMode, setIsReorderMode] = useState(false);

  const filterShownLoadouts = useCallback(() => {
    // When in reorder mode, show all loadouts without filtering to maintain drag-and-drop functionality
    if (isReorderMode) {
      setShownLoadouts(savedLoadouts);
      return;
    }
    
    let filteredLoadouts = savedLoadouts.filter((loadout) => loadout.faction.includes(showFaction));
    filteredLoadouts = searchLoadouts(filteredLoadouts, searchTerm);
    setShownLoadouts(filteredLoadouts);
  }, [savedLoadouts, searchTerm, showFaction, isReorderMode]);

  useEffect(() => {
    let savedLoadoutsJSON = localStorage.getItem("savedLoadouts");

    if (savedLoadoutsJSON) {
      setSavedLoadouts(JSON.parse(savedLoadoutsJSON));
    }
  }, []);

  useEffect(() => {
    filterShownLoadouts()
  }, [filterShownLoadouts, savedLoadouts, searchTerm, showFaction, isReorderMode])

  const getRandomLoadout = () => {
    setShow(false);
    setRandomLoadout(shownLoadouts[(shownLoadouts.length * Math.random()) | 0]);
    setShow(true);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(savedLoadouts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSavedLoadouts(items);
    // Persist the new order to localStorage
    localStorage.setItem("savedLoadouts", JSON.stringify(items));
  };

  const toggleReorderMode = () => {
    setIsReorderMode(!isReorderMode);
    // Clear filters when entering reorder mode for better UX
    if (!isReorderMode) {
      setShowFaction("");
      setSearchTerm("");
    }
  };

  const renderLoadoutsList = () => {
    if (isReorderMode) {
      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="loadouts">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="w-100">
                {savedLoadouts.map((savedLoadout, index) => (
                  <Draggable key={savedLoadout.id} draggableId={savedLoadout.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          cursor: snapshot.isDragging ? "grabbing" : "grab",
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                        className={`mb-3 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                      >
                        <SavedLoadout
                          savedLoadout={savedLoadout}
                          savedLoadouts={savedLoadouts}
                          setSavedLoadouts={setSavedLoadouts}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    }

    return (
      <>
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
            {showFaction === ""
              ? "No loadouts saved"
              : `No loadouts saved for ${showFaction}`}
          </p>
        )}
      </>
    );
  };

  return (
    <div>
      <Container className="savedLoadoutContainer">
        <div className="d-flex align-items-center flex-column vh-85">
          <p className="display-6 mt-2">Saved Loadouts</p>
          
          <div className="d-flex gap-2 mb-3">
            <Button
              variant="outline-light"
              onClick={getRandomLoadout}
              className="d-flex flex-column align-items-center fs-6"
              disabled={isReorderMode || shownLoadouts.length === 0}
            >
              <FontAwesomeIcon icon={faShuffle} className="py-1 px-2" />
            </Button>
            
            <Button
              variant={isReorderMode ? "success" : "outline-light"}
              onClick={toggleReorderMode}
              className="d-flex align-items-center fs-6"
              disabled={savedLoadouts.length === 0}
            >
              <FontAwesomeIcon 
                icon={isReorderMode ? faCheck : faArrowsUpDownLeftRight} 
                className="me-2" 
              />
              {isReorderMode ? "Done" : "Reorder"}
            </Button>
          </div>

          {!isReorderMode && (
            <>
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
            </>
          )}

          {isReorderMode && (
            <div className="alert alert-info text-center mb-3">
              <small>Drag and drop loadouts to reorder them. Click "Done" when finished.</small>
            </div>
          )}

          <div className="text-center w-100">
            {renderLoadoutsList()}
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
              idx={1}
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