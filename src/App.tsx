import Alert from "./components/Alert";
import Button from "./components/button";
import ListGroup from "./components/ListGroup";
import { useEffect, useState } from "react";
import TextField from "./components/TextField";

function App() {
  const [recipes, setRecipes] = useState<string[]>(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });
  const [alertVisible, setAlertVisibility] = useState(false);

  // Store the updated recipes
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);


  // Automatically hide the alert after 10 seconds
  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisibility(false); // Hide the alert
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer if alertVisible changes
    }
  }, [alertVisible]);
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const clearLocalStorage = (item: string) => {
    localStorage.removeItem(item);
  }

  
  const handleRemoveItem = (item: string) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe != item));
  };
  
  const handleAddItem = (item: string) => {
    if (item.trim() !== "") {
      setRecipes((prevRecipes) => [...prevRecipes, item.trim()]);
    }
  };
  
  const recipesClearedAlertRender = () =>{
    return (
      alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>Recipes Cleared</Alert>
      )
    )
  }
  const renderButtons = () => {
    return <div><Button color="danger" onClick={() => {
      setAlertVisibility(true);
      clearLocalStorage("recipes")
      setRecipes([]);
      }}>
      Delete all recipes
    </Button></div>
  }

  const handleAddItemRender = () => {
    return <TextField onEnter={handleAddItem}></TextField>

  }

  const renderRecipes = () => {
    return (
      <ListGroup
        items={recipes}
        heading={"Recipes"}
        onSelectItem={(item) => console.log(item)}
        onRemoveItem={handleRemoveItem}
        />
      );
      };
  
      // <> = React.Fragment avoids <div>
  const recipePageRender = () =>{
    return (
      <>
      {recipesClearedAlertRender()}
      {handleAddItemRender()}
      {renderButtons()}
      {renderRecipes()}
      </>
    );
  };

  return (
    <div>
      {recipePageRender()}
    </div>
  );
}

export default App;
