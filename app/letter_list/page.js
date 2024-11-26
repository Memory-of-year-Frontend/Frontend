"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { useState } from "react";
import { letters } from "../data/LetterList";

export default function LetterPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // 한 페이지에 보여줄 데이터 개수
  const totalPages = Math.ceil(letters.length / itemsPerPage);

  // 현재 페이지에 표시될 데이터 계산
  const currentLetters = letters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 밝은 색상 계산 함수
  const getLighterColor = (color) => {
    const colorValue = color.slice(1); // # 제거
    const r = parseInt(colorValue.substring(0, 2), 16);
    const g = parseInt(colorValue.substring(2, 4), 16);
    const b = parseInt(colorValue.substring(4, 6), 16);

    const lighterR = Math.min(255, r + 30);
    const lighterG = Math.min(255, g + 30);
    const lighterB = Math.min(255, b + 30);

    return `rgb(${lighterR}, ${lighterG}, ${lighterB})`;
  };

  return (
    <div
      style={{
        backgroundColor: "transparent", // 배경 투명
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        color: "#FFF",
      }}
    >
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "none",
          border: "none",
          color: "#FFF",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <FaArrowLeft size={24} />
      </button>

      {/* 책 디자인 */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#006400",
          padding: "10px",
          borderRadius: "12px",
          width: "320px", // 책의 전체 폭
          height: "400px", // 책의 전체 높이
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 투명한 네모 영역 */}
        <div
          style={{
            position: "absolute",
            top: "-23px", // 기존보다 3px 더 위로 이동
            left: "7.5%", // 책 중앙을 기준으로 좌우 여백 추가
            width: "85%", // 책 너비의 85%로 설정
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 5px", // 좌우 패딩 줄임
            backgroundColor: "rgba(0, 0, 0, 0)", // 투명 배경
            zIndex: 5, // 책 위로 보이도록 설정
          }}
        >
          {/* D-3 (좌측 정렬) */}
          <span
            style={{
              color: "#FFF",
              fontWeight: "900", // 글자를 더 진하게 설정
              fontSize: "16px", // 글자 크기 조금 키움
            }}
          >
            D-28
          </span>

          {/* 잠금 (우측 정렬) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#FFF",
              fontSize: "16px", // 글자 크기 조금 키움
              fontWeight: "900", // 글자를 더 진하게 설정
            }}
          >
            <FaLock style={{ marginRight: "5px" }} />
            <span>잠김</span>
          </div>
        </div>

        {/* 종이 두 페이지 */}
        <div
          style={{
            backgroundColor: "#FFF",
            borderRadius: "8px",
            width: "95%",
            height: "95%",
            boxSizing: "border-box",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* 왼쪽 페이지 */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              borderRight: "1px solid #DDD", // 경계선
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "5px", // 간격을 더 촘촘하게
            }}
          >
            {currentLetters.slice(0, 2).map((letter, index) => {
              const lighterColor = getLighterColor(letter.color);
              const rotation = index === 0 ? "rotate(-10deg)" : "rotate(10deg)"; // 회전 증가
              return (
                <div
                  key={letter.id}
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "60px",
                    transform: rotation, // 회전 추가
                  }}
                >
                  {/* 메인 사각형 */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: letter.color,
                      position: "absolute",
                      borderRadius: "4px",
                    }}
                  ></div>

                  {/* 왼쪽 삼각형 */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "50%",
                      height: "100%",
                      backgroundColor: lighterColor,
                      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                      borderRadius: "4px 0 0 4px",
                    }}
                  ></div>

                  {/* 오른쪽 삼각형 */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "50%",
                      height: "100%",
                      backgroundColor: lighterColor,
                      clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                      borderRadius: "0 4px 4px 0",
                    }}
                  ></div>

                  {/* 편지 내용 */}
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#000", // 글자 검정색
                      fontWeight: "bold",
                      zIndex: 1,
                    }}
                  >
                    {letter.author}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 오른쪽 페이지 */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "5px", // 간격을 더 촘촘하게
            }}
          >
            {currentLetters.slice(2, 5).map((letter, index) => {
              const lighterColor = getLighterColor(letter.color);
              const rotation =
                index === 1 ? "rotate(-10deg)" : "rotate(10deg)"; // 회전 증가
              return (
                <div
                  key={letter.id}
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "60px",
                    transform: rotation, // 회전 추가
                  }}
                >
                  {/* 메인 사각형 */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: letter.color,
                      position: "absolute",
                      borderRadius: "4px",
                    }}
                  ></div>

                  {/* 왼쪽 삼각형 */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "50%",
                      height: "100%",
                      backgroundColor: lighterColor,
                      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                      borderRadius: "4px 0 0 4px",
                    }}
                  ></div>

                  {/* 오른쪽 삼각형 */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "50%",
                      height: "100%",
                      backgroundColor: lighterColor,
                      clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                      borderRadius: "0 4px 4px 0",
                    }}
                  ></div>

                  {/* 편지 내용 */}
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#000", // 글자 검정색
                      fontWeight: "bold",
                      zIndex: 1,
                    }}
                  >
                    {letter.author}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            backgroundColor: "transparent",
            color: currentPage === 1 ? "#888" : "#FFF",
            border: "none",
            fontSize: "20px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          {"<"}
        </button>
        <span style={{ color: "#FFF" }}>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: "transparent",
            color: currentPage === totalPages ? "#888" : "#FFF",
            border: "none",
            fontSize: "20px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          {">"}
        </button>
      </div>
    </div> 
  );
}