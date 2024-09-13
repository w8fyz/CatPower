let catContainer = document.getElementById("cat-container");
let loader = document.getElementById("loader");
let favNav = document.getElementById("favorite-button-container");
let mainNav = document.getElementById("main-button-container");

if(localStorage.getItem("likes") == null) {
    localStorage.setItem("likes", "{}");
}

function playHeartAnimation(div) {
    div.querySelector(".heart-anim").style.animation = "fadeInOut 0.7s ease-in-out forwards";
}



function renderCat(image) {
    let button = "";
    if(isLiking(image)) {
        button = '<button onclick="deleteLike(this)">Supprimer le like</button>';
    } else {
        button = '<button onclick="like(this)">Like</button>';
    }
    let html = '<div class="cat"><div class="heart-anim">♥</div><img src="'+image+'" alt="A cat image">'+button+'</div>'
    catContainer.insertAdjacentHTML('beforeend', html);
}

function showMainButtons() {
    favNav.style.display = "none";
    mainNav.style.display = "block";
}

function showFavButtons() {
    favNav.style.display = "block";
    mainNav.style.display = "none";
}

function removeLoader() {
    loader.style.display = "none";
    catContainer.style.display = "flex";
}

function showLoader() {
    loader.style.display = "block";
    catContainer.style.display = "none";
}

function isLiking(url) {
    let json = localStorage.getItem("likes");
    let likes = json ? JSON.parse(json) : [];
    if (!Array.isArray(likes)) {
        likes = [];
    }
    return likes.includes(url);
}

function like(elem) {
    let image = elem.parentNode.querySelector('img');
    playHeartAnimation(elem.parentNode);
    let json = localStorage.getItem("likes");
    let likes = json ? JSON.parse(json) : [];
    if (!Array.isArray(likes)) {
        likes = [];
    }
    likes.push(image.src);
    localStorage.setItem("likes", JSON.stringify(likes))
    elem.parentNode.insertAdjacentHTML('beforeend', '<button onclick="deleteLike(this)">Supprimer le like</button>');
    elem.remove();
}

function deleteLike(elem) {
    let image = elem.parentNode.querySelector('img');
    elem.parentNode.querySelector(".heart-anim").style.animation = "";
    let json = localStorage.getItem("likes");
    let likes = json ? JSON.parse(json) : [];
    if (!Array.isArray(likes)) {
        likes = [];
    }
    likes = likes.filter(item => item !== image.src);
    localStorage.setItem("likes", JSON.stringify(likes))
    elem.parentNode.insertAdjacentHTML('beforeend', '<button onclick="like(this)">Like</button>');
    elem.remove();
}

function showLikes() {
    showFavButtons();
    let cats = retrieveLikedCats();
    catContainer.innerHTML = "";
    cats.forEach((cat) => {
        renderCat(cat);
    })
    if(cats.length === 0) {
        catContainer.innerHTML = "";
        catContainer.insertAdjacentHTML('beforeend', '<h2>Aucun like</h2>')
    }
}

function showCats() {
    showMainButtons();
    retrieveCats(10);
}

function retrieveLikedCats() {
    let cats = [];
    let json = localStorage.getItem("likes");
    let parse = JSON.parse(json);
    if (!Array.isArray(parse)) {
        localStorage.setItem("likes", JSON.stringify(cats))
        return cats;
    }
    return parse;
}

function initLocalStorage() {
    if(localStorage.getItem("likes") == null) {
        localStorage.setItem("likes", JSON.stringify([]))
    }
}

function retrieveCats(quantity) {
    showLoader();
    catContainer.innerHTML = "";
    fetch("https://api.thecatapi.com/v1/images/search?limit=" + quantity).then((response) => response.json())
        .then((cats) => {
            cats.forEach(cat => {
                renderCat(cat.url, cat.id);
            });
            removeLoader();
        });
}
initLocalStorage();
retrieveCats(10)