import React from 'react'
import {
  Button,
  Form,
  TextArea,
  Dropdown,
  Menu
} from 'semantic-ui-react'
import { postToChannel } from '../firebase'

const channelData= [
  {
    key: 'demo',
    text: 'demo',
    value: 'demo'
  },
  {
    key: 'football',
    text: 'football',
    value: 'football',
  }
];


const peopleData= [
  {
    key: 'luke',
    text: 'luke',
    value: 'luke'
  },
  {
    key: 'christina',
    text: 'christina',
    value: 'christina',
  }
]

const ComposeMessage = (props) => {
  const [text, setText]= React.useState('');
  const [curChannel, setCurChannel]= React.useState(props.channels[0])
  const [curPerson, setCurPerson]= React.useState('luke')

  const handleTextChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setText(value);
  }

  const handleChannelChange = (event, data) => {
    event.preventDefault();
    setCurChannel(data.value)
  }

  const handlePeopleChange = (event, data) => {
    event.preventDefault();
    setCurPerson(data.value)
  }

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
              <div style={styles.channelSelector}>posting to:{' '}
                <Dropdown
                  inline
                  options={channelData}
                  defaultValue={channelData[0].value}
                  onChange={handleChannelChange}
                />
              </div>

              <div style={styles.channelSelector}>writing as:{' '}
                <Dropdown
                  inline
                  options={peopleData}
                  defaultValue={peopleData[0].value}
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

export default React.memo(ComposeMessage)
