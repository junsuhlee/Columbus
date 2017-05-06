// @flow
import React, { Component } from 'react'
import {
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'

var flexRatio = (Dimensions.get('window').height / 50);
import dismissKeyboard from 'dismissKeyboard'
import { Actions } from 'react-native-router-flux'




export default class Megaphone extends Component {
  constructor() {
    super();
    this.state = {
    };


    this._handleMegaphoneContent = this._handleMegaphoneContent.bind(this);
    this._confirmContent = this._confirmContent.bind(this);
    this._sendMessage = this._sendMessage.bind(this);

    
  }
  componentWillMount(){
    this.props.loadTargetNumber(this.props.store._id);
  }

  _handleMegaphoneContent(text) {
    this.props.updateMegaphoneContent(text)
    this.setState({
      contentConfirmed : false
    });
  }

  _confirmContent(){
    this.setState({
      contentConfirmed : true
    });
  }

  _sendMessage(){
    this.props.sendMessage(this.props.store._id, this.props.megaphoneContent, this.props.store.name);
  }

  render() {
    return (
        <TouchableWithoutFeedback 
                  onPress={dismissKeyboard}>
          <View style={styles.container}>
            <View style={{flex: 1}}></View>
            <View style={{flex: flexRatio - 1}}>
              <View style={{justifyContent: 'center', padding: 15}}>
                <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                    Megaphone
                </Text>
                <Text style={{color: 'white', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                  Target
                </Text>
                <Text style={{fontSize: Dimensions.get('window').width * 0.09, fontFamily: 'Arial' ,fontWeight: 'bold'}}>
                  <Text style={{color: 'black', backgroundColor: '#f7ff00' }}> {this.props.megaphoneTargetNumber} </Text> <Text style={{color: 'white'}}>people.</Text>
                </Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TextInput
                  multiline={true}
                  maxLength={300}
                  onChangeText={this._handleMegaphoneContent}
                  placeholderTextColor='#88898C'
                  placeholder='Enter content'
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  style={this.state.contentConfirmed && this.props.megaphoneContent != undefined ? styles.confirmedTransInput : styles.transInput}
                  value={this.props.megaphoneContent}
                />
                <View style={{height: 55, marginTop:15}}>
                  <TouchableHighlight
                    onPress={this.state.contentConfirmed  && this.props.megaphoneContent != undefined ? this._sendMessage : this._confirmContent}
                    style={styles.buttonContainer}
                    disabled={this.props.onMegaphone}
                    underlayColor='transparent'
                  >
                    <Text style={styles.buttonText}>
                      {this.state.contentConfirmed && this.props.megaphoneContent != undefined ? "Send" : "Confirm Content"}
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

var styles = StyleSheet.create({
  container: {
  	flex: 1,
  	justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    fontFamily: 'Arial',
    fontSize: 24,
    height: Dimensions.get('window').height * 0.2,
    fontWeight: '200',
    padding: 15,
  },
  confirmedTransInput: {
    backgroundColor: '#d0ffc6',
    borderColor: 'black',
    fontFamily: 'Arial',
    fontSize: 24,
    height: Dimensions.get('window').height * 0.2,
    fontWeight: '200',
    padding: 15,
  }
})