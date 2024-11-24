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
            const params = new URLSearchParams(window.location.search);
            const albumId = params.get("albumId");
            if (albumId) {
                try {
                    const albumData = await fetchAlbumDetails(albumId); // API 호출 함수
                    if (albumData) {
                        setAlbum(albumData);
                        setAlbumTitle(albumData.title || "OO's Memory");
                        setAlbumImage(COLOR_TO_IMAGE[albumData.albumColor] || "/pink.png");
                    }
                } catch (error) {
                    console.error("앨범 데이터를 불러오는 중 에러 발생:", error.message);
                    alert("앨범 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
                }
            }
        };
        loadAlbum();
    }, []);
    

    const handleMemoryButton = () => {
        router.push("/letter_page");
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
