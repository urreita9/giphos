let btn = document.getElementById("ham-btn-id"); // Variable Boton hamburguesa

let menuNav = document.getElementById("menu"); // Variable Menu Desplegable

let mode = document.getElementById("darky"); // Variable Etiqueta "a" (Modo nocturno)

//VARS Busqueda sin resultados
const noResultsInFav = document.createElement("div");
const iconNoResultsInFav = document.createElement("div");
const textNoResultsInFav = document.createElement("p");


const FAVORITO = "storageFavorito";


let favsArray= [];
let trendingArray = [];

let trendingOffset = 0;

btn.addEventListener("click", changeBtn); // Click a Boton Hamburguesa, se dispara el cambio con changeBtn

mode.addEventListener("click", changeMode); // Click a Modo Nocturno, se dispara el cambio con changeMode

// Funcion Click Hambuerguesa, cambia los estilos y despliega Menu agregando y sacando Class active
let dark = localStorage.getItem("darkMode");

if(dark == "enabled"){
    enableDarkMode();
}

//document.onload = trending(apiTrending);
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


//Funcion que dibuja los hover sobre los gifs


document.addEventListener('DOMContentLoaded',getFavorites);

