import React from 'react'
import { MoreInfoJSX, ImageCreditJSX } from "./SelectorMisc";


const ThrowableSelector = (selected, setSelected, showDetails, itemArray) => {
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
            <div className="pt-1">
              <b>Damage:</b> {selected.damage}
            </div>
            {selected["durability damage"] && (
              <div className="pt-1">
                <b>Durability Damage:</b> {selected["durability damage"]}
              </div>
            )}
            <div className="pt-1">
              <b>Penetration:</b> {selected.penetration}
            </div>
            {selected.outer_radius && (
              <div className="pt-1">
                <b>Outer Radius:</b> {selected.outer_radius}
              </div>
            )}
            {selected.fuse_time && (
              <div className="py-1">
                <b>Fuse Time:</b> {selected.fuse_time}
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
    </>
  );
};


export default ThrowableSelector

