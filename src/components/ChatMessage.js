import React, {useState, useEffect, useRef} from "react";

const ChatMessage =  ({ message }) => {
  const [msg, setmsg] = useState(null)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [msg]);
  useEffect(() => {
    if (message) {
      setmsg(message); // Directly set the object if asyncProp is provided
    }
}, [message]);


    return (
      <div>
        {
          msg && msg.text && (
      <div className={`chat-message ${msg.sender === "bot" ? "left" : "right"}`}>
        <p className="message">
          <strong>{msg.sender === "bot" ? "Competiscan Chatbot:" : "You:"}</strong> {msg.text}

        </p>
        <div ref={messagesEndRef} />

      </div>
      )
    }
      </div>
    );
  };
  
  export default ChatMessage;
  