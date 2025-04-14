import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import WeaponSelector from "./SubComponents/WeaponSelector";
import ArmorSelector from "./SubComponents/ArmorSelector";
import HelmetAndCapeSelector from "./SubComponents/HelmetAndCapeSelector";
import ThrowableSelector from "./SubComponents/ThrowableSelector";
import StratagemSelector from "./SubComponents/StratagemSelector";

const SelectorModal = ({
  otherStratagems,
  show,
  setItem,
  onHide,
  itemArray,
  variant,
}) => {
  const [selected, setSelected] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const equipItem = () => {
    setItem(selected);
    setSelected({});
    setShowDetails(false);
    onHide();
  };

  const closeModal = () => {
    setSelected({});
    setShowDetails(false);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        {selected.name ? (
          <div className="d-flex align-items-center" style={{ padding: "0px" }}>
            <img
              src={selected.image}
              alt=""
              className="me-2"
              style={{ height: "5vh" }}
            />
            <div className="d-flex">
              <div className="fs-5">{selected.name?.toUpperCase()}</div>
            </div>
          </div>
        ) : (
          <div
            className="d-flex align-items-center fs-3"
            style={{ height: "5vh" }}
          >
            MAKE SELECTION
          </div>
        )}
      </Modal.Header>
      <Modal.Body style={{ padding: "0px" }}>
        {jsxSwitch(
          selected,
          setSelected,
          showDetails,
          itemArray,
          variant,
          otherStratagems
        )}
      </Modal.Body>
      <Modal.Footer
        className={selected.name ? "d-flex justify-content-between" : ""}
      >
        {selected.name && (
          <Button
            variant="secondary"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide" : "Show"} Details
          </Button>
        )}
        {selected.name ? (
          <Button variant="primary" onClick={equipItem}>
            Equip
          </Button>
        ) : (
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SelectorModal;

//********* */

const jsxSwitch = (
  selected,
  setSelected,
  showDetails,
  itemArray,
  variant,
  otherStratagems
) => {
  switch (variant) {
    case "stratagem":
      return StratagemSelector(
        selected,
        setSelected,
        showDetails,
        itemArray,
        otherStratagems
      );
    case "helmet":
      return HelmetAndCapeSelector(selected, setSelected, showDetails, itemArray);
    case "armor":
      return ArmorSelector(selected, setSelected, showDetails, itemArray);
    case "cape":
      return HelmetAndCapeSelector(selected, setSelected, showDetails, itemArray);
    case "primary":
      return WeaponSelector(selected, setSelected, showDetails, itemArray);
    case "secondary":
      return WeaponSelector(selected, setSelected, showDetails, itemArray);
    case "throwable":
      return ThrowableSelector(selected, setSelected, showDetails, itemArray);
    default:
      return;
  }
};
