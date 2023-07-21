import recipes from "../data/recipes.js";
import { createCard } from "./factories/components.js";

const displayRecipes = () => {
    const gallery = document.getElementById("filtered-recipes")
    console.log(gallery)
    recipes.map(recipe => {
        const card = createCard(recipe)
        gallery.appendChild(card)
    })
};

console.log('Page connecté');

displayRecipes();