import React from 'react'
import Message from './Message'


const Messages = ({messages}) => {
  const afterMessagesRef= React.useRef(null)

  const scrollToBottom = () => {
    afterMessagesRef.current.scrollIntoView({behavior: "smooth"})
  }

  React.useEffect(()=>{
    scrollToBottom()
  }, [messages])

  return (
    <div >
      <div>
        {messages === {}
          ? <p>This channel is empty</p>
          : Object.values(messages).map((message)=>(
            <Message
              content={message.content}
              key={message.id}
              channel={message.channel.id}
              avatar={message.author.avatar}
              color={message.channel.color}
              author={message.author.name}
              timestamp={message.timestamp}
            />
          ))}
      </div>
      <div style={{float: "left", clear: "both", height:'140px'}} ref={afterMessagesRef}>
      </div>
    </div>
  )

}

const styles= {
  messagesContainer: {
    height: '80vh'
  }
}

export default Messages;
