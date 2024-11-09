import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Chat.css";
import botProfile from './img/logo_smile_2.png';
import btnPointer from './img/btn_pointer.png';
import {v4 as uuidv4} from "uuid";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [howAnimation, setShowAnimation] = useState(false);
    const [clickedMessage, setClickedMessage] = useState(null);
    const [isChatShrinking, setIsChatShrinking] = useState(false);
    const messageBoxRef = useRef(null);

    useEffect(() => {
        if(messageBoxRef.current){
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === "") return;

        // 사용자 입력 메시지를 추가
        setMessages([...messages, {type: 'user', text: input}]);

        // API 요청 보내기
        try {
            const chatServerUrl = process.env.REACT_APP_CHAT_SERVER_URL;
            const response = await axios.post(`${chatServerUrl}/chat`, {
            name: uuidv4(),
            query: input,
            });

            // 서버 응답을 messages 상태에 추가
            setMessages((prevMessages) => [...prevMessages, {type: 'bot', text: response.data.responses[0].text},
            ]); // 서버에서 응답 메시지를 response.data.reply로 가정합니다.
        }
        catch (error) {
            console.error("메시지 전송 오류:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {type: 'bot', text: "Error: 메시지 전송 실패"},
            ]);
        }

        // 입력 필드 비우기
        setInput("");

        // 애니메이션 시작
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 2490);
    };

    const handleShowModal = (msgType) => {
        if(msgType === 'bot'){
            setClickedMessage(msgType);
            setShowModal((prevShowModal) => {
                const newShowModal = !prevShowModal;

                if(!newShowModal){
                    setIsChatShrinking(false);
                }
                else{
                    setIsChatShrinking(true);
                }
                return newShowModal;
            });
        }
    };

    return (
        <div className = {`chat-wrapper`}>
            <div className = {`chat-container ${isChatShrinking ? 'shrink' : ''}`}>
                <div className="message-box" ref = {messageBoxRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.type}`}
                            onClick={() => handleShowModal(msg.type)}
                        >
                        {msg.type === 'user' ? (
                            <div className = "user-message">
                                <div className = "message-text">{msg.text}</div>  
                            </div>
                        ) : (
                            <div className = "message-bot">
                                <img src = {botProfile} alt = "Bot Profile" className = "bot-profile" />
                                <div className = "bot-message">
                                    {msg.text}
                                </div>
                            </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="메시지를 입력하세요."
                    />
                    <button onClick={handleSend} className="send-button">
                        <img
                            src = {btnPointer}
                            alt = "Button Pointer"
                            style = {{
                                maxWidth: '20px',
                                maxHeight: '20px',
                                objectFit: 'contain'
                            }}
                        />
                    </button>
                </div>
            </div>
            {showModal && clickedMessage === 'bot' && (
                <div className = {`modal-container expand`} onClick = {() => setShowModal(false)}>
                    <div className = "modal">
                        <p>Modal Content</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;