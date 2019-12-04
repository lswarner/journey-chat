import queryString from 'query-string'
const moment = require('moment');


export const peopleData= {
  'link': {name: 'Link', avatar:'https://avatarfiles.alphacoders.com/103/thumb-103373.png'},
  'zelda': {name: 'Zelda', avatar: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6203/6203028_sd.jpg'},
  'samus': {name: 'Samus Aran', avatar: 'https://vignette.wikia.nocookie.net/nintendo/images/0/09/Super_Smash_Bros._Ultimate_-_Character_Art_-_Samus.png/revision/latest?cb=20190710193153&path-prefix=en'},
  'pikachu': {name: 'Pikachu', avatar: 'https://giantbomb1.cbsistatic.com/uploads/scale_medium/0/6087/2437349-pikachu.png'},
  'mario': {name: 'Mario', avatar: 'https://pm1.narvii.com/7257/6cdddc3631bf9749b9380f628dd338c7eb9b6dccr1-512-513v2_hq.jpg'}
}


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
