import { createCard } from "./components.js";
import recipes from "../../data/recipes.js";
// Filtre un tableau pour éliminer les doublons
export const filteredArrayOfArray = (array) => {
    const filteredArray = []
    for (let i = 0; i<array.length; i++) {
        for (let j = 0; j< array[i].length; j++) {
            if (!filteredArray.some(item => item.toLowerCase() === array[i][j].toLowerCase())) {
                filteredArray.push(array[i][j])
            }
        }
    }
    return filteredArray 
}

// Créer la galerie de recettes
export const displayRecipes = (recipesData) => {
    const gallery = document.getElementById("filtered-recipes")
    gallery.innerHTML = "";
    if (recipesData.length == 0) {
       const div = document.createElement('div')
       const h3 = document.createElement('h3')
       h3.textContent = `Aucune recette ne contient ‘ ${document.getElementById('find').value.trim()} ’ vous pouvez chercher «
       tarte aux pommes », « poisson », etc.`
       div.appendChild(h3)
       gallery.appendChild(div)
    }
    recipesData.forEach((recipe) => {
        const card = createCard(recipe)
        gallery.appendChild(card)
    })
    document.getElementById('total').textContent = `${recipesData.length} recettes`
};

// Créer une liste dans un des selecteur
export const displayList = (array, element, resultArray) => {
    element.innerHTML=""
    array.map(item => {
        const option = document.createElement('button')
        option.classList.add("option", "capitalize")
        option.innerText = item
        option.addEventListener('click', () => {
            if (!resultArray.includes(item)) {
              resultArray.push(item);
              createSticker(item, resultArray)
            }
            console.log(resultArray); // Affiche les ingredients choisis en console
        });
        element.appendChild(option)
    })
}

// Je créé un fonction qui créé un item.
const createSticker = (item, array) => {
    const div = document.createElement('div')
    div.classList.add('tag')
    const button = document.createElement('button')
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5 hover:stroke-2 active:scale-95 transition-all">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`
    const updateEvent = new Event("update");
    button.addEventListener('click', (e) => {
        const text = item.toLowerCase(); // Obtenir le texte en minuscules à partir de l'attribut de données
        const index = array.findIndex(item => item.toLowerCase() === text);
        if (index !== -1) {
            array.splice(index, 1);
            console.log(array);
            e.currentTarget.parentElement.remove();
            document.getElementById('tags').dispatchEvent(updateEvent);
        }
    });
    const span = document.createElement('span')
    span.innerText = item
    div.appendChild(span)
    div.appendChild(button)
    document.getElementById('tags').appendChild(div)
    document.getElementById('tags').dispatchEvent(updateEvent)
}