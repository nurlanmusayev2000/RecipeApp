import RecipeModal from './RecipeModal'
import {  useEffect, useRef, useState } from "react"
import * as api from '../api'
import RecipeCard from "./RecipeCard";
import img from './../cook-2364221_1280.jpg'

const Main=()=>{

	const [searchTerm,setSearchTerm ]=useState('');
	const [recipes,setRecipes]=useState([]);
	const [selectedRecipe , setSelectedRecipe] = useState(undefined);
	const [selectedTab,setSelectedTab]=useState("search");
	const [favouriteRecipes,setFavouriteRecipes]=useState([])
	const pageNumber=useRef(1)


	useEffect(()=>{
		const fetchFavouriteRecipes=async()=>{

			try {
				const favouriteRecipes= await api.getFavouriteRecipes();
				console.log(favouriteRecipes.results);
				setFavouriteRecipes(favouriteRecipes.results)
			} catch (error) {
				console.log(error);
			}
		}

		fetchFavouriteRecipes()
	},[])


	const handleSearchSubmit=async(e)=>{
		e.preventDefault();
		try {
			const recipes = await api.searchRecipes(searchTerm,1)
			console.log(recipes.results);
			setRecipes(recipes.results);
			pageNumber.current=1
		} catch (error) {
			console.log(error)
		}
	}

	const handleViewMoreClick= async(e)=>{
		const nextPage=pageNumber.current +1
		try {
			const nextRecipes=await api.searchRecipes(searchTerm,nextPage);
			setRecipes([...recipes,...nextRecipes.results])
			pageNumber.current=nextPage


		} catch (error) {
			console.log(error)
		}
	}

	const addFavouriteRecipe = async (recipe)=>{
		try {
			await api.addFavouriteRecipe(recipe);
			setFavouriteRecipes([...favouriteRecipes,recipe])
		} catch (error) {
			console.log(error);
		}
	}

	const removeFavouriteRecipe=async (recipe)=>{
		try {
			await api.deleteFavouriteRecipe(recipe);
			const updatedRecipes=favouriteRecipes.filter((favRecipe)=>recipe.id !== favRecipe.id);
			setFavouriteRecipes(updatedRecipes)
		} catch (error) {
			console.log(error);
		}
	}

	const recipesResults=recipes?.map((recipe)=>{
		const isFavourite= favouriteRecipes.some((favRecipe)=>recipe.id===favRecipe.id)
		return(
		<div>
			<RecipeCard isFavourite={isFavourite} recipe={recipe} onClick={()=> setSelectedRecipe(recipe)} onFavouriteButtonClick={!isFavourite ? addFavouriteRecipe : removeFavouriteRecipe} />
		</div>)
	})




	return(
		<div className='app-container'>
		<div className="header">
			<img src={img} alt="Hero" />
			<div className="title">My Recipe App</div>
		</div>
		<div className="tabs">
			<h1  className={selectedTab === 'search' ? 'tab-active' : ''} onClick={()=>setSelectedTab("search")}>Recipe Search</h1>
			<h1 className={selectedTab === 'favorites' ? 'tab-active' : ''} onClick={()=>setSelectedTab("favourites")}>Favourites</h1>
		</div>

		{selectedTab==="search" &&(
			<>
			<form onSubmit={(e)=>handleSearchSubmit(e)}>
				<input type="text" required placeholder="Enter recipe name" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
				<button type="submit">Submit</button>
			</form>
				<div className="recipe-grid">
					{recipesResults}
				</div>
			<button className="view-more-button" onClick={handleViewMoreClick}>View More</button>
			</>
		)}

		{selectedTab==="favourites" && <div>
			{favouriteRecipes?.map((recipe)=> {
				const isFavourite= favouriteRecipes.some((favRecipe)=>recipe.id===favRecipe.id)

				return <RecipeCard isFavourite={isFavourite} recipe={recipe}  onClick={()=>setSelectedRecipe(recipe)} onFavouriteButtonClick={isFavourite ? removeFavouriteRecipe : ()=>undefined }/>})}

		</div> }

			{selectedRecipe ? <RecipeModal recipeId={selectedRecipe?.id} onClose={()=>{setSelectedRecipe(undefined)}}/> : null}
		</div>
		)
}

export default Main