// @flow
import * as actionTypes from '../../actionTypes'
import { Actions } from 'react-native-router-flux'
import {
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


// Action creators
export const waitlist = () => {
}

export const reset = (store) => {
  
    var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    store: store
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/waitlist/reset', request)
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson.success){
         dispatch({
            store: responseJson.store, 
            type: actionTypes.UPDATE_STORE
         })
         okAlert('Success', 'Waitlist has been reset');
      }
     })
    .catch((error) => {
    });
  }
}

export const serviceSwitch = (store, setTo) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
    setTo: setTo,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/waitlist/switch', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
      dispatch({
        store: responseJson.store,
        type: actionTypes.UPDATE_STORE
      })
    }else{
      throw Error(responseJson.error);
    }
  })
  .catch((error) => {
  })
}
}

export const updateStore = (store) => {
 	 var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    store: store
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }


  return dispatch => {
  fetch('http://' + actionTypes.LOCAL_IP + '/store/getstore', request)
  .then((response) => response.json())
  .then((responseJson) => {
	    if(responseJson.success){
		    dispatch({
          store: responseJson.store , 
          type: actionTypes.UPDATE_STORE
        })
	    }else{
        throw Error(responseJson.error);
      }

	   })
	  .catch((error) => {
	  });
   }
}

export const cancelReservation = (store, customer, phoneNumber, seats) => {

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    store: store,
    customer: customer,
    phoneNumber: phoneNumber,
    seats: seats,
  }

  var request = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(requestBody)
  }

  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/waitlist/cancel', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
      dispatch({
        store: responseJson.store , 
        type: actionTypes.UPDATE_STORE
      })
    }else{
      throw Error(responseJson.error);
    }

   })
  .catch((error) => {
    switch(error.message){
      case 'dequeueError':
        okAlert('Internal Server Fail', 'Please try within a minute');
      break;
    }
  });

  }
}

export const removeReservation = (store, customer, phoneNumber, seats) => {

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    store: store,
    customer: customer,
    phoneNumber: phoneNumber,
    seats: seats,
  }

  var request = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(requestBody)
  }

  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/waitlist/remove', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
      dispatch({
        store: responseJson.store , 
        type: actionTypes.UPDATE_STORE
      })
    }else{
      throw Error(responseJson.error);
    }

   })
  .catch((error) => {
    switch(error.message){
      case 'dequeueError':
        okAlert('Internal Server Fail', 'Please try within a minute');
      break;
    }
  });

  }
}
export const notify = (store, customer, phoneNumber, seats) => {

  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    store: store,
    customer: customer,
    phoneNumber: phoneNumber,
    seats: seats,
  }

  var request = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(requestBody)
  }

  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/waitlist/notify', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
    	dispatch({
        store: responseJson.store , 
        type: actionTypes.UPDATE_STORE
      })
    }else{
      throw Error(responseJson.error);
    }

   })
  .catch((error) => {
    switch(error.message){
      case 'dequeueError':
        okAlert('Internal Server Fail', 'Please try within a minute');
      break;
    }
  });

  }
}
