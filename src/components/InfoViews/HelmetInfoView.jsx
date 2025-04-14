import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import helldivers2Data from "../../gameData/helldivers2.json";

const HelmetInfoView = () => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  let helmetsArr = helldivers2Data.helmets;

  const handleSelectStrat = (stratagem) => {
    setSelected(stratagem);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelected({});
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <div>
        <div
          className={showDetails ? "infoContainerWithDetails" : "infoContainer"}
        >
          <div className="row">
            {helmetsArr.map((equipment) => {
              let isSelected = selected.name === equipment.name;
              return (
                <div className="col-4" key={equipment.image}>
                  <img
                    className={
                      isSelected ? "selected itemSelector" : "itemSelector"
                    }
                    src={equipment.image}
                    alt=""
                    onClick={() => handleSelectStrat(equipment)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={showDetails ? "infoContainerBottom w-100" : "modalBottomClosed w-100"}>
        <Button className="floating-btn" variant="dark" onClick={handleCloseDetails}>Close</Button>
        <div className="scrollable-content">
          <div className="d-flex align-items-center" style={{ padding: "0px" }}>
              <img
                src={selected.image}
                alt=""
                className="me-2"
                style={{ height: "5vh" }}
              />
              <div className="d-flex">
                <div className="fs-5 col-6 col-sm-12">{selected.name?.toUpperCase()}</div>
              </div>
            </div>
            <div>{selected.description}</div>
            <div className="mt-2">
              <div className="mx-2 fs-5">STATS</div>
              <div className="px-2 infoBox">
                <div className="pt-1">
                  <b>Armor Rating:</b> {selected["armor rating"]}
                </div>
                <div className="pt-1">
                  <b>Speed:</b> {selected.speed}
                </div>
                <div className="py-1">
                  <b>Stamina Regen:</b> {selected["stamina regen"]}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="px-2 infoBox">
                <div className="pt-1">STANDARD ISSUE</div>
                <div className="py-1 ">No additional bonus</div>
              </div>
            </div>
          </div>
                </div>
        </div>
      {/* <div className={showDetails ? "infoContainerWithDetails" : "infoContainer"}>
        {keysArray.map((stratagemKey, idx) => {
          return (
            <div key={stratagemKey + idx}>
              <p>{stratagemKey.toUpperCase()}</p>
              <div className="row">
                {stratagemObj[stratagemKey].map((stratagem) => {
                  let isSelected = selected?.name === stratagem.name;
                  return (
                    <div className="col-3" key={stratagem.image}>
                      <img
                        className={
                          isSelected
                            ? "selected itemSelector"
                            : "itemSelector"
                        }
                        src={stratagem.image}
                        alt=""
                        onClick={() => handleSelectStrat(stratagem)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className={showDetails ? "infoContainerBottom w-100" : "modalBottomClosed w-100"}>
        <Button className="floating-btn" variant="dark" onClick={handleCloseDetails}>Close</Button>
        <div className="scrollable-content">
          <div className="d-flex align-items-center" style={{ padding: "0px" }}>
            <img
              src={selected.image}
              alt=""
              className="me-2"
              style={{ height: "5vh" }}
            />
            <div className="d-flex">
              <div className="fs-5 col-6 col-sm-12">{selected.name?.toUpperCase()}</div>
            </div>
          </div>
          <div>{selected.description}</div>
          <div className="mt-2">
            <div className="mx-2 fs-5">STATS</div>
            <div className="px-2 infoBox">
              {selected.damage && (
                <div className="pt-1"><b>Damage:</b> {selected.damage}</div>
              )}
              {selected["damage/sec"] && (
                <div className="pt-1"><b>Damage/sec:</b> {selected["damage/sec"]}</div>
              )}
              {selected["durability damage"] && (
                <div className="pt-1"><b>Durability Damage</b> {selected["durability damage"]}</div>
              )}
              {selected["armor penetration"] && (
                <div className="pt-1"><b>Armor Penetration:</b> {selected["armor penetration"]}</div>
              )}
              <div className="pt-1"><b>Call-in Time:</b> {selected["call-in time"]}</div>
              <div className="pt-1"><b>Uses:</b> {selected.uses}</div>
              {selected.capacity && (
                <div className="pt-1"><b>Capacity:</b> {selected.capacity}</div>
              )}
              {selected["fire rate"] && (
                <div className="pt-1">
                  <b>Fire Rate:</b> {selected["fire rate"]}
                </div>
              )}
              {selected["charge time"] && (
                <div className="pt-1"><b>Charge Time:</b> {selected["charge time"]}</div>
              )}
              {selected["recharge time"] && (
                <div className="pt-1"><b>Recharge Time:</b> {selected["recharge time"]}</div>
              )}
              {selected["fire limit"] && (
                <div className="pt-1"><b>Fire Limit:</b> {selected["fire limit"]}</div>
              )}
              {selected["spare magazines"] && (
                <div className="pt-1">
                  <b>Spare Magazines:</b> {selected["spare magazines"]}
                </div>
              )}
              {selected["reload time"] && (
                <div className="pt-1"><b>Reload Time:</b> {selected["reload time"]}</div>
              )}
              {selected["tactical reload"] && (
                <div className="pt-1">
                  <b>Tactical Reload:</b> {selected["tactical reload"]}
                </div>
              )}
              {selected["rearm time"] && (
                <div className="pt-1"><b>Rearm Time:</b> {selected["rearm time"]}</div>
              )}
              <div className="py-1">
                <b>Cooldown Time:</b> {selected["cooldown time"]}
              </div>
              {selected["more info"] && (
                <div className="pt-1">
                  <a href={selected["more info"]} target="_blank" rel="noreferrer">MORE INFO</a>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="mx-2 fs-5">STRATAGEM TRAITS</div>
            <div className="px-2 infoBox">
              <div className="pt-1">
                <ul>
                  {selected["stratagem traits"] &&
                    selected["stratagem traits"].map((trait, idx) => {
                      return (
                        <li key={idx} className="pb-1">
                          {trait.toUpperCase()}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            {selected.credit && <a href={selected.credit} target="_blank" rel="noreferrer">
              Image credit
            </a>}
          </div>
        </div>
      </div> */}
    </Container>
  );
};

export default HelmetInfoView;
