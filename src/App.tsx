import { useState } from "react";
import Button from "./components/Button";

import useList from "./components/ListUtil";


function App() {
  const [activeList, setActiveList] = useState<"recipes" | "ingredients"> ("recipes")
  const recipesList  = useList("recipes"); // Destructure the rendering function
  const ingredientsList  = useList("ingredients"); // Destructure the rendering function

  const handleRecipeSelect = (recipe: string) => {
    console.log(recipe)
    setActiveList("ingredients")
  }
  
  const renderClearListButton = () => {
    return (
      <div>
        <Button
          color="success"
          onClick={() => {
            setActiveList("recipes")
          }}
        >
          return to recipes
        </Button>
      </div>
    );
  };


  const recipePageRender = recipesList.renderPage(handleRecipeSelect);
  const ingredientsPageRender = ingredientsList.renderPage(handleRecipeSelect);

  const handleIngredientsPage = () => {
    return(
      <>
    {activeList === "ingredients" && renderClearListButton()}
    {activeList === "ingredients" && ingredientsPageRender}
    </>
    )
  }

  return (
    <div>
      {activeList === "recipes" && recipePageRender}
      {handleIngredientsPage()}
    </div>
  );
}

export default App;
