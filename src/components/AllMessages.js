import React from 'react'
import {subscribeCollection} from '../firebase'

const Messages = ({channel}) => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(()=>{
    let unsub= subscribeCollection(channel, setMessages);
    return unsub;
  }, [channel])

  return (
    <ul style={{marginTop: '80px'}}>
      {messages.map((msg)=>(
        <li>{`${msg.author}: ${msg.content}`}</li>
      ))}
    </ul>
  )
}

export default Messages;
