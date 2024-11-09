import React, { useState, useEffect } from 'react';
import './start.css'; // 필요한 스타일이 있다면 작성
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';

function Start({ userName }) {
    const images = [img1, img2, img3, img4, img5]; // 이미지 배열
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 이름의 마지막 글자를 분석하여 적절한 조사를 반환하는 함수
    const getParticle = (name) => {
        const lastChar = name.charAt(name.length - 1);
        const uniCode = lastChar.charCodeAt(0);
        if (uniCode >= 0xAC00 && uniCode <= 0xD7A3) {
            return (uniCode - 0xAC00) % 28 === 0 ? '와' : '과';
        }
        return '와'; // 한글이 아닐 경우 기본값
    };

    const particle = getParticle(userName); // 적절한 조사 선택

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                if (prevIndex < images.length - 1) {
                    return prevIndex + 1;
                } else {
                    clearInterval(interval); // 마지막 이미지 이후에는 타이머 정리
                    return prevIndex;
                }
            });
        }, 500); // 0.5초 간격

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
    }, [images.length]);

    return (
        <div className="image-container">
            <img src={images[currentImageIndex]} alt="" className="image-display" />
            <div className="overlay-text">
                {userName}{particle}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;를 잇다
            </div>
        </div>
    );
}

export default Start;
