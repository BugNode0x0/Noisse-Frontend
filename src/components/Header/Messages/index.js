import { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Messages.module.sass";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Item from "./Item";

const messages = [
    {
        title: "Sam",
        content: "Threat re-tested and confirmed.",
        avatar: "/images/content/avatar-1.jpg",
        time: "03:30PM",
        new: true,
        url: "/message-center",
    }
];

const actions = [
    {
        title: "Mark as read",
        icon: "check",
        action: () => console.log("Mark as read"),
    },
    {
        title: "Delete message",
        icon: "trash",
        action: () => console.log("Delete message"),
    },
];

const Messages = ({ className }) => {
    const [visible, setVisible] = useState(false);

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div
                className={cn(styles.messages, className, {
                    [styles.active]: visible,
                })}
            >
                <button
                    className={cn(styles.head, styles.active)}
                    onClick={() => setVisible(!visible)}
                >
                    <Icon name="message" size="24" />
                </button>
                <div className={styles.body}>
                    <div className={styles.top}>
                        <div className={styles.title}>Message</div>
                        <Actions
                            className={styles.actions}
                            classActionsHead={styles.actionsHead}
                            items={actions}
                            small
                        />
                    </div>
                    <div className={styles.list}>
                        {messages.map((x, index) => (
                            <Item
                                className={cn(styles.item, className)}
                                item={x}
                                key={index}
                                onClose={() => setVisible(false)}
                            />
                        ))}
                    </div>
                    <Link
                        className={cn("button", styles.button)}
                        to="/message-center"
                        onClick={() => setVisible(false)}
                    >
                        View in message center
                    </Link>
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default Messages;
