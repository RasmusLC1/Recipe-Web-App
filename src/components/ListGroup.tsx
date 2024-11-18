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

  const DefaultMessage = () => {
    if (items.length === 0) {
      return <p>No {heading} found</p>;
    }
  };

  const removeButton = (item: string) => {
    return (
      <div>
      {onRemoveItem && (
        <button
          className="btn btn-danger btn-sm remove-button"
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

  const editButton = (item: string) => {
    return (
      <div>
      {onRemoveItem && (
        <button
          className="btn btn-danger btn-sm edit-button"
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

  const setClassName = (index: number) => {
      const className = selectedIndex === index
        ? "list-group-item active"
        : "list-group-item"
      
      return className
  }

  return (
    <Fragment>
      <h1>{heading}</h1>
      {DefaultMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={`${setClassName(index)} d-flex justify-content-between align-items-center`}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item); // Handle selection logic
            }}
          >
            <span>{item}</span>
            {removeButton(item)}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
