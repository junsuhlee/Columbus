import * as actionTypes from '../../actionTypes'
import { getLogin, getMode } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
  Alert,
} from 'react-native'

export const mode = () => {
}

function okAlert(title, content) {
  Alert.alert(
    title,
    content,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed!')},
    ]
  );
}

export const autoLogin = (token) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    token: token
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
   console.log("token exists");
   console.log(actionTypes.LOCAL_IP + '/user/autoSignin');
  return dispatch => {
   fetch(actionTypes.LOCAL_IP + '/user/autoSignin', request)
  .then((response) => response.json())
  .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.success){
        console.log(responseJson);
        AsyncStorage.setItem('token', responseJson.token);
        dispatch({type: actionTypes.LOGIN_SUCCESS})
        dispatch({
          user: responseJson.user ,
          type: actionTypes.UPDATE_USER
        })
        dispatch({
          password: '',
          type: actionTypes.UPDATE_LOGIN_PASSWORD
        })
        dispatch({
          store: responseJson.store ,
          type: actionTypes.UPDATE_STORE
        })

      }else{
        throw Error(responseJson.error);
      }
     }
    )
    .catch((error) => {
      switch(error.message){
        case 'autoLoginPhoneNumberError':
          okAlert('Sorry', 'The phone number does not exist');
          AsyncStorage.removeItem('token');
          Actions.login({type: 'reset'});
        break;
      }
    });
    dispatch({type: actionTypes.ON_LOGGING})
  }
}

export const verify = (phoneNumber , password) => {
    var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    phoneNumber: phoneNumber,
    password: password
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/user/verify', request)
  .then((response) => response.json())
  .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.success){
         dispatch({
          verified: true,
          type: actionTypes.UPDATE_VERIFICATION
         })
         dispatch({
            password: '',
            type: actionTypes.UPDATE_PROFILE_PASSWORD
          })
      }else{
         dispatch({
          verified: false,
          type: actionTypes.UPDATE_VERIFICATION
         })
        throw Error(responseJson.error);
      }

     })
    .catch((error) => {
       switch(error.message){
        case 'phoneNumberNotExist':
          okAlert('Sorry', 'The phone number does not exist');
        break;
        case 'passwordNotMatch':
          okAlert('Sorry', 'Please check your password');
        break;
      }
    });
  }
}



export const updateProfilePassword = (text) => {
  return {
    type: actionTypes.UPDATE_VERIFICATION_PASSWORD,
    verificationPassword: text,
  }
}

export const updateVerificationRequired = (text) => {
  return {
    type: actionTypes.UPDATE_VERIFICATIONREQUIRED,
    verificationRequired: text,
  }
}

export const updateVerificationStatus = (text) => {
  return {
    type: actionTypes.UPDATE_VERIFICATION,
    verified: text,
  }
}

