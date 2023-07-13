import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined,
} from '@mui/icons-material';
import MoreVert from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import axios from '../../axios';
import Pusher from 'pusher-js';
import Message from '../Message/Message';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();

  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data);
      const scroll =
        messageRef.current.scrollHeight - messageRef.current.clientHeight;
      messageRef.current.scrollTo(0, scroll);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('fec9ac8009413c4c0ce9', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
      const scroll =
        messageRef.current.scrollHeight - messageRef.current.clientHeight;
      messageRef.current.scrollTo(0, scroll);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios
      .post('/messages/new', {
        message: input,
        name: 'Name 3',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        received: false,
      })
      .then(() => {
        setInput('');
        // if (messageRef.current) {
        //   messageRef.current.scrollIntoView({
        //     block: 'end',
        //   });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
    //divRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at {currentTime}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* Chat messages can also be a component!!!!! */}
      <div className="chat__body" ref={messageRef}>
        {messages.map((message, i) => (
          <Message message={message} key={++i} />
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}
