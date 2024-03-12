export const searchRecipes = async(searchTerm, page) => {
    const baseUrl = new URL("http://localhost:3005/api/recipes/search");
    baseUrl.searchParams.append('searchTerm', searchTerm);
    baseUrl.searchParams.append('page', String(page))

    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error(`Http error! status : ${response.status}`)
    }
    return response.json()
}

export const fetchSelectedRecipe = async(id) => {
    const baseUrl = new URL(`http://localhost:3005/api/recipes/${id}/summary`)

    const response = await fetch(baseUrl);
    console.log(response);
    if (!response.ok) {
        throw new Error(`Http error! status : ${response.status}`)
    }

    return response.json()
}

export const getFavouriteRecipes = async() => {

    const baseUrl = new URL('http://localhost:3005/api/recipes/favourite');
    const response = await fetch(baseUrl);

    if (!response.ok) {
        throw new Error(`Http error! status : ${response.status}`)
    }
    return response.json()
}


export const addFavouriteRecipe = async(recipe) => {
    const baseUrl = new URL('http://localhost:3005/api/recipes/favourite');
    console.log('heloooo', recipe.id);
    const body = {
        recipeId: recipe.id
    }

    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        throw new Error(`Http error! status : ${response.status}`)
    }

}

export const deleteFavouriteRecipe = async(recipe) => {
    const url = new URL('http://localhost:3005/api/recipes/favourite');

    const body = {
        recipeId: recipe.id
    }

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        throw new Error(`Http error! status : ${response.status}`)
    }

}