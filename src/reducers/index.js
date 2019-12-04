
/* these types are defined by Firestore for use with snapshot listening */
const types= {
  added: 'added',
  modified: 'modified',
  removed: 'removed'
}


export const messagesReducer = (state, action) => {

  switch(action.type){
    case types.added:
      return {
        ...state,
        [action.data.timestamp]: action.data
      }

    default:
      return state
  }
}
