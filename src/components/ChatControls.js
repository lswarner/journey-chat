import React from 'react'
import {
  Segment,
  Input,
  Button,
  Icon
} from 'semantic-ui-react'

const ChatControls = (props) => {
  const [channelId, setChannelId]= React.useState('');

  const handleInputChange = (event, data) => {
    setChannelId(data.value)
  }

  const handleJoin = () => {
    props.onJoinChannel(channelId);
    setChannelId('')
  }

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
