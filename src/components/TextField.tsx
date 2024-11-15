import React, { useState } from "react";

interface TextFieldProps {
  onEnter: (item: string) => void;
}

const TextField = ({ onEnter }: TextFieldProps) => {
  const [value, setValue] = useState("");

  const HandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      console.log(value);
      event.preventDefault();
      if (value.trim() !== "") {
        onEnter(value);
        setValue("");
      }
    }
  };

  return (
    <div>
      <label htmlFor="FormControl" className="form-label">
        AddRecipe
      </label>
      <input
        type="email"
        className="form-control"
        id="FormControl"
        placeholder="Add Recipe"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={HandleKeyDown}
      />
    </div>
  );
};

export default TextField;
