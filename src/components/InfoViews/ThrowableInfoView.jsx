import React, { useState }  from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { MoreInfoJSX, ImageCreditJSX } from "../SubComponents/SelectorMisc";
import { InfoViewTopObj } from "./InfoViewTop";

const ThrowableInfoView = ({throwableObj}) => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const handleSelectThrowable = (throwable) => {
    setSelected(throwable);
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
        handleSelectItem={handleSelectThrowable}
        itemsObj={throwableObj}
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
      </div>
    </Container>
  );
};

export default ThrowableInfoView;
