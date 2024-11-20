import {useState} from 'react'
import useList from "./ListUtil";

import axios from 'axios';


interface Props {
    selectedRecipe: string
    setActiveList: (ListName: "recipes" | "ingredients") => void;
    setSelectedRecipe: (recipe?: string) => void
  }

  
  const IngedientsPage = ({selectedRecipe, setActiveList, setSelectedRecipe}: Props) => {
      const ingredientsList = useList("ingredients", selectedRecipe);
      

      const [selectedFile, setSelectedFile] = useState<File | null>(null); // Properly using useState to manage the file
      const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
          setSelectedFile(file);
          console.log(file); // Log file for debugging
        }
      };
      
      const fileUploadHandler = () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile, selectedFile.name);
          axios.post('/upload', formData)
            .then(response => console.log(response, "test"))
            .catch(error => console.error(error));
        }
      };

      const fileInput = () => (
        <div className="fileInput">
          <input type="file" onChange={fileSelectedHandler} />
          <button className="btn btn-success btn-sm upload-button" onClick={fileUploadHandler}>
            Upload Image
          </button>
        </div>
      );

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
    {fileInput()}
    </>
  )
}

export default IngedientsPage