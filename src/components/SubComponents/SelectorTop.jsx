import { useRef, useEffect } from "react";
import { scrollToItem } from "../../misc/utils";

export const SelectorTopObj = ({
  selected,
  showDetails,
  setSelected,
  itemsObj,
  otherSelectedItems,
  itemsPerRow,
  equipItemDirectly,
}) => {

  const itemRefs = useRef([]);

  const cssCol = cssColSwitcher(itemsPerRow);

  let flatIndex = 0; // index for scrolling to item when clicked

  const keysArray = Object.keys(itemsObj);

  useEffect(() => {
    if (showDetails && selected.name) {
      const flatStratArr = keysArray.flatMap((key) => itemsObj[key]);

      const index = flatStratArr.findIndex(
        (item) => item.name === selected.name
      );

      if (index !== -1) {
        const element = itemRefs.current[index];
        scrollToItem(element);
      }
    }
  }, [showDetails, selected.name, keysArray, itemsObj]);

  return (
    <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
    {keysArray.map((itemKey, idx) => {
      return (
        <div key={itemKey + idx}>
          <p>{itemKey.toUpperCase()}</p>
          <div className="row">
            {itemsObj[itemKey].map((item) => {
              let isSelected = selected.name === item.name;

              let inOtherSelectedItems = otherSelectedItems?.includes(
                item.name
              );

              const refIndex = flatIndex; // capture current flat index
              flatIndex++; // increment for next one

              return (
                <div className={cssCol} key={item.image}>
                  <img
                    className={
                      isSelected
                        ? "selected itemSelector"
                        : inOtherSelectedItems
                        ? "equipped itemSelector"
                        : "itemSelector"
                    }
                    src={item.image}
                    alt=""
                    ref={(el) => (itemRefs.current[refIndex] = el)}
                    onClick={() => {
                      !inOtherSelectedItems && setSelected(item);
                    }} // "disables" click when inOtherSelectedItems is true
                    onDoubleClick={() => {
                      !inOtherSelectedItems && equipItemDirectly && equipItemDirectly(item);
                    }} // "disables" double-click when inOtherSelectedItems is true
                  />
                </div>
              );
            })}
          </div>
          {/* // adds a horizontal line <hr /> between the arrays but skips the last one.  */}
          {(idx + 1) % keysArray.length !== 0 && <hr />} 
        </div>
      );
    })}
  </div>
  );
};

export const SelectorTopArr = ({
  selected,
  showDetails,
  setSelected,
  itemsArr,
  itemsPerRow,
  equipItemDirectly,
}) => {
  const itemRefs = useRef([]);

  let cssCol = cssColSwitcher(itemsPerRow);

  useEffect(() => {
    if (showDetails && selected.name) {
      const index = itemsArr.findIndex((item) => item.name === selected.name);

      if (index !== -1) {
        const element = itemRefs.current[index];
        scrollToItem(element);
      }
    }
  }, [showDetails, selected.name, itemsArr]);

  return (
    <div className={showDetails ? "modalTopWithDetails" : "modalTop"}>
    <div className="row">
      {itemsArr.map((equipment, idx) => {
        let isSelected = selected.name === equipment.name;
        return (
          <div className={cssCol} key={equipment.image}>
            <img
              className={
                isSelected ? "selected itemSelector" : "itemSelector"
              }
              src={equipment.image}
              alt=""
              ref={(el) => (itemRefs.current[idx] = el)}
              onClick={() => setSelected(equipment)}
              onDoubleClick={() => {
                equipItemDirectly && equipItemDirectly(equipment);
              }}
            />
          </div>
        );
      })}
    </div>
  </div>
  );
};

function cssColSwitcher(itemsPerRow) {
  return itemsPerRow === 2
    ? "col-6"
    : itemsPerRow === 3
    ? "col-4"
    : itemsPerRow === 4
    ? "col-3"
    : "col-4";
}