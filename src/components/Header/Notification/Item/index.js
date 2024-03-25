import React from "react";
import cn from "classnames";
import styles from "./Item.module.sass";

const Item = ({ className, item, onClose }) => {
  return (
    <div className={cn(styles.item, className)} onClick={onClose}>
      <div className={styles.details}>
        <div className={styles.title}>{item.title}</div>
      </div>
    </div>
  );
};

export default Item;
