import React, { useEffect,useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages,setMessages]=useState([]);

  useEffect(() => {
    axios.get('/message/sync')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Axios error:', error);
      });
  }, []);
  
  useEffect(() => {
    var pusher = new Pusher('720d8d06d43bf6d86018', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages,newMessage])
    });
    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;

