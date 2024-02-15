import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Profile.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Icon from "../../components/Icon";
import { getUserProfile, getUserWebhook, updateUserWebhook } from '../../api/subdomainAPI';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState(''); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        if (data.isAuthenticated) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserWebhook = async () => {
      if (userData) {
        try {
          const webhookData = await getUserWebhook(userData.hunter_id); // Use hunter_id if that's what your API expects
          if (webhookData) {
            setWebhookUrl(webhookData.webhookUrl); // The property name must match the API response
          }
        } catch (error) {
          console.error('Error fetching webhook URL:', error);
        }
      }
    };

    fetchUserWebhook();
  }, [userData]);

  const handleWebhookSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    try {
      const response = await updateUserWebhook(webhookUrl); // Pass only the webhook URL
      if (response.message === 'Webhook updated successfully') {
        alert('Webhook updated successfully!');
      } else {
        alert('Failed to update webhook.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating webhook.');
    }
  };

  return (
    <>
    <Card
      className={styles.card}
      title="Info"
      classTitle={cn("title-red", styles.title)}
    >
      <div className={cn(styles.details)}>
        {userData && (
          <div className={styles.userInfo}>
            <div className={styles.line}>
              <Icon name="person" size="24" />
              {`${userData.firstName} ${userData.lastName}`}
            </div>
            <a
              className={styles.line}
              href={`mailto:${userData.email}`}
              rel="noopener noreferrer"
            >
              <Icon name="mail" size="24" />
              {userData.email}
            </a>
          </div>
        )}
      </div>
    </Card>
    <Card
    className={styles.card}
    title="Slack Webhook"
    classTitle={cn("title-red", styles.title)}
  >
    <Form
      className={styles.form}
      onSubmit={handleWebhookSubmit}
      placeholder="Enter your Slack webhook URL"
      value={webhookUrl}
      setValue={setWebhookUrl}
      type="text"
      name="webhook"
      icon="arrow-right"
    />
  </Card>
</>
  );
};

export default Profile;
