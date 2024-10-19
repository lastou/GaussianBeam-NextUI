import React from "react";
import { Input, InputProps } from "@nextui-org/input";

export function CustomInput(props: InputProps) {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <Input
      {...props}
      onWheel={handleWheel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    />
  );
}
