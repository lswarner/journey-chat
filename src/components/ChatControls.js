import React from 'react'
import {
  Segment,
  Input,
  Button,
  Icon
} from 'semantic-ui-react'

/**
 * Control Panel to join or leave active channels
 * @param {[object]} props.channels Array of channels the user is subscribed to
 * @param {callback} props.onJoinChannel Callback to Chat.js that the user wants to join a new channel
 * @param {callback} props.onLeaveChannel Callback to Chat.js that the user wants to leave a channel
 */
const ChatControls = (props) => {
  const [channelId, setChannelId]= React.useState('');

  const handleInputChange = (event, data) => {
    setChannelId(data.value)
  }

/**
 * Start the process to join the channel provided by the user
 * @return
 */
  const handleJoin = () => {
    props.onJoinChannel(channelId);
    setChannelId('')
  }

/**
 * Start the process to leave the channel indicated by the user.
 *  This is called when the [X] button next to a channel is clicked
 * @param  {string} channel The channel to leave
 * @return
 */
  const handleLeave= (channel) => {
    props.onLeaveChannel(channel)
  }

  return (
    <Segment>
      <h2>Active Channels</h2>
      <ul style={{listStyle: 'none', paddingLeft: '0'}}>
        {Object.keys(props.channels).map(channel=>(
          <li>#{channel} <Icon link  name='close' onClick={()=>handleLeave(channel)} /></li>
        ))}
      </ul>
      
      <Input
        placeholder='channel'
        onChange={handleInputChange}
        value={channelId}
        action={
          <Button onClick={handleJoin}>Join</Button>
        }
      />
    </Segment>
  )
}

export default ChatControls;
