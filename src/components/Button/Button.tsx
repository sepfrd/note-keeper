import type { ButtonProps } from "@/components/Button/Button.types";
import type React from "react";

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default Button;
