import { useState } from "react";
import useList from "./ListUtil";
import Image from "./Image";
import axios from "axios";
import DropDownButton from "./DropdownButton";
import Button from "./Button";

interface Props {
  selectedRecipe: string;
  setActiveList: (ListName: "recipes" | "ingredients") => void;
  setSelectedRecipe: (recipe?: string) => void;
}

const IngedientsPage = ({
  selectedRecipe,
  setActiveList,
  setSelectedRecipe,
}: Props) => {
  const [portion, setPortion] = useState<number | undefined>(1);

  const ingredientsList = useList("ingredients", selectedRecipe, portion);
  const [imageUrl, setImageUrl] = useState(
    `${selectedRecipe}.jpg?timestamp=${new Date().getTime()}`
  );

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
      formData.append("file", selectedFile, `${selectedRecipe}.jpg`);
      axios
        .post("http://localhost:5000/upload", formData)
        .then((response) => {
          console.log(response);
          setImageUrl(
            `${selectedRecipe}.jpg?timestamp=${new Date().getTime()}`
          );
        })

        .catch((error) => console.error(error));
    }
  };

  const fileInput = () => (
    <div className="fileInput">
      <input type="file" onChange={fileSelectedHandler} />
      <Button
        color="success"
        children="Upload Image"
        onClick={fileUploadHandler}
      ></Button>
    </div>
  );

  const renderReturnToRecipeButton = () => {
    return (
      <div>
        <Button
          color="success"
          children="Return to Recipes"
          onClick={() => {
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
  };

  const recipeImage = () => {

    return (
      <div>
        <Image className="img-fluid recipe-image" path={imageUrl} />
      </div>
    );
  };

  return (
    <>
      {fileInput()}
      {recipeImage()}
      {renderDropDownButton()}
      {renderReturnToRecipeButton()}
      {ingredientsList.renderPage()}
    </>
  );
};

export default IngedientsPage;
