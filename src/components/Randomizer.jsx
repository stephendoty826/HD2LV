
import React, { useState, useEffect } from "react";
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
import helldivers2Data from "../gameData/helldivers2.json";

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

  const [faction, setFaction] = useState("all");
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
    setFaction("all");
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
        "The current loadout seems to be missing a stratagem, piece of equipment or a name. Ensure the loadout is complete before saving."
      );
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      saveLoadout();
    }
  };

  const randomizeLoadout = () => {
    const getRandomItem = (array) => {
      shuffleArray(array);
      return array.pop();
    };

    setLoadout((prevLoadout) => {
      let allStratagems = [
        ...helldivers2Data.stratagems.offensive,
        ...helldivers2Data.stratagems.supply,
        ...helldivers2Data.stratagems.defensive,
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
          : getRandomItem([...helldivers2Data.helmets]),
        armor: locks.armor
          ? prevLoadout.armor
          : getRandomItem([
              ...helldivers2Data.armor.light,
              ...helldivers2Data.armor.medium,
              ...helldivers2Data.armor.heavy,
            ]),
        cape: locks.cape
          ? prevLoadout.cape
          : getRandomItem([...helldivers2Data.capes]),
        primary: locks.primary
          ? prevLoadout.primary
          : getRandomItem([
              ...helldivers2Data.primaries["Assault Rifles"],
              ...helldivers2Data.primaries["Marksman Rifles"],
              ...helldivers2Data.primaries["Submachine Guns"],
              ...helldivers2Data.primaries.Shotguns,
              ...helldivers2Data.primaries.Explosive,
              ...helldivers2Data.primaries["Energy-Based"],
              ...helldivers2Data.primaries.Special
            ]),
        secondary: locks.secondary
          ? prevLoadout.secondary
          : getRandomItem([
              ...helldivers2Data.secondaries.Pistols,
              ...helldivers2Data.secondaries.Special,
            ]),
        throwable: locks.throwable
          ? prevLoadout.throwable
          : getRandomItem([
              ...helldivers2Data.throwables["Standard Throwables"],
              ...helldivers2Data.throwables["Special Throwables"],
            ]),
      };
    });
  };

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
          />
          <div className="d-flex flex-column align-items-center w-100">
            <Form.Group className="mb-4 mt-4 w-75">
              <label className="h3">Faction</label>
              <FactionCheckboxes
                id="builder"
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
