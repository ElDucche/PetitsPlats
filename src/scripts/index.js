import recipes from "../data/recipes.js";
import { createCard } from "./factories/components.js";

const displayRecipes = (recipesData) => {
    const gallery = document.getElementById("filtered-recipes")
    gallery.innerHTML = "";
    recipesData.forEach((recipe) => {
        const card = createCard(recipe)
        gallery.appendChild(card)
    })
};

const inputElement = document.getElementById("find");
inputElement.addEventListener("input", () => {
    const searchValue = inputElement.value.trim().toLowerCase();
  
    if (searchValue.length >= 3) {
      const filteredRecipes = recipes.filter((recipe) => {
        const recipeName = recipe.name.toLowerCase();
        return recipeName.includes(searchValue);
      });
      displayRecipes(filteredRecipes);
    } else {
      displayRecipes(recipes);
    }
  });

displayRecipes(recipes);