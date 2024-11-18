import { useState } from "react";
import Button from "./components/Button";
import useList from "./components/ListUtil";
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

  const handleIngredientSelect = (ingredient: string) => {
    console.log(ingredient);
  };

  const renderReturnToRecipeButton = () => {
    return (
      <div>
        <Button
          color="success"
          onClick={() => {
            setActiveList("recipes");
            setSelectedRecipe(undefined);
          }}
        >
          Return to Recipes
        </Button>
      </div>
    );
  };

  const recipePageRender = recipesList.renderPage(handleRecipeSelect);
  const ingredientsPageRender = ingredientsList.renderPage(handleIngredientSelect);

  const RenderPage = () => {
    return (
      <>
      {activeList === "recipes" && recipePageRender}
      {activeList === "ingredients" && ingredientsPageRender}
      </>
    )
  }

  return (
      <div>
        {activeList === "ingredients" && renderReturnToRecipeButton()}
        <div className="centered-container">
          {RenderPage()}
        </div>
    </div>
  );
}

export default App;
