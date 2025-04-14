import React from 'react'
import { ImageCreditJSX } from "./SelectorMisc";


const HelmetAndCapeSelector = (selected, setSelected, showDetails, itemArray) => {
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

export default HelmetAndCapeSelector

