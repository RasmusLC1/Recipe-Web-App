import Alert from "./components/Alert";
import Button from "./components/button";
import ListGroup from "./components/ListGroup";
import { useState } from "react";
import TextField from "./components/TextField";

function App() {
  const [recipes, setRecipes] = useState([
    "Pasta Bolo",
    "Carbonara",
    "Lasanga",
    "Pho",
    "Spring rolls",
  ]);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleRemoveItem = (item: string) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe != item));
  };

  const handleAddItem = (item: string) => {
    if (item.trim() !== ""){
      setRecipes((prevRecipes) => [...prevRecipes, item.trim()])
    }
  }
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>my alert</Alert>
      )}
      <Button color="success" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button>
      <TextField
        onEnter = {handleAddItem}>
      </TextField>
      <ListGroup
        items={recipes}
        heading={"Recipes"}
        onSelectItem={handleSelectItem}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
