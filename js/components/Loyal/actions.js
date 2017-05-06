// @flow
import * as actionTypes from '../../actionTypes'
import { getLogin, getLoyal } from '../../reducers/rootReducer'
import {
  Alert,
} from 'react-native'



export const offerExtraPoint = (store, phoneNumber, point, loyalReward) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
    phoneNumber: phoneNumber,
    point: point
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/loyal/offerPoint', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
      var customerRewardInfo = {};
      var availableRewards = [];
      var k = 0;
      for(var i = 0 ; i < loyalReward.rewards.length; i++){
        if(responseJson.loyal.remainingPoint >= loyalReward.rewards[k].point){

            var title = loyalReward.rewards[i].title;
            var point = loyalReward.rewards[i].point;
            availableRewards[k] = {
              title: title,
              point: point,
            }
            k++;
        }
        
      }

      customerRewardInfo.phoneNumber = phoneNumber;
      customerRewardInfo.remainingPoint = responseJson.loyal.remainingPoint;
      customerRewardInfo.availableRewards = availableRewards;
      console.log(customerRewardInfo);
      dispatch({
        customerRewardInfo: customerRewardInfo,
        type: actionTypes.UPDATE_LOYAL_SEARCHRESULT
      })
    }else{
      throw Error(responseJson.error);
    }
  })
  .catch((error) => {
  })
}
}


export const offerReward =(store, phoneNumber, title, pointRequired) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
    phoneNumber: phoneNumber,
    title: title,
    pointRequired: pointRequired
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
    fetch(actionTypes.LOCAL_IP + '/service/loyal/offerReward', request)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.success){
        dispatch({
          mainMessage: phoneNumber + " just received " + title + "\nEnter customer's phone number to offer rewards",
          type: actionTypes.UPDATE_LOYAL_MAINMESSAGE
        })
        dispatch({
          customerRewardInfo: undefined,
          type: actionTypes.UPDATE_LOYAL_SEARCHRESULT
        })
      }else{
        throw Error(responseJson.error);
      }
    })
    .catch((error) => {
    })
}

}

export const removeBigWinning = (store, title) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
    title: title,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/loyal/removeBigWinning', request)
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

export const addNewBigWinning = (store, newBigWinning, odds) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
    newBigWinning: newBigWinning,
    odds: odds,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/loyal/addNewBigWinning', request)
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

export const removeReward = (store, title) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
    title: title,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/loyal/removeReward', request)
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

export const addNewReward = (store, newReward, pointRequired) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
    newReward: newReward,
    pointRequired: pointRequired,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/loyal/addNewReward', request)
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
  fetch(actionTypes.LOCAL_IP + '/service/loyal/switch', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
      if(setTo == true){
        dispatch({
          mainMessage: "Enter customer's phone number to offer rewards",
          type: actionTypes.UPDATE_LOYAL_MAINMESSAGE
        })
        dispatch({
          loyalReward: responseJson.loyalReward,
          type: actionTypes.UPDATE_LOYALREWARD
        })
        dispatch({
          recentBigWinners: responseJson.recentBigWinners,
          type: actionTypes.UPDATE_RECENTBIGWINNERS
        })
      }
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

export const loadRecentRewardsReceivers = (store) => {
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
    fetch(actionTypes.LOCAL_IP + '/service/loyal/loadRecentRewardsReceivers', request)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.success){
        dispatch({
          recentRewardsReceivers: responseJson.recentRewardsReceivers,
          type: actionTypes.UPDATE_RECENTREWARDSRECEIVERS
        })
      }else{
        throw Error(responseJson.error);
      }
    })
    .catch((error) => {
    })
  }
}

export const loadRecentBigWinners = (store) => {
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
    fetch(actionTypes.LOCAL_IP + '/service/loyal/loadRecentBigWinner', request)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.success){
        dispatch({
          recentBigWinners: responseJson.recentBigWinners,
          type: actionTypes.UPDATE_RECENTBIGWINNERS
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


export const searchForReward = (store, phoneNumber, loyalReward, dialog) => {
  var originalFormatPhoneNumber = phoneNumber;
  var phoneNumber = phoneNumber.match(/\d/g);
  phoneNumber = phoneNumber.join("");
  phoneNumber = '+1' + phoneNumber;
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  
  var requestBody = {
    store: store,
    phoneNumber: phoneNumber,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }
  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/loyal/search', request)
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.success){
      var customerRewardInfo = {};
      var availableRewards = [];
      var k = 0;
      for(var i = 0 ; i < loyalReward.rewards.length; i++){
        if(responseJson.loyal.remainingPoint >= loyalReward.rewards[k].point){

            var title = loyalReward.rewards[i].title;
            var point = loyalReward.rewards[i].point;
            availableRewards[k] = {
              title: title,
              point: point,
            }
            k++;
        }
        
      }

      customerRewardInfo.phoneNumber = phoneNumber;
      customerRewardInfo.remainingPoint = responseJson.loyal.remainingPoint;
      customerRewardInfo.availableRewards = availableRewards;

      dispatch({
        customerRewardInfo: customerRewardInfo,
        type: actionTypes.UPDATE_LOYAL_SEARCHRESULT
      })

      // Alert.alert(
      //   originalFormatPhoneNumber,
      //   'Point : ' + responseJson.loyal.remainingPoint,
      //   alertContents.map((dot, index) => ({
      //         text: alertContents[index].text,
      //         onPress: () => alertContents[index].onPress
      //       }))
      // )
    }else{
      throw Error(responseJson.error);
    }
  })
  .catch((error) => {
  })
}
}

export const updateLoyalMainMessage = (text) => {
  return {
    type: actionTypes.UPDATE_LOYAL_MAINMESSAGE,
    mainMessage: text,
  }
}

export const updateLoyalExtraPoint = (text) => {
  return {
    type: actionTypes.UPDATE_LOYAL_EXTRAPOINT,
    extraPoint: text,
  }
}

export const updateLoyalBigWinning = (text) => {
  return {
    type: actionTypes.UPDATE_LOYAL_NEWBIGWINNING,
    newBigWinning: text,
  }
}

export const updateLoyalOdds = (text) => {
  return {
    type: actionTypes.UPDATE_LOYAL_ODDS,
    odds: text,
  }
}

export const updateLoyalNewReward = (text) => {
  return {
    type: actionTypes.UPDATE_LOYAL_NEWREWARD,
    newReward: text,
  }
}

export const updateLoyalPointRequired = (text) => {
  return {
    type: actionTypes.UPDATE_LOYAL_POINTREQUIRED,
    pointRequired: text,
  }
}

export const updateLoyalPhoneNumber = (text) => {
  return {
    type: actionTypes.UPDATE_LOYAL_PHONENUMBER,
    loyalPhoneNumber: text,
  }
}