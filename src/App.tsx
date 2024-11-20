import { useState } from "react";
import useList from "./components/ListUtil";
import IngedientsPage from "./components/IngedientsPage";
import './App.css'

function App() {
  const [activeList, setActiveList] = useState<"recipes" | "ingredients">(
    "recipes"
  );
  const [selectedRecipe, setSelectedRecipe] = useState<string | undefined>(
    undefined
  );
  const recipesList = useList("recipes");
  const ingredientsList = useList("ingredients", selectedRecipe);

  const handleRecipeSelect = (recipe: string) => {
    console.log(recipe);
    setSelectedRecipe(recipe);
    setActiveList("ingredients");
  };



  const renderReturnToRecipeButton = () => {
    return (
      <div>
        <button
          className ="btn btn-success btn-sm return-to-recipe-button"
          onClick={() => {
            setActiveList("recipes");
            setSelectedRecipe(undefined);
          }}
        >
          Return to Recipes
        </button>
      </div>
    );
  };

  const recipePageRender = recipesList.renderPage(handleRecipeSelect);

  const RenderPage = () => {
    return (
      <>
      {activeList === "recipes" && recipePageRender}
      {activeList === "ingredients" && (
        <IngedientsPage
        selectedRecipe = "selectedRecipe"
        setActiveList = {setActiveList}
        setSelectedRecipe = {setSelectedRecipe}
        />
      )}
      </>
    )
  }

  return (
      <div>
        <div className="centered-container">
          {RenderPage()}
        </div>
    </div>
  );
}

export default App;
