import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import WeaponSelector from "./SelectorSubComponents/WeaponSelector";
//TODO remove below import
import { MoreInfoJSX, ImageCreditJSX } from "./SelectorSubComponents/SelectorMisc";

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
      return WeaponSelector(selected, setSelected, showDetails, itemArray);
    case "secondary":
      return WeaponSelector(selected, setSelected, showDetails, itemArray);
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
            <MoreInfoJSX selected={selected}/>
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
          <ImageCreditJSX selected={selected}/>
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
            <div className="pt-1"><b>Armor Rating:</b> {selected["armor rating"]}</div>
            <div className="pt-1"><b>Speed:</b> {selected.speed}</div>
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
        <ImageCreditJSX selected={selected}/>
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
            <div className="pt-1"><b>Armor Rating:</b> {selected["armor rating"]}</div>
            <div className="pt-1"><b>Speed:</b> {selected.speed}</div>
            <div className="py-1">
              <b>Stamina Regen:</b> {selected["stamina regen"]}
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
        <ImageCreditJSX selected={selected}/>
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
        <ImageCreditJSX selected={selected}/>
      </div>
    </>
  );
};

// const primaryJSX = (selected, setSelected, showDetails, itemArray) => {
//   let keysArray = Object.keys(itemArray);
//   return (
//     <>
//       <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
//         {keysArray.map((weaponKey, idx) => {
//           return (
//             <div key={weaponKey + idx}>
//               <p>{weaponKey.toUpperCase()}</p>
//               <div className="row">
//                 {itemArray[weaponKey].map((equipment) => {
//                   let isSelected = selected.name === equipment.name;
//                   return (
//                     <div className="col-6" key={equipment.image}>
//                       <img
//                         className={
//                           isSelected ? "selected itemSelector" : "itemSelector"
//                         }
//                         src={equipment.image}
//                         alt=""
//                         onClick={() => setSelected(equipment)}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//               <hr />
//             </div>
//           );
//         })}
//       </div>
//       <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
//         <div>{selected.description}</div>
//         <div className="mt-2">
//           <div className="mx-2 fs-5">STATS</div>
//           <div className="px-2 infoBox">
//             {selected.damage && (
//               <div className="pt-1"><b>Damage</b> {selected.damage}</div>
//             )}
//             {selected["damage/sec"] && (
//               <div className="pt-1"><b>Damage/sec:</b> {selected["damage/sec"]}</div>
//             )}
//             {selected["durability damage"] && (
//               <div className="pt-1"><b>Durability Damage:</b> {selected["durability damage"]}</div>
//             )}
//             {selected["armor penetration"] && (
//               <div className="pt-1"><b>Armor Penetration:</b> {selected["armor penetration"]}</div>
//             )}
//             {selected.capacity && (
//               <div className="pt-1"><b>Capacity:</b> {selected.capacity}</div>
//             )}
//             <div className="py-1"><b>Recoil:</b> {selected.recoil}</div>
//             {selected["fire rate"] && (
//               <div className="pt-1">
//                 <b>Fire Rate (rpm):</b> {selected["fire rate"]}
//               </div>
//             )}
//             {selected["fire limit"] && (
//               <div className="pt-1"><b>Fire Limit:</b> {selected["fire limit"]}</div>
//             )}
//             {selected["spare magazines"] && (
//               <div className="pt-1">
//                 <b>Spare Magazines:</b> {selected["spare magazines"]}
//               </div>
//             )}
//             {selected["reload time"] && (
//               <div className="pt-1"><b>Reload Time:</b> {selected["reload time"]}</div>
//             )}
//             {selected["tactical reload"] && (
//               <div className="pt-1">
//                 <b>Tactical Reload:</b> {selected["tactical reload"]}
//               </div>
//             )}
//             <MoreInfoJSX selected={selected}/>
//           </div>
//         </div>
//         <div className="mt-2">
//           {selected["weapon traits"] && (
//             <div>
//               <div className="mx-2 fs-5">WEAPON TRAITS</div>
//               <div className="px-2 infoBox">
//                 <div className="pt-1">
//                   <ul>
//                     {selected["weapon traits"].map((trait, idx) => {
//                       return (
//                         <li key={idx} className="pb-1">
//                           {trait.toUpperCase()}
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}
//           <ImageCreditJSX selected={selected}/>
//         </div>
//       </div>
//     </>
//   );
// };

// const secondaryJSX = (selected, setSelected, showDetails, itemArray) => {
//   let keysArray = Object.keys(itemArray);
//   return (
//     <>
//       <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
//         {keysArray.map((weaponKey, idx) => {
//           return (
//             <div key={weaponKey + idx}>
//               <p>{weaponKey.toUpperCase()}</p>
//               <div className="row">
//                 {itemArray[weaponKey].map((equipment) => {
//                   let isSelected = selected.name === equipment.name;
//                   return (
//                     <div className="col-6" key={equipment.image}>
//                       <img
//                         className={
//                           isSelected ? "selected itemSelector" : "itemSelector"
//                         }
//                         src={equipment.image}
//                         alt=""
//                         onClick={() => setSelected(equipment)}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//               <hr />
//             </div>
//           );
//         })}
//       </div>
//       <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
//         <div>{selected.description}</div>
//         <div className="mt-2">
//           <div className="mx-2 fs-5">STATS</div>
//           <div className="px-2 infoBox">
//             {selected.damage && (
//               <div className="pt-1"><b>Damage:</b> {selected.damage}</div>
//             )}
//             {selected["damage/sec"] && (
//               <div className="pt-1"><b>Damage/sec:</b> {selected["damage/sec"]}</div>
//             )}
//             {selected["durability damage"] && (
//               <div className="pt-1"><b>Durability Damage:</b> {selected["durability damage"]}</div>
//             )}
//             {selected.capacity && (
//               <div className="pt-1"><b>Capacity:</b> {selected.capacity}</div>
//             )}
//             <div className="py-1"><b>Recoil:</b> {selected.recoil}</div>
//             {selected["fire rate"] && (
//               <div className="pt-1">
//                 <b>Fire Rate (rpm):</b> {selected["fire rate"]}
//               </div>
//             )}
//             {selected["fire limit"] && (
//               <div className="pt-1"><b>Fire Limit:</b> {selected["fire limit"]}</div>
//             )}
//             {selected["spare magazines"] && (
//               <div className="pt-1">
//                 <b>Spare Magazines:</b> {selected["spare magazines"]}
//               </div>
//             )}
//             {selected["reload time"] && (
//               <div className="pt-1"><b>Reload Time:</b> {selected["reload time"]}</div>
//             )}
//             {selected["tactical reload"] && (
//               <div className="pt-1">
//                 <b>Tactical Reload:</b> {selected["tactical reload"]}
//               </div>
//             )}
//             <MoreInfoJSX selected={selected}/>
//           </div>
//         </div>
//         <div className="mt-2">
//           {selected["weapon traits"] && (
//             <div>
//               <div className="mx-2 fs-5">WEAPON TRAITS</div>
//               <div className="px-2 infoBox">
//                 <div className="pt-1">
//                   <ul>
//                     {selected["weapon traits"].map((trait, idx) => {
//                       return (
//                         <li key={idx} className="pb-1">
//                           {trait.toUpperCase()}
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}
//           <ImageCreditJSX selected={selected}/>
//         </div>
//       </div>
//     </>
//   );
// };

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
            <div className="pt-1"><b>Damage:</b> {selected.damage}</div>
            {selected["durability damage"] && <div className="pt-1"><b>Durability Damage:</b> {selected["durability damage"]}</div>}
            <div className="pt-1"><b>Penetration:</b> {selected.penetration}</div>
            {selected.outer_radius && (
              <div className="pt-1"><b>Outer Radius:</b> {selected.outer_radius}</div>
            )}
            {selected.fuse_time && (
              <div className="py-1"><b>Fuse Time:</b> {selected.fuse_time}</div>
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
    </>
  );
};
