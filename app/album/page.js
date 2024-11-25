"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "/app/components/PageLayout";
import styles from "./album.module.css";
import { fetchAlbumDetails, fetchLetters } from "/utils/api";

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
    const [isOwner, setIsOwner] = useState(false);
    const [lettersCount, setLettersCount] = useState(0);
    const albumId = new URLSearchParams(window.location.search).get("albumId");

    useEffect(() => {
        const loadAlbumData = async () => {
            const token = localStorage.getItem("AccessToken");

            if (!albumId) {
                console.error("앨범 ID가 존재하지 않습니다. URL을 확인해주세요.");
                return;
            }

            try {
                const albumData = await fetchAlbumDetails(albumId, {
                    method: "GET",
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                });

                if (albumData) {
                    setAlbum(albumData);
                    setIsLoggedIn(!!token);
                    setIsOwner(albumData.ownAlbum);

                    if (albumData.visibility) {
                        const letters = await fetchLetters(albumId);
                        setLettersCount(letters.length);
                    }
                }
            } catch (error) {
                console.error("앨범 데이터를 불러오는 중 에러 발생:", error.message);
            }
        };

        loadAlbumData();
    }, [albumId]);

    const handleMemoryButton = () => {
        router.push("/letter_page");
    };

    const handleNavigateToPreview = () => {
        if (album) {
            router.push(`/preview_form/${album.albumId}`);
        }
    };

    const renderContent = () => {
        if (!album) {
            return <p>앨범 정보를 불러오는 중입니다...</p>;
        }

        const backgroundImage = COLOR_TO_IMAGE[album.albumColor] || "/pink.png";
        const albumTitle = album.title || "OO's Memory";
        const description = isOwner
            ? `*앨범은 12월 25일에 오픈됩니다. Memory: ${lettersCount}`
            : album.visibility
            ? `*현재 저장된 Memory 수: ${lettersCount}`
            : "*Memory 개수는 비공개로 설정되었습니다.";

        return (
            <div className={styles.albumWrapper}>
                <h1 className={styles.title}>Memory Of Year</h1>
                <div
                    className={styles.albumPreview}
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    onClick={isOwner ? handleNavigateToPreview : null}
                >
                    <p className={styles.albumName}>{albumTitle}</p>
                </div>
                <p className={styles.description}>{description}</p>
                {isOwner ? (
                    <button
                        className={styles.shareButton}
                        onClick={handleNavigateToPreview}
                    >
                        링크 공유하기
                    </button>
                ) : (
                    <button
                        className={styles.memoryButton}
                        onClick={handleMemoryButton}
                        disabled={isLoggedIn}
                    >
                        Memory 남기기
                    </button>
                )}
            </div>
        );
    };

    return (
        <PageLayout>
            <div className={styles.container}>{renderContent()}</div>
        </PageLayout>
    );
}
