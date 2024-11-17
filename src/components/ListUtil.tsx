import Alert from "./Alert";
import Button from "./Button";
import ListGroup from "./ListGroup";
import { useEffect, useState } from "react";
import TextField from "./TextField";

const useList = (itemName: string) => {
  const [lists, setList] = useState<string[]>(() => {
    const savedList = localStorage.getItem(itemName);
    return savedList ? JSON.parse(savedList) : [];
  });
  const [currentList, setCurrentList] = useState<string[]>(lists); // Tracks the current list
  const [alertVisible, setAlertVisibility] = useState(false);

  // Sync currentList with lists initially
  useEffect(() => {
    setCurrentList(lists);
  }, [lists]);

  // Store the updated lists
  useEffect(() => {
    localStorage.setItem(itemName, JSON.stringify(lists));
  }, [lists]);

  // Automatically hide the alert after 3 seconds
  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisibility(false); // Hide the alert
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [alertVisible]);

  const clearLocalStorage = (item: string) => {
    localStorage.removeItem(item);
  };

  const handleRemoveItem = (item: string) => {
    setList((prevList) => prevList.filter((recipe) => recipe !== item));
  };

  const handleAddItem = (item: string) => {
    if (item.trim() !== "") {
      setList((prevList) => [...prevList, item.trim()]);
    }
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
            clearLocalStorage(itemName);
            setList([]);
          }}
        >
          Delete all {itemName}
        </Button>
      </div>
    );
  };

  const handleAddItemRender = () => {
    return <TextField onEnter={handleAddItem}></TextField>;
  };

  const renderList = (onSelectItem?: (item: string) => void ) => {
    return (
      <ListGroup
        items={currentList}
        heading={itemName}
        onSelectItem={(item) => {if (onSelectItem) {
            onSelectItem(item); // Call the custom callback if provided
          } else {
            // Default behavior: Update current list
            setCurrentList([`Details of ${item}`, `${item} Step 1`, `${item} Step 2`]);
          }
        }}
        onRemoveItem={handleRemoveItem}
      />
    );
  };

  // <> = React.Fragment avoids <div>
  const renderPage = (onSelectItem?: (item: string) => void ) => {
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
