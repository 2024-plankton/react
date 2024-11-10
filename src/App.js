import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import { Link, Element } from 'react-scroll';
import logo from './components/Chat/img/logo_white.jpg';
import Start from './components/start/start'; // Start 컴포넌트 불러오기

function App() {
    const [showMainContent, setShowMainContent] = useState(false);
    const [isLogIn, setIsLogin] = useState(false);
    const userName = "서울"; // 동적으로 표시할 사용자 이름

    useEffect(() => {
        // 2.5초 후에 Start 컴포넌트를 숨기고 메인 콘텐츠를 표시
        const timer = setTimeout(() => {
            setShowMainContent(true);
        }, 2500); // 2.5초

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    const handleLoginSuccess = () => {
        setIsLogin(true);
    };

    return (
        <div className="App">
            {!showMainContent ? (
                <Start userName={userName} /> // userName prop 전달
            ) : (
                !isLogIn ? (
                    <Login onLoginSuccess = {handleLoginSuccess} />
                ) : (
                    <div className="head">
                        <div className="name">
                            <Link to="chat" smooth={true} duration={500} className='cursor'>
                                <img src={logo} alt="ITDA" className="logo" />
                            </Link>
                        </div>
                        <div className="body">
                            <Element id='chat'>
                                <Chat />
                            </Element>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default App;
