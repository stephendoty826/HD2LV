import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import helldivers2 from "../gameData/helldivers2.json";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    getRandomTip();
    checkAndAddFaction()
  }, []);

  function checkAndAddFaction () {
    let savedLoadoutsJSON = localStorage.getItem("savedLoadouts");

    if (savedLoadoutsJSON) {
      let savedLoadouts = JSON.parse(savedLoadoutsJSON);

      //loop through savedLoadouts and check for faction key, if it exists, skip it, if it doesn't add faction: "all"
      savedLoadouts = savedLoadouts.map((loadout) => {
        if (!loadout.faction) {
          loadout.faction = "all";
        }
        return loadout;
      });

      // stringify array
      savedLoadoutsJSON = JSON.stringify(savedLoadouts);
      // save array to local storage
      localStorage.setItem("savedLoadouts", savedLoadoutsJSON);
    }
  }

  function getRandomTip() {
    let tipsArray = helldivers2["loading screen tips"];

    let tempTip = tipsArray[(tipsArray.length * Math.random()) | 0];

    setTip(tempTip);
  }

  return (
    <div>
      <Container className="mt-3">
        <div className="d-flex align-items-center flex-column vh-85">
          <div className="display-1 mb-2">Helldivers 2</div>
          <div className="display-6">Loadout Vault</div>
          <div className="px-5 pt-5 text-center">
            <p className="fs-6">Welcome, fellow Helldivers</p>
            <p>
              I am General Pyro and Super Earth high command has
              entrusted me with the creation of this loadout vault.
            </p>
            <p>
              This vault will allow you to save loadouts as you continue to
              spread Managed Democracy across the galaxy.
            </p>
            <p>Choose your stratagems, weapons, and armor...for Liberty.</p>
          </div>
          <Button
            variant="secondary"
            className="mt-4 fs-3"
            as={Link}
            to="/loadout_builder"
          >
            Build Loadout
          </Button>{" "}
          <div className="text-center mx-3 h-100 d-flex align-items-center">
            <p className="text-center mx-3 mt-4">{tip}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
