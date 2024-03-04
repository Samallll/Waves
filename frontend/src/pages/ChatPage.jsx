import React, { useEffect, useState, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axiosHelper from "../utils/axiosHelper";
import '../scrollbarStyles.css'
import { useSelector } from "react-redux";

const ChatPage = () => {

  const [chatRooms,setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [draftMessage,setDraftMessage] = useState("");
  const loggedUser = useSelector((state) => state.auth.loggedUser)
  const messagesEndRef = useRef(null);

  const chatServiceURI = import.meta.env.VITE_CHAT_SERVICE_BASE_URI

  const stompClientRef = useRef(null);

  useEffect(()=>{
    getAllChatRoomsForUser();
    return ()=>{
      onLogout();
    }
  },[])

  useEffect(()=>{
    if(selectedChatRoom){
      fetchAndDisplayGroupChat();
    }
  },[selectedChatRoom])

  useEffect(() => {
    if (messagesEndRef.current) {
       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
   }, [messages]);     

  const getAllChatRoomsForUser = () => {
    const userId = loggedUser.userId; 
    axiosHelper.get(`${chatServiceURI}/chat-rooms/${userId}`)
        .then(response => {
            const data = response.data;
            setChatRooms(data);
            connectAndSubscribe(data);
        })
        .catch(error => {
            console.error("Error fetching chat rooms:", error);
        });
  };

  const connectAndSubscribe = (chatRooms) => {
      if (chatRooms.length > 0) {
          let Sock = new SockJS(`${chatServiceURI}/ws`);
          stompClientRef.current = over(Sock);
          stompClientRef.current.connect({}, ()=>onConnected(chatRooms), onError);
      } else {
          console.error("No chat rooms to subscribe to.");
      }
  };

  const onConnected = (chatRooms) => {
      chatRooms.forEach(chatRoom => {
          const eventId = chatRoom.eventId;
          stompClientRef.current.subscribe(
              `/topic/event/${eventId}`,
              onMessageReceived
          );
      });
  };

  const onError = () => {
      setError(
        "Could not connect to WebSocket server. Please refresh this page to try again!"
      );
  };

  const onMessageReceived = async (payload) => {
    const message = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
    
  };

  const onLogout = () => {
    if (stompClientRef.current) {
      stompClientRef.current.disconnect();
      stompClientRef.current = null;
      setMessages([])
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (draftMessage && stompClientRef.current) {
      const chatMessage = {
          chatId: selectedChatRoom.chatId,
          eventId: selectedChatRoom.eventId,
          eventName: selectedChatRoom.eventName,
          userId: loggedUser.userId,
          fullName: loggedUser.fullName,
          content: draftMessage,
          timestamp: new Date()
      };
      stompClientRef.current.send(`/app/event/${selectedChatRoom.eventId}`, {}, JSON.stringify(chatMessage));
    }
    setDraftMessage("")
  };

  const fetchAndDisplayGroupChat = async () => {
    const response = await axiosHelper.get(
      `${chatServiceURI}/messages/${selectedChatRoom.eventId}/${selectedChatRoom.eventName}`
    );
    const data = response.data;
    setMessages(data);
  };

  const handleListItemClick = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  return (
    <>
      <div className='min-h-screen flex bg-gray-900 flex-col md:flex-row p-16 mt-5'>
        <div className='bg-blue-600 md:w-1/4 p-4 rounded-xl md:mx-2 my-2 sm:mx-0 sm:my-0 '>
          <div className='text-2xl text-center ps-3 text-white my-1 font-medium'>Your Groups</div>
          <ul className='text-md text-white rounded-lg overflow-auto h-4/6 custom-scrollbar'>
            {chatRooms && chatRooms.map((chatRoom, index) => (
              <li
                key={index}
                className={`py-2 my-2 pl-4 border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition duration-300 rounded truncate border-b-2 border-b-slate-700`}
                onClick={() => handleListItemClick(chatRoom)}
              >
                {chatRoom.eventName}
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-white md:w-3/4 p-4 relative rounded-xl'>
          {
            selectedChatRoom && 
            <div className='text-xl font-medium mb-5 bg-blue-500 py-3 ps-5 border shadow-md rounded-lg truncate'>{selectedChatRoom.eventName}</div>
          }
            <div className='h-96 mx-4 overflow-y-auto custom-scrollbar' style={{ direction: 'ltr', textAlign: 'start' }}>
            {
                messages?.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={msg.timestamp}
                      className={`${msg.fullName === loggedUser.fullName ? 'text-right mr-4' : 'text-left'} mb-2`}
                    >
                      {
                        msg.fullName !== loggedUser.fullName ? <div className='mb-1 text-sm font-semibold text-gray-900'>{msg.fullName}</div> : null
                      }
                      <div className='bg-blue-100 border-gray-300 rounded-lg py-2 px-3 inline-block text-left'>
                        {msg.content}
                      </div>
                    </div>
                  ))
                ) :
                (
                  <div className="flex justify-center items-center h-full text-center text-lg">
                      <p>Start a new conversation</p>
                    </div>
                )
            }
            <div ref={messagesEndRef} />
          </div>
          {
            selectedChatRoom?.writeAccess && 
            <div className='absolute bottom-4 left-0 w-full px-8'>
              <form className='flex items-center' onSubmit={sendMessage}>
                <input
                  type='text'
                  value={draftMessage}
                  onChange={(e)=>setDraftMessage(e.target.value)}
                  className='flex-grow border rounded-md py-2 px-4 mr-2 bg-slate-600 text-white'
                  placeholder='Type your message...'
                />
                <button
                  className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800'
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default ChatPage;
