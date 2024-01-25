import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import LogoutButton from '../../LogoutButton';


const items = [
    {
        menu: [
            {
                title: "Profile",
                url: "/shop",
            },
            {
                title: "Edit profile",
                url: "/settings",
            },

            {
                title: "Account settings",
                url: "/settings",
            },
            {
                title: "Log out",
                action: 'logout'
            },
        ],
    },
];

const User = ({ className }) => {
    const [visible, setVisible] = useState(false);
    const { pathname } = useLocation();

    const handleLogout = () => {
        setVisible(false);
      };

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div
                className={cn(styles.user, className, {
                    [styles.active]: visible,
                })}
            >
                <button
                    className={styles.head}
                    onClick={() => setVisible(!visible)}
                >
                    <img src="/images/content/avatar.jpg" alt="Avatar" />
                </button>
                <div className={styles.body}>
                    {items.map((item, index) => (
                        <div className={styles.menu} key={index}>
                            {item.menu.map((x, index) =>
                                x.url ? (
                                    <NavLink
                                        className={cn(styles.item, {
                                            [styles.color]: x.color,
                                            [styles.active]: pathname === x.url,
                                        })}
                                        to={x.url}
                                        onClick={() => setVisible(false)}
                                        key={index}
                                    >
                                        {x.icon && (
                                            <Icon name={x.icon} size="24" />
                                        )}
                                        {x.title}
                                    </NavLink>
                                ) : x.action === 'logout' ? (
                                    <LogoutButton onLogout={handleLogout} key={index} />
                                ) : (
                                    <button
                                        className={styles.item}
                                        onClick={() => setVisible(false)}
                                        key={index}
                                    >
                                        {x.title}
                                    </button>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default User;
