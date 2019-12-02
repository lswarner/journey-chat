import React from 'react'
import {
  Segment,
  Button,
  Container
} from 'semantic-ui-react'
import Message from './Message'

const people= {
  'luke': {name:'Luke Warner', avatar: 'https://randomuser.me/api/portraits/men/11.jpg'},
  'christina': {name:'Christina Vernon', avatar: 'https://randomuser.me/api/portraits/women/82.jpg'},
  'jordan': {name:'Jordan Warner', avatar: 'https://randomuser.me/api/portraits/men/81.jpg'},

}
const data= [
  {content: 'I am a message. Check me out.', color:'purple', author: 'luke'},
  {content: 'I am another message that is a little bit longer.', color:'teal', author: 'christina'},
  {content: 'Heres a message from someone else.', color:'purple', author: 'luke'},
  {content: 'Hey', color:'red', author: 'jordan'},
  {content: 'This is going to be a much longer message and it may have typos because it is from someone who types quickly and doesnt pay attention to what they are writing or use punctuation properly.', color:'teal', author: 'christina'},
  {content: 'Huh, that is a longer one.', color:'red', author: 'jordan'},
  {content: 'Woah...', color:'purple', author: 'luke'},
  {content: '- Neo', color:'purple', author: 'luke'},

]

const Chat = (props) => {
  const [messages, setMessages]= React.useState([])

  const nextMessage= () => {
    if(data.length === 0) return;

    const m= data.shift();
    setMessages(messages.concat(m));
  }

  return (
    <>
      <Container vertical style={styles.wrapper}>
        {messages.length === 0
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

        <Button onClick={nextMessage} secondary>Post Message</Button>
      </Container>
    </>
  )
}

const styles= {
  wrapper: {
    marginTop: '60px',
    marginLeft: '10%',
    marginRight: '30%',

    width: '800px'
  }
}
export default React.memo(Chat);
