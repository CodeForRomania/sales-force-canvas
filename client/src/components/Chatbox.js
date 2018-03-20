import React from 'react'

import './Chatbox.css'

const Chatbox = ({ message, me }) => (
  <div className={`chat-box ${message.from === me ? 'me' : ''}`}>
    <div className="chat-message">
      <p>{message.content}</p>
      <h5>{message.from}</h5>
    </div>
  </div>
)

export default Chatbox
