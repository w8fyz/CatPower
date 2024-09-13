let exo2inputList = ["a", "b", "c"];
let exo2newValueInput = document.getElementById("exo2-new-value");
let exo2outputShowInput = document.getElementById("exo2-input-list");
let exo2outputShowOutput = document.getElementById("exo2-output-list");

/*On créer une map de résultats, on fait une itération de tout les inputs, et on rajoute petit à petit
* l'input en key et l'input avec la fonction toUpperCase() en value
*/
function mapping(inputList) {
    let result = new Map();
    inputList.forEach(input => {
        result.set(input, input.toUpperCase());
    })
    return result;
}

function exo2showList(inputList, outputElement, isOutput) {
    outputElement.innerHTML = "";
    let index = 0;
    inputList.forEach(elem => {
        let button = " <button onclick='exo2removeFromInput(this)' data-index="+index+">Supprimer</button>";
        if(isOutput) button = "";
        let htmlelem = "<li>"+elem+button+"</li>"
        outputElement.insertAdjacentHTML('beforeend', htmlelem);
        index++;
    })
}


function exo2showMap(map, outputElement) {
    outputElement.innerHTML = "";
    map.forEach((value, key) => {
        let htmlelem = "<li>" + key + " : " + value + "</li>"
        outputElement.insertAdjacentHTML('beforeend', htmlelem);
    });
}

function exo2addToInput() {
    if(exo2newValueInput.value === "") return;
    exo2inputList.push(exo2newValueInput.value);
    exo2updateInputList();
    exo2newValueInput.value = "";
}

function exo2removeFromInput(elem) {
    let index = elem.dataset.index;
    exo2inputList.splice(parseInt(index), 1);
    exo2updateInputList();
}

function exo2updateInputList() {
    exo2showList(exo2inputList, exo2outputShowInput, false);
}

function exo2updateOutputMap() {
    exo2showMap(mapping(exo2inputList), exo2outputShowOutput);
}

exo2updateInputList();