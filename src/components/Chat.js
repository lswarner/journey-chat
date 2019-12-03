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

const Chat = ({channels}) => {
  const [messages, dispatch] = React.useReducer(messagesReducer, {});

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
        {messages === {}
          ? <p>This channel is empty</p>
          : Object.values(messages).map((message, i)=>(
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
