// app/store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  // 기존 상태
  title: '',
  letterColor: '#f3d77d',
  from: '',
  content: '',
  photos: Array(3).fill(null),

  // 기존 상태 업데이트 함수
  setTitle: (newTitle) => set({ title: newTitle }),
  setLetterColor: (newColor) => set({ letterColor: newColor }),
  setFrom: (newFrom) => set({ from: newFrom }),
  setContent: (newContent) => set({ content: newContent }),
  setPhotos: (newPhotos) => set({ photos: newPhotos }),


  albumId: null, 
  visibility: true, 
  stickerUrl: '',


  setAlbumId: (newAlbumId) => set({ albumId: newAlbumId }),
  setVisibility: (newVisibility) => set({ visibility: newVisibility }),
  setStickerUrl: (newStickerUrl) => set({ stickerUrl: newStickerUrl }),
}));

export default useStore;
