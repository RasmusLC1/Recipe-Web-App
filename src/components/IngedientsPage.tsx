import {useState} from 'react'
import useList from "./ListUtil";

import axios from 'axios';
import DropDownButton from './DropdownButton';
import Button from './Button';

interface Props {
    selectedRecipe: string
    setActiveList: (ListName: "recipes" | "ingredients") => void;
    setSelectedRecipe: (recipe?: string) => void
  }

  
  const IngedientsPage = ({selectedRecipe, setActiveList, setSelectedRecipe}: Props) => {
      
      const [portion, setPortion] = useState<number | undefined> (
          1
        );

    const ingredientsList = useList("ingredients", selectedRecipe, portion);
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
          <Button 
          color ="success" 
          children =  "Upload Image"
          onClick={fileUploadHandler}>
        </Button>
        </div>
      );

  const renderReturnToRecipeButton = () => {
    return (
      <div>
        <Button
          color ="success"
          children = "Return to Recipes"
          onClick= {() => {
            setActiveList("recipes");
            setSelectedRecipe(undefined);
          }}
        />
      </div>
    );
  };

  const renderDropDownButton = () => {
    return (
      <DropDownButton
        color="secondary"
        children={`Portion Size: ${portion}`}
        onClick={(selectedPortion) => setPortion(selectedPortion)}
      />
    );
  }


  return (
    <>
    {renderDropDownButton()}
    {renderReturnToRecipeButton()}
    {ingredientsList.renderPage()}
    {fileInput()}
    </>
  )
}

export default IngedientsPage