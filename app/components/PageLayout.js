"use client"; 
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './PageLayout.module.css';
import { usePathname } from 'next/navigation'; 
import Image from 'next/image';

const PageLayout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();


/*버튼 활성화 조건 */
const buttonConditions = {
    '/': {
        showBackButton: false,
        showHomeButton: false,
    },
    '/album_custom': {
        showBackButton: true,
        showHomeButton: false,
    },
    '/album': {
        showBackButton: false,
        showHomeButton: false,
    },
    // '/페이지 추가: {
    //     showBackButton: true,
    //     showHomeButton: true,
    // },
    
};


const { showBackButton, showHomeButton } = buttonConditions[pathname] || {
    showBackButton: false,
    showHomeButton: false,
};

// 뒤로가기(스타일 더 수정)
const BackButton = () => {
    const handleBack = () => {
        router.back(); 
    };

    return (
        <button className={styles.backbutton} onClick={handleBack}>
            &#10094;
        </button>
    );
};

// 홈버튼(스타일 더 수정)
const HomeButton = () => {
    const router = useRouter();

    const handleHome = () => {
        router.push('/'); 
    };

    return (
        <div className={styles.homeButtonContainer}>
            <button className={styles.homeButton} onClick={handleHome}>
                <Image
                    src="/home.png"
                    alt="Home Icon"
                    width={32} 
                    height={36}
                    className={styles.iconImage}
                />
            </button>
        </div>
    );
};


return (
    <div className={styles.pageWrapper}>
        <div className={styles.contentArea}>
            {showBackButton && <BackButton />}
            {children}
            {showHomeButton && <HomeButton />}  
        </div>
    </div>
);
};

export default PageLayout;