// @flow
import * as actionTypes from '../../actionTypes'
import { getLogin } from '../../reducers/rootReducer'



export const sendMessage = (store, content, storeName) => {
  var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  var requestBody = {
    store: store,
    content: content,
    storeName: storeName,
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }

  return dispatch => {
  dispatch({
    onMegaphone: true,
    type: actionTypes.ON_MEGAPHONE
  })
  fetch(actionTypes.LOCAL_IP + '/service/megaphone/sendMessage', request)
  .then((response) => response.json())
  .then((responseJson) => {
    dispatch({
      onMegaphone: false,
      type: actionTypes.ON_MEGAPHONE
    })
    if(responseJson.success){
      dispatch({
        megaphoneContent: undefined,
        type: actionTypes.UPDATE_MEGAPHONE_CONTENT
      })
    }else{
      throw Error(responseJson.error);
    }
  })
  .catch((error) => {
    console.log(error);
    switch(error.message){
      case 'internalError':
        okAlert('Internal Error', 'Please try again in one minute');
      break;
    }
    
    
  })
  }
}


export const loadTargetNumber = (store) => {

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
  fetch(actionTypes.LOCAL_IP + '/service/megaphone/getTarget', request)
  .then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.success){
      dispatch({
        megaphoneTargetNumber: responseJson.targetNumber,
        type: actionTypes.UPDATE_MEGAPHONE_TARGETNUMBER
      })
    }else{
      throw Error(responseJson.error);
    }
  })
  .catch((error) => {
    console.log(error);
    switch(error.message){
      default:
      break;
    }
    
    
  })
  }
}



export const updateMegaphoneContent = (text) => {
  return {
    type: actionTypes.UPDATE_MEGAPHONE_CONTENT,
    megaphoneContent: text,
  }
}