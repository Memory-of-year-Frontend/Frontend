"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // useRouter 추가
import apiClient from '/utils/apiClient'; 
import PageLayout from '../components/PageLayout';
import styles from "./join_membership.module.css"; // CSS 모듈을 임포트합니다.

const JoinMembership = () => {
const [userName, setUsername] = useState("");
const [password, setPassword] = useState("");
const [nickname, setNickname] = useState("");
const [emailError, setEmailError] = useState(null);
const [passwordError, setPasswordError] = useState(null);
const [nicknameError, setNicknameError] = useState(null);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);
const [isFormValid, setIsFormValid] = useState(false);
const [touched, setTouched] = useState({
    userName: false,
    password: false,
    nickname: false,
});

  const router = useRouter(); // useRouter 훅 사용


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  //입력 규칙
const validateEmail = (userName) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(userName);
};

const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}$/;
    return passwordPattern.test(password);
};

const validateNickname = (nickname) => {
    return nickname.length >= 2 && nickname.length <= 8;
};

useEffect(() => {
    const isEmailValid = validateEmail(userName);
    const isPasswordValid = validatePassword(password);
    const isNicknameValid = validateNickname(nickname);

    setEmailError(
    touched.userName && !isEmailValid ? "메일 형식을 유지해주세요." : null
    );
    setPasswordError(
    touched.password && !isPasswordValid
        ? "영문, 숫자를 조합한 8~13자를 입력해주세요"
        : null
    );
    setNicknameError(
    touched.nickname && !isNicknameValid ? "2~8자의 이름을 사용해주세요." : null
    );

    setIsFormValid(isEmailValid && isPasswordValid && isNicknameValid);
}, [userName, password, nickname, touched]);

const handleBlur = (field) => {
    setTouched({
    ...touched,
    [field]: true,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
    const response = await apiClient.post(`${BASE_URL}/api/auth/register`, { 
        username: userName,
        password: password,
        nickname: nickname,
        email: userName, // 이메일은 userName으로 처리
    });

      if (response.data.id) { // 회원 가입 성공
        setSuccess(true);
        router.push("/album_custom"); // 회원가입 성공 후 /album_custom으로 리다이렉트
    } else {
        setError("Username already taken");
    }
    } catch (error) {
    setError("서버 오류가 발생했습니다.");
    }
};

return (
    <PageLayout>
    <div className={styles.container}>
        <h1 className={styles.title}>회원가입</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
            <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={() => handleBlur("nickname")}
            placeholder="닉네임"
            className={`${styles.input} ${touched.nickname && nicknameError ? styles.errorBorder : ""}`}
            required
            />
            {nicknameError && <p className={styles.errorMessage}>{nicknameError}</p>}
        </div>
        <div className={styles.inputContainer}>
            <input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleBlur("userName")}
            placeholder="이메일"
            className={`${styles.input} ${touched.userName && emailError ? styles.errorBorder : ""}`}
            required
            />
            {emailError && <p className={styles.errorMessage}>{emailError}</p>}
        </div>
        <div className={styles.inputContainer}>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            placeholder="비밀번호"
            className={`${styles.input} ${touched.password && passwordError ? styles.errorBorder : ""}`}
            required
            />
            {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
        </div>
        <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid}
        >
            가입 완료
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
    </div>
    </PageLayout>
);
};

export default JoinMembership;
