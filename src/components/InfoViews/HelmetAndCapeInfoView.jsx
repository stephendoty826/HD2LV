import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { scrollToItem } from "../../misc/utils";
import { ImageCreditJSX } from "../SubComponents/SelectorMisc";

const HelmetAndCapeInfoView = ({itemsArr}) => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const itemRefs = useRef([])

  function handleSelectItem (equipment) {
    setSelected(equipment);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelected({});
  };

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
    <Container className="d-flex flex-column align-items-center">
      <div>
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
        <div className={showDetails ? "infoContainerBottom w-100" : "modalBottomClosed w-100"}>
        <Button className="floating-btn" variant="dark" onClick={handleCloseDetails}>Close</Button>
        <div className="scrollable-content">
          <div className="d-flex align-items-center" style={{ padding: "0px" }}>
              <img
                src={selected.image}
                alt=""
                className="me-2"
                style={{ height: "5vh" }}
              />
              <div className="d-flex">
                <div className="fs-5 col-6 col-sm-12">{selected.name?.toUpperCase()}</div>
              </div>
            </div>
            <div>{selected.description}</div>
            <div className="mt-2">
              <div className="mx-2 fs-5">STATS</div>
              <div className="px-2 infoBox">
                <div className="pt-1">
                  <b>Armor Rating:</b> {selected["armor rating"]}
                </div>
                <div className="pt-1">
                  <b>Speed:</b> {selected.speed}
                </div>
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
        </div>
      </div>
    </Container>
  );
};

export default HelmetAndCapeInfoView;
