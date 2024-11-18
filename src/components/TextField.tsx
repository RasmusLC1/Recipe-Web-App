import React, {useState } from "react";


interface TextFieldProps {
  itemName: string
  onEnter: (item: string) => void;
}

const TextField = ({itemName, onEnter}: TextFieldProps) => {
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
        Add {itemName}
      </label>
      <input
        type="email"
        className="form-control"
        id="FormControl"
        placeholder= {`Add ${itemName}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={HandleKeyDown}
      />
    </div>
  );
};

export default TextField;
