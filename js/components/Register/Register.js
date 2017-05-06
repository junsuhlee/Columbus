// @flow
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Alert,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'

import dismissKeyboard from 'dismissKeyboard'
var flexRatio = (Dimensions.get('window').height / 50);

export default class Register extends Component {
  constructor() {
    super();

    this._handleCurrentPhoneNumber = this._handleCurrentPhoneNumber.bind(this);
    this._handleCurrentFirstName = this._handleCurrentFirstName.bind(this);
    this._handleCurrentLastName = this._handleCurrentLastName.bind(this);
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._handleCurrentConfirmPassword = this._handleCurrentConfirmPassword.bind(this);

    this._register = this._register.bind(this);
  }

  _handleCurrentPhoneNumber(text) {
 

    var phoneNumber = text.match(/\d/g);
    if(phoneNumber != undefined){
      phoneNumber = phoneNumber.join("");
      if(phoneNumber.length >= 10)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10);
      else if(phoneNumber.length >= 7)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, phoneNumber.length);
      else if(phoneNumber.length >= 4)
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, phoneNumber.length);
      else if(phoneNumber.length >= 1)
        phoneNumber = '(' + phoneNumber.substring(0, phoneNumber.length);
      else
        phoneNumber = '';
    }else{
      phoneNumber = '';
    }

    this.props.updatePhoneNumber(phoneNumber)
  }

  _handleCurrentFirstName(text) {

    this.props.updateFirstName(text)
  }

  _handleCurrentLastName(text) {
    this.props.updateLastName(text)
  }

  _handleCurrentPassword(text) {


    this.props.updatePassword(text)
  }
  _handleCurrentConfirmPassword(text) {


    this.props.updateConfirmPassword(text)
  }


  _register() {
      if(this.props.phoneNumber == undefined || this.props.phoneNumber.length < 14){
        Alert.alert(
          "Sorry",
          "Please enter registered phone number",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
        return;
      }else if(this.props.firstName == undefined || this.props.lastName == undefined || this.props.lastName == "" || this.props.firstName == ""){
        Alert.alert(
          "Sorry",
          "Please enter your name",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
        return;
      }else if(this.props.password == undefined || this.props.password == ""){
        Alert.alert(
          "Sorry",
          "Please enter the password",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
        return;
      }else if(this.props.password != this.props.passwordConfirm){
        Alert.alert(
          "Sorry",
          "Please check confirm password",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        );
        return;
      }

      this.props.register(this.props.phoneNumber, this.props.firstName, this.props.lastName, this.props.password)
  }

  render() {
    return (
      <TouchableWithoutFeedback 
                onPress={dismissKeyboard}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: flexRatio - 1}}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: 'white', padding: 15, fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                Register
            </Text>
          </View>
        
          <View style={{flex: 1}}>
            <View style={{flex: 1 , justifyContent: 'center'}}>
              <TextInput
                style={styles.transInput}
                placeholderTextColor='#88898C'
                placeholder='Phone #'
                maxLength={14}
                onChangeText={this._handleCurrentPhoneNumber}
                value={this.props.phoneNumber}
                keyboardType='phone-pad'
              />

              <TextInput
                style={styles.transInput}
                placeholderTextColor='#88898C'
                placeholder='First Name'
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={this._handleCurrentFirstName}
                value={this.props.firstName}
              />

              <TextInput
                style={styles.transInput}
                placeholderTextColor='#88898C'
                placeholder='Last Name'
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={this._handleCurrentLastName}
                value={this.props.lastName}
              />

              <TextInput
                style={styles.transInput}
                placeholderTextColor='#88898C'
                placeholder='Password'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this._handleCurrentPassword}
                secureTextEntry={true}
                value={this.props.password}
              />

              <TextInput
                style={styles.transInput}
                placeholderTextColor='#88898C'
                placeholder='Confirm Password'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this._handleCurrentConfirmPassword}
                secureTextEntry={true}
                value={this.props.passwordConfirm}
              />
              <View style={{marginTop: 10,height: 55}}>
                <TouchableHighlight
                  onPress={this._register}
                  style={styles.buttonContainer}
                  underlayColor='transparent'
                >
                  <Text style={styles.buttonText}>
                    Submit
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#FFCF00',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    // color: 'rgba(255,255,255,0.2)',
    // color: '#986B6C',
    // fontSize: 13,
    // fontFamily: 'Helvetica Neue',
    // fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
  },
  transInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    fontWeight: '200',
    height: 55,
    padding: 15,
  },
  titleText: {
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Arial',
    fontSize: 40,
    fontWeight: 'bold',
  },
})
