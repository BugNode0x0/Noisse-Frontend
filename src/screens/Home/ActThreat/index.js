import React, { useState } from "react";
import cn from "classnames";
import styles from "./ActThreat.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import ModalPreview from "../../../components/ModalPreview";

const tips = [
  {
    title: "Proof of Concepts (PoCs)",
    icon: "code",
    statusColor: "red",
    statusText: "Explore",
    avatar: "/images/content/avatar.jpg",
  },
  {
    title: "Talk to our researchers",
    icon: "person",
    statusColor: "green",
    statusText: "BugNode",
    avatar: "/images/content/avatar.jpg",
  },
];

const ActThreat = ({ className }) => {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Active Threats"
        classTitle="title-green"
      >
        <div className={styles.tips}>
          <div className={styles.info}>
            Revise Threats & Perform Research
          </div>
          <div className={styles.list}>
            {tips.map((x, index) => (
              <div
                className={styles.item}
                key={index}
                onClick={() => setVisibleModalPreview(true)}
              >
                <div className={styles.icon}>
                  <Icon name={x.icon} size="24" />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>{x.title}</div>
                  <div className={styles.line}>
                    {x.statusText && (
                      <div
                        className={cn(
                          { "status-purple": x.statusColor === "purple" },
                          { "status-green-dark": x.statusColor === "green" },
                          { "status-red-dark": x.statusColor === "red" },
                          styles.status
                        )}
                      >
                        {x.statusText}
                      </div>
                    )}
                    <div className={styles.user}>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <ModalPreview
        visible={visibleModalPreview}
        onClose={() => setVisibleModalPreview(false)}
        video="/images/content/video.mp4"
        title="Use guidelines"
      />
    </>
  );
};

export default ActThreat;
