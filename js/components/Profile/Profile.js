// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'

var flexRatio = (Dimensions.get('window').height / 80);
import dismissKeyboard from 'dismissKeyboard'
export default class Profile extends Component {
  constructor() {
    super();
    this.state = {

    };
    this._handleCurrentStoreName = this._handleCurrentStoreName.bind(this);
    this._updateStore = this._updateStore.bind(this);
    this._logout = this._logout.bind(this);
  }
  componentWillMount() {
    if(this.props.store){
      this.props.updateProfileStoreName(this.props.store.name);
    }
  }

  componentWillUnmount(){
    this.props.updateVerificationStatus(false);
  }

  formatPhoneNumber(num){
    var sub = num.substring(num.length - 4, num.length);
    var sub1= num.substring(5, 8);
    var sub2 = num.substring(2, 5);
    return '('+ sub2 + ')'  + ' ' + sub1 + '-' + sub;
  }

  _handleCurrentStoreName(text) {
    this.props.updateProfileStoreName(text);
  }

  _updateStore() {
    if(this.props.storename == undefined){
      Alert.alert(
        "Sorry",
        "Please enter the name of the store",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.updateProfileStore(this.props.store._id, this.props.storename)
  }


  _logout() {
    this.props.logout()
  }

  render() {
    
      return (
      <TouchableWithoutFeedback 
                onPress={dismissKeyboard}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: flexRatio - 1}}>
          <View style={{padding: 15}}>
            {this.props.user != undefined ?
              <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.06}}>
                Hello <Text style={{color: 'black', backgroundColor: '#FFCF00'}}> {this.props.user.firstName} </Text> {this.props.user.lastName} <Text style={{fontSize: Dimensions.get('window').width * 0.025}}>{this.formatPhoneNumber(this.props.user.phoneNumber)}</Text>,
              </Text> : null

            }
            
            {this.props.store != undefined && this.props.store.name != undefined ?
              <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.06}}>
                 the owner of <Text style={{color: 'black', backgroundColor: '#15f4ee'}}> {this.props.store.name} </Text>
              </Text> : null
            }
            
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{marginBottom: 45}}>
                  <TextInput
                    style={styles.transInput}
                    placeholderTextColor='#88898C'
                    maxLength={20}
                    placeholder='Enter Store Name'
                    autoCorrect={false}
                    autoCapitalize="words"
                    onChangeText={this._handleCurrentStoreName}
                    value={this.props.storename}
                  />
                  <View style={{height:55, marginTop: 15}}>
                    <TouchableHighlight
                      onPress={this._updateStore}
                      style={styles.buttonContainer}
                      underlayColor='transparent'
                    >
                      <Text style={styles.buttonText}>
                        Update Info
                      </Text>
                    </TouchableHighlight>
              </View>
            </View>
            <View style={{height: 55, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <TouchableHighlight
                    onPress={this._logout}
                    style={styles.logoutButtonContainer}
                    underlayColor='transparent'
                  >
                    <Text style={styles.buttonText}>
                      Log Out
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
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonContainer: {
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
    // fontSize: 13,
    // fontFamily: 'Helvetica Neue',
    // fontWeight: 'bold',
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
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Arial',
    fontSize: 40,
    fontWeight: 'bold',
  },
})
