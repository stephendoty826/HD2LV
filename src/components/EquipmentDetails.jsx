import Container from "react-bootstrap/Container";
import { displayTraits } from "../misc/utils";

const EquipmentDetails = ({ equipment, cssClass }) => {

  return (
    <div className="pb-4">
      <Container className="d-flex">
        <div className={`${cssClass} d-flex justify-content-center`}>
          {equipment.image && (
            <img src={equipment.image} alt="" className="equippedImage" />
          )}
        </div>
        <ul>
          {equipment.name.toUpperCase()}
          <li>{equipment.description}</li>
          {equipment.damage && <li>DAMAGE: {equipment.damage}</li>}
          {equipment["damage/sec"] && (
            <li>DAMAGE/SEC: {equipment["damage/sec"]}</li>
          )}
          {equipment["durability damage"] && (
            <li>DURABILITY DAMAGE: {equipment["durability damage"]}</li>
          )}
          {equipment["armor penetration"] && (
            <li>ARMOR PENETRATION: {equipment["armor penetration"]}</li>
          )}
          {equipment.capacity && <li>CAPACITY: {equipment.capacity}</li>}
          {equipment.recoil && <li>RECOIL: {equipment.recoil}</li>}
          {equipment["fire rate"] && (
            <li>FIRE RATE: {equipment["fire rate"]}</li>
          )}
          {equipment["fire limit"] && (
            <li>FIRE LIMIT: {equipment["fire limit"]}</li>
          )}
          {equipment["spare magazines"] && (
            <li>SPARE MAGAZINES: {equipment["spare magazines"]}</li>
          )}
          {equipment["reload time"] && (
            <li>RELOAD TIME: {equipment["reload time"]}</li>
          )}
          {equipment["tactical reload"] && (
            <li>TACTICAL RELOAD: {equipment["tactical reload"]}</li>
          )}
          {equipment.outer_radius && (
            <li>OUTER RADIUS: {equipment.outer_radius}</li>
          )}
          {equipment.fuse_time && (
            <li>FUSE TIME: {equipment.fuse_time}</li>
          )}
          {equipment["weapon traits"] && (
            <li>WEAPON TRAITS: {displayTraits(equipment["weapon traits"])}</li>
          )}
        </ul>
      </Container>
    </div>
  );
};

export default EquipmentDetails;
