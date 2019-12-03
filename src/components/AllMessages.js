import React from 'react'
import {subscribeCollection, subscribeToChannel} from '../firebase'
import {messagesReducer} from '../reducers'



const Messages = ({channels}) => {
  const [messages, dispatch] = React.useReducer(messagesReducer, []);

  React.useEffect(()=>{
    const subscribe = async (channel) => {
      let unsub= await subscribeToChannel(channel, handleChannelChanges);
      return unsub;
    }

    channels.forEach(channel=>{
      subscribe(channel)
    })

  }, [channels]);


  const handleChannelChanges = (changes) => {
    changes.forEach(change=>{

        dispatch({
          type: change.type,
          data: {
            id: change.doc.id,
            ...change.doc.data()
          }
        })
    })
  };

  return (
    <ul style={{marginTop: '80px'}}>
      {messages.map(msg=>(
        <li>{`${msg.author}: ${msg.content}`}</li>
      ))}
    </ul>
  )
}








const MessagesWorking = ({channel}) => {
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
