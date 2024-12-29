import Container from "react-bootstrap/Container";
import { displayTraits } from "../misc/utils";

const StratagemDetails = ({
  stratagem
}) => {

  return (
    <div className="pb-4">
      <Container className="d-flex">
        <div
          className="stratDetails"
        >
          {stratagem.image && (
            <img src={stratagem.image} alt="" className="equippedImage" />
          )}
        </div>
        <ul>
            <b>{stratagem.name.toUpperCase()}</b>
          <li>
            {stratagem.description}
          </li>
          {stratagem.damage && <li>
            <b>Damage:</b> {stratagem.damage}
          </li>}
          {stratagem["damage/sec"] && <li>
            <b>Damage/sec:</b> {stratagem["damage/sec"]}
          </li>}
          {stratagem["durability damage"] && <li>
            <b>Durability Damage:</b> {stratagem["durability damage"]}
          </li>}
          {stratagem["armor penetration"] && <li>
            <b>Armor Penetration:</b> {stratagem["armor penetration"]}
          </li>}
          {stratagem["call-in time"] && <li>
            <b>Call-in Time:</b> {stratagem["call-in time"]}
          </li>}
          {stratagem.uses && <li>
            <b>Uses:</b> {stratagem.uses}
          </li>}
          {stratagem.capacity && <li>
            <b>Capacity:</b> {stratagem.capacity}
          </li>}
          {stratagem["fire rate"] && <li>
            <b>Fire Rate (rpm):</b> {stratagem["fire rate"]}
          </li>}
          {stratagem["charge time"] && <li>
            <b>Charge Time:</b> {stratagem["charge time"]}
          </li>}
          {stratagem["recharge time"] && <li>
            <b>Recharge Time:</b> {stratagem["recharge time"]}
          </li>}
          {stratagem["fire limit"] && <li>
            <b>Fire Limit:</b> {stratagem["fire limit"]}
          </li>}
          {stratagem["spare magazines"] && <li>
            <b>Spare Magazines:</b> {stratagem["spare magazines"]}
          </li>}
          {stratagem["reload time"] && <li>
            <b>Reload Time:</b> {stratagem["reload time"]}
          </li>}
          {stratagem["tactical reload"] && <li>
            <b>Tactical Reload:</b> {stratagem["tactical reload"]}
          </li>}
          {stratagem["rearm time"] && <li>
            <b>Rearm Time:</b> {stratagem["rearm time"]}
          </li>}
          {stratagem["cooldown time"] && <li>
            <b>Cooldown Time:</b> {stratagem["cooldown time"]}
          </li>}
          {stratagem["stratagem traits"] && <li>
            <b>Stratagem Traits:</b> {displayTraits(stratagem["stratagem traits"])}
          </li>}
        </ul>
      </Container>
    </div>
  );
};

export default StratagemDetails;
