import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import helldivers2Data from "../../gameData/helldivers2.json";

const HelmetInfoView = () => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  let helmetsArr = helldivers2Data.helmets;

  const handleSelectHelmet = (equipment) => {
    setSelected(equipment);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelected({});
  };

  //todo figure out where to put this function? Remember `this` is different for arrow functions vs regular functions. 
  // function scrollIntoView (){
  //   const elementRect = this.getBoundingClientRect();
  //   const absoluteElementTop = elementRect.top + window.pageYOffset;
  //   const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
  
  //   window.scrollTo({
  //     top: middle,
  //     behavior: 'smooth'
  //   });
  // } 

  return (
    <Container className="d-flex flex-column align-items-center">
      <div>
        <div
          className={showDetails ? "infoContainerWithDetails" : "infoContainer"}
        >
          <div className="row">
            {helmetsArr.map((equipment) => {
              let isSelected = selected.name === equipment.name;
              return (
                <div className="col-4" key={equipment.image}>
                  <img
                    className={
                      isSelected ? "selected itemSelector" : "itemSelector"
                    }
                    src={equipment.image}
                    alt=""
                    onClick={() => handleSelectHelmet(equipment)}
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HelmetInfoView;
