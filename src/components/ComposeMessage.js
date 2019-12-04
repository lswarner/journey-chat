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
  const [channels, setChannels]= React.useState(Object.values(props.channels));
  const [text, setText]= React.useState('');
  const [curChannel, setCurChannel]= React.useState(null);
  const [curPerson, setCurPerson]= React.useState('luke');

  React.useEffect(()=>{
    let ch= Object.values(props.channels)
    setChannels(ch);

    if(ch.length){
      setCurChannel(ch[0].value)
    }

  }, [props.channels])

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
                  options={channels.reduce(
                    (optionData, {channel})=>{
                      let data= {key: channel, text: channel, value: channel};
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

export default ComposeMessage
