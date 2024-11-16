/*  메인 온보딩 페이지 */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from './components/PageLayout';
import styles from './page.module.css';
import './style.css';

export default function Onboarding() {
  const [isTouched, setIsTouched] = useState(false);
  const router = useRouter(); 

  const handleTouch = () => {
    setIsTouched(prev => !prev); 
  };

  const handleJoinClick = () => {
    router.push('/login');
  };


return(
  <PageLayout>
    <div className={styles.container} onClick={handleTouch}>
    <h1 className={`${styles.title} ${isTouched ? styles.titleMove : ""}`}>
      Memory Of Year
    </h1>
    {isTouched && (
      <div className={styles.buttonContainer}>
        <button className={styles.joinButton} onClick={handleJoinClick}>시작하기</button>
      </div>
    )}
    </div>
    
  <div className="snowBottom"></div>
</PageLayout>
  );
}