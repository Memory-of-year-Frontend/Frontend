// app/photo_page/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCamera } from 'react-icons/fa';

export default function PhotoPage() {
  const [photos, setPhotos] = useState(Array(3).fill(null)); // 최대 3장의 폴라로이드 사진
  const router = useRouter();

  const handleAddPhoto = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedPhotos = [...photos];
        updatedPhotos[index] = { src: reader.result, date: new Date().toLocaleDateString(), description: '' };
        setPhotos(updatedPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Photos:', photos);
    // 저장 로직 추가 (예: 서버에 데이터 전송)

    // 저장이 완료되면 다음 페이지로 이동
    router.push('/NextPage'); // 'NextPage'를 실제 다음 페이지 경로로 바꾸세요.
  };

  const handleBack = () => {
    router.push('/PreviousPage'); // 'PreviousPage'를 실제 이전 페이지 경로로 바꾸세요.
  };

  return (
    <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: '#FFF', position: 'relative', padding: '20px' }}>
      {/* 책 디자인 */}
      <div style={{ backgroundColor: '#006400', padding: '20px', borderRadius: '12px', width: '300px', height: '500px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* 책 속의 종이 부분 */}
        <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '20px', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          {/* 폴라로이드 스타일 사진 칸 (교차 배열 및 위치 조정) */}
          {photos.map((photo, index) => (
            <div key={index} style={{
              position: 'relative',
              width: '100px',
              height: '120px',
              border: '4px solid #FFF',
              backgroundColor: '#FFF',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
              transform: index % 2 === 0 ? 'rotate(-5deg)' : 'rotate(5deg)', // 교차 배치
              marginLeft: index % 2 === 0 ? '-120px' : '120px', // 1,3번 왼쪽으로, 2번 오른쪽으로 크게 이동
            }}>
              {photo ? (
                <img src={photo.src} alt={`photo-${index}`} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#AAA' }}>
                  <FaCamera size={24} />
                  <span style={{ fontSize: '10px', marginTop: '5px' }}>사진 추가하기</span>
                  <input type="file" accept="image/*" onChange={(e) => handleAddPhoto(e, index)} style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                </div>
              )}
            </div>
          ))}
          <div style={{ fontSize: '10px', color: '#888', marginTop: '10px' }}>사진은 최대 3장까지 등록 가능합니다.</div>
        </div>
      </div>

      {/* 이전 버튼 */}
      <button
        onClick={handleBack}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#FFF',
          color: '#B22222',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        이전
      </button>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#FFF',
          color: '#B22222',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        저장
      </button>
    </div>
  );
}


