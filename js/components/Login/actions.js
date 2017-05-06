// @flow
import * as actionTypes from '../../actionTypes'
import { getLogin, getMode } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
  Alert,
} from 'react-native'



function okAlert(title, content) {
  Alert.alert(
    title,
    content,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed!')},
    ]
  );
}



export const login = (phoneNumber, password) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;


  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    phoneNumber: phoneNumber,
    password: password,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
   console.log(actionTypes.LOCAL_IP + '/user/signin/');
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/user/signin/', request)
  .then((response) => response.json())
  .then((responseJson) => {
    //Login Success
    console.log(responseJson);
    if(responseJson.success){
      AsyncStorage.setItem('token', responseJson.token);
      
      dispatch({type: actionTypes.LOGIN_SUCCESS})
      dispatch({
        verificationRequired: false,
        type: actionTypes.UPDATE_VERIFICATIONREQUIRED
      })
      dispatch({
        user: responseJson.user,
        type: actionTypes.UPDATE_USER
      })
      dispatch({
        password: '',
        type: actionTypes.UPDATE_LOGIN_PASSWORD
      })
      dispatch({
        store: responseJson.store,
        type: actionTypes.UPDATE_STORE
      })
      Actions.mode({type:"reset"})
    }else{
      throw Error(responseJson.error);
    }
  })
  .catch((error) => {
    console.log(error);
    switch(error.message){
      case 'phoneNumberNotExist':
        okAlert('Sorry', 'The phone number does not exist');
      break;
      case 'passwordNotMatch':
        okAlert('Sorry', 'Please check your password');
      break;
    }
    
    
  })

  dispatch({type: actionTypes.ON_LOGGING})
  }
}



export const loginWithDelay = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      const {onLogging} = getLogin(getState())
      if(!onLogging) {
        dispatch(login())
      }
    }, 1000)
  }
}

export const updatePhoneNumber = (text) => {
  return {
    type: actionTypes.UPDATE_LOGIN_PHONENUMBER,
    phoneNumber: text,
  }
}

export const updatePassword = (text) => {
  return {
    type: actionTypes.UPDATE_LOGIN_PASSWORD,
    password: text,
  }
}
