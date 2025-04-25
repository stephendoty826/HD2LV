import React from 'react'
import { ImageCreditJSX } from "./SelectorMisc";
import { SelectorTopArr } from './SelectorTop';

const HelmetAndCapeSelector = (selected, setSelected, showDetails, itemArray) => {
  return (
    <>
      <SelectorTopArr 
        selected={selected}
        showDetails={showDetails}
        setSelected={setSelected}
        itemsArr={itemArray}
        itemsPerRow={3}
      />
      <div className={showDetails ? "modalBottom" : "modalBottomClosed"}>
        <div>{selected.description}</div>
          <div className="mt-2">
            <div className="mx-2 fs-5">STATS</div>
            <div className="px-2 infoBox">
              <div className="pt-1"><b>Armor Rating:</b> {selected["armor rating"] || 0}</div>
              <div className="pt-1"><b>Speed:</b> {selected.speed || 0}</div>
              <div className="py-1">
                <b>Stamina Regen:</b> {selected["stamina regen"] || 0}
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

