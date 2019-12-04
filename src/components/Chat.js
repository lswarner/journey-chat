import React from 'react'
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
import {messagesReducer, channelsReducer, channelTypes} from '../reducers'
import Messages from './Messages'
import ComposeMessage from './ComposeMessage'
import ChatControls from './ChatControls'

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

const Chat = (props) => {
  const [messages, dispatchMessages] = React.useReducer(messagesReducer, {});
  const [channels, dispatchChannels]= React.useReducer(channelsReducer, {});


  const contextRef= React.useRef(null);
  let unsubscribers= React.useRef({});

  /*
   * useEffect runs on initial render and when/if channels are changed.
   * This will get pre-existing messages and start listening for new messages on each channel.
   * Whenever a new message is posted to a channel, it calls handleChannelChanges
   *    with the new message data.
   */
  /*
  React.useEffect(()=>{
    //begin listening to each channel
    channels.forEach(channel=>{
      subscribeToChannel(channel)
    })

    //when the component unmounts, this function is called to clean up
    //  by unsubscribing from all the firestore updates we listened to
    return ()=> {
      Object.values(unsubscribers).forEach((ch)=>{
        ch.unsub()
      });
    }

  }, [channels]);
  */


  const subscribeToChannel = async (channel) => {
    try{

      //let unsub= await subscribeToChannel(channel, handleChannelChanges);


      //unsubscribers[channel]= { //store this unsubscribe callback- channel: {'unsub': unsubCallBack()}
      //  unsub
      //};


      console.log('setting channel state with: ', channel)
      console.log('previous channels', channels)

      dispatchChannels({
        type: channelTypes.subscribe,
        data: {
          channel
        }
      });

      //setChannels({
      //  ...channels,
      //  channel
      //})
    }
    catch(error){
      console.error(`There was a problem subscribing to ${channel}: `, error)
    }

  }

  const unsubscribeFromChannel = async (channel) => {
    try{
      //await unsubscribers[channel].unsub();

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


  const handleJoinChannel = (channel) =>{
    console.log(`joining ${channel}`);
    subscribeToChannel(channel);
  }

  const handleLeaveChannel = (channel) =>{
    console.log(`leaving ${channel}`)

    unsubscribeFromChannel(channel);
  }

  const handleCreateChannel = () =>{
    console.log(`creating new channel`)
  }


  return (
    <>
      <Grid centered columns={2}>
        <Grid.Column>

          <Ref innerRef={contextRef}>
            <Container style={styles.wrapper}>
              <h1 style={styles.title}>{Object.keys(channels).join(', ')} channel</h1>

              <Messages messages={messages} />

              <ComposeMessage
                channels={channels}
              />

              <Rail position="left">
                <Sticky context={contextRef} offset={100}>

                  <ChatControls
                    channels={channels}
                    onJoinChannel={handleJoinChannel}
                    onLeaveChannel={handleLeaveChannel}
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
