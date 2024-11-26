const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const fetchStickers = async () => {
    const token = localStorage.getItem("AccessToken");

    if (!token) {
        throw new Error("AccessToken이 없습니다.");
    }

    const response = await fetch("http://52.63.140.24:8080/api/stickers", {
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

    try {
        const response = await fetch("/api/albums/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("서버 응답 에러:", errorResponse);
            throw new Error(`앨범 생성 실패: ${response.status} - ${errorResponse.message}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API 호출 에러:", error.message);
        throw error;
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

export const fetchAlbumDetails = async (albumId, options = {}) => {
    try {
        console.log("API 호출 시작: /api/albums/" + albumId); 
        const response = await fetch(`/api/albums/${albumId}`, options);

        if (!response.ok) {
            console.error("API 응답 에러:", response.status, await response.text());
            throw new Error(`앨범 조회 실패: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API 호출 중 에러:", error.message);
        throw error;
    }
};


export async function fetchLetters(albumId) {
    const token = localStorage.getItem("AccessToken");
    try {
        const response = await fetch(`/api/albums/${albumId}/letters`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch letters: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch letters:", error);
        throw error; 
    }
}
