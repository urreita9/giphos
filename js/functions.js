const favsTitle = document.getElementById("app-title");

function changeBtn(){
    btn.classList.toggle("active");
    menuNav.classList.toggle("active");
   
}
function changeMode(){
    dark = localStorage.getItem("darkMode");
    if(dark !== "enabled"){
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}
function enableDarkMode(){
    document.body.classList.add("dark-mode");
    btn.classList.toggle("active");
    localStorage.setItem("darkMode", "enabled");
    changeTextMode();
}

function disableDarkMode(){
    document.body.classList.remove("dark-mode");
    btn.classList.toggle("active");
    localStorage.setItem("darkMode", null);
    changeTextMode();
}

// Funcion que cambia el texto de la etiqueta <a> de "Modo Nocturno" a "Modo Diurno". La llamamos en changeMode().
function changeTextMode(){
    if (mode.innerHTML === "Modo Nocturno") {
        mode.innerHTML = "Modo Diurno";
      } else {
        mode.innerHTML = "Modo Nocturno";
      }
}


function hitEnter(event){
    if(event.code == "Enter"){
        event.preventDefault();
        storeSearchValue();

        setInputValueToLocalStorageAndErase();
        removeLupaIcon();
    }
}
function suggestions(input){
    return fetch ("https://api.giphy.com/v1/tags/related/" + input + "?&api_key=940D6rFjWipAwUmqdskYmMK8wMV036ID&limit=4")
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}

function drawSuggestions(data){

    const line = document.createElement("hr");
    line.classList.add("line");
    clearSuggestionsContainerContent();
    lupa.classList.add("lupa-cross");

    for(let i = 0; i <data.data.length; i++) {
        const suggestionDiv = document.createElement("div");
        const suggestion = document.createElement("h4")
        // const lupaSuggestion = document.createElement("i");
        
        suggestionDiv.classList.add("suggestion-div");
        suggestionContainer.classList.add("suggestion-container");
        suggestion.classList.add("suggestion");
        // lupaSuggestion.classList.add("lupa-suggestion");

        suggestionContainer.setAttribute("id", "suggestion-container");
        suggestion.innerText = data.data[i].name;
        
        
        // suggestionDiv.appendChild(lupaSuggestion);
        suggestionDiv.appendChild(suggestion);
        suggestionContainer.appendChild(suggestionDiv);
        suggestionContainer.appendChild(line);
        document.getElementById("search-bar").appendChild(suggestionContainer);
            suggestion.addEventListener("click", () =>{
                input.value = suggestion.innerText;
                setInputValueToLocalStorageAndErase();
                storeSearchValue();
            });
    };
}

function addLupaIcon(){
    const lupaIcon = document.getElementById("icon-before-words");
    lupaIcon.classList.add("active"); 
    lupaIcon.addEventListener("click", () => {
        storeSearchValue();
        setInputValueToLocalStorageAndErase();
        removeLupaIcon();
    })
}
function removeLupaIcon(){
    document.getElementById("icon-before-words").classList.remove("active"); 
}

function clearSuggestionsContainerContent(){
    suggestionContainer.innerHTML = "";
}

function storeSearchValue(){
    clearOffset();
    clearLimit();
    searchArray = [];
    noResultsDisabler();
    if(limit != 1){
        search(limit, offset).then(data => drawGifOnSearch(data));
    }
    // clearInput();   
}

function clearOffset(){
    return offset = 0;
}
function clearLimit(){
    return limit = 12;
}

// function clearInput(){
//     const giphosTitleSearch = document.getElementById("giphos-search-title");
//     giphosTitleSearch.innerHTML = searchValue;
//     if(input.value){
//         input.value = "";
//     }
// }

function search(limit, offset){
    let searchValue;
    if(offset == 0 && limit == 12){
        searchValue = document.getElementById("search-input").value;
    } else {
        searchValue = JSON.parse(localStorage.getItem("myInputs"));
    }
    let apiKey = "api_key=940D6rFjWipAwUmqdskYmMK8wMV036ID&q=";
    
    let apiSearch = `https://api.giphy.com/v1/gifs/search?${apiKey}${searchValue}&offset=${offset}&limit=`+ limit;
    
    return fetch(apiSearch)
    .then(response => response.json())
    .then(json => json.data)
    .catch(error => console.error(error))

}
function drawGifOnSearch(data){
    console.log(data);
    clearSuggestionsContainerContent();
    const searchTitle = document.getElementById("giphos-search-title");
    searchTitle.innerText = input.value
    let giphosContainer = document.getElementById("giphos-search-container");
        console.log(data);

        if(offset == 0){
            eraseGiphoContainerContent();
        }
        if(data.length > 0){

            for(let i=0; i < data.length; i++){
            
                let giphoDivContainer = document.createElement("div");
                giphoDivContainer.classList.add("gipho-div-container");
                let gipho = document.createElement("img");
                
                const searchObject = {
                    url: data[i].images.original.url,
                    title: data[i].title,
                    username: data[i].username,
                    id: data[i].id,
                    number: 1
                }
                gipho.src = searchObject.url;
                gipho.classList.add("gipho");
                giphosContainer.appendChild(giphoDivContainer);
                giphoDivContainer.appendChild(gipho);
                document.getElementById("ver-mas-btn").classList.add("ver-mas-btn");
                searchArray.push(searchObject);  
                
                
                drawHover(giphoDivContainer, searchObject);
                
            }  

    } else{
        document.getElementById("ver-mas-btn").classList.remove("ver-mas-btn");               
        noResultsEnabler();
    }
    
}


function eraseGiphoContainerContent(){
    document.getElementById("giphos-search-container").innerHTML = "";        
}
function addTrashIcon(likeBtn){
    favsTitle.textContent === "Favoritos" ? likeBtn.classList.add("on-favs") : likeBtn.classList.remove("on-favs");
    favsTitle.textContent === "Mis GIFOS" ? likeBtn.classList.add("on-favs") : likeBtn.classList.remove("on-favs");
}

function setInputValueToLocalStorageAndErase(){
    removeLupaIcon();
    let inputSearch = input.value;
    localStorage.setItem("myInputs", JSON.stringify(inputSearch));
    console.log(localStorage);
    if(inputSearch == ""){
        storeSearchValue();
        inputSearch = "";
    } else{
        inputSearch = "";
    }
}
//Funcion que dibuja los hover sobre los gifs
function drawHover (giphoDivContainer,selectedGif){
    
    let hoverContainer = document.createElement("div");
    let headerContainer = document.createElement("header");

    let likeBtn = document.createElement("i");
    let downloadBtn = document.createElement("i");
    let fullScreenBtn = document.createElement("i");

    let footerContainer = document.createElement("footer");
    let userPcontainer = document.createElement("p");
    let titleContainer = document.createElement("h2");

    hoverContainer.classList.add("hover-container");
    headerContainer.classList.add("header-container");
    likeBtn.classList.add("icon-one-container");
    downloadBtn.classList.add("icon-two-container");
    fullScreenBtn.classList.add("icon-three-container");
    footerContainer.classList.add("footer-container");
    userPcontainer.classList.add("user-p-container");
    titleContainer.classList.add("title-container");

    addTrashIcon(likeBtn);
    

    giphoDivContainer.appendChild(hoverContainer);
    hoverContainer.appendChild(headerContainer);
    hoverContainer.appendChild(footerContainer);
    headerContainer.appendChild(likeBtn);
    headerContainer.appendChild(downloadBtn);
    headerContainer.appendChild(fullScreenBtn);
    hoverContainer.appendChild(userPcontainer);
    hoverContainer.appendChild(titleContainer);
    footerContainer.appendChild(userPcontainer);
    footerContainer.appendChild(titleContainer);
    if(selectedGif.username == ""){
        userPcontainer.innerHTML = "Username undefined";
    } else{
        userPcontainer.innerHTML = selectedGif.username;
    }
    if(selectedGif.title == ""){
        titleContainer.innerHTML = "Title undefined";
    } else{
        titleContainer.innerHTML = selectedGif.title;
    }

    
    purpleBtn(likeBtn, selectedGif);
    
    if(window.innerWidth < 720){
        giphoDivContainer.addEventListener("click", () => {
            hoverContainer.classList.toggle("active");
        })
    }
    

    fullScreenBtn.addEventListener("click", () => {
        fullScreen(selectedGif);
    });
    downloadBtn.addEventListener("click", ()=> {
        let link = selectedGif.url;
        downloadGifo(link);
        
    });
    likeBtn.addEventListener("click", ()=> {
        if(selectedGif.number == 1 || selectedGif.number== 2 || selectedGif.number == 3){
            setToFavorites(selectedGif, likeBtn);
        }else{
            console.log(selectedGif);
            let misGifos = JSON.parse(localStorage.getItem("storageMisGifos"));
            console.log(misGifos);
            for(let i=0; i < misGifos.length; i++){
                if(misGifos[i].id == selectedGif.id){
                    misGifos.splice(i,1);
                    
                }
            }
            localStorage.setItem("storageMisGifos", JSON.stringify(misGifos));
            location.reload();
        }
        
    });

    
    
}

function purpleBtn(likeBtn, selectedGif){
    let favoritos = JSON.parse(localStorage.getItem(FAVORITO));
        if (favoritos == null){
            likeBtn.classList.remove("purple-like");
            return;
        }
        if (selectedGif.number == 1 || selectedGif.number == 2){
            for(let i=0; i < favoritos.length; i++){
                if(favoritos[i].id == selectedGif.id){
                    
                    likeBtn.classList.add("purple-like");
        
                }
                
            }
        }
}
function setToFavorites(selectedGif, likeBtn){
    let favoritos = JSON.parse(localStorage.getItem(FAVORITO));
        if(!favoritos){
            favoritos=[];
            // emptyFavs();
        }
        
        let wasinarray = false;
        for(let i=0; i < favoritos.length; i++){
            if(favoritos[i].id == selectedGif.id){
                favoritos.splice(i,1);
                wasinarray = true;
                selectedGif.number == 3? location.reload(): console.log("no es favoritos");
                console.log(likeBtn)
                likeBtn.classList.remove("purple-like");
    
            }
            reloadFavoritos();
            
        }
        if(!wasinarray){
            const gifObject = {
                url: selectedGif.url,
                title: selectedGif.title,
                username: selectedGif.username,
                id: selectedGif.id,
                number: 3
            };
            favoritos.push(gifObject);
            likeBtn.classList.add("purple-like");
            reloadFavoritos();
            selectedGif.number == 3? location.reload(): console.log("no es favoritos");
        }
        localStorage.setItem(FAVORITO, JSON.stringify(favoritos));
}

function fullScreen(selectedGif){
    
    // console.log(typeof(selectedGif));
    // console.log(selectedGif);
    const fullscreenContainer = document.createElement("div");
    const crossContainer = document.createElement("div");
    const scrollContainer = document.createElement("div");
    const footerContainer = document.createElement("div");

    const crossIcon = document.createElement("div");

    const previuosIcon = document.createElement("i");
    const gifImg = document.createElement("img");
    const nextIcon = document.createElement("i");

    const footerData = document.createElement("div");
    const iconsDiv = document.createElement("div");

    const userInfo = document.createElement("h4");
    const titleInfo = document.createElement("h3");

    const likeBtn = document.createElement("i");
    const downloadIcon = document.createElement("i");

    fullscreenContainer.classList.add("fullscreen-container");
    crossContainer.classList.add("cross-container");
    scrollContainer.classList.add("scroll-container");
    footerContainer.classList.add("footer-container");

    crossIcon.classList.add("cross-icon-1");

    previuosIcon.classList.add("previous-icon");
    gifImg.classList.add("gif-img");
    nextIcon.classList.add("next-icon");

    footerData.classList.add("footer-data-container");
    iconsDiv.classList.add("icons-div-container");

    userInfo.classList.add("user-info");
    titleInfo.classList.add("title-info");

    likeBtn.classList.add("like-icon");
    downloadIcon.classList.add("download-icon");

    iconsDiv.appendChild(likeBtn);
    iconsDiv.appendChild(downloadIcon);
    footerData.appendChild(userInfo);
    footerData.appendChild(titleInfo);
    
    footerContainer.appendChild(footerData);
    footerContainer.appendChild(iconsDiv);

    scrollContainer.appendChild(previuosIcon);
    scrollContainer.appendChild(gifImg);
    scrollContainer.appendChild(nextIcon);

    crossContainer.appendChild(crossIcon);

    fullscreenContainer.appendChild(crossContainer); 
    fullscreenContainer.appendChild(scrollContainer);
    fullscreenContainer.appendChild(footerContainer);
    

    gifImg.src = selectedGif.url;
    // userInfo.textContent = selectedGif.username;
    // titleInfo.textContent = selectedGif.title;

    if(selectedGif.username == ""){
        userInfo.textContent = "Username undefined";
    } else{
        userInfo.textContent = selectedGif.username;
    }
    if(selectedGif.title == ""){
        titleInfo.textContent = "Title undefined";
    } else{
        titleInfo.textContent = selectedGif.title;

    }
    purpleBtn(likeBtn, selectedGif);
    // console.log(selectedGif);
    document.getElementById("search-section").appendChild(fullscreenContainer);
    if(selectedGif.number == 3){
        addTrashIcon(likeBtn);
    }
     
    crossIcon.addEventListener("click", () =>{
        document.getElementById("search-section").removeChild(fullscreenContainer);
        // fullscreenContainer.innerHTML = "";
        // crossContainer.innerHTML = "";
        // scrollContainer.innerHTML = "";
        // footerContainer.innerHTML = "";
        // fullscreenContainer.classList.remove("fullscreen-container");
    });
    
    likeBtn.addEventListener("click", ()=> setToFavorites(selectedGif, likeBtn));
    downloadIcon.addEventListener("click", () => {
        let link = selectedGif.url;
        downloadGifo(link);
    })
    nextIcon.addEventListener("click", () =>{
       nextOn(fullscreenContainer, selectedGif);
    });
    previuosIcon.addEventListener("click", () =>{
        previousOn(fullscreenContainer, selectedGif);
    });
}
function nextOn(fullscreenContainer, selectedGif){
    document.getElementById("search-section").removeChild(fullscreenContainer);

    if(selectedGif.number == 1){
        nextOnFullscreen(selectedGif, searchArray);
        // offset ++;
        // search(1, offset).then(data => fullScreen({
        //     url : data[0].images.original.url,
        //     title: data[0].title,
        //     username: data[0].username,
        //     id: data[0].id,
        //     number: 1
        // }));
    }else if(selectedGif.number == 2){
        trendingOffset ++;
        trending(1,trendingOffset).then(data => fullScreen({
            url : data[0].images.original.url,
            title: data[0].title,
            username: data[0].username,
            id: data[0].id,
            number: 2
        }));       
 }else if(selectedGif.number == 3){
     nextOnFavorites(selectedGif);
 }else if(selectedGif.number == 4){
    nextOnMisGifos(selectedGif);
 } 
}

function previousOn(fullscreenContainer, selectedGif){
    document.getElementById("search-section").removeChild(fullscreenContainer);
        if(selectedGif.number == 1){
            previousOnFullscreen(selectedGif, searchArray);
            // if(offset <= 0){
            //     offset = 40;
            //     search(1, offset).then(data => fullScreen({
            //         url: data[0].images.original.url,
            //         title: data[0].title,
            //         username: data[0].username,
            //         id: data[0].id,
            //         number: 1
            //     }));
            // }else{
            //     offset --;
            //     search(1, offset).then(data => fullScreen({
            //         url: data[0].images.original.url,
            //         title: data[0].title,
            //         username: data[0].username,
            //         id: data[0].id,
            //         number: 1
            //     }));
            // }
            
        }else if(selectedGif.number == 2){
            trendingOffset --;
            if(trendingOffset <= 0){
                trendingOffset = 40;
                console.log(selectedGif);
                trending(1,trendingOffset).then(data => fullScreen({
                    url : data[0].images.original.url,
                    title: data[0].title,
                    username: data[0].username,
                    id: data[0].id,
                    number: 2
                }));
            }else{
                trendingOffset --;
                trending(1,trendingOffset).then(data => fullScreen({
                    url : data[0].images.original.url,
                    title: data[0].title,
                    username: data[0].username,
                    id: data[0].id,
                    number: 2
                }));

            }
            
        } else if(selectedGif.numer == 3){
            previousOnFavorites(selectedGif);
        }
        else{
            previousOnMisGifos(selectedGif);
        }
}
function nextOnFavorites(selectedGif){
    let favoritos = JSON.parse(localStorage.getItem(FAVORITO));
    console.log(favoritos);
    console.log(selectedGif);
    let favs = favoritos.findIndex(fav => fav.id === selectedGif.id);
    favs == (favoritos.length-1) ? fullScreen(favoritos[0]) : fullScreen(favoritos[favs+1]);
}
function nextOnFullscreen(selectedGif, sectionArray){
    
    let fullGifs = sectionArray.findIndex(gif => gif.id === selectedGif.id);
    fullGifs == (sectionArray.length-1) ? fullScreen(sectionArray[0]) : fullScreen(sectionArray[fullGifs+1]);
}
function previousOnFullscreen(selectedGif, sectionArray){
    
    let fullGifs = sectionArray.findIndex(gif => gif.id === selectedGif.id);
    fullGifs == 0? fullScreen(sectionArray[sectionArray.length-1]):fullScreen(sectionArray[fullGifs-1]);
}


function previousOnFavorites(selectedGif){
    let favoritos = JSON.parse(localStorage.getItem(FAVORITO));
    console.log(favoritos);
    console.log(selectedGif);
    let favs = favoritos.findIndex(fav => fav.id === selectedGif.id);
    favs == 0? fullScreen(favoritos[favoritos.length-1]):fullScreen(favoritos[favs-1]);
}  
function nextOnMisGifos(selectedGif){
    let misGifos = JSON.parse(localStorage.getItem("storageMisGifos"));
    console.log(misGifos);
    console.log(selectedGif);
    let gifos = misGifos.findIndex(gif => gif.id === selectedGif.id);
    gifos == (misGifos.length-1) ? fullScreen(misGifos[0]) : fullScreen(misGifos[gifos+1]);
}
function previousOnMisGifos(selectedGif){
    let misGifos = JSON.parse(localStorage.getItem("storageMisGifos"));
    
    let gifos = misGifos.findIndex(gif => gif.id === selectedGif.id);
    gifos == 0? fullScreen(misGifos[misGifos.length-1]):fullScreen(misGifos[gifos-1]);
}

function reloadFavoritos(){
    if(favsTitle.textContent === "Favoritos"){
        location.reload();
    }
}

function trending(trendingLimit, trendingOffset){
    
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=940D6rFjWipAwUmqdskYmMK8wMV036ID&q=&limit=`+ trendingLimit + `&offset=` + trendingOffset)
    
    .then(response => response.json())
    .then(json => json.data)
        // console.log(json.data);
        // let giphosContainer = document.getElementById("trending-scroll-image-container");
    .catch(error => console.error(error));
}
function trendingTopics(){
    return fetch("https://api.giphy.com/v1/trending/searches?api_key=940D6rFjWipAwUmqdskYmMK8wMV036ID")
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}
function drawTrendingTopics(dataApiObject){
    const trendingArray = dataApiObject.data;
    let myTitlesArray = [];
    let trendingText = document.getElementById("trending-topics");
    for(let i = 0; i<5; i++){
        let myTitles = trendingArray[i].charAt(0).toUpperCase() + trendingArray[i].slice(1)
        myTitlesArray.push(myTitles);
    }
    trendingText.innerText = myTitlesArray.join(", ");
    trendingText.addEventListener("click", console.log(trendingText.textContent));
    
}
function drawTrendsOnLoad(data){
    let giphosContainer = document.getElementById("trending-scroll-image-container");
    giphosContainer.innerHTML = "";
    for(let i=0; i < data.length; i++){
        let giphoTrending = document.createElement("img");
        let trendingGiphos = document.createElement("div");
        const trendingObject = {
            url: data[i].images.original.url,
            title: data[i].title,
            username: data[i].username,
            id: data[i].id,
            number: 2
        }
        giphoTrending.src = trendingObject.url;
        trendingArray.push(trendingObject);
        giphoTrending.classList.add("trending-giphs");
        trendingGiphos.classList.add("trending-divs");
        trendingGiphos.appendChild(giphoTrending);
        giphosContainer.appendChild(trendingGiphos);           
        

        drawHover(trendingGiphos, trendingObject);
    }

}

function getFavorites(){
    let giphosContainer = document.getElementById("giphos-search-container");
    let favoritos = JSON.parse(localStorage.getItem(FAVORITO));
    favoritos.forEach(element => {
        
        let giphoDivContainer = document.createElement("div");
        giphoDivContainer.classList.add("gipho-div-container");
        let gipho = document.createElement("img");
        gipho.src = element.url;
        // console.log(element);

        favsArray.push(element);
        //console.log(favsArray);
        // let user = element.username;
        // let title = element.title;
        gipho.classList.add("gipho");
        giphosContainer.appendChild(giphoDivContainer);
        giphoDivContainer.appendChild(gipho);
        document.getElementById("ver-mas-btn").classList.add("ver-mas-btn");
        drawHover(giphoDivContainer, element);
    });
}
// function emptyFavs(){
//     const emptyFavsContainaer = document.createElement("div");
//     const emptyFavsIcon = document.createElement("i");
//     const emptyFavsP = document.createElement("p");

//     emptyFavsContainaer.classList.add("empty-favs-container");
//     emptyFavsIcon.classList.add("empty-favs-icon");
//     emptyFavsP.classList.add("empty-favs-p");

//     document.querySelector(".on-favorites").appendChild(emptyFavsContainaer);
//     emptyFavsContainaer.appendChild(emptyFavsIcon);
//     emptyFavsContainaer.appendChild(emptyFavsP);

//     emptyFavsP.textContent = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"';
// }
// function clearEmptyFavs(){
//     document.querySelector(".on-favorites").removeChild(emptyFavsContainaer);
// }

//VIDEO
let constraintObj = { 
    audio: false, 
    video: { 
        facingMode: "user", 
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 } 
    } 
};             

 function getStreamAndRecord () { 
    drawWaitingForVideo();
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 480 }
    }
 }).then(stream => doMyVideo(stream))};
        
function doMyVideo(stream){
    cleanVideoContainer();
    const recordMyVideoBtn = document.createElement("div");
    const btnText = document.createElement("p");
    clearButtonStepOne(recordMyVideoBtn, btnText);

    const myVideo = document.createElement("video");
    myVideo.setAttribute("id", "vid");
    myVideo.autoplay = true;
    document.getElementById("center-screen").appendChild(myVideo);
    stepOneBtn.classList.remove("active");
    stepTwoBtn.classList.add("active");
    myVideo.srcObject = stream;

    recordBtnText.textContent = "GRABAR";
    let recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 10,
        quality: 10,
        width: 360,
         hidden: 240,
        onGifRecordingStarted: function() {
             console.log('started')
             },
        });
    

    recordMyVideoBtn.addEventListener('click', ()=>{
        
            recorder.startRecording();
            console.log(recorder.state);
        document.getElementById("gifo-steps").removeChild(recordMyVideoBtn);
        
        const endRecordingBtn = document.createElement("div");
        const endBtnText = document.createElement("p");
        clearButtonStepTwo(endRecordingBtn, endBtnText);

        endRecordingBtn.addEventListener("click", ()=>{
            document.getElementById("gifo-steps").removeChild(endRecordingBtn);
        
            const uploadRecording = document.createElement("div");
            const uploadRecordingText = document.createElement("p");
            clearButtonStepThree(uploadRecording, uploadRecordingText);

            recorder.stopRecording(() => {
                let blob = recorder.getBlob();
                let url = URL.createObjectURL(blob);
                localStorage.setItem("myDownloadLink", JSON.stringify(url));
                
            });
            console.log(recorder.state);

            uploadRecording.addEventListener("click", ()=>{
                document.getElementById("gifo-steps").removeChild(uploadRecording);
                
                myVideo.pause();
                let form = new FormData();;
                form.append('file', recorder.getBlob(), 'myGif.gif');
                console.log(form.get('file'));

                
                    drawUploadingHover();
                    uploadMyGifo(form);
                
                
                
            })
        })
        });
        
    
}
function downloadGifo(link){
    
    fetch(link)
        .then(response => response.blob())
        .then(blob =>{
                
        let a = document.createElement('a');
        a.download = "gif.gif";
        a.href = window.URL.createObjectURL(blob);
        // a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();
        a.innerHTML = "";
        })
}

function clearButtonStepOne(recordBtn, recordTextBtn){
    document.getElementById("gifo-steps").removeChild(startBtn);
    recordTextBtn.classList.add("btn-text");
    recordTextBtn.textContent = "GRABAR";
    recordBtn.appendChild(recordTextBtn);
    recordBtn.classList.add("comenzar-btn");
    document.getElementById("gifo-steps").appendChild(recordBtn);
}
function clearButtonStepTwo(recordBtn, recordTextBtn){
    recordTextBtn.classList.add("btn-text");
    recordTextBtn.textContent = "FINALIZAR";
    recordBtn.appendChild(recordTextBtn);
    recordBtn.classList.add("comenzar-btn");
    document.getElementById("gifo-steps").appendChild(recordBtn);
}
function clearButtonStepThree(recordBtn, recordTextBtn){
    recordTextBtn.classList.add("btn-text");
    recordTextBtn.textContent = "SUBIR GIFO";
    recordBtn.appendChild(recordTextBtn);
    recordBtn.classList.add("comenzar-btn");
    document.getElementById("gifo-steps").appendChild(recordBtn);
}

function uploadMyGifo(form){

    return fetch(`https://upload.giphy.com/v1/gifs?api_key=940D6rFjWipAwUmqdskYmMK8wMV036ID`,{
        method: 'POST',
        body: form
    })

    .then(response => response.json())
    .then(data => drawFinishUploading(data))
}

function drawFinishUploading(data){
    const header = document.createElement("header");
    const downloadBtn = document.createElement("i");
    const linkBtn = document.createElement("i");

    header.classList.add("header-container-absolute");
    downloadBtn.classList.add("download-icon-container");
    linkBtn.classList.add("link-icon-container")

    loadingIcon.classList.remove("loading-hover");
    loadingIcon.classList.add("loading-success");
    loadingText.textContent= "GIFO subido con éxito";

    waitingHover.appendChild(header);
    header.appendChild(downloadBtn);
    header.appendChild(linkBtn);
    setToMisGifos(data);

    downloadBtn.addEventListener("click", () => {
        downloadGifo(JSON.parse(localStorage.getItem("myDownloadLink")));
    })
    linkBtn.addEventListener("click", () => {
        let misGifos = JSON.parse(localStorage.getItem(MIS_GIFOS));
        alert("El link de te GIFO es: " + misGifos[misGifos.length-1].url);
    })
}
                    
function setToMisGifos(data){

    return fetch(`https://api.giphy.com/v1/gifs/${data.data.id}?api_key=940D6rFjWipAwUmqdskYmMK8wMV036ID`)
    .then(response => response.json())
    .then(data => saveToLocalStorage(data))
}

function saveToLocalStorage(data){
    console.log(data.data);
    let gifo = data.data;
    let misGifos = JSON.parse(localStorage.getItem(MIS_GIFOS));
    if(!misGifos){
        misGifos=[];
    }
    
    let wasinarray = false;
    for(let i=0; i < misGifos.length; i++){
        if(misGifos[i].id == gifo.id){
            misGifos.splice(i,1);
            wasinarray = true;
        }
       
    }
    if(!wasinarray){
        const myGifosObject = {
            url: gifo.images.original.url,
            title: gifo.title,
            username: gifo.username,
            id: gifo.id,
            number: 4
        };
        misGifos.push(myGifosObject);       
    }
    localStorage.setItem(MIS_GIFOS, JSON.stringify(misGifos));

}

function drawMisGifos(){
    let giphosContainer = document.getElementById("giphos-search-container");
    let misGifos = (JSON.parse(localStorage.getItem("storageMisGifos")));
    console.log(misGifos);
    for(let i= 0; i < misGifos.length; i++){
        let giphoDivContainer = document.createElement("div");
        giphoDivContainer.classList.add("gipho-div-container");
        let gipho = document.createElement("img");

        gipho.src = misGifos[i].url;
        

        gipho.classList.add("gipho");
        giphosContainer.appendChild(giphoDivContainer);
        giphoDivContainer.appendChild(gipho);
        document.getElementById("ver-mas-btn").classList.add("ver-mas-btn");
        drawHover(giphoDivContainer, misGifos[i]);
    }
}

function cleanVideoContainer(){
    document.getElementById("text-on-screen").classList.add("active");
}

function drawWaitingForVideo(){
    const title = document.getElementById("title-screen").textContent = "¿Nos das acceso a tu cámara?";
    const p1 = document.getElementById("p1-screen").textContent = "El acceso a tucámara será válido sólo";
    const p2 = document.getElementById("p2-screen").textContent = "por el tiempo en que estés creando el GIFO";
    stepOneBtn.classList.add("active");

}
function drawUploadingHover(){
    
    waitingHover.classList.add("waiting-hover");
    loadingIcon.classList.add("loading-hover");
    loadingText.classList.add("loadingText-hover");

    document.getElementById("center-screen").appendChild(waitingHover);
    waitingHover.appendChild(loadingIcon);
    waitingHover.appendChild(loadingText);

    loadingText.textContent= "Estamos subiendo tu GIFO";
}