/*해야 할 것(11.17)
이전 버튼 : 상태 변경 완료
기타 기능 다듬고
다이어리 UI 및 페이지 UI */

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "../components/PageLayout";
import styles from "./album_custom.module.css";

export default function Album_Custom() {
    const router = useRouter();

    const [albumColor, setAlbumColor] = useState("#FF9999");
    const [albumName, setAlbumName] = useState("");
    const [isPrivate, setIsPrivate] = useState(true); //
    const [activePanel, setActivePanel] = useState(""); 
    const [previousState, setPreviousState] = useState({
        albumColor: "#FF9999",
        albumName: "",
        isPrivate: true
    });

    // 상태 저장
    const saveState = () => {
        setPreviousState({
            albumColor,
            albumName,
            isPrivate
        });
    };

    const handleGoBack = () => {
        setAlbumColor(previousState.albumColor);
        setAlbumName(previousState.albumName);
        setIsPrivate(previousState.isPrivate); 
    };

    const handleCreateAlbum = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/albums/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: albumName,
                    albumColor,
                    visibility: isPrivate,
                }),
            });

            if (!response.ok) throw new Error("API 호출 실패");

            const result = await response.json();
            alert("앨범이 성공적으로 생성되었습니다!");
            router.push("/albums");
        } catch (error) {
            console.error("앨범 생성 오류:", error);
            alert("앨범 생성에 실패했습니다.");
        }
    };


    useEffect(() => {
        saveState(); 
    }, [albumColor, albumName, isPrivate]); // 상태 변경 시마다 실행됨

    return (
        <PageLayout>
            <div className={styles.container}>
                <h1 className={styles.title}>나만의 앨범을 만들어보세요!</h1>

                {/* 앨범 */}
                <div
                    className={styles.albumPreview}
                    style={{ backgroundColor: albumColor }}
                >
                    <p className={styles.albumName}> {albumName || "OO"}&apos;s Memory</p>
                </div>

                {/* 버튼들 */}
                <div className={styles.controls}>
                    <button
                        className={styles.navButton}
                        onClick={() => setActivePanel(activePanel === "color" ? "" : "color")}
                    >
                        색 설정
                    </button>

                    <button
                        className={styles.navButton}
                        onClick={() => setActivePanel(activePanel === "custom" ? "" : "custom")}
                    >
                        커스텀
                    </button>

                    <button
                        className={styles.navButton}
                        onClick={() => setActivePanel(activePanel === "name" ? "" : "name")}
                    >
                        이름 설정
                    </button>

                    <button
                        className={styles.navButton}
                        onClick={() => setActivePanel(activePanel === "visibility" ? "" : "visibility")}
                    >
                        공개 설정
                    </button>
                </div>

                {/* 색 패널 */}
                {activePanel === "color" && (
                    <div className={styles.panel}>
                        <p className={styles.panelTitle}>색 선택</p>
                        <div className={styles.colorPicker}>
                            {["#FF9999", "#FFBD30", "#FF5500", "#D000FF", "#FFFB00", "#1AFF5E", "#143C59", "#141559", "#230014"].map((color) => (
                                <button
                                    key={color}
                                    className={`${styles.colorButton} ${albumColor === color ? styles.selected : ""}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setAlbumColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* 커스텀 패널 */}
                {activePanel === "custom" && (
                    <div className={styles.panel}>
                        <p className={styles.panelTitle}>스티커 추가</p>
                        <div className={styles.stickerContainer}>
                            {/* 스티커 추가 옵션 */}
                        </div>
                    </div>
                )}

                {/* 이름 패널 */}
                {activePanel === "name" && (
                    <div className={styles.panel}>
                        <p className={styles.panelTitle}>앨범 이름</p>
                        <input
                            type="text"
                            value={albumName}
                            onChange={(e) => {
                                const value = e.target.value;
                                // 글자 제한
                                const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);
                                if (isKorean && value.length <= 6) {
                                    setAlbumName(value); // 한글: 6글자 제한
                                } else if (!isKorean && value.length <= 12) {
                                    setAlbumName(value); // 영어: 12자 제한
                                }
                            }}
                            placeholder="당신의 다이어리 이름은?"
                            className={styles.nameInput}
                        />
                    </div>
                )}

                {/* 공개 여부 패널 */}
                {activePanel === "visibility" && (
                    <div className={styles.panel}>
                        <p className={styles.panelTitle}>공개 여부</p>
                        <button
                            className={styles.toggleButton}
                            onClick={() => setIsPrivate(!isPrivate)}
                        >
                            {isPrivate ? "비공개" : "공개"}
                        </button>
                    </div>
                )}

                {/* 이전 &  저장 */}
                <div className={styles.buttonsContainer}>
                    <button onClick={handleGoBack} className={styles.backButton}>
                        이전
                    </button>
                    <button onClick={handleCreateAlbum} className={styles.saveButton}>
                        저장
                    </button>
                </div>
            </div>
        </PageLayout>
    );
}
