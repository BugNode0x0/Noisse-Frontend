import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Item.module.sass";

const Item = ({ message, type }) => {
  return (
    <div className={styles.item}>
      <Icon name={type === "start" ? "play-circle" : "check-circle"} size="24" />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Item;
