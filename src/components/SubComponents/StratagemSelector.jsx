import React from 'react'
import { MoreInfoJSX, ImageCreditJSX } from "./SelectorMisc";


const StratagemSelector = (
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
              <div className="pt-1">
                <b>Damage:</b> {selected.damage}
              </div>
            )}
            {selected["damage/sec"] && (
              <div className="pt-1">
                <b>Damage/sec:</b> {selected["damage/sec"]}
              </div>
            )}
            {selected["durability damage"] && (
              <div className="pt-1">
                <b>Durability Damage</b> {selected["durability damage"]}
              </div>
            )}
            {selected["armor penetration"] && (
              <div className="pt-1">
                <b>Armor Penetration:</b> {selected["armor penetration"]}
              </div>
            )}
            <div className="pt-1">
              <b>Call-in Time:</b> {selected["call-in time"]}
            </div>
            <div className="pt-1">
              <b>Uses:</b> {selected.uses}
            </div>
            {selected.capacity && (
              <div className="pt-1">
                <b>Capacity:</b> {selected.capacity}
              </div>
            )}
            {selected["fire rate"] && (
              <div className="pt-1">
                <b>Fire Rate:</b> {selected["fire rate"]}
              </div>
            )}
            {selected["charge time"] && (
              <div className="pt-1">
                <b>Charge Time:</b> {selected["charge time"]}
              </div>
            )}
            {selected["recharge time"] && (
              <div className="pt-1">
                <b>Recharge Time:</b> {selected["recharge time"]}
              </div>
            )}
            {selected["fire limit"] && (
              <div className="pt-1">
                <b>Fire Limit:</b> {selected["fire limit"]}
              </div>
            )}
            {selected["spare magazines"] && (
              <div className="pt-1">
                <b>Spare Magazines:</b> {selected["spare magazines"]}
              </div>
            )}
            {selected["reload time"] && (
              <div className="pt-1">
                <b>Reload Time:</b> {selected["reload time"]}
              </div>
            )}
            {selected["tactical reload"] && (
              <div className="pt-1">
                <b>Tactical Reload:</b> {selected["tactical reload"]}
              </div>
            )}
            {selected["rearm time"] && (
              <div className="pt-1">
                <b>Rearm Time:</b> {selected["rearm time"]}
              </div>
            )}
            <div className="py-1">
              <b>Cooldown Time:</b> {selected["cooldown time"]}
            </div>
            <MoreInfoJSX selected={selected} />
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
          <ImageCreditJSX selected={selected} />
        </div>
      </div>
    </>
  );
};

export default StratagemSelector

