import React from 'react'
import {
  Segment,
  Input,
  Button
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
      <h2>Channels</h2>
      <ul>
        {Object.keys(props.channels).map(channel=>(
          <li>{channel} <Button onClick={()=>handleLeave(channel)}>X</Button></li>
        ))}

      </ul>
      <p>Here is some text</p>
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
