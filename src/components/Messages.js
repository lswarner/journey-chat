import React from 'react'
import {subscribeToChannel} from '../firebase'


const Messages = ({channel}) => {
  let [channelMessages, setMessages]= React.useState([]);

  React.useEffect(()=>{

    (()=>{
      console.log('_____ subscribing...')
      let unsubscribe= subscribeToChannel(channel, handleChannelChanges);
      return unsubscribe;
    })()
  }, []);


  const handleChannelChanges = (changes) => {
    console.log(`_____ handling ${changes.length} changes`)
    console.log('messages: ', channelMessages);
    console.log(' . . . ');

    let addedMessages= [];

    changes.forEach((change)=>{
      const msg= change.doc.data();
      console.log(msg);
      //const timestamp= Math.floor(new Date.now() / 1000);

      switch(change.type){
        case "added":
          addedMessages.push(msg)
          break;

        default:
        console.log('a different change type: ', change.type);
          break;
      };
    });


    console.log('added msg:', addedMessages)
    setMessages(channelMessages.concat(addedMessages));
  }

  return (
    <>
      <ul style={{marginTop: '60px'}}>
        { channelMessages.map((msg)=>(
          <li>{`${msg.author}: ${msg.content}`}</li>
        ))
        }
      </ul>
      </>
  )


}

export default Messages;
