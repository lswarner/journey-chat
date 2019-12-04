import queryString from 'query-string'
const moment = require('moment');

export const relativeTime = (timestamp) => {
  return moment.unix(timestamp).fromNow();
}

export const displayTime = (timestamp) => {
  return moment.unix(timestamp).format('h:mm:ss a');
}

export const parseRoomsFromQueryString = (str) => {
  if(str=== '') return [];

  const values= queryString.parse(str);
  console.log(values)

  if(
    !values.room ||
    values.room === 'undefined' ||
    values.room ===''
  ) return [];

  let queryChannels= values.room.split(',');

  console.log(queryChannels)

  return queryChannels;
}


export const randomColor = () => {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}
