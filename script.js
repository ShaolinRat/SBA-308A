const BASE_URL = "https://pokeapi.co/api/v2/";

const typeSelect = document.getElementById("TypeSelect");
const cardContainer = document.getElementById("card-container");

async function initialLoad() {
  try {
    const response = await fetch(`${BASE_URL}type`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const typeArray = data.results;
    // console.log(typeArray);
    typeArray.forEach((type, index) => {
      // console.log(type);
      let option = document.createElement("option");
      option.innerHTML = type.name;
      option.setAttribute("id", index);
      typeSelect.appendChild(option);
    });
    // for (let i = 0; i < data.length; i++) {
    //   let option = document.createElement("option");
    //   option.innerHTML = data[i].name;
    //   typeSelect.appendChild(option);
    // }
  } catch (error) {
    console.log("There has been a problem with your fetch operation", error);
  }
  loadPokemon();
}

// For some reason, the only way to bring up the options on the select box, is to
// click on the bottom line of the select rectangle.
initialLoad();

async function loadPokemon() {
  const selectedType = Number(typeSelect[typeSelect.selectedIndex].id);
  // console.log(selectedType);
  // console.log(`type of selectedPokenmonType: ${typeof selectedType}`);
  function createCard(imageLink, bodyText) {
    let card = document.createElement("div");
    let image = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardText = document.createElement("p");

    card.classList.add("card");
    card.setAttribute("style", "width: 18rem;");

    image.setAttribute("src", imageLink);
    image.classList.add("card-img-top");

    cardBody.classList.add("card-body");

    cardText.classList.add("card-text");
    cardText.innerHTML = bodyText;

    cardBody.appendChild(cardText);
    card.appendChild(image);
    card.appendChild(cardBody);

    return card;
  }
  ``;
  try {
    const response = await fetch(`${BASE_URL}type`);
    const data = await response.json();
    typeArray = data.results;
    // console.log(typeArray);
    const typeObjUrl = typeArray[selectedType].url;
    console.log(typeObjUrl);
    const pokeResponse = await fetch(typeObjUrl);
    const pokeObj = await pokeResponse.json();
    const pokeArray = pokeObj.pokemon;
    // console.log(pokeObj);
    // console.log(pokeArray);

    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }

    for (let i = 0; i <= 20; i++) {
      pokeName = pokeArray[i].pokemon.name;
      // console.log(pokeName);
      try {
        pokeFetchResponse = await fetch(`${BASE_URL}pokemon/${pokeName}`);
        pokeFetchResponse2 = await fetch(
          `${BASE_URL}pokemon-species/${pokeName}`
        );
        if (!pokeFetchResponse.ok) {
          throw new Error("There was a problem with the first fetch");
        } else if (!pokeFetchResponse2.ok) {
          throw new Error("There was a problem with the second fetch");
        }
        pokeData = await pokeFetchResponse.json();
        pokeData2 = await pokeFetchResponse2.json();
      } catch (error) {
        console.log("Problem fetching data", error);
      }
      // console.log(pokeData);
      console.log(pokeData2);
      imgLink = pokeData.sprites.front_default;
      flavorTextEntries = pokeData2.flavor_text_entries;
      let pokeDescription;
      for (let i = 0; i < flavorTextEntries.length; i++) {
        if (flavorTextEntries[i].language.name != "en") {
          continue;
        } else {
          pokeDescription = flavorTextEntries[i].flavor_text;
        }
      }
      newCard = createCard(imgLink, pokeDescription);
      cardContainer.appendChild(newCard);
    }
    // const typeArray = data.results;
    // console.log(data);
  } catch (error) {
    console.log("There was an issue with the code", error);
  }
}

typeSelect.addEventListener("change", async (e) => {
  await loadPokemon();
});
