import React from 'react'
import { MoreInfoJSX, ImageCreditJSX } from "./SelectorMisc";
import { SelectorTopObj } from './SelectorTop';

const WeaponSelector = (selected, setSelected, showDetails, itemArray) => {
  return (
    <>
      <SelectorTopObj 
        selected={selected}
        showDetails={showDetails}
        setSelected={setSelected}
        itemsObj={itemArray}
        itemsPerRow={2}
      />
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
    </>
  );
};

export default WeaponSelector

