import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      console.log(chat.data.messages);

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loads, the socket connection is made and joinChat event is emitted.
    // socket.emit — the method name itself, for sending an event -- Fixed (built into Socket.io, you cannot rename these)
    socket.emit("joinChat", {
      // Customised name joinChat
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // socket.on("eventName", callback) is fixed — that's the Socket.io API
    // socket.on — the method name itself, for listening to an event. Customised name messageReceived.
    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    // clean up function whenever the chat component unmounts
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      // Customised name sendMessage
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="flex flex-col mx-auto w-3/4 h-[70vh] m-5 border border-gray-600">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className={"chat-image avatar"}>
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
