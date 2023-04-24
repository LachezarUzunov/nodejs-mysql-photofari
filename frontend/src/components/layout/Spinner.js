import React from "react";
import classes from "./Spinner.module.css";
import loader from "../../assets/pulse.gif";

const Spinner = () => {
  return (
    <div className={classes.center}>
      <img width={180} src={loader} alt="Loading..." />
    </div>
  );
};

export default Spinner;
