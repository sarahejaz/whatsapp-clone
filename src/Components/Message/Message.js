import React from 'react';
import './Message.css';

export default function Message({ message }) {
  return (
    <div>
      <p
        className={`message__received ${!message.received && 'message__sent'}`}
      >
        <span className="message__name">{message.name}</span>
        {message.message}
        <span className="message__timestamp">{message.timestamp}</span>
      </p>
    </div>
  );
}
