const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 스티커 목록 불러오기
export const fetchStickers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stickers`);
        if (!response.ok) throw new Error("스티커 불러오기 실패");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// 앨범 생성
export const createAlbum = async (payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/albums/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export async function fetchHomeData() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`/api/home`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error("데이터를 불러올 수 없습니다.");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchAlbumDetails(albumId) {
    try {
        const response = await fetch(`/api/albums/${albumId}`, {
            method: "GET",
        });
        if (!response.ok) throw new Error("앨범 정보를 불러올 수 없습니다.");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
