"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "../components/PageLayout";
import styles from "./forgot_password.module.css";
import apiClient from "/utils/apiClient";

const ForgotPassword = () => {
const [email, setEmail] = useState("");
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);
const router = useRouter();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
    const response = await apiClient.post("/api/auth/forgot_password", {
        email,
    });

    if (response.status === 200) {
        setSuccess(true);
    } else {
        setError("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    }
    } catch (err) {
    setError("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
};

return (
    <PageLayout>
    <div className={styles.container}>
        <h1 className={styles.title}>비밀번호 찾기</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL을 입력해주세요."
            className={styles.input}
            required
            />
        </div>
        <button type="submit" className={styles.submitButton}>
            Forgot Password
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>이메일이 전송되었습니다.</p>}
        </form>
    </div>
    </PageLayout>
);
};

export default ForgotPassword;

