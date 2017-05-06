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
export const register = () => {
  console.log('Home')
}

export const getBanner = (store) => {
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
    fetch(actionTypes.LOCAL_IP + '/tool/getSideBanner', request)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        dispatch({
          sideBanner: responseJson.sideBanner,
          type: actionTypes.UPDATE_SIDE_BANNER
        })
      }else{
        throw Error(responseJson.error);
      }
    })
    .catch((error) => {
    })
  }
}

export const loadLoyalReward = (store) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
    fetch(actionTypes.LOCAL_IP + '/service/loyal/loadReward', request)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.success){
        dispatch({
          loyalReward: responseJson.loyalReward,
          type: actionTypes.UPDATE_LOYALREWARD
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
  fetch(actionTypes.LOCAL_IP + '/store/getstore', request)
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

export const checkin = (store, phoneNumber, storeName, subscription) => {
  if(storeName == undefined){
    storeName == "";
  }
  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    phoneNumber: phoneNumber,
    store: store,
    subscription: subscription,
    storeName: storeName,
  }

  var request = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(requestBody)
  }

  return dispatch => {
  dispatch({
    homePhoneNumber: "" , 
    type: actionTypes.UPDATE_CHECKIN_PHONENUMBER
  })
  dispatch({
    type: actionTypes.UPDATE_SUBSCRIPTIONSWITCH,
    subscription: true
  })
  fetch(actionTypes.LOCAL_IP + '/service/loyal/checkin', request)
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.success){
      
    }else{
      throw Error(responseJson.error);
    }

   })
  .catch((error) => {
    switch(error.message){
      case 'hourDifference':
        okAlert('Sorry', 'You have alreade check-in');
      break;
    }
  });
  }
}

export const waitlistEnqueue = (store, customerName, phoneNumber, seats, subscription) => {
  
  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;

  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    phoneNumber: phoneNumber,
    seats: seats,
    store: store,
    subscription: subscription,
    customerName: customerName,
  }

  var request = {
    method: 'POST',
    headers: requestHeader,
    body: JSON.stringify(requestBody)
  }

  return dispatch => {
  dispatch({
    homeCustomerName: "" , 
    type: actionTypes.UPDATE_HOME_CUSTOMERNAME
  })
  dispatch({
    homePhoneNumber: "" , 
    type: actionTypes.UPDATE_WAITLIST_PHONENUMBER
  })
  dispatch({
    type: actionTypes.UPDATE_SUBSCRIPTIONSWITCH,
    subscription: true
  })
  fetch(actionTypes.LOCAL_IP + '/service/waitlist/enqueue', request)
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.success){
	    dispatch({
        store: responseJson.store , 
        type: actionTypes.UPDATE_STORE
      })
      dispatch({
        homeSeats: "2" , 
        type: actionTypes.UPDATE_HOME_SEATS
      })
      dispatch({
        onReservation: true, 
        type: actionTypes.ON_RESERVATION
      })
      
      
      
    }else{
      throw Error(responseJson.error);
    }

   })
  .catch((error) => {
    switch(error.message){
      case 'enqueueError':
        okAlert('Internal Server Fail', 'Please try within a minute');
      break;
    }
  });
  }
}

export const resetBanner = () => {
  return {
    type: actionTypes.UPDATE_SIDE_BANNER,
    sideBanner: undefined,
  }
}

export const onReservation = (text) => {
  return {
    type: actionTypes.ON_RESERVATION,
    onReservation: text,
  }
}

export const subscriptionSwitch = (text) => {
  return {
    type: actionTypes.UPDATE_SUBSCRIPTIONSWITCH,
    subscription: text,
  }
}

export const updateHomeCustomerName = (text) => {
  return {
    type: actionTypes.UPDATE_HOME_CUSTOMERNAME,
    homeCustomerName: text,
  }
}

export const updateWaitlistPhoneNumber = (text) => {
  return {
    type: actionTypes.UPDATE_WAITLIST_PHONENUMBER,
    waitlistPhoneNumber: text,
  }
}

export const updateCheckinPhoneNumber = (text) => {
  return {
    type: actionTypes.UPDATE_CHECKIN_PHONENUMBER,
    checkinPhoneNumber: text,
  }
}

export const updateHomeSeats = (text) => {
  return {
    type: actionTypes.UPDATE_HOME_SEATS,
    homeSeats: text,
  }
}
