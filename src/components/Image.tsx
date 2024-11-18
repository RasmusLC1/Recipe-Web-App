import React from "react";

interface ImageProps {
  className: string;
  path?: string; // Only the filename, e.g., "lasanga.jpg"
}

const Image = ({ className, path }: ImageProps) => {
    const imagePath = `../../public/pictures/${path}`;
    return (
      <img
      src={imagePath} 
      className={className}
      alt="" // Picture not found message
      />
    );
};

export default Image;
