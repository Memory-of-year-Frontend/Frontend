"use client";

import { useRouter } from 'next/navigation';
import useStore from '../store/useStore';

export default function PreviewAlbum() {
  const router = useRouter();
  const { title, letterColor, from, content, photos } = useStore(); // Zustand 상태 가져오기

  const handleEdit = () => {
    router.push('photo_form'); // 수정 페이지로 이동
  };

  const handleRegister = () => {
    alert('앨범이 성공적으로 등록되었습니다!');
    router.push('/letter_complete'); // 홈 화면으로 이동
  };

  return (
    <div style={{ backgroundColor: 'transparent', padding: '20px', minHeight: '100vh', color: '#FFF', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* 제목 */}
      <h2 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '20px', color: '#FFF' }}>
        <span style={{ color: '#f3d77d' }}>{from}</span>님과의 추억을 공유해보세요!
      </h2>

      {/* 책 디자인 */}
      <div style={{
        backgroundColor: '#006400',
        padding: '10px',
        borderRadius: '12px',
        width: '320px', // 책의 전체 폭
        height: '400px', // 책의 전체 높이를 더 늘림
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '20px',
      }}>
        {/* 종이 두 페이지 */}
        <div style={{
          backgroundColor: '#FFF',
          borderRadius: '8px',
          width: '95%',
          height: '95%',
          boxSizing: 'border-box',
          display: 'flex',
          overflow: 'hidden',
        }}>
          {/* 왼쪽 페이지 (글) */}
          <div style={{
            width: '50%',
            height: '100%',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
            borderRight: '1px solid #DDD', // 페이지 경계선
          }}>
            {/* From */}
            <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#000', fontSize: '12px' }}>
              <span>From. {from}</span>
            </div>

            {/* 내용 */}
            <div style={{
              flex: 1,
              whiteSpace: 'pre-wrap',
              lineHeight: '1.2',
              color: '#000',
              overflowY: 'auto',
              wordWrap: 'break-word',
              fontSize: '10px', // 글자 크기
            }}>
              {content}
            </div>
          </div>

          {/* 오른쪽 페이지 (사진) */}
          <div style={{
            width: '50%',
            height: '100%',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            overflowY: 'auto',
          }}>
            {/* 사진 */}
            {photos.map((photo, index) => photo && (
              <div key={index} style={{
                position: 'relative',
                width: '60px',
                height: '80px',
                border: '2px solid #FFF',
                backgroundColor: '#F5F5F5',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translateX(${index % 2 === 0 ? '-20px' : '20px'}) rotate(${index % 2 === 0 ? '-8deg' : '8deg'})`, // 교차 배치 움직임 확대
              }}>
                <img src={photo.src} alt={`photo-${index}`} style={{
                  width: '50px',
                  height: '70px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }} />
              </div>
            ))}
            {photos.length === 0 && <span style={{ color: '#888', fontSize: '10px' }}>사진이 없습니다.</span>}
          </div>
        </div>
      </div>

      {/* 수정 및 등록 버튼 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={handleEdit}
          style={{
            backgroundColor: '#FFC0CB',
            color: '#B22222',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '200px', // 동일한 너비
          }}
        >
          Memory 수정하기
        </button>
        <button
          onClick={handleRegister}
          style={{
            backgroundColor: '#90EE90',
            color: '#006400',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '200px', // 동일한 너비
          }}
        >
          앨범에 등록하기
        </button>
      </div>
    </div>
  );
}
 