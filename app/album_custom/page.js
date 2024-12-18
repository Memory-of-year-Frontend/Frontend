"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "/app/components/PageLayout";
import styles from "./album_custom.module.css";
import { fetchStickers, createAlbum, fetchLetters  } from "/utils/api";

const COLORS = [
    "#FF9999", "#FFBD30", "#FF5500", "#344400", "#73D7FF", "#84E8BB",
    "#D000FF", "#FFFB00", "#1AFF5E", "#143C59", "#141559", "#000000"
];

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

export default function AlbumCustom() {
    const router = useRouter();
    const [selectedBookImage, setSelectedBookImage] = useState(COLOR_TO_IMAGE["#FF9999"]);
    const [activePanel, setActivePanel] = useState(0);
    const [albumColor, setAlbumColor] = useState("#FF9999");
    const [albumName, setAlbumName] = useState("");
    const [isPrivate, setIsPrivate] = useState(true);
    const [stickers, setStickers] = useState([]);
    const [selectedSticker, setSelectedSticker] = useState("");

    const handleColorSelection = (color) => {
        setAlbumColor(color);
        setSelectedBookImage(COLOR_TO_IMAGE[color] || "/pink.png");
    };

    useEffect(() => {
        const loadStickers = async () => {
            try {
                const data = await fetchStickers();
                setStickers(data);
            } catch (error) {
                console.error("스티커 데이터를 불러오는 중 에러 발생:", error.message);
                alert("스티커 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
            }
        };
        loadStickers();
    }, []);

    const handleNext = () => {
        if (activePanel < 3) setActivePanel(activePanel + 1);
    };

    const handleBack = () => {
        if (activePanel > 0) setActivePanel(activePanel - 1);
    };

    const handleCreate = async () => {
        const payload = {
            title: albumName,
            albumColor,
            visibility: isPrivate,
            stickerUrl: selectedSticker,
        };
    
        try {
            const response = await createAlbum(payload);
            if (response.albumId) {
                alert("앨범이 생성되었습니다!");
                router.push(`/album?albumId=${response.albumId}`);
            } else {
                throw new Error("앨범 생성 응답에 ID가 없습니다.");
            }
        } catch (error) {
            alert("앨범 생성에 실패했습니다. 다시 시도해주세요.");
            console.error("앨범 생성 중 에러:", error.message);
        }
    };
    
    
    

    return (
        <PageLayout>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    나만의 앨범을<br />
                    만들어보세요!
                </h1>

                <div className={styles.albumPreview}>
                    <p
                        className={styles.albumName}
                        style={{
                            color: ["#FFBD30", "#84E8BB", "#FFFB00", "#1AFF5E"].includes(albumColor)
                                ? "black"
                                : "white",
                        }}
                    >
                        {albumName || "OO"}'s Memory
                    </p>
                    <img
                        src={selectedBookImage || "/pink.png"}
                        alt="앨범 책 이미지"
                        className={styles.bookImage}
                    />
                    {selectedSticker && (
                        <img
                            src={selectedSticker}
                            alt="선택된 스티커"
                            className={styles.selectedSticker}
                        />
                    )}
                </div>

                <div className={styles.tabs}>
                    {["색", "커스텀", "이름", "설정"].map((tab, index) => (
                        <span
                            key={index}
                            className={`${styles.tab} ${activePanel === index ? styles.selected : ""}`}
                            onClick={() => setActivePanel(index)}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

                {activePanel === 0 && (
                    <div className={styles.panel}>
                        <div className={styles.colorPicker}>
                            {COLORS.map((color) => (
                                <button
                                    key={color}
                                    className={`${styles.colorButton} ${
                                        albumColor === color ? styles.selected : ""
                                    }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorSelection(color)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activePanel === 1 && (
                    <div className={styles.panel}>
                    <div className={styles.stickerPicker}>
                        {stickers.map((sticker) => (
                            <img
                                key={sticker}
                                src={sticker}
                                className={`${styles.stickerOption} ${
                                    selectedSticker === sticker ? styles.selected : ""
                                }`}
                                onClick={() => setSelectedSticker(sticker)}
                                alt="스티커"
                            />
                        ))}
                    </div>
                </div>
                )}

                {activePanel === 2 && (
                    <div className={styles.panel}>
                        <div className={styles.namePanel}>
                            <div className={styles.inputWrapper}>
                                <img src="/pencile.png" alt="Edit" className={styles.icon} />
                                <input
                                    type="text"
                                    value={albumName}
                                    onChange={(e) => setAlbumName(e.target.value)}
                                    placeholder="앨범 이름을 입력하세요"
                                    className={styles.nameInput}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activePanel === 3 && (
                    <div className={styles.panel}>
                        <p className={styles.settingsTitle}>*Memory 수</p>
                        <div className={styles.toggleContainer}>
                            <button
                                className={`${styles.toggleButton} ${
                                    !isPrivate ? styles.selected : ""
                                }`}
                                onClick={() => setIsPrivate(false)}
                            >
                                공개
                            </button>
                            <button
                                className={`${styles.toggleButton} ${
                                    isPrivate ? styles.selected : ""
                                }`}
                                onClick={() => setIsPrivate(true)}
                            >
                                비공개
                            </button>
                        </div>
                        <p className={styles.settingsDescription}>
                            ! Memory의 내용은 '<span className={styles.highlight}>{albumName || "OO"}</span>'님만 열람 가능합니다.
                        </p>
                    </div>
                )}

                <div className={styles.buttonsContainer}>
                    {activePanel > 0 && (
                        <button onClick={handleBack} className={styles.actionButton}>
                            이전
                        </button>
                    )}
                    {activePanel < 3 && (
                        <button onClick={handleNext} className={styles.actionButton}>
                            다음
                        </button>
                    )}
                    {activePanel === 3 && (
                        <button onClick={handleCreate} className={styles.actionButton}>
                            저장
                        </button>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
