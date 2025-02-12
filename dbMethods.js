let Dropbox = require('dropbox').Dropbox;

let ACCESS_TOKEN = "sl.u.AFg4cS44JXAehx-COesP1RSrKEo7qV17Mrzrdf-c1kCdvhg8ay7dhvvDPyFWOR0gS2czM7n5Jk8a8P228FKxQqVqhTaYzfIfsoqGc4PzQHKLVOqurHCyJSJ8BM-43YaSX6NfR-yVU7WELLP1k-ZNT2_A5i80yvrbT77JzmLBt2dLH_y9WEWIvQWC8YtsciEx35saD2pE7Wm7PUDfom00-ITDdso_tBsKUdLzNunXPJxFwpMcldyjVexuNu-ZDwHOsQLfp-OZOM1o9IGCvQcxSwHNgNrgzhMXgSdETMpGE2svydrwIIuq0n2qchBE5JIEsx3bajGdb84AL2yIttnvIqCt_67hbfgovRoSDpxkVXsQxYTApck6ATkG_swMPV-OY-tnz0UsYhTV3VYX1hr4hByPrdSInizCOLWQWplbyMNeY7_CdfwgGEjeo5HCX4ofaeFedTFNPar1YvxjTzlBxpLjGXEUO15e1qg41S5I13h9gjIcTPWLWAIm4_KlFWm7T2uzUBvrHeh7OwHNd0a5CYywDKIU0jsqL0imn_ekmJkwh1S4JqtPBjJWamxCwd5I2fnNMlAKa9ISKOgfYpnTB2I_nq7oPLvTqrOTANgIFjx7gI9IFCEA_5TikW0ofL5MtOQ7ei9YCeCG80vJeqsGUgTdn0MlqDHh3Td8HCcL_gSuNIV7hFsUMmbW5LQK4dym7qaJ0UQBettA_3vvEcUVF7pdZz0gkKeLqAXlJku2-aGAAiRXqErvE7xUxEpWM_sVA8h0Ut-ODRdSFdpyLUBLnBexP8NczWYitMwI4Z90f7YEggbZfqezEJQhPIaPJaLP1kfsw6Sz33hft8eS4-A4YGD_gLtvXm8sRp3rnv0b5Du_gSIRd3OsBeFa5SxPtgf50BXaclRErGBDN_IVTctq7bsiyHNBJCRC1zNYCkP7a0RI-GjLmrS7OBoVfwuMCSM2JpzvaQLfrWuxu0zkGklTPgxCcZ-tTCm3butyVX2sDFI3tvXR4y0otVEMfmNoHCdr0efg0PpeCtZTQju49RSJv0vb7fC9Lj_DYS4hU2Ncld9JMwd4gyXAHet2O1pezHMg3P1kwFHS_lAy5nesRoRxhGWuxUhKF7TBjBw482MXFlnxHoaW8hA8pW2beh2XcIpFF6FfhMnPg5etcS-hgzS1KbM2LLtgK4b4PHqZTTDP-WYBuqcQMTo5PD_tn5i4SeNdTYiOVUEIX4tqJTZImY85wDUgAoe-cfAR8zkjafwXHhdFhfW7bNOkRxskfGpOYmXieKXNAxGkZke8o5AEG06UOltvo-f6ZfAg5xkv3lJRjNNDF8AyAioG9zaeFAiGAvXB8KysrZnvUzOm3kSi1-67HdirkCyggcb0p4YwLrcuIP0DsWG_4WGkRYH4H6uz9WMf7Omf67OVxku1tHRs1QIPQT5JYti_4K6bXCXs3tTCRrISlQ"





let arrayToSave = [
  {
    "loadoutName":"Stalwart Warrior",
    "faction":"bots",
    "stratagems":[
       {
          "name":"Eagle Strafing Run",
          "description":"A strafing run of the battlefield to clear small targets, delivered almost instantly.",
          "call-in time":"2.4s",
          "uses":"4 — 5 with upgrade",
          "rearm time":"150s — 120s with upgrade",
          "cooldown time":"15s — 8s with upgrade",
          "stratagem traits":[
             "eagle",
             "heavy armor penetrating"
          ],
          "credit":"https://helldivers.wiki.gg/index.php?curid=3097",
          "image":"./images/stratagems/eagle_strafing_run.webp",
          "more info":"https://helldivers.wiki.gg/wiki/Eagle_Strafing_Run"
       },
       {
          "name":"Orbital Precision Strike",
          "description":"A single precision shot from the Destroyer's 'ATLAS' cannon.",
          "call-in time":"4.45s — 3.45s with upgrade",
          "uses":"unlimited",
          "cooldown time":"90s — 77s fully upgraded",
          "stratagem traits":[
             "explosive",
             "orbital",
             "anti-tank"
          ],
          "credit":"https://helldivers.wiki.gg/index.php?curid=3085",
          "image":"./images/stratagems/orbital_precision_strike.webp",
          "more info":"https://helldivers.wiki.gg/wiki/Orbital_Precision_Strike"
       },
       {
          "name":"B-1 Supply Pack",
          "description":"Supply boxes containing ammunition, with a backpack that allows the user to distribute boxes to fellow Helldivers.",
          "call-in time":"9.75s",
          "uses":"unlimited",
          "cooldown time":"480s - 410s fully upgraded",
          "stratagem traits":[
             "hellpod",
             "backpack"
          ],
          "credit":"https://helldivers.wiki.gg/index.php?curid=2997",
          "image":"./images/stratagems/supply_pack.webp",
          "more info":"https://helldivers.wiki.gg/wiki/B-1_Supply_Pack"
       },
       {
          "name":"M-105 Stalwart",
          "description":"A compact, low caliber machine gun. Trades power for ease of use, with faster reloading than heavier machine guns.",
          "call-in time":"4.75s",
          "uses":"unlimited",
          "cooldown time":"480s - 410s fully upgraded",
          "damage":70,
          "durability damage":17,
          "armor penetration":"Light (2)",
          "capacity":250,
          "fire rate":"700, 850, 1150",
          "spare magazines":3,
          "reload time":"5.8s",
          "tactical reload":"4.4s",
          "stratagem traits":[
              "support weapon",
              "hellpod",
              "light armor penetrating"
          ],
          "credit":"https://helldivers.wiki.gg/index.php?curid=2996",
          "image":"./images/stratagems/stalwart.webp",
          "more info":"https://helldivers.wiki.gg/wiki/M-105_Stalwart"
      }
    ],
    "armorSet":[
      {
          "name":"CM-21 Trench Paramedic",
          "description":"The suit was once designed to hold a variety of battlefield medical equipment. Now it holds a generous supply of stims.",
          "credit":"https://helldivers.wiki.gg/index.php?curid=6489",
          "image":"./images/helmets/trench_paramedic_helmet.webp",
          "armor rating":100,
          "speed":100,
          "stamina regen":100
      },
      {
          "name":"B-24 Enforcer",
          "description":"In field tests, 84% of users said that the armor improved their posture and self-esteem.",
          "armor rating":129,
          "speed":471,
          "stamina regen":71,
          "armor passive":{
              "name":"Fortified",
              "description":"Further reduces recoil when crouching or prone by 30%. Provides 50% resistance to explosive damage."
          },
          "credit":"https://helldivers.wiki.gg/index.php?curid=3295",
          "image":"./images/armor/enforcer.webp"
      },
      {
          "name":"Foesmasher",
          "description":"Durable, waterproof, and thermally-lined, surplus units of this cape are favored by domestic campers, to make tents.",
          "credit":"https://helldivers.wiki.gg/index.php?curid=2582",
          "image":"./images/capes/foesmasher.webp"
      }
    ],
    "equipment":[
      {
          "name":"PLAS-101 Purifier",
          "class":"Energy-Based",
          "description":"A plasma rifle firing a bolt of superheated gase which explodes on impact. Each shot must be charged up fully before it can be fired.",
          "damage":"250 - 500 at max charge",
          "durability damage":"50 - 100 at max charge",
          "armor penetration":"Medium (3)",
          "capacity":15,
          "recoil":20,
          "fire rate":1000,
          "spare magazines":6,
          "reload time":"2.5s",
          "weapon traits":[
              "medium armor penetrating",
              "chargeup",
              "explosive"
          ],
          "credit":"https://helldivers.wiki.gg/index.php?curid=6285",
          "image":"./images/primaries/purifier.webp",
          "more info":"https://helldivers.wiki.gg/wiki/PLAS-101_Purifier"
      },
      {
          "name":"P-4 Senator",
          "class":"Pistol",
          "description":"A high-damage revolver, which can be reloaded with single rounds. A heavy-hitting and reliable sidearm.",
          "damage":200,
          "durability damage":70,
          "armor penetration":"Heavy (4)",
          "capacity":6,
          "recoil":43,
          "fire rate":200,
          "spare magazines":40,
          "reload time":"2.8s",
          "tactical reload":"2.2s for 1 round & 4.8s for 5 rounds",
          "weapon traits":[
              "heavy armor penetrating",
              "one-handed",
              "rounds reload"
          ],
          "credit":"https://helldivers.wiki.gg/index.php?curid=2599",
          "image":"./images/secondaries/senator.jpeg",
          "more info":"https://helldivers.wiki.gg/wiki/P-4_Senator"
      },
      {
          "name":"G-123 Thermite",
          "class":"Special Throwable",
          "description":"A thermite grenade designed to adhere to surfaces before burning at 2000°C. Capable of burning through some armor.",
          "damage":2000,
          "durability damage":2000,
          "penetration":7,
          "outer_radius":3,
          "fuse_time":"2.9s",
          "credit":"https://helldivers.wiki.gg/index.php?curid=5359",
          "image":"./images/throwables/thermite.jpeg",
          "more info":"https://helldivers.wiki.gg/wiki/G-123_Thermite"
      }
    ],
    "notes":"",
    "id":"44641193-a003-4297-90b5-5d9a8322e376"
  }
]

var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

// //Upload a file to a specific path on dropbox
// dbx.filesUpload({
//   path: "/loadouts.json",
//   contents: JSON.stringify(arrayToSave),
//   mode: "overwrite"
// })

// Download file from dropbox and log contents to console
dbx.filesDownload({path: '/loadouts.json'})
    .then(function(response) {
      const fileData = response.result.fileBinary
      console.log("File contents:", fileData.toString());
    })
    .catch(function(error) {
      console.error(error);
    });
