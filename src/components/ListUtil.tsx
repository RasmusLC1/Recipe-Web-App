import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Button from "./Button";
import ListGroup from "./ListGroup";
import ListObject from "./ListObject";
import TextField from "./TextField";

// Takes an item name, optionally a recipe name, and a portion size
const useList = (
  itemName: string,
  recipeName?: string,
  portionSize?: number
) => {
  // Create a storage key that includes the recipe name
  const storageKey =
    recipeName && itemName === "ingredients"
      ? `${itemName}-${recipeName}`
      : itemName;

  // State to store raw list items
  const [lists, setList] = useState<string[]>(() => {
    const savedList = localStorage.getItem(storageKey);
    return savedList ? JSON.parse(savedList) : [];
  });

  // State to store the current list adjusted for portion size
  const [currentList, setCurrentList] = useState<string[]>([]); // Initialize as empty array

  const [alertVisible, setAlertVisibility] = useState(false);

  // Update lists when storageKey changes
  useEffect(() => {
    const savedList = localStorage.getItem(storageKey);
    const parsedList = savedList ? JSON.parse(savedList) : [];
    setList(parsedList);
  }, [storageKey]);

  // Update currentList when lists or portionSize change
  useEffect(() => {
    if (itemName === "ingredients" && portionSize !== undefined) {
      // Adjust the list items based on portionSize
      const updatedList = lists.map((item) =>
        ListObject(item, portionSize)
      );
      setCurrentList(updatedList);
    } else {
      setCurrentList(lists);
    }
  }, [lists, portionSize, itemName]);

  // Store the updated lists in localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(lists));
  }, [lists, storageKey]);

  // Automatically hide the alert after 3 seconds
  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisibility(false); // Hide the alert
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [alertVisible]);

  const clearLocalStorage = () => {
    localStorage.removeItem(storageKey);
    setList([]);
  };

  const handleRemoveItem = (item: string) => {
    // Find the index of the item in the currentList
    const index = currentList.indexOf(item);
    if (index !== -1) {
      // Remove the corresponding item from the raw list
      setList((prevList) => prevList.filter((_, i) => i !== index));
    }
  };

  const handleAddItem = (item: string) => {
    if (item.trim() === "") {
      return;
    }
    setList((prevList) => [...prevList, item.trim()]);
  };

  const listsClearedAlertRender = () => {
    return (
      alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>List Cleared</Alert>
      )
    );
  };

  const renderClearListButton = () => {
    return (
      <div>
        <Button
          color="danger"
          onClick={() => {
            setAlertVisibility(true);
            clearLocalStorage();
          }}
        >
          Delete all {itemName}
        </Button>
      </div>
    );
  };

  // Render the text field to handle adding items when Enter is pressed
  const handleAddItemRender = () => {
    return (
      <TextField itemName={itemName} onEnter={handleAddItem}></TextField>
    );
  };

  const renderList = (onSelectItem?: (item: string) => void) => {
    return (
      <ListGroup
        items={currentList}
        heading={recipeName ? `${itemName} for ${recipeName}` : itemName}
        onSelectItem={(item) => {
          if (onSelectItem) {
            onSelectItem(item); // Call the custom callback if provided
          }
        }}
        onRemoveItem={handleRemoveItem}
      />
    );
  };

  // <> = React.Fragment avoids adding extra <div> elements
  const renderPage = (onSelectItem?: (item: string) => void) => {
    return (
      <>
        {listsClearedAlertRender()}
        {handleAddItemRender()}
        {renderClearListButton()}
        {renderList(onSelectItem)}
      </>
    );
  };

  return {
    renderPage,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };
};

export default useList;
