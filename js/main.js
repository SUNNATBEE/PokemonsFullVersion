const elPokemonsList = document.querySelector(".pokemons-list");
const elPokeForm = document.querySelector(".poke__form");
const elSearchInput = document.querySelector(".input__search");
const elSelectCategory = document.querySelector(".category__select");
const elSelectSort = document.querySelector(".sort__select");
const elFromCandyCount = document.querySelector(".fromcandy__count-input");
const elToCandyCount = document.querySelector(".tocandy__count-input");


// Caetegory sort
const weknesCategory = [];
function selectOptionWeknes(){
  pokemons.forEach(item =>{
    item.weaknesses.forEach(element => {
      if(!weknesCategory.includes(element)){
        weknesCategory.push(element)
      }
    })
    weknesCategory.sort()
  })
}
selectOptionWeknes(pokemons)

// Render option
function renderOption(){
  const elFragment = document.createDocumentFragment();
  weknesCategory.forEach(item =>{
    const createOtion = document.createElement("option");
    createOtion.textContent = item;
    createOtion.value = item;
    elFragment.appendChild(createOtion);
  })
  elSelectCategory.appendChild(elFragment);
}

renderOption(weknesCategory)


// Render sort nama and weight
function sortPoke(item , sortValue){
  if(sortValue == "a-z"){
    item.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)); 
  }else if (sortValue == "z-a"){
    item.sort((a,b)=> b.name.charCodeAt(0) - a.name.charCodeAt(0));
  }if(sortValue == "from"){
    item.sort((a, b) => a.weight.split(" ")[0] - b.weight.split(" ")[0]);
  }else if(sortValue == "to"){
    item.sort((a, b) => b.weight.split(" ")[0] - a.weight.split(" ")[0]);
  }
}


// Render pokemons items
function renderPoke(poke){
  elPokemonsList.innerHTML = "";
  const elFragment = document.createDocumentFragment();
  const elTemplate = document.querySelector(".poke__template").content;
  poke.forEach(item => {
    const elPokeclone = elTemplate.cloneNode(true);
    elPokeclone.querySelector(".poke__item");
    elPokeclone.querySelector(".poke__name").textContent = item.name;
    elPokeclone.querySelector(".poke__num").textContent = item.num;
    elPokeclone.querySelector(".poke__img").src = item.img;
    elPokeclone.querySelector(".poke__img").alt = item.name;
    elPokeclone.querySelector(".poke__type").textContent = item.type.join(" ");
    elPokeclone.querySelector(".poke__candy-count").textContent = `Candy count: ${item.candy_count}`;
    elPokeclone.querySelector(".poke__weigth").textContent = item.weight;
    // elPokeclone.querySelector(".poke__spawn-chance").textContent = item.avg_spawns;
    elPokeclone.querySelector(".poke__time").textContent = item.spawn_time;
    elPokeclone.querySelector(".poke__weknes").textContent = item.weaknesses.join(" ");
    elFragment.appendChild(elPokeclone);
  });
  elPokemonsList.appendChild(elFragment);
}
renderPoke(pokemons);




// Form listen for search and sort
elPokeForm.addEventListener("submit" , (evt) => {
  evt.preventDefault();
  const inputValue = elSearchInput.value;
  const sortValueSelect = elSelectSort.value.trim();
  const regexValue = new RegExp(inputValue, "gi");
  const searchPoke = pokemons.filter(item => {
    return (
      item.name.match(regexValue) &&
      (elSelectCategory.value == "all" ||
      item.weaknesses.includes(elSelectCategory.value)) &&
      (elFromCandyCount.value == "" ||
      Number(elFromCandyCount.value) <= item.candy_count) &&
      (elToCandyCount.value == "" ||
      Number(elToCandyCount.value) >= item.candy_count)
      );
    })
    if(searchPoke.length > 0){
      sortPoke(searchPoke,sortValueSelect);
      renderOption(pokemons)
      renderPoke(searchPoke);
    }else{
      elPokemonsList.innerHTML = "not found poke"
    }
  })
  
  renderPoke(pokemons);


const favoritePoke = [];
 elPokemonsList.addEventListener("click" , (evt) => {
  const elStarBtn = document.querySelector(".star-button");
  if(evt.target.matches("elStarBtn")){
    const elStarBtn = evt.target.dataset.pokeID = "id"
    const canvasFindPoke = pokemons.find(item => item.id == canvasBtn);
    favoritePoke.push(canvasFindPoke);
  }
 })
  
  
