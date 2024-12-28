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
          <b>{equipment.name.toUpperCase()}</b>
          <li>{equipment.description}</li>
          {equipment.damage && <li><b>Damage:</b> {equipment.damage}</li>}
          {equipment["damage/sec"] && (
            <li><b>Damage/sec:</b> {equipment["damage/sec"]}</li>
          )}
          {equipment["durability damage"] && (
            <li><b>Durability Damage:</b> {equipment["durability damage"]}</li>
          )}
          {equipment["armor penetration"] && (
            <li><b>Armor Penetration:</b> {equipment["armor penetration"]}</li>
          )}
          {equipment.capacity && <li><b>Capacity:</b> {equipment.capacity}</li>}
          {equipment.recoil && <li><b>Recoil:</b> {equipment.recoil}</li>}
          {equipment["fire rate"] && (
            <li><b>Fire Rate:</b> {equipment["fire rate"]}</li>
          )}
          {equipment["fire limit"] && (
            <li><b>Fire Limit:</b> {equipment["fire limit"]}</li>
          )}
          {equipment["spare magazines"] && (
            <li><b>Spare Magazines:</b> {equipment["spare magazines"]}</li>
          )}
          {equipment["reload time"] && (
            <li><b>Reload Time:</b> {equipment["reload time"]}</li>
          )}
          {equipment["tactical reload"] && (
            <li><b>Tactical Reload:</b> {equipment["tactical reload"]}</li>
          )}
          {equipment.outer_radius && (
            <li><b>Outer Radius:</b> {equipment.outer_radius}</li>
          )}
          {equipment.fuse_time && (
            <li><b>Fuse Time:</b> {equipment.fuse_time}</li>
          )}
          {equipment["weapon traits"] && (
            <li><b>Weapon Traits:</b> {displayTraits(equipment["weapon traits"])}</li>
          )}
        </ul>
      </Container>
    </div>
  );
};

export default EquipmentDetails;
