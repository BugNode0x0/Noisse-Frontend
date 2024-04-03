import React from "react";
import styles from "./Theme.module.sass";
import Icon from "../Icon";
import cn from "classnames";


const Theme = ({ className, visibleSidebar }) => {
  return (
    <div className={cn(className, styles.theme, { [styles.wide]: visibleSidebar })}>
      {/* Only displaying the dark mode icon without a toggle */}
      <Icon name="moon" size="24" />
      Dark
    </div>
  );
};

export default Theme;
