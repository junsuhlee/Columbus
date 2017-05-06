import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

export default class Loading extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <View style={{
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
    	  backgroundColor: 'rgba(255,255,255,0.8)'}}>
          {
            this.props.loading ? 
            <View style={{left: 0, right:0}}>
              <Text style={{fontSize: Dimensions.get('window').width * 0.03, color: '#555555'}}>{this.props.message}</Text>
            </View> : null
          }
          {
            !this.props.loading ? 
            <View style={{left: 0, right:0}}>
              <Text style={{fontSize: Dimensions.get('window').width * 0.05, color: this.props.color}}>{this.props.title}</Text>
              <Text style={{fontSize: Dimensions.get('window').width * 0.03, color: '#555555'}}>{this.props.message}</Text>
            </View> : null
          }
        	
      </View>
      
    );
  }
}
