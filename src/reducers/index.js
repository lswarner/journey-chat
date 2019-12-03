
export const messagesReducer = (state, action) => {
  console.log('current messages: ', state);
  console.log('reducing: ',action);

  switch(action.type){
    case 'added':
      return state.concat(action.data)
  
    default:
      //throw new Error('Unexpected action type in messagesReducer: ', action.type)
      break
  }
}
