import React from 'react'
import {
  Button,
  Form,
  TextArea,
  Dropdown,
  Menu
} from 'semantic-ui-react'
import { postToChannel } from '../firebase'


/**
 * Write a new message to a channel we are subscribed to.
 * Provides functionality for user to choose an identity to post as
 *  and choose which channel to post the message to, if subscribed to more than one.
 * @param {[object]} props.channels Array of channels the user is subscribed to
 */
const ComposeMessage = (props) => {
  const [channels, setChannels]= React.useState(Object.values(props.channels));
  const [text, setText]= React.useState('');
  const [curChannel, setCurChannel]= React.useState(null);
  const [curPerson, setCurPerson]= React.useState('luke');

/*
  Re-shape the channels prop and load into local state to ease dropdown and messaging options.
  useEffect is called on initial render and and time the channels change.
  The channels state is managed in Chat.js and is passed here as a prop.
 */
  React.useEffect(()=>{
    let ch= Object.values(props.channels)
    setChannels(ch);

    if(ch.length){
      setCurChannel(ch[0].value)
    }

  }, [props.channels])

  //keep message textarea in sync with state.
  const handleTextChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setText(value);
  }

  //keep track when user choose to post to a different channel
  const handleChannelChange = (event, data) => {
    event.preventDefault();
    setCurChannel(data.value)
  }

  //keep track when user chooses to change identity
  const handlePeopleChange = (event, data) => {
    event.preventDefault();
    setCurPerson(data.value)
  }

/**
 * Send a request to Firestore to post a new message to a channel.
 *  Because we are subscribed to this channel, Firestore will immediately
 *  notify us of the new message, call our listener, and the data will be then
 *  processed, reduced, and stored (see Chat.handleChannelChanges() in Chat.js )
 * @return
 */
  const submitNewMessage = async () => {
    if(text === '') return;

    try {
      await postToChannel(curChannel, curPerson, text);
      setText('');
    }
    catch(error){
      console.error(`Error posting message to channel #${curChannel}`, error);
    }
  }

  return (
    <Menu fixed='bottom' >
      <div style={styles.container}>

        <Form style={{width: '600px'}}>
          <TextArea
            rows={2}
            onChange={handleTextChange}
            value={text}
          />
          <div>
            <div style={styles.dropdowns}>

              {/* Generate channel dropdown */}
              <div style={styles.channelSelector}>posting to:{' '}
                <Dropdown
                  inline
                  options={Object.values(props.channels).reduce(
                    (optionData, {channel, color})=>{
                      let data= {key: channel, text: channel, value: channel, color: color};
                      if(!optionData){
                        return [data];
                      }
                      else{
                        return optionData.concat(data)
                      }

                    }, [])
                  }
                  defaultValue={channels.length ? channels[0].channel : ''}
                  value={curChannel}
                  onChange={handleChannelChange}
                />
              </div>

              {/* Generate poster identity dropdown */}
              <div style={styles.channelSelector}>writing as:{' '}
                <Dropdown
                  inline
                  options={Object.keys(props.people).reduce(
                    (optionData, p)=>{
                      let person= props.people[p];
                      let data= {key: p, text: person.name, value: p,  image: { avatar: true, src: `${person.avatar}` } };
                      if(!optionData){
                        return [data];
                      }
                      else{
                        return optionData.concat(data)
                      }
                    }, [])
                  }
                  onChange={handlePeopleChange}
                />
              </div>
            </div>

            <Button
              onClick={submitNewMessage}
              style={styles.postButton}
              compact
              secondary={text ? true : false}
              disabled={text ? false : true}
            >
              Post Message to #{curChannel}
            </Button>
          </div>

        </Form>
      </div>
    </Menu>
  )
}

const styles= {
  container: {
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
  },
  dropdowns: {
    display: 'inline',
    float: 'left',
  },
  channelSelector: {
    display: 'block',
    width: '100%'
  },
  postButton: {
    marginTop: '6px',
    display: 'inline',
    float: 'right'
  },

}

export default ComposeMessage
