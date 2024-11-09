import {useState} from 'react';
import {Player} from '@lottiefiles/react-lottie-player';
import './Chat.css';
import animationData from './animation1.json';

function Chat(){
    const[messages, setMessages] = useState([]);
    const[input, setInput] = useState('');
    const[showAnimation, setShowAnimation] = useState(false);
    const[showModal, setShowModal] = useState(false);

    const handleSend = () => {
        if(input.trim() === '') return;

        setMessages([...messages, input]);
        setInput('');
        
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 2490);
    };

    const handleShowModal = () => {
        setShowModal(prevState => !prevState);
    };

    return(
        <div className = "chat-wrapper">
            <div className = "chat-container">
                <h2>Chat</h2>   
                {showAnimation && (
                    <div className = "animation">
                        <Player 
                            autoplay
                            loop = {false}
                            src = {animationData}
                            style = {{height: '100px', width: '100px'}}
                        />
                    </div>
                )} 
                <div className = "message-box">
                    {messages.map((msg, index) => (
                        <div
                            key = {index}
                            className = "message"
                            onClick = {handleShowModal}
                        >
                            {msg}
                        </div>
                    ))}
                </div>
                <div className = "input-box">
                    <input
                        type = "text"
                        value = {input}
                        onChange = {(e) => setInput(e.target.value)}
                        placeholder = "메시지를 입력하세요."
                    />
                    <button onClick = {handleSend} className = "send-button">📩</button>
                </div>
            </div>

            {showModal && (
                <div className = "modal">
                    <p>Modal Content</p>
                    <button onClick = {handleShowModal}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Chat;