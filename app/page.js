/*  메인 온보딩 페이지 */
"use client";
import PageLayout from './components/PageLayout';
import styles from './page.module.css';
import './style.css';


export default function Onboarding() {
  return (
    <PageLayout>
      <h1 className={styles.title}>Memory Of Year</h1>
      <div className="snowBottom"></div>
    </PageLayout>
  );
}

