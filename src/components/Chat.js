import React from 'react'
import {
  Segment,
  Button,
  Container
} from 'semantic-ui-react'

import Message from './Message'
import ComposeMessage from './ComposeMessage'
import {subscribeToChannel} from '../firebase'
import {messagesReducer} from '../reducers'

const people= {
  'luke': {name:'Luke Warner', avatar: 'https://randomuser.me/api/portraits/men/11.jpg'},
  'christina': {name:'Christina Vernon', avatar: 'https://randomuser.me/api/portraits/women/82.jpg'},
  'jordan': {name:'Jordan Warner', avatar: 'https://randomuser.me/api/portraits/men/81.jpg'},
  'martin': {name: 'Martin'}
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

const Chat = ({channels}) => {
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
    <>
      <Container vertical style={styles.wrapper}>
        <h1 style={styles.title}>{channels.join(', ')} channel</h1>
        {messages.length === 0
          ? <p>This channel is empty</p>
          : messages.map((message, i)=>(
            <Message
              content={message.content}
              key={i}
              color={message.channel === 'demo' ? 'green' : 'blue'}
              author={people[message.author].name}
            />
          ))}

        <ComposeMessage />
      </Container>
    </>
  )
}

const styles= {
  title: {
    fontSize: '24px',
  },
  wrapper: {
    marginTop: '60px',
    marginLeft: '10%',
    marginRight: '30%',

    width: '800px'
  }
}
export default React.memo(Chat);
