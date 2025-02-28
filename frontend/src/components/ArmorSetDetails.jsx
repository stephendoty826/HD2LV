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
            <b>{armorPiece.name.toUpperCase()}</b>
          <li>
            {armorPiece.description}
          </li>
          {armorPiece["armor rating"] && <li>
            <b>Armor Rating:</b> {armorPiece["armor rating"]}
          </li>}
          {armorPiece.speed && <li>
            <b>Speed:</b> {armorPiece.speed}
          </li>}
          {armorPiece["stamina regen"] && <li>
            <b>Stamina Regen:</b> {armorPiece["stamina regen"]}
          </li>}
          {armorPiece["armor passive"] ? <li>
            <b>Armor Passive:</b> {armorPiece["armor passive"].name}: {armorPiece["armor passive"].description}
          </li>
          :
          <li><b>Standard Issue:</b> No additional bonus</li>}
        </ul>
      </Container>
    </div>
  );
};

export default ArmorSetDetails;
