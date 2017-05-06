// @flow
import * as actionTypes from '../../actionTypes'
import { getRegister, getMode } from '../../reducers/rootReducer'
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

export const register = (phoneNumber, firstName, lastName, password) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    phoneNumber: phoneNumber,
    firstName: firstName,
    lastName: lastName,
    password: password,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/user/signup', request)
  .then((response) => response.json())
  .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.success){
        AsyncStorage.setItem('token', responseJson.token);
        Actions.mode()
        dispatch({type: actionTypes.LOGIN_SUCCESS})
        dispatch({
          user: responseJson.user ,
          type: actionTypes.UPDATE_USER
        })
        dispatch({
          store: responseJson.store ,
          type: actionTypes.UPDATE_STORE
        })
        dispatch({
          phoneNumber: '' ,
          type: actionTypes.UPDATE_REGISTER_PHONENUMBER
        })
        dispatch({
          firstName: '' ,
          type: actionTypes.UPDATE_REGISTER_FIRSTNAME
        })
        dispatch({
          lastName: '' ,
          type: actionTypes.UPDATE_REGISTER_LASTNAME
        })
        dispatch({
          password: '' ,
          type: actionTypes.UPDATE_REGISTER_PASSWORD
        })
        dispatch({
          passwordConfirm: '' ,
          type: actionTypes.UPDATE_REGISTER_PASSWORDCONFIRM
        })
        dispatch({
          verificationRequired: false,
          type: actionTypes.UPDATE_VERIFICATIONREQUIRED
        })
      }else{
        throw Error(responseJson.error);
      }
    })
    .catch((error) => {
      switch(error.message){
        case 'signupError':
          okAlert('Error', 'Please check the input fields and try again');
        break;
        case 'phoneNumberExist':
          okAlert('Exist', 'The phone number already exists');
        break;
      }
    });
  }
}

export const updatePhoneNumber = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_PHONENUMBER,
    phoneNumber: text,
  }
}

export const updateFirstName = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_FIRSTNAME,
    firstName: text,
  }
}

export const updateLastName = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_LASTNAME,
    lastName: text,
  }
}

export const updatePassword = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_PASSWORD,
    password: text,
  }
}

export const updateConfirmPassword = (text) => {
  return {
    type: actionTypes.UPDATE_REGISTER_PASSWORDCONFIRM,
    passwordConfirm: text,
  }
}
