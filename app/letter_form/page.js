// app/letter_form/page.js
"use client";

import { useRouter } from 'next/navigation';
import { FaPen, FaArrowLeft } from 'react-icons/fa';
import useStore from '../store/useStore'; // zustand 스토어 import

export default function LetterForm() {
  const { author, content, setAuthor, setContent } = useStore(); // zustand 상태 및 setter 함수 가져오기
  const router = useRouter();

  const handleNextPage = () => {
    router.push('/photo_form');
  };

  return (
    <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: '#FFF', position: 'relative', padding: '20px' }}>
      {/* 뒤로가기 버튼 */}
      <button onClick={() => router.push('/letter_page')} style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
        <FaArrowLeft size={24} />
      </button>

      {/* 책 디자인 */}
      <div style={{ backgroundColor: '#006400', padding: '20px', borderRadius: '12px', width: '300px', height: '500px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* 책 속의 종이 부분 */}
        <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '20px', width: '100%', height: '100%', boxSizing: 'border-box' }}>
          {/* From 필드 */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ color: '#000', fontWeight: 'bold', marginRight: '8px' }}>From.</span>
            <FaPen size={14} style={{ color: '#000', marginRight: '8px' }} />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)} // Zustand로 상태 업데이트
              placeholder="보낸 사람"
              style={{
                flex: 1,
                padding: '4px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid #000',
                color: '#000',
                outline: 'none',
              }}
            />
          </div>

          {/* 책 내용 입력 필드 */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)} // Zustand로 상태 업데이트
            placeholder="책에 적을 내용을 작성하세요."
            rows={16}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000',
              outline: 'none',
              resize: 'none',
              height: 'calc(100% - 40px)', // From 필드의 높이 제외
            }}
          />
        </div>
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNextPage}
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
        다음
      </button>
    </div>
  );
}

