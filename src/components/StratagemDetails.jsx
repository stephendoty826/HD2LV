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
            {stratagem.name.toUpperCase()}
          <li>
            {stratagem.description}
          </li>
          {stratagem.damage && <li>
            DAMAGE: {stratagem.damage}
          </li>}
          {stratagem["durability damage"] && <li>
            DURABILITY DAMAGE: {stratagem["durability damage"]}
          </li>}
          {stratagem["armor penetration"] && <li>
            ARMOR PENETRATION: {stratagem["armor penetration"]}
          </li>}
          {stratagem["call-in time"] && <li>
            CALL-IN TIME: {stratagem["call-in time"]}
          </li>}
          {stratagem["rearm time"] && <li>
            USES: {stratagem.uses}
          </li>}
          {stratagem.capacity && <li>
            CAPACITY: {stratagem.capacity}
          </li>}
          {stratagem["fire rate"] && <li>
            FIRE RATE (RPM): {stratagem["fire rate"]}
          </li>}
          {stratagem["charge time"] && <li>
            CHARGE TIME: {stratagem["charge time"]}
          </li>}
          {stratagem["recharge time"] && <li>
            RECHARGE TIME: {stratagem["recharge time"]}
          </li>}
          {stratagem["fire limit"] && <li>
            FIRE LIMIT: {stratagem["fire limit"]}
          </li>}
          {stratagem["spare magazines"] && <li>
            SPARE MAGAZINES: {stratagem["spare magazines"]}
          </li>}
          {stratagem["reload time"] && <li>
            RELOAD TIME: {stratagem["reload time"]}
          </li>}
          {stratagem["tactical reload"] && <li>
            TACTICAL RELOAD: {stratagem["tactical reload"]}
          </li>}
          {stratagem["rearm time"] && <li>
            REARM TIME: {stratagem["rearm time"]}
          </li>}
          {stratagem["cooldown time"] && <li>
            COOLDOWN TIME: {stratagem["cooldown time"]}
          </li>}
          {stratagem["stratagem traits"] && <li>
            STRATAGEM TRAITS: {displayTraits(stratagem["stratagem traits"])}
          </li>}
        </ul>
      </Container>
    </div>
  );
};

export default StratagemDetails;
