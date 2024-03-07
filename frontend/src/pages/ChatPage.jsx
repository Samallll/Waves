import React, { useEffect, useState, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axiosHelper from "../utils/axiosHelper";
import '../scrollbarStyles.css'
import { useSelector } from "react-redux";
import { chatTimeStampConverter } from "../utils/converter";
import ModalImage from 'react-modal-image';

const ChatPage = () => {

  const [chatRooms,setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [draftMessage,setDraftMessage] = useState("");
  const loggedUser = useSelector((state) => state.auth.loggedUser)
  const messagesEndRef = useRef(null);

  const chatServiceURI = import.meta.env.VITE_CHAT_SERVICE_BASE_URI
  const fileInputRef = useRef(null);
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
    publishMessage(draftMessage,"text")
  };

  const publishMessage = (message,type) => {
    if (message && stompClientRef.current) {
      const chatMessage = {
          chatId: selectedChatRoom.chatId,
          eventId: selectedChatRoom.eventId,
          eventName: selectedChatRoom.eventName,
          userId: loggedUser.userId,
          fullName: loggedUser.fullName,
          content: message,
          timestamp: new Date(),
          type:type
      };
      stompClientRef.current.send(`/app/event/${selectedChatRoom.eventId}`, {}, JSON.stringify(chatMessage));
    }
    setDraftMessage("")
  }

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

  const triggerFileSelect = () => {
      fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      setError("Please select a valid image");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);  

    axiosHelper.post(`${chatServiceURI}/send-picture`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log("Image URL:", response.data);
        publishMessage(response.data,"image")
    })
    .catch(error => {
        console.error("There has been a problem with your Axios operation:", error);
    });
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
            <div className='text-xl text-gray-100 font-medium mb-5 bg-blue-700 py-3 ps-5 border shadow-md rounded-lg truncate'>{selectedChatRoom.eventName}</div>
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
                      {
                        msg?.type !== "text" ?
                        <div className="'bg-blue-100 border border-gray-300 rounded-lg py-2 px-3 inline-block text-left max-w-[25vw] lg:max-w-[20vw]">
                          <ModalImage
                              small={`${chatServiceURI}/get-picture/${msg.content}`}
                              large={`${chatServiceURI}/get-picture/${msg.content}`}
                              alt="Chat Image"
                          />
                        </div>
                        :
                        <div className='bg-blue-100 border-gray-300 rounded-lg py-2 px-3 inline-block text-left'>
                          {msg.content}
                        </div>                         
                      }

                        {/* <div className='bg-blue-100 border-gray-300 rounded-lg py-2 px-3 inline-block text-left'>
                          {msg.content}
                        </div>  */}

                      <div className="mt-1">
                        <p className="text-xs">{chatTimeStampConverter(msg.timestamp)}</p>
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
            selectedChatRoom?.writeAccess ? 
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
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  accept="image/png, image/jpeg, image/gif, image/svg+xml, image/jpg"
                />
                
                <button
                  className="ml-2 flex items-center gap-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  onClick={triggerFileSelect}
                >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.4 9.6a1 1 0 0 0-1.8 0l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .9-1.4l-2-4a1 1 0 0 0-1.7-.2l-.5.7-1.3-2.5ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd"/>
                  </svg>
                </button>
              </form>
            </div>
            :
            selectedChatRoom !== "" &&
            <div className="absolute bottom-4 left-0 w-full px-8 pb-5 text-center text-lg">
              <p>Event has been cancelled/expired</p>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default ChatPage;
