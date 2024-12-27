import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SelectorModal = ({
  otherStratagems,
  show,
  setItem,
  onHide,
  itemArray,
  variant,
}) => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  console.log('itemArray', itemArray);

  const equipItem = () => {
    setItem(selected);
    setSelected({});
    setShowDetails(false);
    onHide();
  };

  const closeModal = () => {
    setSelected({});
    setShowDetails(false);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        {selected.name ? (
          <div className="d-flex align-items-center" style={{ padding: "0px" }}>
            <img
              src={selected.image}
              alt=""
              className="me-2"
              style={{ height: "5vh" }}
            />
            <div className="d-flex">
              <div className="fs-5">{selected.name?.toUpperCase()}</div>
            </div>
          </div>
        ) : (
          <div
            className="d-flex align-items-center fs-3"
            style={{ height: "5vh" }}
          >
            MAKE SELECTION
          </div>
        )}
      </Modal.Header>
      <Modal.Body style={{ padding: "0px" }}>
        {jsxSwitch(
          selected,
          setSelected,
          showDetails,
          itemArray,
          variant,
          otherStratagems
        )}
      </Modal.Body>
      <Modal.Footer
        className={selected.name ? "d-flex justify-content-between" : ""}
      >
        {selected.name && (
          <Button
            variant="secondary"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide" : "Show"} Details
          </Button>
        )}
        {selected.name ? (
          <Button variant="primary" onClick={equipItem}>
            Equip
          </Button>
        ) : (
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SelectorModal;

//********* */

const jsxSwitch = (
  selected,
  setSelected,
  showDetails,
  itemArray,
  variant,
  otherStratagems
) => {
  switch (variant) {
    case "stratagem":
      return stratagemJSX(
        selected,
        setSelected,
        showDetails,
        itemArray,
        otherStratagems
      );
    case "helmet":
      return helmetJSX(selected, setSelected, showDetails, itemArray);
    case "armor":
      return armorJSX(selected, setSelected, showDetails, itemArray);
    case "cape":
      return capeJSX(selected, setSelected, showDetails, itemArray);
    case "primary":
      return primaryJSX(selected, setSelected, showDetails, itemArray);
    case "secondary":
      return secondaryJSX(selected, setSelected, showDetails, itemArray);
    case "throwable":
      return throwableJSX(selected, setSelected, showDetails, itemArray);
    default:
      return;
  }
};

const stratagemJSX = (
  selected,
  setSelected,
  showDetails,
  itemArray,
  otherStratagems
) => {
  let keysArray = Object.keys(itemArray);
  return (
    <>
      <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
        {keysArray.map((stratagemKey, idx) => {
          return (
            <div key={stratagemKey + idx}>
              <p>{stratagemKey.toUpperCase()}</p>
              <div className="row">
                {itemArray[stratagemKey].map((stratagem) => {
                  let isSelected = selected.name === stratagem.name;
                  let inOtherStratagems = otherStratagems.includes(
                    stratagem.name
                  );
                  return (
                    <div className="col-3" key={stratagem.image}>
                      <img
                        className={
                          isSelected
                            ? "selected itemSelector"
                            : inOtherStratagems
                            ? "equipped itemSelector"
                            : "itemSelector"
                        }
                        src={stratagem.image}
                        alt=""
                        onClick={() => {
                          !inOtherStratagems && setSelected(stratagem);
                        }} // "disables" click when inOtherStratagems is true
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
      <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
        <div>{selected.description}</div>
        <div className="mt-2">
          <div className="mx-2 fs-5">STATS</div>
          <div className="px-2 infoBox">
            {selected.damage && (
              <div className="pt-1">DAMAGE: {selected.damage}</div>
            )}
            {selected["durability damage"] && (
              <div className="pt-1">DURABILITY DAMAGE: {selected["durability damage"]}</div>
            )}
            {selected["armor penetration"] && (
              <div className="pt-1">ARMOR PENETRATION: {selected["armor penetration"]}</div>
            )}
            <div className="pt-1">CALL-IN TIME: {selected["call-in time"]}</div>
            <div className="pt-1">USES: {selected.uses}</div>
            {selected.capacity && (
              <div className="pt-1">CAPACITY: {selected.capacity}</div>
            )}
            {selected["fire rate"] && (
              <div className="pt-1">
                FIRE RATE (RPM): {selected["fire rate"]}
              </div>
            )}
            {selected["charge time"] && (
              <div className="pt-1">CHARGE TIME: {selected["charge time"]}</div>
            )}
            {selected["recharge time"] && (
              <div className="pt-1">RECHARGE TIME: {selected["recharge time"]}</div>
            )}
            {selected["fire limit"] && (
              <div className="pt-1">FIRE LIMIT: {selected["fire limit"]}</div>
            )}
            {selected["spare magazines"] && (
              <div className="pt-1">
                SPARE MAGAZINES: {selected["spare magazines"]}
              </div>
            )}
            {selected["reload time"] && (
              <div className="pt-1">RELOAD TIME: {selected["reload time"]}</div>
            )}
            {selected["tactical reload"] && (
              <div className="pt-1">
                TACTICAL RELOAD: {selected["tactical reload"]}
              </div>
            )}
            {selected["rearm time"] && (
              <div className="pt-1">REARM TIME: {selected["rearm time"]}</div>
            )}
            <div className="py-1">
              COOLDOWN TIME: {selected["cooldown time"]}
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
                {selected.name &&
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
          <a href={selected.credit} target="_blank" rel="noreferrer">
            Image credit
          </a>
        </div>
      </div>
    </>
  );
};

const helmetJSX = (selected, setSelected, showDetails, itemArray) => {
  return (
    <>
      <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
        <div className="row">
          {itemArray.map((equipment) => {
            let isSelected = selected.name === equipment.name;
            return (
              <div className="col-4" key={equipment.image}>
                <img
                  className={
                    isSelected ? "selected itemSelector" : "itemSelector"
                  }
                  src={equipment.image}
                  alt=""
                  onClick={() => setSelected(equipment)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
        <div>{selected.description}</div>
        <div className="mt-2">
          <div className="mx-2 fs-5">STATS</div>
          <div className="px-2 infoBox">
            <div className="pt-1">ARMOR RATING: {selected["armor rating"]}</div>
            <div className="pt-1">SPEED: {selected.speed}</div>
            <div className="py-1">
              STAMINA REGEN: {selected["stamina regen"]}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="px-2 infoBox">
            <div className="pt-1">STANDARD ISSUE</div>
            <div className="py-1 ">No additional bonus</div>
          </div>
        </div>
        <a href={selected.credit} target="_blank" rel="noreferrer">
          Image credit
        </a>
      </div>
    </>
  );
};

const armorJSX = (selected, setSelected, showDetails, itemArray) => {
  let keysArray = Object.keys(itemArray);
  return (
    <>
      <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
        {keysArray.map((armorKey, idx) => {
          return (
            <div key={armorKey + idx}>
              <p>{armorKey.toUpperCase()}</p>
              <div className="row">
                {itemArray[armorKey].map((equipment) => {
                  let isSelected = selected.name === equipment.name;
                  return (
                    <div className="col-4" key={equipment.image}>
                      <img
                        className={
                          isSelected ? "selected itemSelector" : "itemSelector"
                        }
                        src={equipment.image}
                        alt=""
                        onClick={() => setSelected(equipment)}
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
      <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
        <div>{selected.description}</div>
        <div className="mt-2">
          <div className="mx-2 fs-5">STATS</div>
          <div className="px-2 infoBox">
            <div className="pt-1">ARMOR RATING: {selected["armor rating"]}</div>
            <div className="pt-1">SPEED: {selected.speed}</div>
            <div className="py-1">
              STAMINA REGEN: {selected["stamina regen"]}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="mx-2 fs-5">ARMOR PASSIVE</div>
          <div className="px-2 infoBox">
            <div className="pt-1">
              {selected["armor passive"]?.name.toUpperCase()}
            </div>
            <div className="py-1 ">
              {selected["armor passive"]?.description}
            </div>
          </div>
        </div>
        <a href={selected.credit} target="_blank" rel="noreferrer">
          Image credit
        </a>
      </div>
    </>
  );
};

const capeJSX = (selected, setSelected, showDetails, itemArray) => {
  return (
    <>
      <div className={showDetails ? "modalTopWithDetailsCape" : "modalTop"}>
        <div className="row">
          {itemArray.map((equipment) => {
            let isSelected = selected.name === equipment.name;
            return (
              <div className="col-4" key={equipment.image}>
                <img
                  className={
                    isSelected ? "selected itemSelector" : "itemSelector"
                  }
                  src={equipment.image}
                  alt=""
                  onClick={() => setSelected(equipment)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={showDetails ? "modalBottomCape" : "modalBottomClosed"}>
        <div>{selected.description}</div>
        <a href={selected.credit} target="_blank" rel="noreferrer">
          Image credit
        </a>
      </div>
    </>
  );
};

const primaryJSX = (selected, setSelected, showDetails, itemArray) => {
  let keysArray = Object.keys(itemArray);
  return (
    <>
      <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
        {keysArray.map((weaponKey, idx) => {
          return (
            <div key={weaponKey + idx}>
              <p>{weaponKey.toUpperCase()}</p>
              <div className="row">
                {itemArray[weaponKey].map((equipment) => {
                  let isSelected = selected.name === equipment.name;
                  return (
                    <div className="col-6" key={equipment.image}>
                      <img
                        className={
                          isSelected ? "selected itemSelector" : "itemSelector"
                        }
                        src={equipment.image}
                        alt=""
                        onClick={() => setSelected(equipment)}
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
      <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
        <div>{selected.description}</div>
        <div className="mt-2">
          <div className="mx-2 fs-5">STATS</div>
          <div className="px-2 infoBox">
            {selected.damage && (
              <div className="pt-1">DAMAGE: {selected.damage}</div>
            )}
            {selected["damage/sec"] && (
              <div className="pt-1">DAMAGE/SEC: {selected["damage/sec"]}</div>
            )}
            {selected["durability damage"] && (
              <div className="pt-1">DURABILITY DAMAGE: {selected["durability damage"]}</div>
            )}
            {selected["armor penetration"] && (
              <div className="pt-1">ARMOR PENETRATION: {selected["armor penetration"]}</div>
            )}
            {selected.capacity && (
              <div className="pt-1">CAPACITY: {selected.capacity}</div>
            )}
            <div className="py-1">RECOIL: {selected.recoil}</div>
            {selected["fire rate"] && (
              <div className="pt-1">
                FIRE RATE (RPM): {selected["fire rate"]}
              </div>
            )}
            {selected["fire limit"] && (
              <div className="pt-1">FIRE LIMIT: {selected["fire limit"]}</div>
            )}
            {selected["spare magazines"] && (
              <div className="pt-1">
                SPARE MAGAZINES: {selected["spare magazines"]}
              </div>
            )}
            {selected["reload time"] && (
              <div className="pt-1">RELOAD TIME: {selected["reload time"]}</div>
            )}
            {selected["tactical reload"] && (
              <div className="pt-1">
                TACTICAL RELOAD: {selected["tactical reload"]}
              </div>
            )}
            {selected["more info"] && (
              <div className="pt-1">
                <a href={selected["more info"]} target="_blank" rel="noreferrer">MORE INFO</a>
              </div>
            )}
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
          <a href={selected.credit} target="_blank" rel="noreferrer">
            Image credit
          </a>
        </div>
      </div>
    </>
  );
};

const secondaryJSX = (selected, setSelected, showDetails, itemArray) => {
  let keysArray = Object.keys(itemArray);
  return (
    <>
      <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
        {keysArray.map((weaponKey, idx) => {
          return (
            <div key={weaponKey + idx}>
              <p>{weaponKey.toUpperCase()}</p>
              <div className="row">
                {itemArray[weaponKey].map((equipment) => {
                  let isSelected = selected.name === equipment.name;
                  return (
                    <div className="col-6" key={equipment.image}>
                      <img
                        className={
                          isSelected ? "selected itemSelector" : "itemSelector"
                        }
                        src={equipment.image}
                        alt=""
                        onClick={() => setSelected(equipment)}
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
      <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
        <div>{selected.description}</div>
        <div className="mt-2">
          <div className="mx-2 fs-5">STATS</div>
          <div className="px-2 infoBox">
            {selected.damage && (
              <div className="pt-1">DAMAGE: {selected.damage}</div>
            )}
            {selected["damage/sec"] && (
              <div className="pt-1">DAMAGE/SEC: {selected["damage/sec"]}</div>
            )}
            {selected.capacity && (
              <div className="pt-1">CAPACITY: {selected.capacity}</div>
            )}
            <div className="py-1">RECOIL: {selected.recoil}</div>
            {selected["fire rate"] && (
              <div className="pt-1">
                FIRE RATE (RPM): {selected["fire rate"]}
              </div>
            )}
            {selected["fire limit"] && (
              <div className="pt-1">FIRE LIMIT: {selected["fire limit"]}</div>
            )}
            {selected["spare magazines"] && (
              <div className="pt-1">
                SPARE MAGAZINES: {selected["spare magazines"]}
              </div>
            )}
            {selected["reload time"] && (
              <div className="pt-1">RELOAD TIME: {selected["reload time"]}</div>
            )}
            {selected["tactical reload"] && (
              <div className="pt-1">
                TACTICAL RELOAD: {selected["tactical reload"]}
              </div>
            )}
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
          <a href={selected.credit} target="_blank" rel="noreferrer">
            Image credit
          </a>
        </div>
      </div>
    </>
  );
};

const throwableJSX = (selected, setSelected, showDetails, itemArray) => {
  let keysArray = Object.keys(itemArray);
  return (
    <>
      <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
        {keysArray.map((throwableKey, idx) => {
          return (
            <div key={throwableKey + idx}>
              <p>{throwableKey.toUpperCase()}</p>
              <div className="row">
                {itemArray[throwableKey].map((equipment) => {
                  let isSelected = selected.name === equipment.name;
                  return (
                    <div className="col-4" key={equipment.image}>
                      <img
                        className={
                          isSelected ? "selected itemSelector" : "itemSelector"
                        }
                        src={equipment.image}
                        alt=""
                        onClick={() => setSelected(equipment)}
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
      <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
        <div>{selected.description}</div>
        <div className="mt-2">
          <div className="mx-2 fs-5">STATS</div>
          <div className="px-2 infoBox">
            <div className="pt-1">DAMAGE: {selected.damage}</div>
            <div className="pt-1">PENETRATION: {selected.penetration}</div>
            {selected.outer_radius && (
              <div className="pt-1">OUTER RADIUS: {selected.outer_radius}</div>
            )}
            {selected.fuse_time && (
              <div className="py-1">FUSE TIME: {selected.fuse_time}</div>
            )}
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
          <a href={selected.credit} target="_blank" rel="noreferrer">
            Image credit
          </a>
        </div>
      </div>
    </>
  );
};
