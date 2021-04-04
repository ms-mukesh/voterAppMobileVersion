import {AsyncStorage} from 'react-native';
import {isWEB} from "../helper/themeHelper";
export const getToken = () => {
  if(isWEB){
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2b3RlcklkIjoyMCwibWFpbElkIjoidm9sdW50ZWVyMUBnbWFpbC5jb20iLCJpYXQiOjE2MTQ0MDU5OTl9.4NssA8WBNeU70hd3UAUhskNkQVSB134GxatuzOq259E'
  }
  return AsyncStorage.getItem('userLoginDetail').then(res => {
    if (res) {
      let obj = JSON.parse(res);
      console.log(obj.accessToken)
      return obj.accessToken;
    } else {
      return '';
    }
  });
};
export const generateRandomNumber = () => {
  // Declare a digits variable
  // which stores all digits
  const digits = '0123456789';
  let NUMBER = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    NUMBER += digits[Math.floor(Math.random() * 10)];
  }
  return NUMBER;
};
