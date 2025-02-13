let Dropbox = require('dropbox').Dropbox;

let ACCESS_TOKEN = "sl.u.AFg4cS44JXAehx-COesP1RSrKEo7qV17Mrzrdf-c1kCdvhg8ay7dhvvDPyFWOR0gS2czM7n5Jk8a8P228FKxQqVqhTaYzfIfsoqGc4PzQHKLVOqurHCyJSJ8BM-43YaSX6NfR-yVU7WELLP1k-ZNT2_A5i80yvrbT77JzmLBt2dLH_y9WEWIvQWC8YtsciEx35saD2pE7Wm7PUDfom00-ITDdso_tBsKUdLzNunXPJxFwpMcldyjVexuNu-ZDwHOsQLfp-OZOM1o9IGCvQcxSwHNgNrgzhMXgSdETMpGE2svydrwIIuq0n2qchBE5JIEsx3bajGdb84AL2yIttnvIqCt_67hbfgovRoSDpxkVXsQxYTApck6ATkG_swMPV-OY-tnz0UsYhTV3VYX1hr4hByPrdSInizCOLWQWplbyMNeY7_CdfwgGEjeo5HCX4ofaeFedTFNPar1YvxjTzlBxpLjGXEUO15e1qg41S5I13h9gjIcTPWLWAIm4_KlFWm7T2uzUBvrHeh7OwHNd0a5CYywDKIU0jsqL0imn_ekmJkwh1S4JqtPBjJWamxCwd5I2fnNMlAKa9ISKOgfYpnTB2I_nq7oPLvTqrOTANgIFjx7gI9IFCEA_5TikW0ofL5MtOQ7ei9YCeCG80vJeqsGUgTdn0MlqDHh3Td8HCcL_gSuNIV7hFsUMmbW5LQK4dym7qaJ0UQBettA_3vvEcUVF7pdZz0gkKeLqAXlJku2-aGAAiRXqErvE7xUxEpWM_sVA8h0Ut-ODRdSFdpyLUBLnBexP8NczWYitMwI4Z90f7YEggbZfqezEJQhPIaPJaLP1kfsw6Sz33hft8eS4-A4YGD_gLtvXm8sRp3rnv0b5Du_gSIRd3OsBeFa5SxPtgf50BXaclRErGBDN_IVTctq7bsiyHNBJCRC1zNYCkP7a0RI-GjLmrS7OBoVfwuMCSM2JpzvaQLfrWuxu0zkGklTPgxCcZ-tTCm3butyVX2sDFI3tvXR4y0otVEMfmNoHCdr0efg0PpeCtZTQju49RSJv0vb7fC9Lj_DYS4hU2Ncld9JMwd4gyXAHet2O1pezHMg3P1kwFHS_lAy5nesRoRxhGWuxUhKF7TBjBw482MXFlnxHoaW8hA8pW2beh2XcIpFF6FfhMnPg5etcS-hgzS1KbM2LLtgK4b4PHqZTTDP-WYBuqcQMTo5PD_tn5i4SeNdTYiOVUEIX4tqJTZImY85wDUgAoe-cfAR8zkjafwXHhdFhfW7bNOkRxskfGpOYmXieKXNAxGkZke8o5AEG06UOltvo-f6ZfAg5xkv3lJRjNNDF8AyAioG9zaeFAiGAvXB8KysrZnvUzOm3kSi1-67HdirkCyggcb0p4YwLrcuIP0DsWG_4WGkRYH4H6uz9WMf7Omf67OVxku1tHRs1QIPQT5JYti_4K6bXCXs3tTCRrISlQ"


var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

export const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export function searchLoadouts(loadoutArray, searchTerm) {

  searchTerm = searchTerm.toLowerCase()
  
  if(!searchTerm){ // return original loadout array if there is no search term
    return loadoutArray
  }
  
  let resultsArray = []
  let remainderArray = []

  // loops through loadoutArray and puts matched loadouts in resultsArray
  loadoutArray.forEach(loadout => {
    let name = loadout.loadoutName.toLowerCase(); // takes name from loadout and makes it lowercase
    if(name.includes(searchTerm)){ // checks if name includes search terms
      resultsArray.push(loadout) 
    }else{
      remainderArray.push(loadout)
    }
  })

  // loops through remainderArray and match any stratagem, helmet, armor, cape, primary, secondary, or throwable name to searchTerm and puts them in resultsArray
  remainderArray.forEach(loadout => {
    let boolFlag = false;
    loadout.stratagems.forEach(stratagem => {
      if(stratagem.name.toLowerCase()?.includes(searchTerm)){
        boolFlag = true
      }
    })
    loadout.armorSet.forEach(armor => {
      if(armor.name.toLowerCase()?.includes(searchTerm)){
        boolFlag = true
      }
    })
    loadout.equipment.forEach(equipment => {
      if(equipment.name.toLowerCase()?.includes(searchTerm)){
        boolFlag = true
      }
    }) 
    if(boolFlag){
      resultsArray.push(loadout)
    }
  })

  return resultsArray

}

export function displayTraits(traitsArray) {
  return traitsArray.map((trait, idx) => {
    if(idx === traitsArray.length - 1){ // last one return without comma
      return <span key={idx + trait}>{trait}</span>
    }
    return <span key={idx + trait}>{trait}, </span>
  })
}

export function dbDownload(){
  dbx.filesDownload({path: '/loadouts.json'})
    .then(function(response) {
      return response.result.fileBinary
    })
    .catch(function(error) {
      console.error(error);
    });
}