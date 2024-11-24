/*  메인 - 끝  */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from './components/PageLayout';
import styles from './page.module.css';
import './style.css';

export default function Onboarding() {
  const [isTouched, setIsTouched] = useState(false);
  const router = useRouter(); 

  const handleTouch = (event) => {
    if (event.target.closest(`.${styles.joinButton}`) || event.target.closest(`.${styles.forgotPassword}`)) {
      return;
    }
    setIsTouched((prev) => !prev); 
  };

  const handleJoinClick = (event) => {
    event.stopPropagation(); 
    router.push("/login");
  };

  const handleForgotPassword = (event) => {
    event.stopPropagation(); 
    router.push("/forgot_password"); 
  };


  return (
    <PageLayout>
      <div className={styles.container} onClick={handleTouch}>
        {isTouched && <p className={styles.subTitle}>한 해를 돌아보며,</p>}

        <h1 className={`${styles.title} ${isTouched ? styles.titleMove : ""}`}>
          Memory Of Year
        </h1>

        {isTouched && (
          <div className={styles.buttonContainer}>
            <button className={styles.joinButton} onClick={handleJoinClick}>
              로그인/회원가입
            </button>
            <p
              className={styles.forgotPassword}
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}