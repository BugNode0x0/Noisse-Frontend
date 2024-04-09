import React from "react";
import cn from "classnames";
import styles from "./Item.module.sass";

const Item = ({ className, item, onClose }) => {
  return (
    <div className={cn(styles.item, className)} onClick={onClose}>
      <div className={styles.details}>
        <div className={styles.title}>{item.message}</div> {/* Make sure to use the correct property */}
      </div>
    </div>
  );
};


export default Item;
