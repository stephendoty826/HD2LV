import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { MoreInfoJSX, ImageCreditJSX } from "../SubComponents/SelectorMisc";
import { InfoViewTopObj } from "./InfoViewTop";

const WeaponsInfoView = ({ weaponsObj }) => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const handleSelectWeapon = (weapon) => {
    setSelected(weapon);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelected({});
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <InfoViewTopObj 
        selected={selected}
        showDetails={showDetails}
        handleSelectItem={handleSelectWeapon}
        itemsObj={weaponsObj}
        itemsPerRow={2}
      />
      <div
        className={
          showDetails ? "infoContainerBottom w-100" : "modalBottomClosed w-100"
        }
      >
        <Button
          className="floating-btn"
          variant="dark"
          onClick={handleCloseDetails}
        >
          Close
        </Button>
        <div className="scrollable-content">
          <div className="d-flex align-items-center" style={{ padding: "0px" }}>
            <img
              src={selected.image}
              alt=""
              className="me-2"
              style={{ height: "5vh" }}
            />
            <div className="d-flex">
              <div className="fs-5 col-6 col-sm-12">
                {selected.name?.toUpperCase()}
              </div>
            </div>
          </div>
          <div>{selected.description}</div>
          <div className="mt-2">
            <div className="mx-2 fs-5">STATS</div>
            <div className="px-2 infoBox">
              {selected.damage && (
                <div className="pt-1">
                  <b>Damage:</b> {selected.damage}
                </div>
              )}
              {selected["damage/sec"] && (
                <div className="pt-1">
                  <b>Damage/sec:</b> {selected["damage/sec"]}
                </div>
              )}
              {selected["durability damage"] && (
                <div className="pt-1">
                  <b>Durability Damage:</b> {selected["durability damage"]}
                </div>
              )}
              {selected["armor penetration"] && (
                <div className="pt-1">
                  <b>Armor Penetration:</b> {selected["armor penetration"]}
                </div>
              )}
              {selected.capacity && (
                <div className="pt-1">
                  <b>Capacity:</b> {selected.capacity}
                </div>
              )}
              <div className="py-1">
                <b>Recoil:</b> {selected.recoil}
              </div>
              {selected["fire rate"] && (
                <div className="pt-1">
                  <b>Fire Rate (rpm):</b> {selected["fire rate"]}
                </div>
              )}
              {selected["fire limit"] && (
                <div className="pt-1">
                  <b>Fire Limit:</b> {selected["fire limit"]}
                </div>
              )}
              {selected["spare magazines"] && (
                <div className="pt-1">
                  <b>Spare Magazines:</b> {selected["spare magazines"]}
                </div>
              )}
              {selected["reload time"] && (
                <div className="pt-1">
                  <b>Reload Time:</b> {selected["reload time"]}
                </div>
              )}
              {selected["tactical reload"] && (
                <div className="pt-1">
                  <b>Tactical Reload:</b> {selected["tactical reload"]}
                </div>
              )}
              <MoreInfoJSX selected={selected} />
            </div>
          </div>
          <div className="mt-2">
            {selected["weapon traits"] && (
              <div>
                <div className="mx-2 fs-5">WEAPON TRAITS</div>
                <div className="px-2 infoBox">
                  <div className="pt-1">
                    <ul>
                      {selected["weapon traits"].map((trait, idx) => {
                        return (
                          <li key={idx} className="pb-1">
                            {trait.toUpperCase()}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <ImageCreditJSX selected={selected} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WeaponsInfoView;
