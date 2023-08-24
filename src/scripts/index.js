import recipes from "../data/recipes.js";
import { createCard } from "./factories/components.js";

let dataToLoad = recipes

const filteredArrayOfArray = (array) => {
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

const displayRecipes = (recipesData) => {
    const gallery = document.getElementById("filtered-recipes")
    gallery.innerHTML = "";
    recipesData.forEach((recipe) => {
        const card = createCard(recipe)
        gallery.appendChild(card)
    })
};


// Remplir les <select>
const setIngredientsOptions = () => {
    const ingredients = document.querySelector('#ingredients>.options-overlay')
    ingredients.style.display="none"
    document.getElementById('ingredients').addEventListener('click', () => {
        if (ingredients.style.display=="none") {
            ingredients.style.display="block"
            document.getElementById('ingredients-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          `
        } else if (ingredients.style.display=="block") {
            ingredients.style.display="none"
            document.getElementById('ingredients-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>`
        }
    })
    // Je recupère tous les ingredients 
    const ingredientsArray = recipes.map(recipes => recipes.ingredients.map(ingredients => ingredients.ingredient))
    // Il faut joindre tous les tableaux en n'acceptant que les nouveaux items
    const filteredIngredient = filteredArrayOfArray(ingredientsArray)
    filteredIngredient.map(ingredient => {
        const option = document.createElement('button')
        option.classList.add("option")
        option.innerText = ingredient
        option.addEventListener('click', () => {
            if (!ingredientsChoosen.includes(ingredient)) {
              ingredientsChoosen.push(ingredient);
            }
            console.log(ingredientsChoosen); // Affiche les ustensiles choisis en console
        });
        ingredients.appendChild(option)
    })
}

const setAppliancesOptions = () => {
    const appareils = document.querySelector('#appareils>.options-overlay')
    appareils.style.display="none"
    document.getElementById('appareils').addEventListener('click', () => {
        if (appareils.style.display=="none") {
            appareils.style.display="block"
            document.getElementById('appareils-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          `
        } else if (appareils.style.display=="block") {
            appareils.style.display="none"
            document.getElementById('appareils-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>`
        }
    })
    const appliances = recipes.map(recipe => recipe.appliance)
    const uniqueAppliance = appliances.filter((appliance, index) => {
        return appliances.indexOf(appliance) === index;
      });
    uniqueAppliance.map(appliance => {
        const option = document.createElement('button')
        option.classList.add("option")
        option.innerText = appliance
        option.addEventListener('click', () => {
            if (!appareilsChoosen.includes(appliance)) {
              appareilsChoosen.push(appliance);
            }
            console.log(appareilsChoosen); // Affiche les ustensiles choisis en console
        });
        appareils.appendChild(option)
    })
}

const setUstensilsOptions = () => {
    const ustensiles = document.querySelector('#ustensiles>.options-overlay')
    ustensiles.style.display="none"
    document.getElementById('ustensiles').addEventListener('click', () => {
        if (ustensiles.style.display=="none") {
            ustensiles.style.display="block"
            document.getElementById('ustensiles-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          `
        } else if (ustensiles.style.display=="block") {
            ustensiles.style.display="none"
            document.getElementById('ustensiles-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>`
        }
    })
    const ustensilsArray = recipes.map(recipe => recipe.ustensils)
    const filteredUstensils = filteredArrayOfArray(ustensilsArray)

    filteredUstensils.map(ustensile => {
        const option = document.createElement('button')
        option.classList.add("option", "capitalize")
        option.innerText = ustensile
        option.addEventListener('click', () => {
            if (!ustensilsChoosen.includes(ustensile)) {
              ustensilsChoosen.push(ustensile);
            }
            console.log(ustensilsChoosen); // Affiche les ustensiles choisis en console
        });
        ustensiles.appendChild(option)
    })
}

// Tableau d'éléments [Ingrédient], [Appareils], [Ustensiles]
const ingredientsChoosen = []
const appareilsChoosen = []
const ustensilsChoosen = []


// Algorithme de recherche par tableau
const inputElement = document.getElementById("find");
inputElement.addEventListener("input", () => {
    const searchValue = inputElement.value.trim().toLowerCase();

    if (searchValue.length >= 3) {
      const filteredRecipes = recipes.filter((recipe) => {
        const recipeName = recipe.name.toLowerCase();
        return recipeName.includes(searchValue);
      });
      dataToLoad = filteredRecipes
      displayRecipes(dataToLoad);
    } else {
      displayRecipes(dataToLoad);
    }
});


const init = () => {
    displayRecipes(dataToLoad);
    setIngredientsOptions()
    setAppliancesOptions()
    setUstensilsOptions()
}

init()

// Changement de filtres
document.getElementById('ingredients').addEventListener('change', (e) => {
    const ingredientChoosen = e.currentTarget.value
    const filteredRecipesData = dataToLoad.filter((recipe) => {
        return recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.ingredient.toLowerCase().includes(ingredientChoosen)
        );
      });
    dataToLoad = filteredRecipesData
    console.log(dataToLoad)
    displayRecipes(dataToLoad)
})

document.getElementById('appareils').addEventListener('change', (e) => {
    const applianceChoosen = e.currentTarget.value
    const filteredAppliancesData = dataToLoad.filter((recipe) => {
        return recipe.appliance.toLowerCase().includes(applianceChoosen)
    })
    dataToLoad = filteredAppliancesData
    displayRecipes(dataToLoad)
});

// J'ai besoin d'un tableau que je met à jour continuellement et depuis lequel je lance mes fonctions.