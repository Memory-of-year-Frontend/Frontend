"use client";

import PageLayout from "../components/PageLayout";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import apiClient from "/utils/apiClient";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("AccessToken");
        if (token) {
            checkAlbumAndRedirect(token);
        }
    }, [router]);

    const checkAlbumAndRedirect = async (token) => {
        try {
            const response = await apiClient.get("/api/albums", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data.length > 0) {
                const album = response.data[0]; 
                router.push(`/album?albumId=${album.albumId}`);
            } else {
                console.log("앨범이 존재하지 않습니다.");
            }
        } catch (err) {
            console.error("앨범 확인 중 오류 발생:", err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await apiClient.post("/api/auth/login", {
                username,
                password,
            });

            if (response.status === 200 && response.data.token) {
                const token = response.data.token;
                localStorage.setItem("AccessToken", token);
                checkAlbumAndRedirect(token);
            } else {
                setError("로그인에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("등록된 이메일 혹은 비밀번호가 아닙니다.");
            } else {
                setError("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            }
        }
    };

    const handleForgotPasswordRedirect = () => {
        router.push("/forgot_password");
    };

    const handleRegisterRedirect = () => {
        router.push("/join_membership");
    };

    return (
        <PageLayout>
            <div className={styles.container}>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="USER NAME"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="PASSWORD"
                        required
                    />
                    <button type="submit" className={styles.submitButton}>
                        로그인하기
                    </button>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </form>

                <div className={styles.options}>
                    <a onClick={handleForgotPasswordRedirect}>Forgot Password?</a>
                    <a onClick={handleRegisterRedirect}>회원가입</a>
                </div>
            </div>
        </PageLayout>
    );
};

export default Login;
