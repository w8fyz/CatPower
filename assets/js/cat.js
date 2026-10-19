
let catContainer = document.getElementById("cat-container");
let loader = document.getElementById("loader");
let favNav = document.getElementById("favorite-button-container");
let mainNav = document.getElementById("main-button-container");

if (localStorage.getItem("likes") == null) {
    localStorage.setItem("likes", "[]");
}

function playHeartAnimation(div) {
    let heart = div.querySelector(".heart-anim");
    heart.style.animation = "none";
    void heart.offsetWidth;
    heart.style.animation = "fadeInOut 0.7s ease-in-out forwards";
}

function renderCat(image) {
    let html = `
        <div class="cat" ondblclick="toggleLike(this)">
            <div class="heart-anim">♥</div>
            <img src="${image}" alt="A cat image">
        </div>
    `;

    catContainer.insertAdjacentHTML("beforeend", html);
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

function toggleLike(card) {
    let image = card.querySelector("img");

    if (isLiking(image.src)) {
        deleteLike(card);
    } else {
        like(card);
    }
}

function like(card) {
    let image = card.querySelector("img");

    playHeartAnimation(card);

    let json = localStorage.getItem("likes");
    let likes = json ? JSON.parse(json) : [];

    if (!Array.isArray(likes)) {
        likes = [];
    }

    if (!likes.includes(image.src)) {
        likes.push(image.src);
    }

    localStorage.setItem("likes", JSON.stringify(likes));
}

function deleteLike(card) {
    let image = card.querySelector("img");

    card.querySelector(".heart-anim").style.animation = "";

    let json = localStorage.getItem("likes");
    let likes = json ? JSON.parse(json) : [];

    if (!Array.isArray(likes)) {
        likes = [];
    }

    likes = likes.filter(item => item !== image.src);

    localStorage.setItem("likes", JSON.stringify(likes));
}

function showLikes() {
    showFavButtons();

    let cats = retrieveLikedCats();
    catContainer.innerHTML = "";

    cats.forEach((cat) => {
        renderCat(cat);
    });

    if (cats.length === 0) {
        catContainer.innerHTML = "<h2>Aucun like</h2>";
    }
}

function showCats() {
    showMainButtons();
    retrieveCats(10);
}

function retrieveLikedCats() {
    let cats = [];
    let json = localStorage.getItem("likes");
    let parse = json ? JSON.parse(json) : [];

    if (!Array.isArray(parse)) {
        localStorage.setItem("likes", JSON.stringify(cats));
        return cats;
    }

    return parse;
}

function retrieveCats(quantity) {
    showLoader();
    catContainer.innerHTML = "";

    fetch("https://api.thecatapi.com/v1/images/search?limit=" + quantity)
        .then((response) => response.json())
        .then((cats) => {
            cats.forEach(cat => {
                renderCat(cat.url);
            });

            removeLoader();
        })
        .catch((error) => {
            console.error("Error loading cats:", error);
            removeLoader();
        });
}

retrieveCats(10);
