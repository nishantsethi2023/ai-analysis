import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import InputField from "./InputField";
import {socketurl} from "../config/index"
import { Bars } from "react-loader-spinner";
const ChatBot = ({ devURL }) => {
  const [summary, setSummary] = useState("");
  const [userChat, setUserChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = "332132"; // Replace with your user ID
  const productId = "128"; // Replace with your product ID
  const socket = useRef(null);

  useEffect(() => {
    setLoading(true);
    socket.current = new WebSocket(
      `${socketurl}/${userId}/${productId}`
    );
    socket.current.onopen = function (event) {
      // console.log("opened now", event);
    };
    socket.current.onmessage = function (event) {
      // console.log(12, event.data);
      let obj = JSON.parse(event.data);
      let parseobj = {}
      let temp = [];
      // console.log(typeof obj)
      if(typeof obj === "string"){
        parseobj = JSON.parse(obj);
        temp.push({ text: parseobj.answer, sender: "bot" });
        // temp.push({ text: parseobj.question, sender: "You" });
        // console.log(temp, "temp")
        setMessages((prevMessages) => [...prevMessages, ...temp]);
        setLoading(false);
      } else {
        temp.push({ text: obj.answer, sender: "bot" });
        temp.push({ text: obj.question, sender: "You" });
        // console.log(temp, "temp")
        setMessages((prevMessages) => [...prevMessages, ...temp]);
        setLoading(false);
      }

    };

    socket.current.onerror = function (error) {
      // console.log("opened", error);
    };

    // socket.current.onclose = function (event) {
    //   console.log("close", event);
    // };
  }, []);

  // const segragationMessages = (data) => {

  // }
  useEffect(() => {
    const fetchSummary = async () => {
      const response = await fetch(`${devURL}summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "32132", product_id: 128 }),
      });
      const result = await response.json();
      setSummary(result[0].message);
    };
    fetchSummary();
  }, [devURL]);

  
  const sendMessage = async () => {
    if (userChat.trim() === "") return;
    const newMessage = { text: userChat, sender: "You" };
    setMessages((prev) => [...prev, newMessage]);
    // setLoading(true);
    botResponseAPI();
  };

  const botResponseAPI = () => {
  
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(userChat); // Send message if WebSocket is open
      console.log("Message sent:", userChat);
    } else {
      console.log("WebSocket is not open yet.");
    }

    socket.onerror = function (error) {};

    socket.onclose = function (event) {};
  };
  return (
    <div className="chatbot">
      <div className="summary">
        <h3>Summary</h3>
        <p>{summary}</p>
      </div>
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {loading && (
            <div className="spinner-overlay">
              <Bars height={30} width={30} color="#0086ed" visible={true} />
            </div>
          )}
        </div>
        <InputField
          userChat={userChat}
          setUserChat={setUserChat}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatBot;
