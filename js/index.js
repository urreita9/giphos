
let btn = document.getElementById("ham-btn-id"); // Variable Boton hamburguesa

let menuNav = document.getElementById("menu"); // Variable Menu Desplegable

let mode = document.getElementById("darky"); // Variable Etiqueta "a" (Modo nocturno)

//VARS Busqueda sin resultados
const noResults = document.createElement("div");
const ouch = document.createElement("div");
const tryAgain = document.createElement("p");
const suggestionContainer = document.createElement("div");

const FAVORITO = "storageFavorito";

//Array con resultados search
let searchArray = [];
let trendingArray = [];

//Offset para trending
let trendingOffset = 0;


btn.addEventListener("click", changeBtn); // Click a Boton Hamburguesa, se dispara el cambio con changeBtn

mode.addEventListener("click", changeMode); // Click a Modo Nocturno, se dispara el cambio con changeMode

// Funcion Click Hambuerguesa, cambia los estilos y despliega Menu agregando y sacando Class active
let dark = localStorage.getItem("darkMode");

if(dark == "enabled"){
    enableDarkMode();
}

// SEARCH BAR
let input = document.getElementById("search-input");
let searchValue = document.getElementById("search-input").value;


input.addEventListener("keyup", (e) =>{
    let writtenTerm = input.value;
    console.log(writtenTerm);
    clearSuggestionsContainerContent();
    if(writtenTerm.length = 0){
        lupa.addEventListener("click", storeSearchValue);
    }
    if(e.code != "Enter"){
        // addLupaIcon();
        if(writtenTerm.length > 0){
            suggestions(writtenTerm).then(data =>  drawSuggestions(data));
            console.log(writtenTerm);
            addLupaIcon();
            lupa.addEventListener("click", () => {
                input.value = "";
                clearSuggestionsContainerContent();
                lupa.classList.remove("lupa-cross");
            });

        }
        else{
            removeLupaIcon();
            lupa.classList.remove("lupa-cross");
            clearSuggestionsContainerContent();
            // removeLupaIcon();
        }
    }else{
        lupa.classList.remove("lupa-cross");
        // removeLupaIcon();
        clearSuggestionsContainerContent();
    }
})

let lupa = document.getElementById("lupa");
let verMas = document.getElementById("ver-mas-btn")

verMas.addEventListener("click", addOffset);
lupa.addEventListener("click", setInputValueToLocalStorageAndErase);

let offset= 0;

function addOffset(){
    offset += 12;
    if(limit != 1){
        limit = 12;
        search(limit, offset).then(data => drawGifOnSearch(data));
    }
}

// Activar click con Enter
input.addEventListener("keypress", hitEnter);



// TRENDING FETCH


//document.onload = trending(apiTrending);
document.addEventListener('DOMContentLoaded', trendingTopics().then(data => drawTrendingTopics(data))); 

document.addEventListener('DOMContentLoaded', trending(3,0).then(data => drawTrendsOnLoad(data))); 

document.getElementById("scroll-next").addEventListener("click", () => {
    trendingOffset += 3;
    trending(3, trendingOffset).then(data => drawTrendsOnLoad(data));
});
document.getElementById("scroll-previous").addEventListener("click", () => {
    trendingOffset -= 3;
    if(trendingOffset <= 0){
        trendingOffset = 20;
    }
    trending(3, trendingOffset).then(data => drawTrendsOnLoad(data));;
});

function noResultsEnabler(){
            noResults.classList.add("nothing-found");
            ouch.classList.add("ouch");
            tryAgain.classList.add("try-again");
            tryAgain.textContent = "Intenta con otra búsqueda";
            document.getElementById("search-section").appendChild(noResults);
            noResults.appendChild(ouch);
            noResults.appendChild(tryAgain);
}

function noResultsDisabler(){
            noResults.classList.remove("nothing-found");
            ouch.classList.remove("ouch");
            tryAgain.textContent = "";
}