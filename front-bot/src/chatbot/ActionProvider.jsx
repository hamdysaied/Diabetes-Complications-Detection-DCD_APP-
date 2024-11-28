import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const reply = useMutation({
    mutationKey: ["bot reply"],
    mutationFn: async (message) => {
      const response = await axios.post("http://localhost:5000/users/chat", {
        message: message,
      });
      const botMessage = createChatBotMessage(response.data.response);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
      return botMessage;
    },
  });
  const handleMessage = (message) => {
    reply.mutate(message);
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { handleMessage },
        });
      })}
    </div>
  );
};

export default ActionProvider;
