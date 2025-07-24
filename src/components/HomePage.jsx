import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import helldivers2 from "../gameData";
import MessageModal from "./MessageModal";
import { Link } from "react-router-dom";
import { shuffleArray } from "../misc/utils";

let tipsArray = [];

const HomePage = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    getRandomTip();
    fixAllFaction();
    fixImagePath();
  }, []);

  function fixImagePath() {
    let savedLoadoutsJSON = localStorage.getItem("savedLoadouts");

    if (savedLoadoutsJSON) {
      let savedLoadouts = JSON.parse(savedLoadoutsJSON);

      savedLoadouts = savedLoadouts.map((loadout) => {
        // loop through and fix stratagem image path
        let stratagems = loadout.stratagems.map((stratagem) => {
          if (!stratagem.image.includes("stratagem")) {
            let image =
              stratagem.image.slice(0, 8) +
              "/stratagems" +
              stratagem.image.slice(8, -4) +
              stratagem.image.slice(-4).toLowerCase();
            stratagem.image = image;
          }
          return stratagem;
        });
        loadout.stratagems = stratagems;

        // loop through armorSet and fix helmet, armor, and cape image path
        let armorSet = loadout.armorSet.map((item, i) => {
          switch (i) {
            case 0:
              if (!item.image.includes("helmets")) {
                let image =
                  item.image.slice(0, 8) +
                  "/helmets" +
                  item.image.toLowerCase().slice(8);
                item.image = image;
              }
              break;
            case 1:
              if (!item.image.includes("armor")) {
                let image =
                  item.image.slice(0, 8) +
                  "/armor" +
                  item.image.toLowerCase().slice(8);
                item.image = image;
              }
              break;
            case 2:
              if (!item.image.includes("capes")) {
                let image =
                  item.image.slice(0, 8) +
                  "/capes" +
                  item.image.toLowerCase().slice(8);
                item.image = image;
              }
              break;
            default:
              break;
          }
          return item;
        });
        loadout.armorSet = armorSet;

        // loop through equipment and fix primary, secondary, and throwable image path
        let equipment = loadout.equipment.map((item, i) => {
          switch (i) {
            case 0:
              if (!item.image.includes("primaries")) {
                let image =
                  item.image.slice(0, 8) +
                  "/primaries" +
                  item.image.toLowerCase().slice(8);
                item.image = image;
              }
              break;
            case 1:
              if (!item.image.includes("secondaries")) {
                let image =
                  item.image.slice(0, 8) +
                  "/secondaries" +
                  item.image.toLowerCase().slice(8);
                item.image = image;
              }
              break;
            case 2:
              if (!item.image.includes("throwables")) {
                let image =
                  item.image.slice(0, 8) +
                  "/throwables" +
                  item.image.toLowerCase().slice(8);
                item.image = image;
              }
              break;
            default:
              break;
          }
          return item;
        });
        loadout.equipment = equipment;

        return loadout;
      });

      // stringify array
      savedLoadoutsJSON = JSON.stringify(savedLoadouts);
      // save array to local storage
      localStorage.setItem("savedLoadouts", savedLoadoutsJSON);
    }
  }

  function fixAllFaction() {
    let savedLoadoutsJSON = localStorage.getItem("savedLoadouts");

    if (savedLoadoutsJSON) {
      let savedLoadouts = JSON.parse(savedLoadoutsJSON);

      //loop through savedLoadouts and check for faction key of "all" if faction === "all" set it = to "bots bugs illuminate" to follow logic on FilterFactionCheckboxes
      savedLoadouts = savedLoadouts.map((loadout) => {
        if (loadout.faction === "all") {
          loadout.faction = "bots bugs illuminate";
        }
        return loadout;
      });

      // algorithm that runs on SavedLoadouts that take all of the loadouts that have "all" as factions and changes it to say

      // stringify array
      savedLoadoutsJSON = JSON.stringify(savedLoadouts);
      // save array to local storage
      localStorage.setItem("savedLoadouts", savedLoadoutsJSON);
    }
  }

  function getRandomTip() {
    if (tipsArray.length === 0) {
      tipsArray = [...helldivers2["loading screen tips"]];

      shuffleArray(tipsArray);
    }

    let tempTip = tipsArray.pop();

    setTip(tempTip);
  }

  return (
    <div>
      <Container className="mt-3 ">
        <div className="d-flex align-items-center flex-column vh-85">
          <div className="display-6 mb-2">Helldivers 2 Loadout Vault</div>
          <p className="saira-font">
            Approved by the Ministry of Expansion™
          </p>
          <div className="px-5 pt-5 text-center">
            <p className="homePageFont saira-font">
              In service of Liberty, welcome to the Loadout Vault.
            </p>
            <p className="homePageFont saira-font">
              This is your armory, Helldiver — a place to craft, save, and perfect your loadouts for every righteous mission across the galaxy. Whether you're dropping into a bug-infested warzone or dismantling bot resistance one stratagem at a time, your gear is your greatest weapon in the fight for Managed Democracy.
            </p>
            <p className="homePageFont saira-font">
              Customize your arsenal. Prepare for deployment. And show the enemies of Super Earth what true freedom looks like.
            </p>
            <p className="homePageFont saira-font">
              Remember: Liberty isn’t given — it’s dropped from orbit with extreme prejudice.
            </p>
            <p className="saira-font">
              “A Helldiver Without a Loadout Is Just a Corpse in Uniform.” -
              General Brasch, Super Ten-Star General
            </p>
          </div>
          <Button
            variant="primary"
            className="mt-4 fs-3"
            as={Link}
            to="/loadout_builder"
          >
            Build Loadout
          </Button>{" "}
          <Button
            variant="secondary"
            className="mt-5 fs-4"
            onClick={getRandomTip}
          >
            Next Tip
          </Button>{" "}
          <div className="text-center mx-3 mt-3 d-flex align-items-center">
            <div className="text-center mx-3 mb-5">{tip}</div>
          </div>
        </div>
      </Container>
      <MessageModal />
    </div>
  );
};

export default HomePage;
