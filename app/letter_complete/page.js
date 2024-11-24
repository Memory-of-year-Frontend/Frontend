"use client";

import useStore from '../store/useStore'; // Zustand 상태 가져오기

export default function RegisterCompletePage() {
  const { from } = useStore(); // Zustand에서 title 가져오기

  return (
    <div style={{ backgroundColor: 'transparent', color: '#FFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      {/* 등록 완료 메시지 */}
      <h2 style={{ fontSize: '24px', textAlign: 'center', lineHeight: '1.5', fontWeight: 'normal' }}>
        <span style={{ fontWeight: 'bold', color: '#FFF' }}>{from}</span>님의 <span style={{ fontWeight: 'bold' }}>Memory</span>가<br />
        앨범에 등록되었어요!
      </h2>
    </div>
  );
}
