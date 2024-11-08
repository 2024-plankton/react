import {useState} from 'react';
import './Chat.css';

function Chat(){
    const[messages, setMessages] = useState([]);
    const[input, setInput] = useState('');

    const handleSend = () => {
        if(input.trim() === '') return;

        setMessages([...messages, input]);
        setInput('');
    };

    return(
        <div className = "chat-body">
            <div className = "chat-container">
                <h2>Chat</h2>
                <div className = "message-box">
                    {messages.map((msg, index) => (
                        <div key = {index} className = "message">
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
                    <button onClick = {handleSend}>📩</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;