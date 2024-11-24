"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "/app/components/PageLayout";
import styles from "./album.module.css";
import { fetchAlbumDetails, fetchHomeData } from "/utils/api";

const COLOR_TO_IMAGE = {
    "#FF9999": "/pink.png",
    "#FFBD30": "/salgu.png",
    "#FF5500": "/orange.png",
    "#344400": "/deepgreen.png",
    "#73D7FF": "/skyblue.png",
    "#84E8BB": "/mint.png",
    "#D000FF": "/purple.png",
    "#FFFB00": "/yellow.png",
    "#1AFF5E": "/green.png",
    "#143C59": "/darknavy.png",
    "#141559": "/blue.png",
    "#000000": "/dark.png",
};

export default function Album() {
    const router = useRouter();
    const [album, setAlbum] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [albumTitle, setAlbumTitle] = useState("OO's Memory");
    const [albumImage, setAlbumImage] = useState(COLOR_TO_IMAGE["#FF9999"]);

    useEffect(() => {
        const loadAlbum = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
                const homeData = await fetchHomeData();
                if (homeData) {
                    setAlbum(homeData);
                    setAlbumTitle(homeData.title || "OO's Memory");
                    setAlbumImage(COLOR_TO_IMAGE[homeData.albumColor] || "/pink.png");
                }
            } else {
                setIsLoggedIn(false);
                const albumId = window.location.pathname.split("/").pop();
                const albumData = await fetchAlbumDetails(albumId);
                if (albumData) {
                    setAlbum(albumData);
                    setAlbumTitle(albumData.title || "OO's Memory");
                    setAlbumImage(COLOR_TO_IMAGE[albumData.albumColor] || "/pink.png");
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
                    <div className={styles.albumWrapper}>
                        <h1 className={styles.title}>Memory Of Year</h1>
                        <div
                            className={styles.albumPreview}
                            style={{ backgroundImage: `url(${albumImage})` }}
                            onClick={handleNavigateToPreview}
                        >
                            <p
                                className={styles.albumName}
                                style={{
                                    color: ["#FFBD30", "#84E8BB", "#FFFB00", "#1AFF5E"].includes(
                                        album.albumColor
                                    )
                                        ? "black"
                                        : "white",
                                }}
                            >
                                {album.title || "OO's Memory"}
                            </p>
                        </div>
                        <p className={styles.description}>*앨범은 12월 25일에 오픈됩니다.</p>
                        <button className={styles.shareButton} onClick={handleNavigateToPreview}>
                            링크 공유하기
                        </button>
                    </div>
                ) : (
                    <div className={styles.guestWrapper}>
                        <h1 className={styles.title}>Memory Of Year</h1>
                        <div
                            className={styles.albumPreview}
                            style={{ backgroundImage: `url(${albumImage})` }}
                        >
                            <p
                                className={styles.albumName}
                                style={{
                                    color: ["#FFBD30", "#84E8BB", "#FFFB00", "#1AFF5E"].includes(
                                        album?.albumColor
                                    )
                                        ? "black"
                                        : "white",
                                }}
                            >
                                {albumTitle}
                            </p>
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
