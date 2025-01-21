import React, { ButtonHTMLAttributes } from "react";
import classes from "./MyButton.module.scss";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MyButton = ({ children, ...props }: MyButtonProps) => {
  return (
      <button {...props} className={classes.myBtn}>
        {children}
      </button>
  );
};

export default MyButton;