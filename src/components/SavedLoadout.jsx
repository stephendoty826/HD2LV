import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import EllipsisDropDown from "./EllipsisDropdown";

function ContextAwareToggle({ eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <>
      {isCurrentEventKey ? (
        <FontAwesomeIcon
          icon={faChevronDown}
          onClick={decoratedOnClick}
          rotation={180}
          className="faChevronDown"
        />
      ) : (
        <FontAwesomeIcon
          icon={faChevronDown}
          onClick={decoratedOnClick}
          className="faChevronDown"
        />
      )}
    </>
  );
}

const SavedLoadout = ({ savedLoadout, savedLoadouts, setSavedLoadouts }) => {

  return (
    <div>
      <div className="fs-4 my-2`">
        {savedLoadout.faction === "all" ? (
          savedLoadout.faction.toUpperCase()
        ) : savedLoadout.faction === "bugs" ? (
          <img
            src="./images/terminid_logo.webp"
            style={{ width: "3vh" }}
            alt="terminid logo"
          />
        ) : (
          savedLoadout.faction === "bots" && (
            <img
              src="./images/automaton_logo.webp"
              style={{ width: "3.4vh" }}
              alt="automaton logo"
            />
          )
        )}
        {" - " + savedLoadout.loadoutName}
      </div>
      <Accordion className="custom-accordion">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <ContextAwareToggle eventKey="0" />
            {savedLoadout.stratagems.map((stratagem) => {
              return (
                <img
                  key={stratagem.image}
                  src={stratagem.image}
                  alt=""
                  className="savedLoadedImage"
                />
              );
            })}
            <EllipsisDropDown
              loadout={savedLoadout}
              savedLoadouts={savedLoadouts}
              setSavedLoadouts={setSavedLoadouts}
            />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="d-flex justify-content-between">
              <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-around">
                  {savedLoadout.armorSet.map((armorPiece) => {
                    return (
                      <div
                        className="armorButton imageBorder"
                        key={armorPiece.image}
                      >
                        <img
                          src={armorPiece.image}
                          alt=""
                          className="equippedImageCropBorder"
                        />
                      </div>
                    );
                  })}
                </div>
                <br />
                <div className="d-flex justify-content-around">
                  {savedLoadout.equipment.map((equipment) => {
                    let isThrowable = equipment.class.includes("Throwable");
                    return (
                      <div
                        className="weaponButton imageBorder"
                        key={equipment.image}
                      >
                        <img
                          src={equipment.image}
                          alt=""
                          className={
                            isThrowable
                              ? "centerThrowableImage"
                              : "equippedImageCropBorder"
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default SavedLoadout;
