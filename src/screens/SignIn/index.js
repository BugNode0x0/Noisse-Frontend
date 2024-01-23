import React from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Image from "../../components/Image";

const SignIn = () => {
  const heightWindow = use100vh();

  // Function to handle redirect to AuthKit Sign In
  const handleAuthKitSignIn = () => {
    window.location.href = 'http://localhost:3001/auth';
  };

  return (
    <div className={styles.login} style={{ minHeight: heightWindow }}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Core"
          />
        </Link>
        <div className={cn("h2", styles.title)}>Sign in</div>
        <div className={styles.body}>
          <button 
            className={cn("button", styles.button)}
            onClick={handleAuthKitSignIn}
          >
            Sign In with Authkit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
