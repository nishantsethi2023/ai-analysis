import { useState, useEffect} from "react";
// import logo from "./assets/logo.png";
import "./App.css";
// import image from "./assets/pdf image.png";
import pdf from "./assets/openpdf.jpg"
import { devURL } from "./config/index.js"
// import useFetch from './utils/fetch';


function App() {
  const [summary, setSummary] = useState("")
  const [userChat, setuserChat] = useState("")
  const [sentMessage, setsentMessage] = useState("")
  // const [userMsgs, setUserMsgs] = useState([])
  // const [botMsgs, setBotMsgs] = useState([])
  const [messages, setMessages] = useState([
    { text: "Do you have any questions about this Competiscan product?", sender: "bot" },
  ]);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    
    var raw = JSON.stringify({
      "user_id": "32132",
      "product_id": 128
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const url = `${devURL}summarize`
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => setSummary(result[0].message))
      .catch(error => console.log('error', error));

}, []);


const sendMessage = async () => {
  const url = `${devURL}send-msg`

  // Create headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Prepare the request body
  const raw = JSON.stringify({
    user_id: "32132",
    product_id: 128,
    query: userChat,
  });

  // Set up request options
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    // Send the request
    const response = await fetch(url, requestOptions);

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const result = await response.json();
    console.log(result[0], "result");
    if(result[1] === 200){
      setsentMessage("Message is sent")
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const handleSendMessage = () => {
  if (userChat.trim() !== '') {
    setMessages([...messages, { text: userChat, sender: "user" }]);
    setuserChat('');
  }
};

function submitBtnHandler(){
  handleSendMessage();
  sendMessage()
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleSendMessage();
    sendMessage();
  }
};
const userInputHandler = (e) => {
  setuserChat(e.target.value)
  // setUserMsgs((prev) => [...prev, e.target.value])
}
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="row pdf-box" style={{ width: "100%" }}>
        <div className="col-5">
          <div className="big-box border  text-center">
            {/* <img alt="image" src={image} style={{ width: "100%", height: "800px" }}
            ></img> */}
            <img src={pdf} alt="HappyFace" style={{ width: "100%", height: "px" }} />
          </div>
        </div>
        <div className="col-7 small-box-parent">
          <div className="small-box  text-center">
            <div className="summary">
              <h3>Summary</h3>
              <p>
              {summary}
              </p>
            </div>

            <div className="chatbot">
  <h3>Competiscan Chatbot</h3>
  <div className="chat-container">
    <div className="messages">
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.sender === 'bot' ? 'left' : 'right'}`}>
          <p className="message">
            <strong>{message.sender === 'bot' ? 'Competiscan Chatbot:' : 'You:'}</strong> {message.text}
          </p>
        </div>
      ))}
    </div>
    <div className="input-container">
      <input 
        type="text" 
        className="user-box" 
        value={userChat} 
        onChange={userInputHandler} 
        onKeyDown={handleKeyPress} 
      />
      <button 
        type="submit" 
        className="submit-btn" 
        onClick={submitBtnHandler}
      >
        <i className="bi bi-arrow-up uparrowicon"></i>
      </button>
    </div>
  </div>
  <p>{sentMessage}</p>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
