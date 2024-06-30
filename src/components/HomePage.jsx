import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import helldivers2 from "../gameData/helldivers2.json";

const HomePage = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    getRandomTip()
  }, [])

  function getRandomTip() {
    let tipsArray = helldivers2["loading screen tips"];

    let tempTip = tipsArray[(tipsArray.length * Math.random()) | 0];

    setTip(tempTip);
  }

  return (
    <div>
      <Container className="mt-3">
        <div className="d-flex align-items-center flex-column vh-90">
          <text className="display-1 mb-2">Helldivers 2</text>
          <text className="display-6">Loadout Vault</text>
          <div className="px-5 pt-5 text-center">
            <p className="fs-6">Welcome, fellow  Helldivers</p>
            <p>
              I am Hell Commander Pyro and Super Earth high command has
              entrusted me with the creation of this loadout vault.
            </p>
            <p>
              This vault will allow you to save loadouts as you continue to
              spread Managed Democracy across the galaxy.
            </p>
            <p>
              Choose your stratagems, weapons, and armor...for Liberty.
            </p>
          </div>
          <Button variant="secondary" className="mt-4 fs-3">
            Build Loadout
          </Button>{" "}
          <div className="text-center mx-3 h-100 d-flex align-items-center">
            <text className="text-center mx-3">{tip}</text>
            {/* <text className="text-center mx-3">
              If at first you don't succeed, dive, dive again. And again. And
              again. And again. And again. And again. And again. And again. And
              again. And again. And again. And again. And again. And again.
            </text> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
