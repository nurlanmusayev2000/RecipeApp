import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.API_KEY

console.log(apiKey);
export const searchRecipes = async(searchTerm, page) => {

    if (!apiKey) {
        throw new Error('Api Key not found')
    }
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    const queryParams = {
        apiKey,
        query: searchTerm,
        number: '10',
        offset: (page * 10).toString()
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        const searchResponse = await fetch(url);
        const resultJson = await searchResponse.json();
        return resultJson
    } catch (error) {
        console.log(error)
    }
}
export const getRecipeSummary = async(recipeId) => {
    if (!apiKey) {
        throw new Error('Api Key not found')
    }
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`)
    const params = {
        apiKey: apiKey
    }
    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url);
    const json = await response.json();
    return json


}

export const getFavouriteRecipiesByIds = async(ids) => {

    if (!apiKey) {
        throw new Error('Api Key not found')
    }


    const url = new URL('https://api.spoonacular.com/recipes/informationBulk');
    console.log(ids.join(','));
    const params = {
        apiKey,
        ids: ids.join(',')
    }
    url.search = new URLSearchParams(params).toString();


    const searchResponse = await fetch(url);
    const json = await searchResponse.json()

    return { results: json }
}