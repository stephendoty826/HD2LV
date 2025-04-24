import React, { useState, useRef, useEffect }  from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { scrollToItem } from "../../misc/utils";
import { MoreInfoJSX, ImageCreditJSX } from "../SubComponents/SelectorMisc";

const ThrowableInfoView = ({throwableObj}) => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const throwableRefs = useRef([])

  let flatIndex = 0; // index for scrolling to armor when clicked

  let keysArray = Object.keys(throwableObj);

  const handleSelectThrowable = (throwable) => {
    setSelected(throwable);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelected({});
  };

  useEffect(() => {
    if(showDetails && selected.name){

      const flatThrowableArr = keysArray.flatMap(key => throwableObj[key]);

      const index = flatThrowableArr.findIndex(throwable => throwable.name === selected.name)

      if(index !== -1){
        const element = throwableRefs.current[index]
        scrollToItem(element)
      }
    }

  }, [showDetails, selected.name, keysArray, throwableObj])

  return (
    <Container className="d-flex flex-column align-items-center">
      <div
        className={showDetails ? "infoContainerWithDetails" : "infoContainer"}
      >
        {keysArray.map((throwableKey, idx) => {
          return (
            <div key={throwableKey + idx}>
              <p>{throwableKey.toUpperCase()}</p>
              <div className="row">
                {throwableObj[throwableKey].map((throwable) => {
                  let isSelected = selected.name === throwable.name;
                  const refIndex = flatIndex; // capture current flat index
                  flatIndex++ // increment for next one

                  return (
                    <div className="col-4" key={throwable.image}>
                      <img
                        className={
                          isSelected ? "selected itemSelector" : "itemSelector"
                        }
                        src={throwable.image}
                        alt=""
                        ref={(el) => (throwableRefs.current[refIndex] = el)}
                        onClick={() => handleSelectThrowable(throwable)}
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
