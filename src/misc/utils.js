let Dropbox = require('dropbox').Dropbox;

let ACCESS_TOKEN = "sl.u.AFg619ouy-9bxBIXYK26eME_VqcJAowZ71iXiGH7gD_l8iyOJyzc5YhRm1oe0_UTpXDuK5_KmVQfinLI92xrn9tXJtKcwC5STGpppkm_EUJR8KLRJuUT1UcwO61xVaBH3GI-ZXduX4GzGZZGgMTxIUJkjLCJcuMI3S5taFZUYiIojWPSVyDg45OgCL35vQWv94lrIB8HauBlaUhiVuuQV54crsnGe4zx2SuLf-48LqvojXiL8JZCubdAw7mQuxIUrPUaqP9qZoadAwJbzXJTcxolb9kfDNetyX0eIzVwrx3n3dWyTIkOljDz6PboMLgRQb61BgCC6C7MpDMBCYhz16tCJodZ1At8nlCAHFq1X_QzmXUpx7XYR1lY_pFi910T33OeX7NacWZkVUi87Zjt5LAbn77yLBL-n0yEQVeEj_xEzLDpbnvFgWF8xkTaXoOSlyMHf9MUWfGM28G-LoUumhL38MZnc_fOKpT8dpOavpVLocQIJeHvZ-OFe7XmwwwlFDFNd7EqxKiDgg508kyGaJQ7c1rohHHUqUsr9QTgt-_35zLM9teR-LRxC35WRhHkCIG76oaA93htyHz1JlPZitlUxAmYBzAK9eRi8cZ5W5eUpnuntpChZ2fiA7KLVtU5psOXCcdnSqsQPTLzFWIVRSgVWtRF28D0q4dBQcaW-aZqpNooCRBKwrRAKjBE3w3mcnmRVJCXhe8WWxvmeEoZqzsqOctcga3YFXjCg4hu3P7x9WUaplORjbPIF_uQpNEE4WEPClbQTa1bIogWhlljUCadyoWJBmgHqNWCCjqBuvVaEKp9FGd-AEWSn6mftZ_4wzNlX5Hsor7_MuDXAKp3uFEcQiy5ZGBPqNuZgH_S6gwPDEEjxaVlWAh67d08_1gUQBIckMn9mLEAuFFWL4JcO8Bxh9Nrcej3hrr2cEgdYw2IAGGVL6AQquzY2T80iJybYcU-EkoC2Ks2GJT2OfGGNwKQyuJFTPrJzk49-hSQVY7m7daQHSFIOcOUibW5cJ1Q5nTKQQTJ0RzqT0k97gyo1UEwu5-DIKdsrIt6x-cRn9xKR1e5eEaNkyl03NX2Ipes0PnW6VyvV87WSkDWb6uvDiEAci9Xq9DTHPQv59z2oGaWn7LdD2FEJhyrjh1nc6z2GbNZ0RSh4UbeIiB4g-CkiL8RqZGRmhlh-jCSAMP0ugmYHNLcpS3T12rwBjTrGjprAI98_9Rue24b0iX8VpBNOgKwxbHJBQ1RPogXAq11l28oLp6nhq_gWSJZu8vW34mNNqXreQfRHoWGapWFKU3XCoHQzacwxKJ9HPGuwFfkW2G19PHwuoC5JWZPHn1eFfq-E5ytblmfL9nju2sSRyZQGaBAOQfIUVV5wU2g680S_c0eqmdkxPwkd1m-8kDbXWfVVTp5SE2bIRI15Tjo1G9Qjg70CrCRAXA9Qpw2HJ_Hi_Hofg"


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