import React from "react";
import classes from "./MyButton.module.scss";

const MyButton = ({ children, className, ...props }) => {
  return (
    <button className={`${classes.myBtn} ${className || ""}`} {...props}>
      {children}
    </button>
  );
};

export default MyButton;
