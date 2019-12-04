import React from 'react'
import {
  Segment,
  Image,
  Grid
} from 'semantic-ui-react'
import { displayTime, relativeTime } from '../utils'

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
    color: '#9d9d9d',
    fontSize: '12px'
  },
  timeText :{
    color: '#a7a7a7',
    fontSize: '12px',
    float: 'right'
  },
  messageContent: {
    marginTop: 0,
    paddingTop: '8px',
    paddingBottom: '8px'
  }
}


const Message = ({content, color, author, avatar, timestamp}) => (
    <>
      <Grid centered style={styles.container}>
        <Grid.Column width={2} style={{paddingRight:0}}>

        </Grid.Column>
        <Grid.Column width={14}>
          <span style={styles.authorText}>{author}</span>
          <span style={styles.timeText}>{displayTime(timestamp)}</span>
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
export default React.memo(Message)
