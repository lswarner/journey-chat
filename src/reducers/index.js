
/* these types are defined by Firestore for use with snapshot listening */
const messageTypes= {
  added: 'added',
  modified: 'modified',
  removed: 'removed'
}

export const channelTypes= {
  subscribe: 'subscribe',
  unsubscribe: 'unsubscribe'
}


export const messagesReducer = (state, action) => {

  switch(action.type){
    case messageTypes.added:
      return {
        ...state,
        [action.data.timestamp]: action.data
      }

    default:
      return state
  }
}

export const channelsReducer = (state, action) => {

  switch(action.type){
    case channelTypes.subscribe:
      return {
        ...state,
        [action.data.channel]: action.data.channel
      }


    case channelTypes.unsubscribe: {
      //strip out the channel we are leaving with object destructuring
      let {[action.data.channel]: remove, ...rest} = state;

      return {
        ...rest
      }
    }


    default:
      return state;
  }
}
