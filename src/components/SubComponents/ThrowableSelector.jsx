import React from 'react'
import { MoreInfoJSX, ImageCreditJSX } from "./SelectorMisc";
import { SelectorTopObj } from './SelectorTop';

const ThrowableSelector = (selected, setSelected, showDetails, itemArray, equipItemDirectly) => {
  return (
    <>
      <SelectorTopObj 
        selected={selected}
        showDetails={showDetails}
        setSelected={setSelected}
        itemsObj={itemArray}
        itemsPerRow={3}
        equipItemDirectly={equipItemDirectly}
      />
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

