import { useState } from "react";
import Button from "./components/Button";
import useList from "./components/ListUtil";

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

  const renderClearListButton = () => {
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
  const ingredientsPageRender = ingredientsList.renderPage();

  return (
    <div>
      {activeList === "recipes" && recipePageRender}
      {activeList === "ingredients" && renderClearListButton()}
      {activeList === "ingredients" && ingredientsPageRender}
    </div>
  );
}

export default App;
