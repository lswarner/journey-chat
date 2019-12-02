import React from 'react'
import {
  Segment,
  Image,
  Grid
} from 'semantic-ui-react'


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
    color: '#a7a7a7',
    fontSize: '10px'
  },
  messageContent: {
    marginTop: 0,
    paddingTop: '8px',
    paddingBottom: '8px'
  }
}


const Message = ({content, color, author, avatar}) => (
    <>
      <Grid centered style={styles.container}>
        <Grid.Column width={2} style={{paddingRight:0}}>
          <Image
            src={avatar}
            avatar
            floated='right'
            verticalAlign='bottom'
            style={styles.avatar}
          />
        </Grid.Column>
        <Grid.Column width={14}>
          <span style={styles.authorText}>{author}</span>
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
