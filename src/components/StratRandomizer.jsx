import StratagemButton from "./StratagemButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import helldivers2Data from "../gameData/helldivers2.json";

const StratRandomizer = ({
  stratagems,
  setStratagems,
  locks,
  setLocks,
  randomizeStratagem,
  runMultipleTimes,
}) => {
  return (
    <div>
      <label className="h3 mt-2">Stratagems</label>
      <div className="d-flex justify-content-around mt-3">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center mb-2">
              <FontAwesomeIcon
                icon={locks[index] ? faLock : faLockOpen}
                className={locks[index] ? "fs-4 text-danger me-2" : "fs-4 me-2"}
                onClick={() => {
                  const newLocks = [...locks];
                  newLocks[index] = !newLocks[index];
                  setLocks(newLocks);
                }}
              />
              <FontAwesomeIcon
                icon={faShuffle}
                className={
                  locks[index] ? "fs-4 text-muted" : "fs-4 text-primary"
                }
                onClick={() => {
                  if (!locks[index])
                    runMultipleTimes(() => randomizeStratagem(index), 6, 150);
                }}
              />
            </div>
            <StratagemButton
              otherStratagems={stratagems
                .filter((_, i) => i !== index)
                .map((strat) => strat.name)}
              stratagem={stratagems[index]}
              setStratagem={(stratagem) => {
                const newStratagems = [...stratagems];
                newStratagems[index] = stratagem;
                setStratagems(newStratagems);
              }}
              stratagemArray={helldivers2Data.stratagems}
              disabled={locks[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StratRandomizer;
