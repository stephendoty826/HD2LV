import React from "react";
import StratagemButton from "./StratagemButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import helldivers2Data from "../gameData/helldivers2.json";

const StratRandomizer = ({ stratagems, setStratagems, locks, setLocks }) => {
  return (
    <div>
      <label className="h3 mt-2">Stratagems</label>
      <div className="d-flex justify-content-around mt-3">
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon
            icon={locks[0] ? faLock : faLockOpen}
            className={locks[0] ? "fs-4 mb-2 text-danger" : "fs-4 mb-2"}
            onClick={() => {
              locks[0] = !locks[0];
              setLocks(locks);
            }}
          />
          <StratagemButton
            otherStratagems={[
              stratagems[1].name,
              stratagems[2].name,
              stratagems[3].name,
            ]}
            stratagem={stratagems[0]}
            setStratagem={(stratagem) =>
              setStratagems([stratagem, ...stratagems.slice(1)])
            }
            stratagemArray={helldivers2Data.stratagems}
            disabled={locks[0]}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon
            icon={locks[1] ? faLock : faLockOpen}
            className={locks[1] ? "fs-4 mb-2 text-danger" : "fs-4 mb-2"}
            onClick={() => {
              locks[1] = !locks[1];
              setLocks(locks);
            }}
          />
          <StratagemButton
            otherStratagems={[
              stratagems[0].name,
              stratagems[2].name,
              stratagems[3].name,
            ]}
            stratagem={stratagems[1]}
            setStratagem={(stratagem) =>
              setStratagems([
                ...stratagems.slice(0, 1),
                stratagem,
                ...stratagems.slice(2),
              ])
            }
            stratagemArray={helldivers2Data.stratagems}
            disabled={locks[1]}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon
            icon={locks[2] ? faLock : faLockOpen}
            className={locks[2] ? "fs-4 mb-2 text-danger" : "fs-4 mb-2"}
            onClick={() => {
              locks[2] = !locks[2];
              setLocks(locks);
            }}
          />
          <StratagemButton
            otherStratagems={[
              stratagems[0].name,
              stratagems[1].name,
              stratagems[3].name,
            ]}
            stratagem={stratagems[2]}
            setStratagem={(stratagem) =>
              setStratagems([
                ...stratagems.slice(0, 2),
                stratagem,
                ...stratagems.slice(3),
              ])
            }
            stratagemArray={helldivers2Data.stratagems}
            disabled={locks[2]}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon
            icon={locks[3] ? faLock : faLockOpen}
            className={locks[3] ? "fs-4 mb-2 text-danger" : "fs-4 mb-2"}
            onClick={() => {
              locks[3] = !locks[3];
              setLocks(locks);
            }}
          />
          <StratagemButton
            otherStratagems={[
              stratagems[0].name,
              stratagems[1].name,
              stratagems[2].name,
            ]}
            stratagem={stratagems[3]}
            setStratagem={(stratagem) =>
              setStratagems([...stratagems.slice(0, 3), stratagem])
            }
            stratagemArray={helldivers2Data.stratagems}
            disabled={locks[3]}
          />
        </div>
      </div>
    </div>
  );
};

export default StratRandomizer;
