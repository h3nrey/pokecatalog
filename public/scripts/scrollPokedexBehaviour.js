var canScroll = false;
let indexLog = []
var pokemons = [];

const fetchPokemons = async() => {
    const queryOffset = document.querySelectorAll(".pokedex__card").length + 1;

    for (let i = queryOffset; i <= queryOffset + 19; i++) {
        await getPokemons(i, pokemons);       
    }
}

const getPokemons = async (id,arr) => {
    if (indexLog[id] != id) {
        const pokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = await pokeAPI.json();
        createCard(await pokemon);
    };
    indexLog.push(id);
    console.log(indexLog[id]);
}


document.addEventListener('scroll', function(e) {
    if(canScroll) {
        var scrollHeight = document.documentElement.scrollHeight;
        var scrollTop = document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;

        if( (scrollTop + clientHeight) > (scrollHeight - 5)){
            setTimeout(fetchPokemons,1000);
        }
    }
})

const btnLoadMore = document.querySelector("button#pokedex__button")
btnLoadMore.addEventListener("click", () => {
    btnLoadMore.classList.add("disabled");
    setTimeout(fetchPokemons,1000);
    canScroll = true;
})


function createCard(pokemon){
    const image = pokemon.sprites.other["official-artwork"].front_default;
    const pokemonTypes = pokemon.types;

    const card = document.createElement("div");
    card.classList.add("pokedex__card", "rounded", "bg__darkgray", "fluid");
    
    const cardCover = document.createElement("div");
    cardCover.classList.add("pokedex__card__cover", "fluid", "bg__lightblack");
    cardCover.style.backgroundImage = `url(${image})`;
    
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("pokedex__card__info");

    const pokemonName = document.createElement("div");
    pokemonName.classList.add("pokedex__card__info__name", "text__color__gray");
    pokemonName.innerText = pokemon.name;
    cardInfo.appendChild(pokemonName);

    const typeContainer = document.createElement("div");
    typeContainer.classList.add("pokedex__type__container");

    pokemonTypes.forEach(pokemonType => {
        const typeElement = document.createElement("div");
        typeElement.classList.add("pokedex__type", "rounded", `${pokemonType.type.name}`, "bg__lightblack");

        const typeName = document.createElement("p");
        typeName.classList.add("text__family__sigmar");
        typeName.innerText = pokemonType.type.name;
        typeElement.appendChild(typeName);

        typeContainer.appendChild(typeElement);
    })
    cardInfo.appendChild(typeContainer);

    [cardCover, cardInfo].forEach(element => {
        card.appendChild(element);
    });

    document.querySelector("#pokedex__grid").appendChild(card);
}