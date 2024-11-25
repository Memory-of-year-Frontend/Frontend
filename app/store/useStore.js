// app/store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  // 기존 상태
  letterTitle: '',
  letterColor: '#f3d77d',
  author: '',
  content: '',
  ananymous:false,
  photos: Array(3).fill(null), // 초기 상태 설정
  albumId:0,

  // 상태 업데이트 함수
  setTitle: (newTitle) => set({ letterTitle: newTitle }),
  setLetterColor: (newColor) => set({ letterColor: newColor }),
  setAuthor: (newAutor) => set({ author: newAutor }),
  setContent: (newContent) => set({ content: newContent }),
  setPhotos: (newPhotos) => set({ photos: newPhotos }), // 사진 상태 업데이트
  setId: (newId) => set({ albumId: newId }),
}));

export default useStore;


