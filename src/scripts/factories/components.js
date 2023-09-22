export const createCard = (data, index) => {
    const {
        image,
        name,
        ingredients, // array de {"ingredient" : "Lait de coco", "quantity" : 400, "unit" : "ml"}
        time,
        description,
    } = data

    const div = document.createElement('div')
    div.classList.add("bg-white", "rounded-xl", "relative", "shadow-lg", "animate-[smooth_200ms_ease-in-out_forwards]") 

    // <img src="/src/img/Recette01.jpg" alt="recette 1" class="object-cover h-72 w-full rounded-t-xl">
    const img = document.createElement('img')
    img.classList.add("object-cover", "h-72", "w-full", "rounded-t-xl")
    img.src = `/src/img/${image}`
    div.appendChild(img)

    // <span class="bg-yellow py-1 px-4 rounded-full absolute top-4 right-4">10min</span>
    const span = document.createElement('span')
    span.classList.add("bg-yellow", "py-1", "px-4", "rounded-full", "absolute", "top-4", "right-4")
    span.textContent = time + 'min'
    div.appendChild(span)

    const cardInfos = document.createElement('div')
    cardInfos.classList.add("p-4", "grid", "gap-4")
    // <h4 class="my-4 text-xl">Limonade de Coco</h4>
    const title = document.createElement('h4')
    title.classList.add("my-4", "text-xl")
    title.textContent = name
    cardInfos.appendChild(title)

    // <h5 class="uppercase text-grey font-medium text-sm">Recette</h5>
    const recetteTitle = document.createElement('h5')
    recetteTitle.classList.add("subtitle")
    recetteTitle.textContent = 'Recette'
    cardInfos.appendChild(recetteTitle)

    const p = document.createElement('p')
    p.classList.add('h-48', 'overflow-hidden', 'text-ellipsis')
    p.textContent = description
    cardInfos.appendChild(p)

    const ingredientTitle = document.createElement('h5')
    ingredientTitle.classList.add("subtitle")
    ingredientTitle.textContent = 'Ingrédients'
    cardInfos.appendChild(ingredientTitle)

    // <div class="grid grid-cols-2 gap-4">
    const ingredientList = document.createElement('div')
    ingredientList.classList.add('grid', 'grid-cols-2', 'gap-4')
    cardInfos.appendChild(ingredientList)

    ingredients.map(ingredient => {
        const div = document.createElement('div')
        const h6 = document.createElement('h6')
        h6.textContent = ingredient.ingredient
        div.appendChild(h6)

        const p = document.createElement('p')
        p.classList.add('text-grey')
        p.textContent = (ingredient.quantity ?? "") + " " + (ingredient.unit ?? "")
        div.appendChild(p)

        ingredientList.appendChild(div)
    })
    div.appendChild(cardInfos)
    return div
}