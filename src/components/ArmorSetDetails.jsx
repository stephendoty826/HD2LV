import Container from "react-bootstrap/Container";

const ArmorSetDetails = ({
  armorPiece,
}) => {

  return (
    <div className="pb-4">
      <Container className="d-flex">
        <div
          className="stratDetails"
        >
          {armorPiece.image && (
            <img src={armorPiece.image} alt="" className="equippedImage" />
          )}
        </div>
        <ul>
            {armorPiece.name.toUpperCase()}
          <li>
            {armorPiece.description}
          </li>
          {armorPiece["armor rating"] && <li>
            ARMOR RATING: {armorPiece["armor rating"]}
          </li>}
          {armorPiece.speed && <li>
            SPEED: {armorPiece.speed}
          </li>}
          {armorPiece["stamina regen"] && <li>
            STAMINA REGEN: {armorPiece["stamina regen"]}
          </li>}
          {armorPiece["armor passive"] ? <li>
            ARMOR PASSIVE: {armorPiece["armor passive"].name}: {armorPiece["armor passive"].description}
          </li>
          :
          <li>STANDARD ISSUE: No additional bonus</li>}
        </ul>
      </Container>
    </div>
  );
};

export default ArmorSetDetails;
