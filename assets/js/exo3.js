let exo3inputList =
    [{product: "Milk", quantity: 1, price: 1.5}, {product: "PC Gamer", quantity: 4, price: 800.59}, {product: "Eggs", quantity: 12, price: 0.7}];
let exo3newValueInputProduct = document.getElementById("exo3-new-value-product");
let exo3newValueInputQuantity = document.getElementById("exo3-new-value-quantity");
let exo3newValueInputPrice = document.getElementById("exo3-new-value-price");
let exo3outputShowInput = document.getElementById("exo3-input-list");
let exo3outputShowOutput = document.getElementById("exo3-output-list");

/*
On défini une variable qui sera notre résultat et qui démarre à 0, puis on itère à travers tout les produits.
A chaque produit, on multiplie le prix par la quantité et on ajoute ce résultat au total.
On termine par renvoyer le résultat
 */
function getTotalPrice(products) {
    let total = 0;
    products.forEach((product) => {
        total+=(product.price*product.quantity);
    })
    return total;
}

function exo3showList(inputList, outputElement, isOutput) {
    outputElement.innerHTML = "";
    let index = 0;
    inputList.forEach(elem => {
        let button = " <button onclick='exo3removeFromInput(this)' data-index="+index+">Supprimer</button>";
        if(isOutput) button = "";
        let htmlelem = "<li>"+elem.product+" | Quantitée : "+elem.quantity+" | Prix unitaire : "+elem.price+"€ "+button+"</li>"
        outputElement.insertAdjacentHTML('beforeend', htmlelem);
        index++;
    })
}

function exo3showResult(allPrice, outputElement) {
    outputElement.innerHTML = "";
    outputElement.insertAdjacentHTML('beforeend', "<h2>Prix total des articles : "+allPrice+"€");
}

function exo3addToInput() {
    if(exo3newValueInputProduct.value === "") return;
    if(exo3newValueInputQuantity.value === "" || isNaN(exo3newValueInputQuantity.value)) return;
    if(exo3newValueInputPrice.value === "" || isNaN(exo3newValueInputPrice.value)) return;
    let product =
        {product: exo3newValueInputProduct.value, quantity: parseInt(exo3newValueInputQuantity.value), price: parseInt(exo3newValueInputPrice.value)};
    exo3inputList.push(product);
    exo3updateInputList();
    exo3newValueInputProduct.value = "";
    exo3newValueInputQuantity.value = "";
    exo3newValueInputPrice.value = "";
}

function exo3removeFromInput(elem) {
    let index = elem.dataset.index;
    exo3inputList.splice(parseInt(index), 1);
    exo3updateInputList();
}

function exo3updateInputList() {
    exo3showList(exo3inputList, exo3outputShowInput, false);
}

function exo3updateOutputPrice() {
    exo3showResult(getTotalPrice(exo3inputList), exo3outputShowOutput)
}

exo3updateInputList();