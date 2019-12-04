import * as firebase from "firebase/app";
import "firebase/firestore";
import {firebaseConfig} from './firebase-keys.js'

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const subscribeToChannel = async (channel, listener) => {
  let unsubscribe= await firebase.firestore()
        .collection('messages')
        .where('channel', '==', channel)
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot)=>{
          listener(snapshot.docChanges());
        },
      (error)=>{
        console.log(`Error subscribing to channel ${channel}.`, error)
      });

  return unsubscribe;
}



export const postToChannel = async (channel, author, message) => {

  try{
    let newDoc= await firebase.firestore().collection('messages').add({
        channel,
        author,
        content: message,
        timestamp: currentTimestamp(new Date()) // unix timestamp in seconds
      })

    return newDoc;
  }
  catch(error){
    throw error;
  }


}




export const subscribeCollection = async (collectionRef, setCollectionCallback) => {

  let unsubscribe= await firebase.firestore()
        .collection('messages')
        .where('channel', '==', collectionRef)
        .orderBy('timestamp')
        .onSnapshot(snapshot=>{

        let collection= [];

        snapshot.forEach(doc=>{
          const data= doc.data();
          collection.push({
            id: doc.id,
            ...data
          });
        });

      setCollectionCallback(collection);

    });

  return unsubscribe;

}

const currentTimestamp = () => {
  return Math.floor(new Date().getTime() / 1000)
}
