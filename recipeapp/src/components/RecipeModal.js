import {useEffect, useState} from "react"
import * as api from '../api'

const RecipeModal= ({recipeId, onClose})=>{

	const [recipeSummary,setRecipeSummary]=useState()
	console.log(recipeId);

	useEffect(()=>{
		const fetchRecipeSummary= async()=>{
			try {
				const recipe = await api.fetchSelectedRecipe(recipeId)
				console.log(recipe);
				setRecipeSummary(recipe)

			} catch (error) {
				console.log(error);
			}
		}
		fetchRecipeSummary()
	},[recipeId])
		if (!recipeSummary) {
			return <></>
		}


	return(
		<>
			<div className="overlay"></div>
			<div className="modal">
				<div className="modal-content">
					<div className="modal-header">
						<h2>{recipeSummary?.title}</h2>
						<span className="close-btn" onClick={onClose}>&times;</span>
					</div>
					<p dangerouslySetInnerHTML={{__html: recipeSummary?.summary}}></p>

				</div>
			</div>
		</>
	)
}

export default RecipeModal