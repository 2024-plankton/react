import axios from "axios";

const sendMessage = async () => {
  try {
    const chatServerUrl = process.env.REACT_APP_CHAT_SERVER_URL;

    const response = await axios.post(`${chatServerUrl}/chat`, {
      name: "John",
      query: "조용한 분위기면 좋을 것 같아.",
    });

    console.log("응답 데이터:", response.data);
  } catch (error) {
    console.error("오류 발생:", error);
  }
};

export default sendMessage;
