import React, { useState, useRef, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button"
import helldivers2Data from "../../gameData/helldivers2.json";
import { scrollToItem } from "../../misc/utils";
import { MoreInfoJSX, ImageCreditJSX } from "../SubComponents/SelectorMisc";

const StratagemInfoView = () => {

  const [selected, setSelected] = useState({})
  const [showDetails, setShowDetails] = useState(false)
  const stratagemRefs = useRef([])

  let flatIndex = 0; // index for scrolling to stratagem when clicked

  let stratagemObj = helldivers2Data.stratagems
  
  let keysArray = Object.keys(stratagemObj);

  const handleSelectStrat = (stratagem) => {
    setSelected(stratagem)
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelected({})
  }

  useEffect(() => {
    if(showDetails && selected.name){

      const flatStratArr = keysArray.flatMap(key => stratagemObj[key]);

      const index = flatStratArr.findIndex(strat => strat.name === selected.name)

      if(index !== -1){
        const element = stratagemRefs.current[index]
        scrollToItem(element)
      }
    }

  }, [showDetails, selected.name, keysArray, stratagemObj])

  return (
    <Container className="d-flex flex-column align-items-center">
      <div className={showDetails ? "infoContainerWithDetails" : "infoContainer"}>
        {keysArray.map((stratagemKey, idx) => {
          return (
            <div key={stratagemKey + idx}>
              <p>{stratagemKey.toUpperCase()}</p>
              <div className="row">
                {stratagemObj[stratagemKey].map((stratagem) => {
                  let isSelected = selected?.name === stratagem.name;
                  const refIndex = flatIndex; // capture current flat index
                  flatIndex++ // increment for next one

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
                        ref={(el) => (stratagemRefs.current[refIndex] = el)}
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
          </div>
          <ImageCreditJSX selected={selected}/>
        </div>
      </div>
    </Container>
  );
}

export default StratagemInfoView