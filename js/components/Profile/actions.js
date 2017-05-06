import * as actionTypes from '../../actionTypes'
import { getLogin, getProfile } from '../../reducers/rootReducer'
import { Actions } from 'react-native-router-flux'
import {
  AsyncStorage,
  Alert,
} from 'react-native'

export const profile = () => {
  console.log('Profile')
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



export const logout = () => {
  return dispatch => {
    Actions.login({type: 'reset'});
    dispatch({
      user: undefined,
      type: actionTypes.UPDATE_USER
    })
    dispatch({
      store: undefined,
      type: actionTypes.UPDATE_STORE
    })
    dispatch({
      verified: false,
      type: actionTypes.UPDATE_PROFILE_VERIFICATION
     })
    AsyncStorage.removeItem('token');
    
  }
}


export const updateProfileStore = (store, name, estmin) => {
  console.log(store + " " + name + " "  + estmin + "man");
  if(estmin == undefined){
    estmin = 0;
  }

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    store: store,
    name: name,
    estmin: estmin
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/store/update', request)
  .then((response) => response.json())
  .then((responseJson) => {
	    if(responseJson.success){
		    dispatch({
	          store: responseJson.store, 
	          type: actionTypes.UPDATE_STORE
	        })
        updateProfileStoreName(responseJson.store.name);
	    }else{
        throw Error(responseJson.error);
      }

	   })
	  .catch((error) => {
	  });
   }
}


export const updateVerificationStatus = (text) => {
  return {
    type: actionTypes.UPDATE_PROFILE_VERIFICATION,
    verified: text,
  }
}

export const updateProfileStoreName = (text) => {
  return {
    type: actionTypes.UPDATE_PROFILE_STORENAME,
    storename: text,
  }
}

export const updateProfileEstMin = (text) => {
  return {
    type: actionTypes.UPDATE_PROFILE_ESTMIN,
    estmin: text,
  }
}