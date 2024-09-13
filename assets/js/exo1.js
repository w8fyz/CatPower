let exo1inputList = ["Hello", "abc123", "Hello23", "Hi2", "1111", "Vive", "Les", "Algo"];
let exo1newValueInput = document.getElementById("exo1-new-value");
let exo1outputShowInput = document.getElementById("exo1-input-list");
let exo1outputShowOutput = document.getElementById("exo1-output-list");

/*
*   On utilise la fonction filter sur l'input qui est un array, le choix que j'aurais utilisé hors exercice
*   est l'utilisation de l'expression régulière "/\d/" qui permet de vérifier si une chaîne de caractères contiens
*   au minimum un digit, vu que ça n'a pas été vu en cours nous allons être un peu plus créatif.
*
* */
function numInStr(input) {
    return input.filter(str => { //On fait un filtre pour récupérer tout les inputs
        //On itère à travers tout les caractères, on vérifie si c'est un nombre (et si le charactère n'est pas un espace
        //car Javascript les considères comme des nombres (merci javascript...) et on renvoie les valeurs triées
        return [...str].some(char => !isNaN(char) && char !== ' ')
    })
}

/*
* Le reste du code sert simplement à l'affichage des listes directement sur le site pour ne pas avoir à passer par
* la console du navigateur
*
* */
function exo1showList(inputList, outputElement, isOutput) {
    outputElement.innerHTML = "";
    let index = 0;
    inputList.forEach(elem => {
        let button = " <button onclick='exo1removeFromInput(this)' data-index="+index+">Supprimer</button>";
        if(isOutput) button = "";
        let htmlelem = "<li>"+elem+button+"</li>"
        outputElement.insertAdjacentHTML('beforeend', htmlelem);
        index++;
    })
}

function exo1addToInput() {
    if(exo1newValueInput.value === "") return;
    exo1inputList.push(exo1newValueInput.value);
    exo1updateInputList();
    exo1newValueInput.value = "";
}

function exo1removeFromInput(elem) {
    let index = elem.dataset.index;
    exo1inputList.splice(parseInt(index), 1);
    exo1updateInputList();
}

function exo1updateInputList() {
    exo1showList(exo1inputList, exo1outputShowInput, false);
}

function exo1updateOutputList() {
    exo1showList(numInStr(exo1inputList), exo1outputShowOutput, true);
}

exo1updateInputList();