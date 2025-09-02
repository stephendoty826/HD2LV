
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import StratRandomizer from "./StratRandomizer";
import EquipmentRandomizer from "./EquipmentRandomizer";
import FactionCheckboxes from "./FactionCheckboxes";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { shuffleArray } from "../misc/utils";
import { v4 as uuidv4 } from "uuid";
import helldivers2Data from "../gameData";

const Randomizer = () => {
  const [loadout, setLoadout] = useState({
    stratagems: [{}, {}, {}, {}],
    armor: {},
    helmet: {},
    cape: {},
    primary: {},
    secondary: {},
    throwable: {},
  });

  const [faction, setFaction] = useState("");
  const [loadoutName, setLoadoutName] = useState("");
  const [savedLoadouts, setSavedLoadouts] = useState([]);
  const [locks, setLocks] = useState({
    stratagems: [false, false, false, false],
    armor: false,
    helmet: false,
    cape: false,
    primary: false,
    secondary: false,
    throwable: false,
  });

  const ALL_STRATAGEMS = [
  ...helldivers2Data.stratagems.offensive,
  ...helldivers2Data.stratagems.supply,
  ...helldivers2Data.stratagems.defensive,
];

const ALL_HELMETS = [...helldivers2Data.helmets];

const ALL_ARMOR = [
  ...helldivers2Data.armor.light,
  ...helldivers2Data.armor.medium,
  ...helldivers2Data.armor.heavy,
];

const ALL_CAPES = [...helldivers2Data.capes];

const ALL_PRIMARIES = [
  ...helldivers2Data.primaries["Assault Rifles"],
  ...helldivers2Data.primaries["Marksman Rifles"],
  ...helldivers2Data.primaries["Submachine Guns"],
  ...helldivers2Data.primaries.Shotguns,
  ...helldivers2Data.primaries.Explosive,
  ...helldivers2Data.primaries["Energy-Based"],
  ...helldivers2Data.primaries.Special,
];

const ALL_SECONDARIES = [
  ...helldivers2Data.secondaries.Pistols,
  ...helldivers2Data.secondaries.Special,
];

const ALL_THROWABLES = [
  ...helldivers2Data.throwables["Standard Throwables"],
  ...helldivers2Data.throwables["Special Throwables"],
];


  useEffect(() => {
    let savedLoadoutsJSON = localStorage.getItem("savedLoadouts");
    if (savedLoadoutsJSON) {
      setSavedLoadouts(JSON.parse(savedLoadoutsJSON));
    }
  }, []);

  const resetLoadout = () => {
    setLoadout({
      stratagems: [{}, {}, {}, {}],
      armor: {},
      helmet: {},
      cape: {},
      primary: {},
      secondary: {},
      throwable: {},
    });
    setLocks({
      stratagems: [false, false, false, false],
      armor: false,
      helmet: false,
      cape: false,
      primary: false,
      secondary: false,
      throwable: false,
    });
    setLoadoutName("");
    setFaction("");
  };

  const saveLoadout = () => {
    let isLoadoutFilled =
      loadout.stratagems.every((strat) => strat.name) &&
      loadout.armor.name &&
      loadout.helmet.name &&
      loadout.cape.name &&
      loadout.primary.name &&
      loadout.secondary.name &&
      loadout.throwable.name &&
      faction &&
      loadoutName;

    if (isLoadoutFilled) {
      let newLoadout = {
        loadoutName,
        faction,
        stratagems: loadout.stratagems,
        armorSet: [loadout.helmet, loadout.armor, loadout.cape],
        equipment: [loadout.primary, loadout.secondary, loadout.throwable],
        id: uuidv4(),
      };

      let tempSavedLoadouts = [newLoadout, ...savedLoadouts];
      // use setSavedLoadouts to trigger re-render
      setSavedLoadouts(tempSavedLoadouts);
      //save array to local storage
      localStorage.setItem("savedLoadouts", JSON.stringify(tempSavedLoadouts));
      resetLoadout();
    } else {
      alert(
        "The current loadout seems to be missing a stratagem, piece of equipment, a faction, or a name. Ensure the loadout is complete before saving."
      );
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      saveLoadout();
    }
  };

  const getRandomItem = (array) => {
    shuffleArray(array);
    return array.pop();
  };

  const randomizeLoadout = () => {
    setLoadout((prevLoadout) => {
      let allStratagems = [
        ...ALL_STRATAGEMS
      ];

      if (locks.stratagems.includes(true)) {
        for (let i = 0; i < locks.stratagems.length; i++) {
          let stratLocked = locks.stratagems[i];
          allStratagems = allStratagems.filter((strat) => {
            if (stratLocked) {
              return strat.name !== loadout.stratagems[i].name;
            }
            return true;
          });
        }
      }

      return {
        stratagems: prevLoadout.stratagems.map((strat, index) => {
          return locks.stratagems[index] ? strat : getRandomItem(allStratagems);
        }),
        helmet: locks.helmet
          ? prevLoadout.helmet
          : getRandomItem([...ALL_HELMETS]),
        armor: locks.armor
          ? prevLoadout.armor
          : getRandomItem([
              ...ALL_ARMOR
            ]),
        cape: locks.cape
          ? prevLoadout.cape
          : getRandomItem([...ALL_CAPES]),
        primary: locks.primary
          ? prevLoadout.primary
          : getRandomItem([
              ...ALL_PRIMARIES
            ]),
        secondary: locks.secondary
          ? prevLoadout.secondary
          : getRandomItem([
              ...ALL_SECONDARIES
            ]),
        throwable: locks.throwable
          ? prevLoadout.throwable
          : getRandomItem([
              ...ALL_THROWABLES
            ]),
      };
    });
  };

  // New functions to randomize individual items
  const randomizeStratagem = (index) => {
    if (!locks.stratagems[index]) {
      let allStratagems = [
        ...ALL_STRATAGEMS
      ];

      // Filter out currently selected stratagems from other slots
      const otherStratagems = loadout.stratagems
        .filter((_, i) => i !== index)
        .map(strat => strat.name)
        .filter(name => name);

      allStratagems = allStratagems.filter(strat => !otherStratagems.includes(strat.name));

      setLoadout((prev) => {
        const newStratagems = [...prev.stratagems];
        newStratagems[index] = getRandomItem(allStratagems);
        return { ...prev, stratagems: newStratagems };
      });
    }
  };

  const randomizeItem = (itemArr, itemType) => {
    if(!locks[itemType]){
      setLoadout(prev => ({
        ...prev,
        [itemType]: getRandomItem(itemArr)
      }))
    }
  }

  const runMultipleTimes = (func, times, delay) => {
    for (let i = 0; i < times; i++) {
      setTimeout(func, i * delay);
    }
  };

  return (
    <Container>
      <div className="d-flex align-items-center flex-column vh-85">
        <p className="display-6 mt-3">Loadout Randomizer</p>
        <Button
          variant="outline-light"
          onClick={() => {
            runMultipleTimes(randomizeLoadout, 8, 150);
          }}
          className="d-flex flex-column align-items-center my-4 fs-2"
        >
          <FontAwesomeIcon icon={faShuffle} className="my-1" />
          Randomize
        </Button>
        <div className="text-center w-100">
          <StratRandomizer
            stratagems={loadout.stratagems}
            setStratagems={(stratagems) =>
              setLoadout((prev) => ({ ...prev, stratagems }))
            }
            locks={locks.stratagems}
            setLocks={(newLocks) =>
              setLocks((prev) => ({ ...prev, stratagems: newLocks }))
            }
            randomizeStratagem={randomizeStratagem}
            runMultipleTimes={runMultipleTimes}
          />
          <EquipmentRandomizer
            armor={loadout.armor}
            setArmor={(armor) => setLoadout((prev) => ({ ...prev, armor }))}
            isArmorLocked={locks.armor}
            setIsArmorLocked={(isArmorLocked) =>
              setLocks((prev) => ({ ...prev, armor: isArmorLocked }))
            }
            helmet={loadout.helmet}
            setHelmet={(helmet) => setLoadout((prev) => ({ ...prev, helmet }))}
            isHelmetLocked={locks.helmet}
            setIsHelmetLocked={(isHelmetLocked) =>
              setLocks((prev) => ({ ...prev, helmet: isHelmetLocked }))
            }
            cape={loadout.cape}
            setCape={(cape) => setLoadout((prev) => ({ ...prev, cape }))}
            isCapeLocked={locks.cape}
            setIsCapeLocked={(isCapeLocked) =>
              setLocks((prev) => ({ ...prev, cape: isCapeLocked }))
            }
            primary={loadout.primary}
            setPrimary={(primary) =>
              setLoadout((prev) => ({ ...prev, primary }))
            }
            isPrimaryLocked={locks.primary}
            setIsPrimaryLocked={(isPrimaryLocked) =>
              setLocks((prev) => ({ ...prev, primary: isPrimaryLocked }))
            }
            secondary={loadout.secondary}
            setSecondary={(secondary) =>
              setLoadout((prev) => ({ ...prev, secondary }))
            }
            isSecondaryLocked={locks.secondary}
            setIsSecondaryLocked={(isSecondaryLocked) =>
              setLocks((prev) => ({ ...prev, secondary: isSecondaryLocked }))
            }
            throwable={loadout.throwable}
            setThrowable={(throwable) =>
              setLoadout((prev) => ({ ...prev, throwable }))
            }
            isThrowableLocked={locks.throwable}
            setIsThrowableLocked={(isThrowableLocked) =>
              setLocks((prev) => ({ ...prev, throwable: isThrowableLocked }))
            }
            randomizeItem={randomizeItem}
            ALL_HELMETS={ALL_HELMETS}
            ALL_ARMOR={ALL_ARMOR}
            ALL_CAPES={ALL_CAPES}
            ALL_PRIMARIES={ALL_PRIMARIES}
            ALL_SECONDARIES={ALL_SECONDARIES}
            ALL_THROWABLES={ALL_THROWABLES}
            runMultipleTimes={runMultipleTimes}
          />
          <div className="d-flex flex-column align-items-center w-100">
            <Form.Group className="mb-4 mt-4 w-75">
              <label className="h3">Faction</label>
              <FactionCheckboxes
                id="randomizer"
                faction={faction}
                setFaction={setFaction}
              />
              <Form.Label>Loadout Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLoadoutName(e.target.value)}
                value={loadoutName}
                placeholder="Enter loadout name"
                onKeyUp={(e) => handleKeyUp(e)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between w-50 mb-3">
              <Button variant="secondary" onClick={resetLoadout}>
                Reset
              </Button>
              <Button variant="primary" onClick={saveLoadout}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Randomizer;
