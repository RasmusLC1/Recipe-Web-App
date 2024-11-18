import Alert from "./Alert";
import Button from "./Button";
import ListGroup from "./ListGroup";
import ListObject from "./ListObject";
import { useEffect, useState } from "react";
import TextField from "./TextField";

// Takes an itemname and optionally a recipename
const useList = (itemName: string, recipeName?: string) => {
  // Create a storage key that includes the recipe name
  const storageKey =
    recipeName && itemName === "ingredients"
      ? `${itemName}-${recipeName}`
      : itemName;

  const [lists, setList] = useState<string[]>(() => {
    const savedList = localStorage.getItem(storageKey);
    return savedList ? JSON.parse(savedList) : [];
  });
  const [currentList, setCurrentList] = useState<string[]>(lists); // Tracks the current list
  const [alertVisible, setAlertVisibility] = useState(false);

  // Update lists when storageKey changes
  useEffect(() => {
    if (storageKey) {
      const savedList = localStorage.getItem(storageKey);
      const parsedList = savedList ? JSON.parse(savedList) : [];
      setList(parsedList);
      setCurrentList(parsedList);
    } else {
      setList([]);
      setCurrentList([]);
    }
  }, [storageKey]);

  // Sync currentList with lists initially
  useEffect(() => {
    setCurrentList(lists);
  }, [lists]);

  // Store the updated lists
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
  };

  const handleRemoveItem = (item: string) => {
    setList((prevList) => prevList.filter((recipe) => recipe !== item));
  };

  const handleAddItem = (item: string) => {
    if (item.trim() === "") {
      return
    }
    if (itemName === "ingredients"){
      const modifiedItem = ListObject(item);
      setList((prevList) => [...prevList, modifiedItem.trim()]);
      return
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
        <button
          className="btn btn-danger btn-sm delete-all-button"
          onClick={() => {
            setAlertVisibility(true);
            clearLocalStorage();
            setList([]);
          }}
        >
          Delete all {itemName}
        </button>
      </div>
    );
  };

  // Send the textfield to handleAddItem when enter
  const handleAddItemRender = () => {
    return <TextField itemName = {itemName} onEnter={handleAddItem}></TextField>;
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

  // <> = React.Fragment avoids <div>
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

  return { renderPage, addItem: handleAddItem, removeItem: handleRemoveItem };
};

export default useList;
