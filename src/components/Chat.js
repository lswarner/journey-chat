import React from 'react'
import { useLocation } from 'react-router-dom'
import {
  Container,
  Grid,
  Rail,
  Sticky,
  Ref
} from 'semantic-ui-react'
import {subscribeToChannel} from '../firebase'
import {parseRoomsFromQueryString, randomColor} from '../utils'
import {messagesReducer, channelsReducer, channelTypes} from '../reducers'
import Messages from './Messages'
import ComposeMessage from './ComposeMessage'
import ChatControls from './ChatControls'
import {peopleData} from '../utils'


const Chat = (props) => {
  const [messages, dispatchMessages] = React.useReducer(messagesReducer, {});
  const [channels, dispatchChannels]= React.useReducer(channelsReducer, {});
  let location = useLocation(); //the query string is in location.search
  const contextRef= React.useRef(null);


  /*
   * On initial render, process the query string parameters and start listening
   *   to the requested channels.
   *
   * useEffect on runs when 'location' changes - ie, the  query string changes in the browser window.
   */
  React.useEffect(()=>{
    const queryValues= parseRoomsFromQueryString(location.search);

    if(queryValues.length === 0){
      console.log('create a random chat room')
    }

    //Try to begin listening to each channel
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



/**
 * Call the API to subscribe to realtime data updates whenever a new message is posted
 *   to this channel.
 * @param  {string}  channel the id of the channel to join
 * @return {Promise}         [description]
 */
  const joinChannel = async (channel) => {
    try{

      // notify firestore that we want to listen
      let unsub= await subscribeToChannel(channel, handleChannelChanges);

      //dispatch an action to store this channel in local state
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

/**
 * Call the API to unsubscribe from this channel
 * @param  {string}  channel
 * @return {Promise}
 */
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

  /**
   * The callback provided to Firestore which is used to receive new messages.
   *    Each message dispatches an action to update our local state with useReducer.
   * @param { [Firestore.DocumentChanges] } changes An array containing all the changes made to the query we are subscribed to
   *                                                For the initial callback, these changes include every document
   */
  const handleChannelChanges = (changes) => {

    // There may be more than one change included in this notification,
    // so we dispatch an action for each to make sure all are processed correctly.
    changes.forEach(change=>{

      let messageData= change.doc.data(); //guaranteed to exist, even if data is {}

      try{
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
              color: channels[messageData.channel] ? channels[messageData.channel].color : 'black'
            }
          }
        })
      }
      catch(error){
        console.error(`There was an error dispatching message ${change.type} for document ${change.doc.id}.`)
      }
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
