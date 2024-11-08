import ChatBot from "./components/ChatBot";
import pdf from "./assets/openpdf.jpg";
import { devURL } from "./config/index.js";
import "./App.css"
const App = () => {

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center sweet-loading">
      <div className="row pdf-box" style={{ width: "100%" }}>
        <div className="col-5">
          <div className="big-box border text-center">
            <img src={pdf} alt="HappyFace" style={{ width: "100%", height: "px" }} />
          </div>
        </div>
        <div className="col-7 small-box-parent">
          <ChatBot devURL={devURL} />
        </div>
      </div>
    </div>
  );
};

export default App;
