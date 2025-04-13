import React from 'react'
import { ImageCreditJSX } from "./SelectorMisc";


const ArmorSelector = (selected, setSelected, showDetails, itemArray) => {
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

export default ArmorSelector

