import recipes from "../data/recipes.js";
import {filteredArrayOfArray, displayList, displayRecipes} from './factories/functions.js'

let dataToLoad = recipes

// Remplir les <select>
const setIngredientsOptions = () => {
    const ingredients = document.getElementById('ingredients-list')
    const ingredientsSelect = document.getElementById('ingredientsSelect')
    ingredientsSelect.addEventListener('click', () => {
        const open = document.getElementById('ingredients-opener').getAttribute('checked')
        if(open) {
            document.getElementById('ingredients-opener').removeAttribute('checked')
        }
        else if (!open) {
            document.getElementById('ingredients-opener').setAttribute('checked', true)
        }
    })

    // Je recupère tous les ingredients 
    const ingredientsArray = recipes.map(recipes => recipes.ingredients.map(ingredients => ingredients.ingredient))
    // Il faut joindre tous les tableaux en n'acceptant que les nouveaux items
    const uniqueIngredients = filteredArrayOfArray(ingredientsArray)
    
    const input = document.querySelector('#ingredients>.options-overlay>form>input')
      input.addEventListener('input', () => {
          const searchValue = input.value.trim().toLowerCase()
          if (searchValue.length >= 3) {
              const filteredIngredients = uniqueIngredients.filter((ingredient) => {
                const ingredientName = ingredient.toLowerCase();
                return ingredientName.includes(searchValue);
              });
              displayList(filteredIngredients, ingredients, ingredientsChoosen)
              console.log(filteredIngredients)
          } else {
              displayList(uniqueIngredients, ingredients, ingredientsChoosen)
          }
      })
      displayList(uniqueIngredients, ingredients, ingredientsChoosen)
}

const setAppliancesOptions = () => {
    const appareils = document.getElementById('appareils-list')
    const appareilsSelect = document.getElementById('appareilsSelect')
    appareilsSelect.addEventListener('click', () => {
        const open = document.getElementById('appareils-opener').getAttribute('checked')
        if(open) {
            document.getElementById('appareils-opener').removeAttribute('checked')
        }
        else if (!open) {
            document.getElementById('appareils-opener').setAttribute('checked', true)
        }
    })

    const appliances = recipes.map(recipe => recipe.appliance)
    const uniqueAppliance = appliances.filter((appliance, index) => {
        return appliances.indexOf(appliance) === index;
      });
    
      const input = document.querySelector('#appareils>.options-overlay>form>input')
      input.addEventListener('input', () => {
          const searchValue = input.value.trim().toLowerCase()
          if (searchValue.length >= 3) {
              const filteredAppliances = uniqueAppliance.filter((appliance) => {
                const applianceName = appliance.toLowerCase();
                return applianceName.includes(searchValue);
              });
              displayList(filteredAppliances, appareils, appareilsChoosen)
          } else {
              displayList(uniqueAppliance, appareils, appareilsChoosen)
          }
      })
      displayList(uniqueAppliance, appareils, appareilsChoosen)
}

const setUstensilsOptions = () => {
    const ustensiles = document.getElementById('ustensiles-list')
    const ustensileSelect = document.getElementById('ustensilesSelect')

    ustensileSelect.addEventListener('click', () => {
        const open = document.getElementById('ustensiles-opener').getAttribute('checked')
        if(open) {
            document.getElementById('ustensiles-opener').removeAttribute('checked')
        }
        else if (!open) {
            document.getElementById('ustensiles-opener').setAttribute('checked', true)
        }
    })
    
    const ustensilsArray = recipes.map(recipe => recipe.ustensils)
    const uniqueUstensils = filteredArrayOfArray(ustensilsArray)

    const input = document.querySelector('#ustensiles>.options-overlay>form>input')
    input.addEventListener('input', () => {
        const searchValue = input.value.trim().toLowerCase()
        if (searchValue.length >= 3) {
            const filteredUstensils = uniqueUstensils.filter((ustensile) => {
              const ustensileName = ustensile.toLowerCase();
              return ustensileName.includes(searchValue);
            });
            displayList(filteredUstensils, ustensiles, ustensilsChoosen)
            console.log(filteredUstensils)
        } else {
            displayList(uniqueUstensils, ustensiles, ustensilsChoosen)
        }
    })
    displayList(uniqueUstensils, ustensiles, ustensilsChoosen)
}

// Tableau d'éléments [Ingrédient], [Appareils], [Ustensiles]
const ingredientsChoosen = []
const appareilsChoosen = []
const ustensilsChoosen = []

const filterRecipesAndSearch = () => {
    const searchValue = document.getElementById('find').value.trim().toLowerCase();
    let filteredRecipes = [];
    const allEmpty = ingredientsChoosen.length === 0 && appareilsChoosen.length === 0 && ustensilsChoosen.length === 0;
    
    for (const recipe of recipes) {
        // Filtrer par tags d'ingrédients, appareils et ustensiles choisis
        if (!allEmpty) {
        let includeRecipe = false;
        
        if (ingredientsChoosen.length > 0) {
            for (const ingredient of recipe.ingredients) {
            if (ingredientsChoosen.includes(ingredient.ingredient)) {
                includeRecipe = true;
                break;
            }
            }
        }
    
        if (appareilsChoosen.length > 0 && !includeRecipe) {
            if (appareilsChoosen.includes(recipe.appliance)) {
            includeRecipe = true;
            }
        }
    
        if (ustensilsChoosen.length > 0 && !includeRecipe) {
            for (const ustensile of recipe.ustensils) {
            if (ustensilsChoosen.includes(ustensile)) {
                includeRecipe = true;
                break;
            }
            }
        }
    
        if (!includeRecipe) {
            continue; // Passer à la recette suivante si elle ne correspond pas aux critères
        }
        }
    
        // Filtrer par la recherche par nom de recette
        if (searchValue.length >= 3) {
        if (!recipe.name.toLowerCase().includes(searchValue)) {
            continue; // Passer à la recette suivante si le nom ne correspond pas à la recherche
        }
        }
    
        filteredRecipes.push(recipe); // Ajouter la recette filtrée
    }

    console.log(filteredRecipes)
    // Afficher les recettes filtrées
    dataToLoad = filteredRecipes;
    displayRecipes(dataToLoad);
};

document.getElementById('tags').addEventListener('update', filterRecipesAndSearch)
document.getElementById("find").addEventListener("input", filterRecipesAndSearch);


const init = () => {
    displayRecipes(dataToLoad);
    setIngredientsOptions()
    setAppliancesOptions()
    setUstensilsOptions()
}

init()