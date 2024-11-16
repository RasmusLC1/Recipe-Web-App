import { Fragment } from "react";
import { useState } from "react";
import React, { ReactNode } from "react";

// Ctrl + shiift + P to use prettyfy

interface ListGroupProps {
  items: string[];
  heading: ReactNode;
  onSelectItem: (item: string) => void;
  onRemoveItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem, onRemoveItem}: Props) {
  // Allows react to know that this component is dynamic and can change
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getMessage = (item: string[]) => {
    return item.length == 0 && <p>No {heading} found</p>;
  };

  return (
    <Fragment>
      <h1>{heading}</h1>
      {getMessage(items)}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
              onRemoveItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
