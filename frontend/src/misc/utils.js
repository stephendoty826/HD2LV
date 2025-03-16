let Dropbox = require('dropbox').Dropbox;

let ACCESS_TOKEN = "sl.u.AFiRou_rqVF2Esq7XMVzAKFnjBRVRwrA87u8zFPlU31Q8GFdw5haKCOi8MBDJ-eYHw48rZfPUc0oJ8IEH1m-QSyIB5Hb8-Wdb2hLcOqefCFA1b6i-ClXfZMKHH_ikvsysuhavqbQOUiT9J-eVmjnLzmFJiO8bpEwjylHATCeNXfhg2d4zA4hlLd7sMf7-XbHyPuVJM2hAzrMyNZajuueRXQCJALJe-MRaDEXXELABwXJKueSVUuPL-qEStPrGckkA-k2_D6DDkvxyjF9PXaMYiSF2L4EXjCZhviAwOoILQSB1NbhvhjzvJayPcYiX_gLzyqAf93zveRFaaJTEnZ2dnJfnJyl9ke9d5QhLyU5iAAewN46D8caNJv8jI3hLQ-kwMTuZI-VxB0qiafRMY-pDgqLnuOOSAlAzxzkM4qt7g-BJl3PRvVvLstpB3g92YUfGd9kSWaDkNH5vKjdQSaKXlStcTMHkWrsQKiEqJs-JXn2UhkGF1WnTbpr8o2qBURbhxzzAKiM9UjJEpjp4s64UkG5YO4_2izRFG5EQgzBbqHESTCiEFnYr_Z2Y48ZVfAlFq8DQuRSbp2ZUk0MK0HOsruK3GoJZRp0ImJRgHhBGtortvKtq8w8Gpn3aVeylazTopHRomQy76g4vrsoz-7wtjgQKYHj51URCL3WeOG2-xqRWicH-Av5U30DBN6YWdZVTkD370GnUsydNKmbrgKGKAX04cKKt_q7rbVtSWUzsjCYHdY8qYs-81R7Mldx3mQ_Ul0BvmK9mHU6t9ZAwy9IlbQqmSdCrsSKt04lOvTfb1QwU4UcbNwptguEkxhZkwxcp1J-qmrRzmoC3kvvVFuvHsoX-E0rgjHIAXk9r_zv6rOQocwo03XCQrWfvHRbZ0WZamICLBv2gy_IJFo_zIAcO_exyMipevC7kMnl0A85TPYw6wla5mEvJ_mZOdDIEQLzpfc5T8AluGghD3f_K4DOX8JkVdAc1AbXi9OdcD5Go8gd4VPfPoBfVvOq-NyHTElRb-XF3PfolmMZ2hepZP8LgQx66GH4tI0XezpGRn0b8V2oNzAIs8IP1qRHFOrhy_J6y1r5b1_BTRsj1uUEhXNOiqUcW_1sdbeE-KcAfeGaiFhY2VCl6tVqKutXKEpI1B9qhkfWWp2f_MiT5GAyRdVRXogLbx43tbmxoYRk08WfWX3cEwKz2EEWT3iGx7pjG4Ic8dhgbzKE96e6WGbcTwDpsfTwQFdf6YEliewOKfeeSucjSyo3pi7MoJOJSWJ9h8MasphDx86co66YKu1s4LF2AV6vn2WSMWQegHzRR5z6W7f_i1vw9UcspBjKNuDqL8lupY6YhHkZNKeyJe1IBi1MXRVy0KKhxRzfavOKqQtJBKUd0RA9AzNULCClOGKBUjKxi3Kxl5EG5vvqJWNDorLRzwQuPN93iEgPcY6811WEKJlKXg"

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

// todo modify to have this use array.split to put commas betweeen the items. 
export function displayTraits(traitsArray) {
  return traitsArray.map((trait, idx) => {
    if(idx === traitsArray.length - 1){ // last one return without comma
      return <span key={idx + trait}>{trait}</span>
    }
    return <span key={idx + trait}>{trait}, </span>
  })
}

export function dbDownload(setSavedLoadouts){
  dbx.filesDownload({path: '/loadouts.json'})
    .then(function(response) {
      response.result.fileBlob.text().then((text) => {
        const jsonData = JSON.parse(text);
        if(jsonData){
          setSavedLoadouts(jsonData)
        }
      })
    })
    .catch(function(error) {
      console.error(error);
    });
}

export function saveToDb(loadouts){
  dbx.filesUpload({
    path: "/loadouts.json",
    contents: JSON.stringify(loadouts),
    mode: "overwrite"
  })
}