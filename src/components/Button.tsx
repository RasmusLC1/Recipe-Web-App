import React, { ReactNode } from "react";

interface Props {
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  children: ReactNode;
  onClick: () => void;
}
// TEST
const Button = ({ color = "primary", children, onClick }: Props) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {" "}
      {children}
    </button>
  );
};

export default Button;
