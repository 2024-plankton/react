import React, { useState } from 'react';
import './Login.css';
import loginImg from './img/login.png'; // 이미지 불러오기

const Login = ({ onLoginSuccess }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('https://api.itda.seoul.kr/cookie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, age }),
                credentials: 'include', // 쿠키 전송을 위해 필요
            });

            if (response.ok) {
                onLoginSuccess(name);
                alert('로그인되었습니다.');
            } else {
                console.error('정보를 확인해주세요.');
                alert('정보를 확인해주세요.');
            }
        } catch (error) {
            console.error('요청 오류: ', error);
            alert('서버 오류입니다.');
        }
    };

    return (
        <div className = "login-container">
            <h1 className = "login-text">안녕하세요!</h1>
            <img src={loginImg} alt="Login Image" className="login-image" /> {/* 이미지 추가 */}
            <input
                type = "text"
                placeholder = "이름을 입력해주세요."
                className = "nameInput"
                value = {name}
                onChange = {handleNameChange}
            />
            <input
                type = "password"
                placeholder = "나이를 입력해주세요."
                className = "ageInput"
                value = {age}
                onChange = {handleAgeChange}
            />
            <button className = "login-button" onClick = {handleLogin}>계속하기</button>
        </div>
    );
};

export default Login;