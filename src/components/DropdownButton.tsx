import React, { ReactNode } from "react";

interface Props {
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  children: ReactNode;
  onClick: (portion: number) => void;  // Updated to take a number parameter
}

const DropDownButton = ({ color = "primary", children, onClick }: Props) => {
  // This function now directly uses onClick with the portion as the argument
  const handleItemClick = (portion: number) => {
    onClick(portion);
  };

  return (
    <>
      <button className={`btn btn-${color} dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
        {children}
      </button>
      <ul className="dropdown-menu">
        {[1,2,3,4,5,6,7,8,9].map(number => (
          <li key={number}>
            <a className="dropdown-item" href="#" onClick={() => handleItemClick(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DropDownButton;
