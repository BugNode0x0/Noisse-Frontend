import React, { useEffect } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Image from "../../components/Image";

const SignIn = () => {
  const heightWindow = use100vh();

  useEffect(() => {
    // Function to handle redirect to AuthKit Sign In
    const handleAuthKitSignIn = () => {
      // Redirect to the AuthKit sign-in page immediately when this component loads
      window.location.href = 'https://noisse-backend-development.up.railway.app/portal/auth';
    };

    // Call the redirect function
    handleAuthKitSignIn();
  }, []); // The empty array makes sure this effect runs once after the component mounts

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
        <div className={cn("h2", styles.title)}>Redirecting to login...</div>
      </div>
    </div>
  );
};

export default SignIn;
