let btn = document.getElementById("ham-btn-id"); // Variable Boton hamburguesa

let menuNav = document.getElementById("menu"); // Variable Menu Desplegable

let mode = document.getElementById("darky"); // Variable Etiqueta "a" (Modo nocturno)

//VARS Busqueda sin resultados
const noResultsInFav = document.createElement("div");
const iconNoResultsInFav = document.createElement("div");
const textNoResultsInFav = document.createElement("p");

const waitingHover = document.createElement("div");
const loadingIcon = document.createElement("i");
const loadingText = document.createElement("p");


const MIS_GIFOS = "storageMisGifos";

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


// CREAR GIFOS

let recordBtnText = document.getElementById("btn-text");
const stepOneBtn = document.getElementById("step-1");
const stepTwoBtn = document.getElementById("step-2");
const stepThreeBtn = document.getElementById("step-3");




