import { useState } from "react";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import "./Chat.css";
import animationData from "./animation1.json";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // 사용자 입력 메시지를 추가
    setMessages([...messages, input]);

    // API 요청 보내기
    try {
      const chatServerUrl = process.env.REACT_APP_CHAT_SERVER_URL;
      const response = await axios.post(`${chatServerUrl}/chat`, {
        name: "John",
        query: input,
      });

      // 서버 응답을 messages 상태에 추가
      setMessages((prevMessages) => [...prevMessages, response.data.reply]); // 서버에서 응답 메시지를 response.data.reply로 가정합니다.
    } catch (error) {
      console.error("메시지 전송 오류:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        "Error: 메시지 전송 실패",
      ]);
    }

    // 입력 필드 비우기
    setInput("");

    // 애니메이션 시작
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2490);
  };

  const handleShowModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        {showAnimation && (
          <div className="animation">
            <Player
              autoplay
              loop={false}
              src={animationData}
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        )}
        <div className="message-box">
          {messages.map((msg, index) => (
            <div key={index} className="message" onClick={handleShowModal}>
              {msg}
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
            📩
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={handleShowModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Chat;
