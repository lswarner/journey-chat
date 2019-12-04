import React from 'react'
import { useLocation } from 'react-router-dom'
import {
  Container,
  Grid,
  Rail,
  Segment,
  Button,
  Sticky,
  Ref
} from 'semantic-ui-react'
import {subscribeToChannel} from '../firebase'
import {parseRoomsFromQueryString, randomColor} from '../utils'
import {messagesReducer, channelsReducer, channelTypes} from '../reducers'
import Messages from './Messages'
import ComposeMessage from './ComposeMessage'
import ChatControls from './ChatControls'

const peopleData= {
  'luke': {name:'Luke Warner', avatar: 'https://randomuser.me/api/portraits/men/11.jpg'},
  'christina': {name:'Christina Vernon', avatar: 'https://randomuser.me/api/portraits/women/82.jpg'},
  'jordan': {name:'Jordan Warner', avatar: 'https://randomuser.me/api/portraits/men/81.jpg'},
  'martin': {name: 'Martin'},
  'link': {name: 'Link', avatar:'https://avatarfiles.alphacoders.com/103/thumb-103373.png'},
  'zelda': {name: 'Zelda', avatar: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6203/6203028_sd.jpg'},
  'samus': {name: 'Samus Aran', avatar: 'https://vignette.wikia.nocookie.net/nintendo/images/0/09/Super_Smash_Bros._Ultimate_-_Character_Art_-_Samus.png/revision/latest?cb=20190710193153&path-prefix=en'},
  'pikachu': {name: 'Pikachu', avatar: 'https://giantbomb1.cbsistatic.com/uploads/scale_medium/0/6087/2437349-pikachu.png'},
  'mario': {name: 'Mario', avatar: 'https://pm1.narvii.com/7257/6cdddc3631bf9749b9380f628dd338c7eb9b6dccr1-512-513v2_hq.jpg'}
}

const channelData= {
  'demo': {color: 'green'},
  'test': {color: 'red'},
  'football' : {color: 'blue'},
};

const Chat = (props) => {
  const [messages, dispatchMessages] = React.useReducer(messagesReducer, {});
  const [channels, dispatchChannels]= React.useReducer(channelsReducer, {});
  let location = useLocation(); //the query string is in location.search
  const contextRef= React.useRef(null);


  React.useEffect(()=>{

    const queryValues= parseRoomsFromQueryString(location.search);

    if(queryValues.length === 0){
      console.log('create a random chat room')
    }

    try{
      //request to subscribe to each channel.
      queryValues.forEach((ch)=>{
        joinChannel(ch);
      })
    }
    catch(error){
      console.error('An error occurred while attempting to subscribe to a channel.', error);
    }

  },[location])




  const joinChannel = async (channel) => {
    try{

      let unsub= await subscribeToChannel(channel, handleChannelChanges);


      dispatchChannels({
        type: channelTypes.subscribe,
        data: {
          channel,
          unsub, //store the unsubscribe callback for when we leave this channel
          color: randomColor()
        }
      });

    }
    catch(error){
      console.error(`There was a problem subscribing to ${channel}: `, error)
    }

  }

  const leaveChannel = async (channel) => {
    try{

      //first, call the unsubscribe callback to stop listening
      await channels[channel].unsub();

      //then dispatch an action to remove the channel from our state
      dispatchChannels({
        type: channelTypes.unsubscribe,
        data: {
          channel
        }
      })
    }
    catch(error){
      console.error(`There was a problem unsubscribing from ${channel}: `, error)
    }
  }

  /*
   * handleChannelChanges is the callback which received new messages
   *    and dispatches an action to update our local state with useReducer.
   */
  const handleChannelChanges = (changes) => {
    changes.forEach(change=>{
        let messageData= change.doc.data();

        dispatchMessages({
          type: change.type, //pass along the Firestore action type
          data: {
            id: change.doc.id,            //include the message's id...
            content: messageData.content, //... and the rest of the message data
            timestamp: messageData.timestamp,
            author: {
              id: messageData.author,
              name: peopleData[messageData.author].name,
              avatar: peopleData[messageData.author].avatar,
            },
            channel: {
              id: messageData.channel,
              //color: channelData[messageData.channel].color
            }
          }
        })
    })
  };


  const handleCreateChannel = () =>{
    console.log(`creating new channel`)
  }


  return (
    <>
      <Grid centered columns={2}>
        <Grid.Column>

          <Ref innerRef={contextRef}>
            <Container style={styles.wrapper}>


              <Messages messages={messages} />

              <ComposeMessage
                channels={channels}
                people={peopleData}
              />

              <Rail position="left">
                <Sticky context={contextRef} offset={100}>

                  <ChatControls
                    channels={channels}
                    onJoinChannel={joinChannel}
                    onLeaveChannel={leaveChannel}
                    onCreateChannel={handleCreateChannel}
                  />

                </Sticky>
              </Rail>

            </Container>
          </Ref>


        </Grid.Column>
      </Grid>


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

  }
}
export default React.memo(Chat);
