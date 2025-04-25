import React, { useRef, useEffect } from "react";
import { scrollToItem } from "../../misc/utils";

export const InfoViewTopObj = ({selected, showDetails, handleSelectItem, itemsObj, itemsPerRow}) => {
  const itemRefs = useRef([]);

  let cssCol = ""

  switch(itemsPerRow){
    case 2:
      cssCol = "col-6";
      break;
    case 3:
      cssCol = "col-4";
      break;
    case 4:
      cssCol = "col-3";
      break;
  }

  let flatIndex = 0; // index for scrolling to stratagem when clicked

  let keysArray = Object.keys(itemsObj);

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
    <div
      className={showDetails ? "infoContainerWithDetails" : "infoContainer"}
    >
      {keysArray.map((itemKey, idx) => {
        return (
          <div key={itemKey + idx}>
            <p>{itemKey.toUpperCase()}</p>
            <div className="row">
              {itemsObj[itemKey].map((item) => {
                let isSelected = selected?.name === item.name;
                const refIndex = flatIndex; // capture current flat index
                flatIndex++; // increment for next one

                return (
                  <div className={cssCol} key={item.image}>
                    <img
                      className={
                        isSelected ? "selected itemSelector" : "itemSelector"
                      }
                      src={item.image}
                      alt=""
                      ref={(el) => (itemRefs.current[refIndex] = el)}
                      onClick={() => handleSelectItem(item)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};


export const InfoViewTopArr = ({selected, showDetails, handleSelectItem, itemsArr, itemsPerRow}) => {
  const itemRefs = useRef([]);

  let cssCol = ""

  switch(itemsPerRow){
    case 2:
      cssCol = "col-6";
      break;
    case 3:
      cssCol = "col-4";
      break;
    case 4:
      cssCol = "col-3";
      break;
  }

  useEffect(() => {
    if(showDetails && selected.name){
      const index = itemsArr.findIndex(item => item.name === selected.name)

      if(index !== -1){
        const element = itemRefs.current[index]
        scrollToItem(element)
      }
    }
  
  }, [showDetails, selected.name, itemsArr])

  return (
    <div
      className={showDetails ? "infoContainerWithDetails" : "infoContainer"}
    >
      <div className="row">
        {itemsArr.map((equipment, idx) => {
          let isSelected = selected.name === equipment.name;
          return (
            <div className="col-4" key={equipment.image}>
              <img
                className={
                  isSelected ? "selected itemSelector" : "itemSelector"
                }
                src={equipment.image}
                alt=""
                ref={(el) => (itemRefs.current[idx] = el)}
                onClick={() => handleSelectItem(equipment, idx)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

