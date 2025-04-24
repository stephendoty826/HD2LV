import React, { useState, useRef, useEffect }  from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { scrollToItem } from "../../misc/utils";
import { MoreInfoJSX, ImageCreditJSX } from "../SubComponents/SelectorMisc";

const WeaponsInfoView = ({weaponsObj}) => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const weaponRefs = useRef([])

  let flatIndex = 0; // index for scrolling to armor when clicked

  let keysArray = Object.keys(weaponsObj);

  const handleSelectWeapon = (weapon) => {
    setSelected(weapon);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelected({});
  };

  useEffect(() => {
    if(showDetails && selected.name){

      const flatWeaponsArr = keysArray.flatMap(key => weaponsObj[key]);

      const index = flatWeaponsArr.findIndex(weapon => weapon.name === selected.name)

      if(index !== -1){
        const element = weaponRefs.current[index]
        scrollToItem(element)
      }
    }

  }, [showDetails, selected.name, keysArray, weaponsObj])

  return (
    <Container className="d-flex flex-column align-items-center">
      <div
        className={showDetails ? "infoContainerWithDetails" : "infoContainer"}
      >
        {keysArray.map((weaponKey, idx) => {
          return (
            <div key={weaponKey + idx}>
              <p>{weaponKey.toUpperCase()}</p>
              <div className="row">
                {weaponsObj[weaponKey].map((weapon) => {
                  let isSelected = selected.name === weapon.name;
                  const refIndex = flatIndex; // capture current flat index
                  flatIndex++ // increment for next one

                  return (
                    <div className="col-6" key={weapon.image}>
                      <img
                        className={
                          isSelected ? "selected itemSelector" : "itemSelector"
                        }
                        src={weapon.image}
                        alt=""
                        ref={(el) => (weaponRefs.current[refIndex] = el)}
                        onClick={() => handleSelectWeapon(weapon)}
                      />
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
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
                <div className="pt-1"><b>Damage:</b> {selected.damage}</div>
              )}
              {selected["damage/sec"] && (
                <div className="pt-1"><b>Damage/sec:</b> {selected["damage/sec"]}</div>
              )}
              {selected["durability damage"] && (
                <div className="pt-1"><b>Durability Damage:</b> {selected["durability damage"]}</div>
              )}
              {selected["armor penetration"] && (
                <div className="pt-1"><b>Armor Penetration:</b> {selected["armor penetration"]}</div>
              )}
              {selected.capacity && (
                <div className="pt-1"><b>Capacity:</b> {selected.capacity}</div>
              )}
              <div className="py-1"><b>Recoil:</b> {selected.recoil}</div>
              {selected["fire rate"] && (
                <div className="pt-1">
                  <b>Fire Rate (rpm):</b> {selected["fire rate"]}
                </div>
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
              <MoreInfoJSX selected={selected}/>
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
            <ImageCreditJSX selected={selected}/>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WeaponsInfoView;
