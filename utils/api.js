const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const fetchStickers = async () => {
    const token = localStorage.getItem("AccessToken");

    if (!token) {
        throw new Error("AccessToken이 없습니다.");
    }

    const response = await fetch("http://3.107.207.24:8080/api/stickers", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const createAlbum = async (payload) => {
    const token = localStorage.getItem("AccessToken");

    if (!token) {
        throw new Error("AccessToken이 없습니다.");
    }

    const response = await fetch("http://3.107.207.24:8080/api/albums/create", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
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

export const fetchAlbumDetails = async (albumId) => {
    try {
        const response = await fetch(`/api/albums/${albumId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("앨범 데이터를 불러올 수 없습니다.");
        }
        return await response.json();
    } catch (error) {
        console.error("API 호출 실패:", error);
        throw error;
    }
};
