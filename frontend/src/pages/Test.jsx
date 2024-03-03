import React, { useEffect, useState, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axiosHelper from "../utils/axiosHelper";
import '../scrollbarStyles.css'

const Test = () => {

  const [chatRooms,setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [draftMessage,setDraftMessage] = useState("");

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

    
  const getAllChatRoomsForUser = () => {
    const userId = 9; 
    axiosHelper.get(`http://localhost:8080/chat-rooms/${userId}`)
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
          let Sock = new SockJS("http://localhost:8080/ws");
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
          userId: 9,
          fullName: "test2",
          content: draftMessage,
          timestamp: new Date()
      };
      stompClientRef.current.send(`/app/event/${selectedChatRoom.eventId}`, {}, JSON.stringify(chatMessage));
    }
    setDraftMessage("")
  };

  const fetchAndDisplayGroupChat = async () => {
    const response = await axiosHelper.get(
      `http://localhost:8080/messages/${selectedChatRoom.eventId}/${selectedChatRoom.eventName}`
    );
    const data = response.data;
    setMessages(data);
  };

  const handleListItemClick = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  return (
    <>
      <div className='min-h-screen flex bg-gray-900 flex-col md:flex-row p-16 mt-8'>
        <div className='bg-blue-600 md:w-1/4 p-4 rounded-xl md:mx-2 my-2 sm:mx-0 sm:my-0 '>
          <div className='text-2xl text-start ps-3 text-white mb-4'>Your Groups</div>
          <ul className='text-lg text-white rounded-lg overflow-auto h-4/6 custom-scrollbar'>
            {chatRooms && chatRooms.map((chatRoom, index) => (
              <li
                key={index}
                className={`py-2 my-2 pl-4 border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition duration-300 rounded truncate`}
                onClick={() => handleListItemClick(chatRoom)}
              >
                {chatRoom.eventName}
              </li>
            ))}
          </ul>
          <button className='text-center mt-4 bg-white text-blue-600 py-2 px-4 rounded-md w-full' onClick={onLogout}>
            Disconnect
          </button>
        </div>
        <div className='bg-white md:w-3/4 p-4 relative rounded-xl'>
          <div className='text-xl mb-4 bg-blue-200 py-2 ps-5 border shadow-md rounded-lg truncate'>Event Name</div>
          <div className='h-96 overflow-y-auto custom-scrollbar' style={{ direction: 'ltr', textAlign: 'start' }}>
            {
              messages?.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.timestamp}
                    className={`${msg.fullName === "test2" ? 'text-right' : 'text-left'} mb-2`}
                  >
                    {
                      msg.fullName !== "samal" ? <div className='text-xl font-bold mb-1'>{msg.fullName}</div> : null
                    }
                    <div className='bg-gray-200 rounded-lg p-3 inline-block text-left'>
                      {msg.content}
                    </div>
                  </div>
                ))
              ) :
              (
                <div className="flex justify-center items-center h-full text-center">
                    <p>Start a new conversation</p>
                  </div>
              )
            }
            {/* {
              Array.from(messages.entries()).map(([senderId, messagesForSender]) => (
                <div key={senderId}>
                  {messagesForSender.map((msg) => (
                    <div
                      key={msg.timestamp}
                      className={`${msg.senderId === userData.nickName ? 'text-right' : 'text-left'} mb-4`}
                    >
                      <div className='text-xl font-bold mb-1'>{msg.senderId}</div>
                      <div className='bg-gray-200 rounded-lg p-3 inline-block text-left'>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            } */}
          </div>
          <div className='absolute bottom-4 left-0 w-full px-8'>
            <form className='flex items-center' onSubmit={sendMessage}>
              <input
                type='text'
                value={draftMessage}
                onChange={(e)=>setDraftMessage(e.target.value)}
                className='flex-grow border rounded-md py-2 px-4 mr-2 bg-slate-300 text-black'
                placeholder='Type your message...'
              />
              <button
                className='bg-blue-600 text-white py-2 px-4 rounded-md'
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
