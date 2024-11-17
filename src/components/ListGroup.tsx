import { Fragment } from "react";
import { useState, ReactNode } from "react";

interface ListGroupProps {
  items: string[];
  heading: ReactNode;
  onSelectItem: (item: string) => void; // Action for selecting an item
  onRemoveItem?: (item: string) => void; // Optional action for removing an item
}

function ListGroup({ items, heading, onSelectItem, onRemoveItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getMessage = () => {
    if (items.length === 0) {
      return <p>No {heading} found</p>;
    }
  };

  const removeButton = (item: string) => {
    return (
      <div>
      {onRemoveItem && (
        <button
          className="btn btn-danger btn-sm ms-2"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onSelectItem
            onRemoveItem(item); // Handle item removal
          }}
        >
          Remove
        </button>
      )}
      </div>
    )
  }

  return (
    <Fragment>
      <h1>{heading}</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item); // Handle selection logic
            }}
          >
            {item}
            {removeButton(item)}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
