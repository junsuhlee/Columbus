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
  Picker,
  Alert,
  NavigatorIOS,
  Dimensions,
} from 'react-native'

import Swiper from 'react-native-swiper'
import CustomerCell from '../../elements/CustomerCell'
import { Actions } from 'react-native-router-flux'
var flexRatio = (Dimensions.get('window').height / 50);
var updating;

export default class Waitlist extends Component {
  constructor() {
    super();

    this.loadPages = this.loadPages.bind(this);

    this._handleRemove = this._handleRemove.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleNotify = this._handleNotify.bind(this);
    this._refreshing = this._refreshing.bind(this);
    this._handleSwitch = this._handleSwitch.bind(this);
    this._reset = this._reset.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    updating = setInterval(this._refreshing, 10000);
  }

  componentWillUnmount() {
    clearInterval(updating);
  }

  loadPages() {
      var pages = [];
      pages.push(
         <View key="waitlist" style={styles.tabContainer}>
            <View style={{flex:1}}></View>
            <View style={{flex:flexRatio - 1}}>
              <View style={{justifyContent: 'center', padding: 15}}>
                  <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                      Waitlist
                  </Text>
              </View>
              <View style={{flex: 1 , backgroundColor: '#eee'}}>
                {this.props.store && this.props.store.queue && this.props.store.queue.length >  0 ?
                <ListView
                  ref="waitlist"
                  enableEmptySections={true}
                  dataSource={this.props.store && this.props.store.services.waitlist == true ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.queue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                  renderRow={
                    (rowData) =>
                    <CustomerCell
                      data={rowData}
                      remove={this._handleRemove}
                      cancel={this._handleCancel}
                      notify={this._handleNotify}/>
                  }
                />:
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{color: 'black', fontSize: Dimensions.get('window').width * 0.04, textAlign: 'center', fontWeight: 'bold'}}>
                    {this.props.store.services.waitlist == true ? "No party is waiting now" : "Use Columbus Waitlist Today"}
                  </Text>
                </View>
                }
              </View>
            
            <View style={{justifyContent:'flex-end', paddingTop: 15}}>
              {this.props.store.services.waitlist == false ? 
              <View style={{height: 55}}>
                  <TouchableHighlight
                    underlayColor='transparent'
                    onPress={this._handleSwitch}
                    style={styles.enableWaitlistButtonContainer}
                  >
                    <Text style={styles.buttonText}>
                      Start Columbus Waitlist
                    </Text>
                  </TouchableHighlight>
              </View> :
              <View style={{flexDirection: 'row'}}>
                <View style={{height: 55, flex:1}}>
                    <TouchableHighlight
                      underlayColor='transparent'
                      onPress={this._handleSwitch}
                      style={styles.disableWaitlistButtonContainer}
                    >
                      <Text style={styles.buttonText}>
                        Terminate Columbus Waitlist
                      </Text>
                    </TouchableHighlight>
                </View>
                <View style={{height: 55, flex:1}}>
                    <TouchableHighlight
                        underlayColor='transparent'
                        onPress={this._reset}
                        style={styles.disableWaitlistButtonContainer}
                      >
                        <Text style={styles.buttonText}>
                           {this.props.store.services.waitlist == true ? "Reset Waitlist" : "Use Columbus Waitlist today"}
                        </Text>
                    </TouchableHighlight>
                </View>
              </View>}
            </View>

            <View style={{marginBottom: 55}}></View>
            </View>
          </View>
      );

      if(this.props.store.services.waitlist == true){
          pages.push(
            <View key="customerList" style={styles.tabContainer}>
                <View style={{flex:1}}></View>
                <View style={{flex:flexRatio - 1}}>
                  <View style={{justifyContent: 'center', padding: 15}}>
                      <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                          Customers
                      </Text>
                  </View>
                  <View style={{flex: 1 , backgroundColor: '#eee'}}>
                    {this.props.store && this.props.store.doneQueue && this.props.store.doneQueue.length >  0 ?
                    <ListView
                      dataSource={this.props.store && this.props.store.doneQueue ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.doneQueue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                      enableEmptySections={true}
                      renderRow={(rowData) =>
                        <CustomerCell
                          noRemove={true}
                          customerCell={true}
                          data={rowData}
                        />
                      }
                    />:
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text style={{color: 'black', fontSize: Dimensions.get('window').width * 0.04, textAlign: 'center', fontWeight: 'bold'}}>
                        Customer list is empty
                      </Text>
                    </View>
                    }
                  </View>
                  <View style={{marginBottom: 55}}></View>
                </View>
              </View>
          );
      }

      return pages;
  }

  _reset() {
    function reset(){
      this.props.reset(this.props.store._id)
    }
    var bindedReset = reset.bind(this);
    Alert.alert(
      'Confirmation',
      'Are you sure you want to reset the waitlist?',
      [
        {text: 'YES', onPress: bindedReset},
        {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }

  _refreshing() {
    if(this.props.store != null){
       this.props.updateStore(this.props.store._id);
    }
  }

  _handleSwitch() {
    function switchWaitlist(){
      this.props.serviceSwitch(this.props.store._id, this.props.store.services.waitlist == false);
    }
    var bindedSwitch = switchWaitlist.bind(this);
    Alert.alert(
      'Confirmation',
      this.props.store.services.waitlist == true ? 'Are you sure you do not want to use waitlist?' : 'Do you want to use waitlist service?',
      [
        {text: 'YES', onPress: bindedSwitch},
        {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }

  _handleRemove(customerId, phoneNumber, seats) {
    this.props.removeReservation(this.props.store._id, customerId, phoneNumber, seats)
  }
  _handleCancel(customerId, phoneNumber, seats) {
    this.props.cancelReservation(this.props.store._id, customerId, phoneNumber, seats)
  }
  _handleNotify(customerId, phoneNumber, seats) {
    this.props.notify(this.props.store._id, customerId, phoneNumber, seats)
  }

  render() {
    return (
        <View style={styles.container}>
            <Swiper style={styles.wrapper} 
              showsButtons={false}
              dot={<View style={{backgroundColor:'#fff', width: 15, height: 15, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
              activeDot={<View style={{backgroundColor: '#f7ff00', width: 15, height: 15,  marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
              >
              {this.loadPages()}
              </Swiper>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    paddingTop: 15,
  },
  tabContainer: {
    flex: 1
  },
  container: {
    flex: 1,
  },
  tabButtonText: {
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: 27,
    fontWeight: 'bold',
  },
   enableWaitlistButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#19b766',
    borderWidth: 0,
    flex: 1,
    justifyContent: 'center',
  },
  disableWaitlistButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#ff4b14',
    borderWidth: 0,
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
