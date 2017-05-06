// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'


import dismissKeyboard from 'dismissKeyboard'
import { Actions } from 'react-native-router-flux'


var autoLoginInterval;
var hash;

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {

    };
    this._handleCurrentPassword = this._handleCurrentPassword.bind(this);
    this._verify = this._verify.bind(this);
    this._goCustomerMode = this._goCustomerMode.bind(this);
    this._goManagerMode = this._goManagerMode.bind(this);

  }

  componentWillMount(){
    function autoLogin(){
      this.props.autoLogin(hash);
    }
    if(this.props.user == undefined){
      AsyncStorage.getItem('token', (err, result) => {

        if(!err && result != undefined){
          hash = result;
          autoLogin.bind(this);
        }
      });
    }
  }
  componentWillReceiveProps(nextProps){

  }

  _handleCurrentPassword(text) {
    if(text.charAt(text.length - 1) == ' ')
      return;

    this.props.updateProfilePassword(text);
  }


  _verify() {
    console.log(this.props);
    if(this.props.verificationPassword == undefined || this.props.verificationPassword == ""){
      Alert.alert(
        "Sorry",
        "Please enter password",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }else if(this.props.user == undefined){
      Alert.alert(
        "Sorry",
        "Please try again in one minute",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.verify(this.props.user.phoneNumber, this.props.verificationPassword)
  }

  _goCustomerMode() {
    Actions.main({type: "reset"})
    this.props.updateVerificationRequired(true);
    this.props.updateVerificationStatus(false);
    this.props.updateProfilePassword("");
  }

  _goManagerMode() {
    this.props.updateVerificationRequired(false);
    Actions.manage();
  }

  render() {
{
    if(!this.props.verified)
      return (
      <TouchableWithoutFeedback 
                onPress={dismissKeyboard}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       
        <ActivityIndicator
            style={{position: 'absolute', alignItems: 'center', justifyContent: 'center'}}
            color="#fff"
            animating={this.props.user == undefined}
          />
        <Text style={styles.titleText}>
          <Text style={{color: 'black', backgroundColor: '#FFCF00' }}> To continue </Text> please enter your password
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this._handleCurrentPassword}
              placeholderTextColor='#88898C'
              placeholder='Enter Password'
              secureTextEntry={true}
              style={styles.transInput}
              value={this.props.verificationPassword}
            />
            <View style={{marginTop: 10, height:55}}>
              <TouchableHighlight
                onPress={this._verify}
                underlayColor='transparent'
                style={(this.props.user == undefined) ? styles.disabledButtonContainer : styles.buttonContainer}
                disabled={this.props.user == undefined}
                >
                <Text style={styles.buttonText}>
                  Verify
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
      )
    else
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <View style={{flex: 1, flexDirection: 'row'}}>

            <View style={{height:Dimensions.get('window').width * 0.5, width: Dimensions.get('window').width * 0.5}}>
              <TouchableHighlight
                onPress={this._goManagerMode}
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                underlayColor='transparent'
              >
                <Text style={{color: 'white', fontSize: 35, fontFamily: 'Helvetica Neue', fontWeight: 'bold'}}>
                  <Text style={{backgroundColor: 'white', color: 'black'}}> Manager </Text> Mode
                </Text>
              </TouchableHighlight>
            </View>

            <View style={{height:Dimensions.get('window').width * 0.5, width: Dimensions.get('window').width * 0.5}}>
              <TouchableHighlight
                onPress={this._goCustomerMode}
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                underlayColor='transparent'
              >
                <Text style={{color: 'white', fontSize: 35, fontFamily: 'Helvetica Neue', fontWeight: 'bold'}}>
                  <Text style={{backgroundColor: '#FFCF00', color: 'black'}}> Customer </Text> Mode
                </Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </View>
    )
  }
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    
  },
  disabledButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
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
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Arial',
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 40,
    fontWeight: 'bold',
  },
  infoText: {
    fontFamily: 'Arial',
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: 'bold',
  }
})
