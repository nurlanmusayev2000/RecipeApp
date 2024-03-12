const initialState = {
    recipes: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_RECIPES":
            console.log(action.payload);
            return {...state, recipes: action.payload }


        default:
            return state;
    }
}

export default reducer