import axios from 'axios'


const getAllRecipes = (data) => {
    return {
        type: "GET_ALL_RECIPES",
        payload: data
    }
}




//MiddleWare

const fetchRecipes = () => {

    return dispatch => {

        axios.get('https://api.spoonacular.com/recipes/random?apiKey=216fac77960b4a9a9abe14dbce487dc9').then(res => {
            console.log(res.data);
            dispatch(getAllRecipes(res.data))
        })
    }
}

export default fetchRecipes