"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "/app/components/PageLayout";
import styles from "./album.module.css";
import { fetchAlbumDetails, fetchHomeData } from "/utils/api";

export default function Album() {
    const router = useRouter();
    const [album, setAlbum] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [albumTitle, setAlbumTitle] = useState("OO's Memory");

    useEffect(() => {
        const loadAlbum = async () => {
            const token = localStorage.getItem("token"); // 사용자 토큰 확인
            if (token) {
                setIsLoggedIn(true);
                const homeData = await fetchHomeData();
                setAlbum(homeData);
                setAlbumTitle(homeData?.title || "OO's Memory");
            } else {
                setIsLoggedIn(false);
                const albumId = window.location.pathname.split("/").pop();
                const albumData = await fetchAlbumDetails(albumId);
                if (albumData) {
                    setAlbum(albumData);
                    setAlbumTitle(albumData.title || "OO's Memory");
                }
            }
        };
        loadAlbum();
    }, []);

    const handleMemoryButton = () => {
        router.push("/letter_form");
    };

    const handleNavigateToPreview = () => {
        if (album) {
            router.push(`/preview_form/${album.albumId}`);
        }
    };

    return (
        <PageLayout>
            <div className={styles.container}>
                {isLoggedIn && album ? (
                    // 로그인 상태
                    <div className={styles.albumWrapper}>
                        <h1 className={styles.title}>Memory Of Year</h1>
                        <div
                            className={styles.albumPreview}
                            style={{ backgroundImage: `url(${album.albumColor || "/pink.png"})` }}
                            onClick={handleNavigateToPreview}
                        >
                            <p className={styles.albumName}>{album.title || "OO's Memory"}</p>
                        </div>
                        <p className={styles.description}>*앨범은 12월 25일에 오픈됩니다.</p>
                        <button className={styles.shareButton} onClick={handleNavigateToPreview}>
                            링크 공유하기
                        </button>
                    </div>
                ) : (
                    // 비로그인 상태
                    <div className={styles.guestWrapper}>
                        <h1 className={styles.title}>Memory Of Year</h1>
                        <div
                            className={styles.albumPreview}
                            style={{ backgroundImage: `url(${album?.albumColor || "/pink.png"})` }}
                        >
                            <p className={styles.albumName}>{albumTitle}</p>
                        </div>
                        <p className={styles.guestDescription}>
                            *Memory는 12월 24일까지 작성 가능하며, <br />
                            앨범은 12월 25일에 오픈됩니다. <br />
                            *Memory 이름만 공개되며, 내용은 앨범 주인만 열람 가능합니다.
                        </p>
                        <button className={styles.memoryButton} onClick={handleMemoryButton}>
                            Memory 남기기
                        </button>
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
