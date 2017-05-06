// @flow
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'

var flexRatio = (Dimensions.get('window').height / 100);
import { Actions } from 'react-native-router-flux'
export default class Manage extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

 

  render() {
 {
      return (
      <View>
    

      <View style={{flex: 1}}></View>
      <View style={{flex: flexRatio - 1}}>
        <View style={{justifyContent: 'center', padding: 15}}>
          <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.07}}>
              <Text style={{backgroundColor: 'white', color: 'black'}}> Manager </Text> Mode
          </Text>
        </View>
        <View style={{flexWrap: 'wrap', 
          alignItems: 'center',
          flexDirection:'row'}}>
              <TouchableHighlight
              	onPress={Actions.waitlist}
                underlayColor='transparent'
              	>
              	<View style={styles.consoleButtonContainer}>
                  <Image
                    style={{width: Dimensions.get('window').width * 0.333333, height: Dimensions.get('window').width * 0.333333}}
                    source={require('../../../public/assets/img/waitlist.png')}
                  />
              		<Text style={styles.consoleButtonText}>Waitlist</Text>
              	</View>
              </TouchableHighlight>
              <TouchableHighlight
              	onPress={Actions.analytic}
                underlayColor='transparent'
              	>
              	<View style={styles.consoleButtonContainer}>
                  <Image
                    style={{width: Dimensions.get('window').width * 0.333333, height: Dimensions.get('window').width * 0.333333}}
                    source={require('../../../public/assets/img/analytic.png')}
                  />
              		<Text style={styles.consoleButtonText}>Analytic</Text>
              	</View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={Actions.megaphone}
                underlayColor='transparent'
                >
              	<View style={styles.consoleButtonContainer}>
                  <Image
                    style={{width: Dimensions.get('window').width * 0.333333, height: Dimensions.get('window').width * 0.333333}}
                    source={require('../../../public/assets/img/megaphone.png')}
                  />
              		<Text style={styles.consoleButtonText}>Megaphone</Text>
              	</View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={Actions.loyal}
                underlayColor='transparent'
                >
              	<View style={styles.consoleButtonContainer}>
                  <Image
                    source={require('../../../public/assets/img/loyal.png')}
                    style={{width: Dimensions.get('window').width * 0.333333, height: Dimensions.get('window').width * 0.333333}}
                  />
              		<Text style={styles.consoleButtonText}>Rewards</Text>
              	</View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={Actions.profile}
                underlayColor='transparent'
                >
                <View style={styles.consoleButtonContainer}>
                  <Image
                    source={require('../../../public/assets/img/profile.png')}
                    style={{width: Dimensions.get('window').width * 0.333333, height: Dimensions.get('window').width * 0.333333}}
                  />
                  <Text style={styles.consoleButtonText}>Profile</Text>
                </View>
              </TouchableHighlight>
        </View>
      </View>
      
      </View>
    )
  }
  }
  onBarcode(data, bounds) {
    var str = "";
    for(key in data){
      str += key + " ";
    }
    Alert.alert(
        "Sorry",
        str + data.data,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
  }
}


const styles = StyleSheet.create({
  consoleButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.333333,
  },
  consoleButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Ariel',
    fontWeight: 'bold'
  }

})
