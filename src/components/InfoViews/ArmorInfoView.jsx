import { useState }  from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import helldivers2Data from "../../gameData";
import { ImageCreditJSX } from "../SubComponents/SelectorMisc";
import { InfoViewTopObj } from "./InfoViewTop";

const ArmorInfoView = () => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  let armorObj = helldivers2Data.armor;

  const handleSelectArmor = (equipment) => {
    setSelected(equipment);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelected({});
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <InfoViewTopObj 
        selected={selected}
        showDetails={showDetails}
        handleSelectItem={handleSelectArmor}
        itemsObj={armorObj}
        itemsPerRow={3}
      />
      <div
        className={
          showDetails ? "infoContainerBottom w-100" : "modalBottomClosed w-100"
        }
      >
        <Button
          className="floating-btn"
          variant="dark"
          onClick={handleCloseDetails}
        >
          Close
        </Button>
        <div className="scrollable-content">
          <div className="d-flex align-items-center" style={{ padding: "0px" }}>
            <img
              src={selected.image}
              alt=""
              className="me-2"
              style={{ height: "5vh" }}
            />
            <div className="d-flex">
              <div className="fs-5 col-6 col-sm-12">
                {selected.name?.toUpperCase()}
              </div>
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
      </div>
    </Container>
  );
};

export default ArmorInfoView;
