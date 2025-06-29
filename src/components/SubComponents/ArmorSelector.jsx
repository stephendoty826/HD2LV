import { ImageCreditJSX } from "./SelectorMisc";
import { SelectorTopObj } from './SelectorTop';

const ArmorSelector = (selected, setSelected, showDetails, itemArray, equipItemDirectly) => {
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
              {selected["armor passive"]?.name?.toUpperCase()}
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

