import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cn from "classnames";
import styles from "./PaymentSuccess.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import { createUserSubscription } from '../../api/subdomainAPI';

const PaymentSuccess = () => {
  const heightWindow = use100vh();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    const finalizeSubscription = async () => {
      try {
        await createUserSubscription({ sessionId });
        navigate('/');
      } catch (error) {
        console.error('Error finalizing subscription:', error);
      }
    };
  
    if (sessionId) {
      finalizeSubscription();
    }
  }, [sessionId, navigate]);

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
        <div className={cn("h2", styles.title)}>Payment Successful</div>
        <div className={styles.body}>
          Sweet! We're taking you to the dashboard.
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
