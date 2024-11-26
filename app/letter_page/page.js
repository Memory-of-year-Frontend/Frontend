"use client";

import { useRouter } from 'next/navigation';
import { FaPen, FaArrowLeft } from 'react-icons/fa';
import useStore from '../store/useStore';
import { useEffect } from 'react';

export default function LetterPage() {
  const { title, letterColor, setTitle, setLetterColor, setAlbumId  } = useStore();
  const router = useRouter();

  const colors = ['#FF9999', '#FFBD30', '#FF5500', '#344400', '#73D7FF', '#84E8BB', '#D000FF', '#141559', '#143C59', '#230014'];
  const albumId = new URLSearchParams(window.location.search).get('albumId');

  useEffect(() => {
    if (albumId) setAlbumId(albumId);
  }, [albumId]);

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

  const handleColorSelect = (color) => {
    setLetterColor(color); // Zustand로 상태 업데이트
  };


  const handleNextPage = () => {
    router.push('/letter_form');
  };

  const lighterColor = getLighterColor(letterColor);

  return (
    <div style={{ backgroundColor: 'transparent', padding: '20px', minHeight: '100vh', color: '#FFF', position: 'relative' }}>
      {/* 뒤로가기 버튼 */}
      <button onClick={() => router.back()} style={{ marginBottom: '20px', zIndex: 10, background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
        <FaArrowLeft size={24} />
      </button>

      {/* 이름 입력 필드 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <FaPen size={20} style={{ marginLeft: '8px', color: '#FFF' }} />
        <input
          type="text"
          value={title} // Zustand 상태 연결
          onChange={(e) => setTitle(e.target.value)} // Zustand로 상태 업데이트
          placeholder="Memory 이름을 입력해주세요."
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1px solid #FFF',
            color: '#FFF',
            outline: 'none',
          }}
        />
      </div>

      {/* placeholder 색상 스타일링 */}
      <style jsx>{`
        input::placeholder {
          color: #FFF;
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        {/* 편지지 디자인 */}
        <div style={{ position: 'relative', width: '200px', height: '120px', margin: '20px auto' }}>
          {/* 메인 사각형 */}
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: letterColor,
            position: 'absolute',
          }}></div>

          {/* 왼쪽 삼각형 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            backgroundColor: lighterColor,
            clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
          }}></div>

          {/* 오른쪽 삼각형 */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            backgroundColor: lighterColor,
            clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
          }}></div>
        </div>

        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '10px',
              maxWidth: '200px',
              margin: '0 auto',
            }}
          >
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => handleColorSelect(color)}
                style={{
                  backgroundColor: color,
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: letterColor === color ? '3px solid #FFF' : '1px solid #CCC',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNextPage}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 10,
          backgroundColor: '#FFF',
          color: '#B22222',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        다음
      </button>
    </div>
  );
}









