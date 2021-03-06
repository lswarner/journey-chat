import React from 'react'
import {
  Segment,
  Image,
  Grid,
} from 'semantic-ui-react'
import { displayTime } from '../utils'


/**
 * Component to display a single message
 * 
 * @param {string} props.content   [description]
 * @param {string} props.color     [description]
 * @param {string} props.channel   [description]
 * @param {string} props.author    [description]
 * @param {string} props.avatar    [description]
 * @param {Number} props.timestamp [description]
 */
const Message = ({content, color, channel, author, avatar, timestamp}) => (
    <>
      <Grid centered style={styles.container}>
        <Grid.Column width={2} style={{paddingRight:0}}>
          <Image avatar src={avatar} style={styles.avatar}/>
        </Grid.Column>
        <Grid.Column width={14}>
          <span style={styles.authorText}>{author}</span>
          <span style={styles.timeText}> [{displayTime(timestamp)}]</span>
          <span style={styles.channelText}>#{channel}</span>
          <Segment
            color={color}
            raised
            style={styles.messageContent}
          >
            {content}
          </Segment>
        </Grid.Column>
      </Grid>

    </>
)

const styles={
  container: {
    marginTop: 0,
  },
  avatar: {
    marginTop:'11px',
    width: '48px',
    height: '48px',
  },
  authorText: {
    color: '#333',
    fontSize: '16px'
  },
  channelText: {
    color: '#9d9d9d',
    fontSize: '12px',
    float: 'right'
  },
  timeText :{
    color: '#a7a7a7',
    fontSize: '12px',
  },
  messageContent: {
    marginTop: 0,
    paddingTop: '8px',
    paddingBottom: '8px'
  }
}

export default React.memo(Message)
