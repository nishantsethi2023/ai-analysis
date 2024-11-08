const InputField = ({ userChat, setUserChat, sendMessage }) => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") sendMessage();
    };
  
    return (
      <div className="input-container">
        <input
          type="text"
          className="user-box"
          value={userChat}
          onChange={(e) => setUserChat(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button type="submit" className="submit-btn" onClick={sendMessage}>
          <i className="bi bi-arrow-up uparrowicon"></i>
        </button>
      </div>
    );
  };
  
  export default InputField;
  