import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { BsChatRightDots } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "../chatbot/MessageParser";
import config from "../chatbot/config";
import ActionProvider from "../chatbot/ActionProvider";

const Root = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <>
      <Navbar />
      <Outlet />
      {showChatbot && (
        <div className="absolute right-0 bottom-0">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          ></Chatbot>
        </div>
      )}
      <div className="fixed bottom-4 right-4">
        <BsChatRightDots size={75} onClick={toggleChatbot} />
      </div>
    </>
  );
};

export default Root;
