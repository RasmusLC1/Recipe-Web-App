import React from 'react'
import useList from "./ListUtil";


interface Props {
    selectedRecipe: string
    setActiveList: (ListName: "recipes" | "ingredients") => void;
    setSelectedRecipe: (recipe?: string) => void
  }

  
  const IngedientsPage = ({selectedRecipe, setActiveList, setSelectedRecipe}: Props) => {
      const ingredientsList = useList("ingredients", selectedRecipe);
      
      
      const image_input = document.querySelector("#image_input");
      var uploaded_image = "";
      
      image_input.addEventListener("change", function() {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
              uploaded_image = reader.result;
              document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
          });
          reader.readAsDataURL(this.files[0]);
      });


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


  return (
    <>
    {renderReturnToRecipeButton()}
    {ingredientsList.renderPage()}
    </>
  )
}

export default IngedientsPage