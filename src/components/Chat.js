import React from 'react'
import {
  Container
} from 'semantic-ui-react'
import {subscribeToChannel} from '../firebase'
import {messagesReducer} from '../reducers'
import Messages from './Messages'
import ComposeMessage from './ComposeMessage'

const peopleData= {
  'luke': {name:'Luke Warner', avatar: 'https://randomuser.me/api/portraits/men/11.jpg'},
  'christina': {name:'Christina Vernon', avatar: 'https://randomuser.me/api/portraits/women/82.jpg'},
  'jordan': {name:'Jordan Warner', avatar: 'https://randomuser.me/api/portraits/men/81.jpg'},
  'martin': {name: 'Martin'}
}

const channelData= {
  'demo': {color: 'green'},
  'test': {color: 'red'},
  'football' : {color: 'blue'},
};

const Chat = ({channels}) => {
  const [messages, dispatch] = React.useReducer(messagesReducer, {});

  /*
   * useEffect runs on initial render and when/if channels are changed.
   * This will get pre-existing messages and start listening for new messages on each channel.
   * Whenever a new message is posted to a channel, it calls handleChannelChanges
   *    with the new message data.
   */
  React.useEffect(()=>{
    let unsubscribers= [];

    const subscribe = async (channel) => {
      let unsub= await subscribeToChannel(channel, handleChannelChanges);
      unsubscribers.push(unsub); //store this unsubscribe callback
    }

    //begin listening to each channel
    channels.forEach(channel=>{
      subscribe(channel)
    })

    //when the component unmounts, this function is called to clean up
    //  by unsubscribing from all the firestore updates we listened to
    return ()=> {
      unsubscribers.forEach(unsub=>unsub());
    }

  }, [channels]);


  /*
   * handleChannelChanges is the callback which received new messages
   *    and dispatches an action to update our local state with useReducer.
   */
  const handleChannelChanges = (changes) => {
    changes.forEach(change=>{
        let messageData= change.doc.data();

        dispatch({
          type: change.type, //pass along the Firestore action type
          data: {
            id: change.doc.id,   //include the message's id...
            content: messageData.content, //... and the rest of the message data
            timestamp: messageData.timestamp,
            author: {
              id: messageData.author,
              name: peopleData[messageData.author].name
            },
            channel: {
              id: messageData.channel,
              color: channelData[messageData.channel].color
            }
          }
        })
    })
  };




  return (
    <>

      <Container style={styles.wrapper}>
        <h1 style={styles.title}>{channels.join(', ')} channel</h1>

        <Messages messages={messages} />

        <ComposeMessage
          channels={channels}
        />

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

    width: '600px',
  }
}
export default React.memo(Chat);
