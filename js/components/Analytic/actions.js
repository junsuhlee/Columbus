import { getLogin, getAnalytic } from '../../reducers/rootReducer'

export const analytic = () => {
}

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

}

function analysisFilter(data, type){
	var temp = [];
	var res = [];
	if(type == 'day'){
		for(var i = 0; i < 7; i++){
			temp[i] = 0;
		} 
	}else if(type == 'hour'){
		for(var i = 0; i < 24; i++){
			temp[i] = 0;
		} 
	}else{
		for(var i = 0; i < 24; i++){
			temp[i] = 0;
		} 
	}

	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	for(var i = 0; i < data.length; i++){
		var date = new Date(data[i].createdAt);	
		if(type == 'day'){
			temp[date.getDay()]++;
		}else if(type == 'hour'){
			temp[date.getHours()]++;
		}else{
			if(days[date.getDay()] == type){
				temp[date.getHours()]++;
			}
		}
	}

	if(type == 'day'){
		
		for(var i = 0; i < 7; i++){
			res[i] = [days[i], temp[i]];
		} 
	}else if(type == 'hour'){
		var hours = ["0AM", "","","3AM","","","6AM","","","9AM","","","12PM","","","3PM","","","6PM","","","9PM","",""];
		for(var i = 0; i < 24; i++){
			res[i] = [hours[i], temp[i]];
		} 
	}else{
		var hours = ["0AM", "","","3AM","","","6AM","","","9AM","","","12PM","","","3PM","","","6PM","","","9PM","",""];
		for(var i = 0; i < 24; i++){
			res[i] = [hours[i], temp[i]];
		} 
	}
	return res;
}


export const setDate = (fromDate, toDate, store, type) => {
	fromDate = new Date(fromDate);
	fromDate = fromDate.toISOString();
	toDate = new Date(toDate);
	toDate.setDate(toDate.getDate()+2);
	toDate = toDate.toISOString();


 	var requestHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
   }

   var requestBody = {
    fromDate: fromDate,
    toDate: toDate,
    store: store
   }

   var request = {
     method: 'POST',
     headers: requestHeader,
     body: JSON.stringify(requestBody)
   }


  return dispatch => {
  fetch(actionTypes.LOCAL_IP + '/service/analytic/setDate', request)
  .then((response) => response.json())
  .then((responseJson) => {
	    if(responseJson.success){
		    
		  dispatch({
            chartData: analysisFilter(responseJson.customers, type),
            type: actionTypes.UPDATE_ANALYTIC_CHART
          })
	    }else{
        throw Error(responseJson.error);
      }

	   })
	  .catch((error) => {
	  });
  }
}

