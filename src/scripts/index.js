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
    const ingredients = document.getElementById('ingredients-list')
    const ingredientsOverlay = document.querySelector('#ingredients>.options-overlay')
    ingredientsOverlay.style.display="none"
    document.getElementById('ingredients').addEventListener('click', () => {
        ingredientsOverlay.style.display="block"
        document.getElementById('ingredients-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>`
    })
    document.addEventListener('click', (event) => {
        if (!document.getElementById("ingredients").contains(event.target)) {
            ingredientsOverlay.style.display="none"
            document.getElementById('ingredients-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>`
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
              displayList(filteredIngredients)
              console.log(filteredIngredients)
          } else {
              displayList(uniqueIngredients)
          }
      })
      const displayList = (array) => {
          ingredients.innerHTML=""
          array.map(ingredient => {
              const option = document.createElement('button')
              option.classList.add("option", "capitalize")
              option.innerText = ingredient
              option.addEventListener('click', () => {
                  if (!ingredientsChoosen.includes(ingredient)) {
                    ingredientsChoosen.push(ingredient);
                    createSticker(ingredient, ingredientsChoosen)
                  }
                  console.log(ingredientsChoosen); // Affiche les ingredients choisis en console
              });
              ingredients.appendChild(option)
          })
      }
      displayList(uniqueIngredients)
}

const setAppliancesOptions = () => {
    const appareils = document.getElementById('appareils-list')
    const appareilsOverlay = document.querySelector('#appareils>.options-overlay')
    appareilsOverlay.style.display="none"
    document.getElementById('appareils').addEventListener('click', () => {
        appareilsOverlay.style.display="block"
        document.getElementById('appareils-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>`
    })
    document.addEventListener('click', (event) => {
        if (!document.getElementById("appareils").contains(event.target)) {
            appareilsOverlay.style.display="none"
            document.getElementById('appareils-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>`
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
              displayList(filteredAppliances)
              console.log(filteredAppliances)
          } else {
              displayList(uniqueAppliance)
          }
      })
      const displayList = (array) => {
          appareils.innerHTML=""
          array.map(appliance => {
              const option = document.createElement('button')
              option.classList.add("option", "capitalize")
              option.innerText = appliance
              option.addEventListener('click', () => {
                  if (!appareilsChoosen.includes(appliance)) {
                    appareilsChoosen.push(appliance);
                    createSticker(appliance, appareilsChoosen)
                  }
                  console.log(appareilsChoosen); // Affiche les appareils choisis en console
              });
              appareils.appendChild(option)
          })
      }
      displayList(uniqueAppliance)
}

const setUstensilsOptions = () => {
    const ustensiles = document.getElementById('ustensiles-list')
    const ustensilesOverlay = document.querySelector('#ustensiles>.options-overlay')
    ustensilesOverlay.style.display="none"
    document.getElementById('ustensiles').addEventListener('click', () => {
        ustensilesOverlay.style.display="block"
        document.getElementById('ustensiles-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>`
    })
    document.addEventListener('click', (event) => {
        if (!document.getElementById("ustensiles").contains(event.target)) {
            ustensilesOverlay.style.display="none"
            document.getElementById('ustensiles-mark').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>`
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
            displayList(filteredUstensils)
            console.log(filteredUstensils)
        } else {
            displayList(uniqueUstensils)
        }
    })
    const displayList = (array) => {
        ustensiles.innerHTML=""
        array.map(ustensile => {
            const option = document.createElement('button')
            option.classList.add("option", "capitalize")
            option.innerText = ustensile
            option.addEventListener('click', () => {
                if (!ustensilsChoosen.includes(ustensile)) {
                  ustensilsChoosen.push(ustensile);
                  createSticker(ustensile, ustensilsChoosen)
                }
                console.log(ustensilsChoosen); // Affiche les ustensiles choisis en console
            });
            ustensiles.appendChild(option)
        })
    }
    displayList(uniqueUstensils)
}

// Tableau d'éléments [Ingrédient], [Appareils], [Ustensiles]
const ingredientsChoosen = []
const appareilsChoosen = []
const ustensilsChoosen = []

// Afficher les étiquettes
// Je dois regarder chaque tableau et créer un item à chaque changement.
// Je créé un fonction qui créé un item.
const createSticker = (item, array) => {
    const div = document.createElement('div')
    div.classList.add('tag')
    const button = document.createElement('button')
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5 hover:stroke-2 active:scale-95 transition-all">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>`
    button.addEventListener('click', (e) => {
        array.splice(array.indexOf(e.currentTarget.innerText), 1)
        console.log(array)
        e.currentTarget.parentElement.remove()
    })
    const span = document.createElement('span')
    span.innerText = item
    div.appendChild(span)
    div.appendChild(button)
    document.getElementById('tags').appendChild(div)
}

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