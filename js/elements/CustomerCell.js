'use strict';

import * as actionTypes from '../actionTypes'
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Alert
} from 'react-native';

class customerCell extends Component {
  static propTypes = {
    style: React.PropTypes.object,
  }
  constructor() {
  	super();
  	this.state = {
  	};


  	this._timeElapsed = this._timeElapsed.bind(this);


  	this._loadCustomer = this._loadCustomer.bind(this);
  	this._notify = this._notify.bind(this);
    this._cancel = this._cancel.bind(this);
    this._remove = this._remove.bind(this);
  }
  formatPhoneNumber(num){
  	var sub = num.substring(num.length - 4, num.length);
  	return '(***)'  + ' ***-' + sub;
  }

  _timeElapsed(){
  	var startTime = new Date();

  	var endTime = this.state.time;
  	var timeDiff = startTime - endTime;

  	timeDiff /= 1000;
  	var seconds = Math.round(timeDiff % 60);
  	timeDiff = Math.floor(timeDiff / 60);
  	var minutes = Math.round(timeDiff % 60);
  	timeDiff = Math.floor(timeDiff / 60);
  	var hours = Math.round(timeDiff % 24);
  	timeDiff = Math.floor(timeDiff / 24);
  	var days = timeDiff;

  	var returnText = "";
    if(this.props.customerCell){
      if(days == 0 && hours == 0 && minutes == 0){
        returnText = seconds + " seconds ago";
      }else if(days == 0 && hours == 0){
        returnText = minutes + " minutes ago";
      }else if(days == 0){
        returnText = hours + " hours ago";
      }else{
        returnText = days + " days ago";
      }
    }else{
      if(days == 0 && hours == 0 && minutes == 0){
        returnText = "Waiting " + seconds + " seconds";
      }else if(days == 0 && hours == 0){
        returnText = "Waiting " + minutes + " minutes";
      }else if(days == 0){
        returnText = "Waiting " + hours + " hours";
      }else{
        returnText = "Waiting " + days + " days";
      }
    }
  	
  	return returnText;
  }

  _loadCustomer(data){
  	this.state.customerId = data.customer;
  	fetch(actionTypes.LOCAL_IP + '/store/getcustomer', {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json',
	    },
	  body: JSON.stringify({
	    customer: data.customer,
	   })}).then((response) => response.json())
	  .then((responseJson) => {
	  	 if(responseJson.success){
        // this.props.phoneNumber = this.formatPhoneNumber(responseJson.customer.phoneNumber);
        // this.props.seats = responseJson.customer.seats;
	  	 	this.setState({
	  	 		time: data.time,
          customerName: responseJson.customer.customerName,
		     	phoneNumber: responseJson.customer.phoneNumber,
          formattedPhoneNumber: this.formatPhoneNumber(responseJson.customer.phoneNumber),
		     	seats: responseJson.customer.seats,
		     });
	  	 }

	   })
	  .catch((error) => {
	    console.error(error);
	  });
  }
  componentWillMount() {
  	this._loadCustomer(this.props.data);
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  componentWillReceiveProps(newProps) {
    if(this._mounted)
  	 this._loadCustomer(newProps.data);
  }

  _notify() {
  	this.props.notify(this.state.customerId, this.state.phoneNumber, this.state.seats);
  }

  _remove() {
    this.props.remove(this.state.customerId, this.state.phoneNumber, this.state.seats);
  }

  _cancel() {
    Alert.alert(
      "Confirmation",
      "Do you want to cancel this reservation?",
      [
        {text: 'YES', onPress: () => this.props.cancel(this.state.customerId, this.state.phoneNumber, this.state.seats)},
        {text: 'NO'},
      ]
    );
  }

  render() {
  	var timeElapsed = this._timeElapsed();

    return (
      <View>
          <View style={styles.container, {backgroundColor: this.props.backgroundColor}}>
            <View style={styles.rowContainer}>
                  <View style={{padding: 15}}>
                  	<Text style={styles.infoText}> {this.state.seats} Seats </Text>
                    <Text style={styles.infoText}> {this.state.customerName} <Text style={styles.phoneNumberText}>{this.state.formattedPhoneNumber}</Text></Text>
                  	<Text style={styles.infoText}> {timeElapsed} </Text>
                  </View>
                  {this.props.noRemove ?
                    null
                    :
                    <View style={{flex: 1, marginTop: 5, flexDirection: 'row'}}>
                      <TouchableHighlight
                      onPress={this._notify}
                      underlayColor='transparent'
                      >
                      <Text style={{fontFamily: 'Arial' , paddingTop: 10, paddingBottom: 10, backgroundColor: 'white', textAlign : 'center' , fontSize: Dimensions.get('window').width * 0.03, fontWeight: 'bold', width: Dimensions.get('window').width * 0.33 , color: 'black'}}>Notify</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      onPress={this._remove}
                      underlayColor='transparent'
                      >
                      <Text style={{fontFamily: 'Arial' , paddingTop: 10, paddingBottom: 10, backgroundColor: 'white', textAlign : 'center' , fontSize: Dimensions.get('window').width * 0.03, fontWeight: 'bold', width: Dimensions.get('window').width * 0.33, color: 'rgba(40, 186, 57, 1)'}}>REMOVE</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                      onPress={this._cancel}
                      underlayColor='transparent'
                      >
                      <Text style={{fontFamily: 'Arial' , paddingTop: 10, paddingBottom: 10, backgroundColor: 'white', textAlign : 'center' , fontSize: Dimensions.get('window').width * 0.03, fontWeight: 'bold', width: Dimensions.get('window').width * 0.33 , color: 'rgba(244, 66, 116, 1)'}}>CANCEL</Text>
                      </TouchableHighlight>
                    </View>
                  }
            </View>
          </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
  },

  infoText: {
    fontFamily: 'Arial',
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  phoneNumberText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  }
})

export default customerCell
