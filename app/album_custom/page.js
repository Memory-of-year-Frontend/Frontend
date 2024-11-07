/*  앨범 커스텀 페이지 */

"use client";
import PageLayout from '../components/PageLayout';
import styles from './album_custom.module.css';

export default function Album_Custom() {
    return (
        <PageLayout>
            <h1 className={styles.title}>앨범커스텀</h1>
        </PageLayout>
    );
}
