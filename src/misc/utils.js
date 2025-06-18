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

export const scrollToItem = (el) => {
  if(el){
    el.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
  }
}

export function handleSelectItemInfoView(setSelected, setShowDetails,  item){
  setSelected(item);
  setShowDetails(true);
}

