// @flow
import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Alert,
  TouchableWithoutFeedback
} from 'react-native'


import dismissKeyboard from 'dismissKeyboard'
import { Actions } from 'react-native-router-flux'


var width = Dimensions.get('window').width

export default class Login extends Component {
  constructor() {
    super();
    this._handleCurrentPhoneNumber = this._handleCurrentPhoneNumber.bind(this);
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._login = this._login.bind(this);
  }

  async componentDidMount(){
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

  _handleCurrentPassword(text) {
    this.props.updatePassword(text)
  }

  _login(){
    if(this.props.phoneNumber == undefined){
      Alert.alert(
        "Sorry",
        "Please enter registered phone number",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }else if(this.props.password == undefined){
      Alert.alert(
        "Sorry",
        "Please enter password",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.login(this.props.phoneNumber, this.props.password)


  }

  render() {
    // <TextInput
    //   style={styles.transInput}
    //   placeholderTextColor='rgba(255,255,255,0.18)'

    return (
      <TouchableWithoutFeedback 
                onPress={dismissKeyboard}>
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Image
            source={require('../../../public/assets/img/logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <TextInput
            style={styles.transInput}
            placeholderTextColor='#88898C'
            placeholder='Enter Phone #'
            maxLength={14}
            onChangeText={this._handleCurrentPhoneNumber}
            value={this.props.phoneNumber}
            keyboardType='phone-pad'
          />
          <TextInput
            style={styles.transInput}
            placeholderTextColor='#88898C'
            placeholder='Enter Password'
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this._handleCurrentPassword}
            secureTextEntry={true}
            value={this.props.password}
          />
          <View style={{marginTop: 10, height: 55, flexDirection: 'row',}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this._login}
                style={styles.loginButtonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  Log In
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{height: 55, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={Actions.register}
                style={styles.registerButtonContainer}
                underlayColor='transparent'
              >
                <Text style={styles.buttonText}>
                  Register
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}



const styles = StyleSheet.create({
  registerButtonContainer: {
    backgroundColor: '#FFCF00',
    borderWidth: 0,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  loginButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    // color: 'rgba(255,255,255,0.2)',
    // color: '#986B6C',
    color: 'black',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    // height: 62.5,
    // marginBottom: 20,
    // width: 85,
    height: Dimensions.get('window').width * 0.15,
    marginBottom: 20,
    width: Dimensions.get('window').width * 0.5,
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
})
