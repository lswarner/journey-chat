const moment = require('moment');


export const relativeTime = (timestamp) => {
  return moment.unix(timestamp).fromNow();
}

export const displayTime = (timestamp) => {
  return moment.unix(timestamp).format('h:mm:ss a');
}
