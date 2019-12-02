import React from 'react'
import Message from './Message'


const Message = (props) => {

  return (
    {props.messages.length === 0
      ? <p>This channel is empty</p>
      : messages.map((message, i)=>(
        <Message
          content={message.content}
          key={i}
          color={message.color}
          author={people[message.author].name}
          avatar={people[message.author].avatar}
        />
      ))}
  )
}
