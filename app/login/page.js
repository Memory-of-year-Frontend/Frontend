"use client";
import PageLayout from '../components/PageLayout';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import apiClient from '/utils/apiClient'; 

const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
const router = useRouter();

useEffect(() => {
    const token = localStorage.getItem('AccessToken');
    if (token) {
    router.push('/album_custom');
    }
}, [router]);

const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    setError(null); // 이전 에러 초기화

    try {
        const response = await apiClient.post('/api/auth/login', { username, password });

    if (response.status === 200 && response.data.token) {
        const token = response.data.token;

        // 로컬스토리지에 토큰 저장
        localStorage.setItem('AccessToken', token);
        router.push('/album_custom'); // 로그인 성공 시 리다이렉트
    } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
    } catch (err) {
    if (err.response && err.response.status === 401) {
        setError('등록된 이메일 혹은 비밀번호가 아닙니다.');
    } else {
        setError('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
    }
};

const handleRegisterRedirect = () => {
    router.push('/join_membership');
};

return (
    <PageLayout>
    <div className={styles.container}>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USER NAME"
            required
            />
        </div>
        <div>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            required
            />
        </div>
        <button type="submit" className={styles.submitButton}>LOGIN</button>
        {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
        <button onClick={handleRegisterRedirect} className={styles.registerButton}>회원가입</button>
    </div>
    </PageLayout>
);
};

export default Login;
