// @flow
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  TouchableHighlight,
  Alert,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'

import dismissKeyboard from 'dismissKeyboard'
import PopupDialog from 'react-native-popup-dialog';
import Swiper from 'react-native-swiper'
var flexRatio = (Dimensions.get('window').height / 50);

export default class Rewards extends Component {
  constructor() {
    super();

    this.loadPages = this.loadPages.bind(this);

    this._handleSwitch = this._handleSwitch.bind(this);
    this._handleLoyalPhoneNumber = this._handleLoyalPhoneNumber.bind(this);
    this._search = this._search.bind(this);

    this._handleNewReward = this._handleNewReward.bind(this);
    this._handlePointRequired = this._handlePointRequired.bind(this);
    this._addNewReward = this._addNewReward.bind(this);
    this._handleOfferReward = this._handleOfferReward.bind(this);

    this._handleNewBigWinning = this._handleNewBigWinning.bind(this);
    this._handleOdds = this._handleOdds.bind(this);
    this._addNewBigWinning = this._addNewBigWinning.bind(this);
    this._removeBigWinning = this._removeBigWinning.bind(this);

    this._handleLoyalExtraPoint = this._handleLoyalExtraPoint.bind(this);
    this._handleOfferExtraPoint = this._handleOfferExtraPoint.bind(this);

    this._removeReward = this._removeReward.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      searchDataSource: ds.cloneWithRows([]),
      rewardDataSource: ds2.cloneWithRows([]),
    };
  }

  componentWillMount() {
    if(this.props.store.services.loyal == true){
    	this.props.loadLoyalReward(this.props.store._id);
      this.props.loadRecentBigWinners(this.props.store._id);
      this.props.loadRecentRewardsReceivers(this.props.store._id);
      this.props.updateLoyalMainMessage("Enter customer's phone number to offer rewards");
    }else{
      this.props.updateLoyalMainMessage("Start Columbus Rewards Program today!");
    }
  }

  loadPages(){
    var pages = [];

    pages.push(
        <View key="firstPage" style={{flex:1}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: flexRatio - 1}}>
              <View style={{padding: 15}}>
                <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                    Rewards
                </Text>
                <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.03}}>
                    Compensate your regulars!
                </Text>
              </View>
              <View style={{flex: 1, backgroundColor: '#eee'}}>
              {this.props.customerRewardInfo != undefined ?
                <ListView
                  enableEmptySections={true}
                  dataSource={this.props.customerRewardInfo.availableRewards && this.props.customerRewardInfo.availableRewards.length > 0 ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.customerRewardInfo.availableRewards) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                  renderRow={
                    (rowData) =>
                    <View style={{padding: 15}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}>{rowData.title} <Text style={{color: 'black', backgroundColor: '#15f4ee', fontFamily: 'Arial', fontWeight: 'bold'}}> {rowData.point} </Text> pt </Text>
                        <TouchableHighlight
                          underlayColor='transparent'
                          onPress={this._handleOfferReward.bind(this, rowData.title, rowData.point)}
                        >
                          <Text style={styles.buttonText}>
                            <Text style={{color: 'black', backgroundColor: '#4EBA6F', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}> Select </Text>
                          </Text>
                        </TouchableHighlight>
                      </View>
                      
                    </View>
                  }
                /> 
                : 
                <TouchableWithoutFeedback 
                  onPress={dismissKeyboard}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{color: 'black', fontSize: Dimensions.get('window').width * 0.04, textAlign: 'center', fontWeight: 'bold'}}>
                      { this.props.mainMessage }
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
               }
               </View>
               <View>
               {this.props.store.services.loyal == true ?
                  <View style={{paddingTop: 15}}>
                    {this.props.customerRewardInfo != undefined ?
                      <View style={{backgroundColor: '#FFCF00'}}>
                        <View style={{padding: 15}}>
                          <Text style={{color: 'black', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.06}}>
                             {this.props.customerRewardInfo.phoneNumber}
                          </Text>
                          <Text style={{color: 'black', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.06}}>
                             <Text style={{color: 'black', backgroundColor: '#15f4ee'}}> {this.props.customerRewardInfo.remainingPoint} </Text> pt remaining
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex:3}}>
                            <TextInput
                                keyboardType='numeric'
                                maxLength={14}
                                onChangeText={this._handleLoyalExtraPoint}
                                placeholderTextColor='#88898C'
                                placeholder='Enter extra point you want to offer'
                                style={styles.transInput}
                                value={this.props.extraPoint}
                              />
                          </View>
                          <View style={{flex:1}}>
                            <TouchableHighlight
                              underlayColor='transparent'
                              style={styles.offerButtonContainer}
                              onPress={this._handleOfferExtraPoint}
                            >
                              <Text style={styles.buttonText}>
                                Offer
                              </Text>
                            </TouchableHighlight>
                          </View>
                        </View>
                      </View> : null
                    }
                    <TextInput
                        keyboardType='phone-pad'
                        maxLength={14}
                        onChangeText={this._handleLoyalPhoneNumber}
                        placeholderTextColor='#88898C'
                        placeholder='Enter Phone #'
                        style={styles.transInput}
                        value={this.props.loyalPhoneNumber}
                      />
                    <View style={{height: 55, marginTop: 15}}>
                        <TouchableHighlight
                          underlayColor='transparent'
                          style={styles.buttonContainer}
                          onPress={this._search}
                        >
                          <Text style={styles.buttonText}>
                            Search
                          </Text>
                        </TouchableHighlight>
                    </View>
                  </View> : null
                }
                  <View style={this.props.store.services.loyal == false ? {flex:1, justifyContent:'center'} : null}>
                    <View style={{height: 55}}>
                        <TouchableHighlight
                          underlayColor='transparent'
                          onPress={this._handleSwitch}
                          style={this.props.store.services.loyal == false ? styles.enableLoyalButtonContainer : styles.disabledLoyalButtonContainer}
                        >
                          <Text style={styles.buttonText}>
                            {this.props.store.services.loyal == false ? "Start Columbus Rewards Program" : "Terminate Columbus Rewards Program"}
                          </Text>
                        </TouchableHighlight>
                    </View>
                  </View>
                  <View style={{marginBottom: 55}}></View>   
              </View> 
            </View>
        </View>
    );

    if(this.props.store.services.loyal == true){
      pages.push(
        <View key="rewardsList" style={{flex: 1}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: flexRatio - 1}}>
          <View style={{padding: 15}}>
            <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                Columbus Rewards
            </Text>
            <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.03}}>
                Compensate your regulars!
            </Text>
          </View>
          <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#eee'}}>
          <View>
            <View style={{justifyContent: 'center', padding: 15}}>
              <Text style={{color: 'black', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04}}>
                  Rewards List
              </Text>
            </View>
            <ListView
                enableEmptySections={true}
                dataSource={this.props.loyalReward != undefined && this.props.loyalReward.rewards != undefined && this.props.loyalReward.rewards.length > 0 ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.loyalReward.rewards) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                renderRow={
                  (rowData) =>
                  <View style={{padding: 15}}>
                    <View>
                      <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}>{rowData.title} <Text style={{color: 'black', backgroundColor: '#FFCF00', fontFamily: 'Arial', fontWeight: 'bold' }}> {rowData.point} </Text> pt</Text>
                    </View>
                    <TouchableHighlight
                      underlayColor='transparent'
                      onPress={this._removeReward.bind(this, rowData.title)}
                    >
                      <Text style={styles.buttonText}>
                        <Text style={{color: 'black', backgroundColor: '#ff4b14', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}> Remove </Text>
                      </Text>
                    </TouchableHighlight>
                  </View>
                }
              />
          </View>
          <View>
             <View style={{justifyContent: 'center', padding: 15}}>
                <Text style={{color: 'black', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04}}>
                    Recent Receivers
                </Text>
              </View>
             <ListView
                enableEmptySections={true}
                dataSource={this.props.recentRewardsReceivers != undefined && this.props.recentRewardsReceivers.length > 0 ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.recentRewardsReceivers) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                renderRow={
                  (rowData) =>
                  <View style={{padding: 15}}>
                    <View>
                      <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}>{rowData.phoneNumber} <Text style={{color: 'black', backgroundColor: '#FFCF00', fontFamily: 'Arial', fontWeight: 'bold'}}> {rowData.reward.title} </Text></Text>
                    </View>
                  </View>
                }
              />
          </View>
           </View>
           <View style={{paddingTop: 15}}>
            <TextInput
                onChangeText={this._handleNewReward}
                placeholderTextColor='#88898C'
                placeholder='Enter Reward Name'
                style={styles.transInput}
                autoCapitalize="words"
                value={this.props.newReward}
              />
            <TextInput
                keyboardType='phone-pad'
                onChangeText={this._handlePointRequired}
                placeholderTextColor='#88898C'
                placeholder='Enter Required Points'
                style={styles.transInput}
                value={this.props.pointRequired}
              />
              <View style={{height: 55, marginTop: 15}}>
                  <TouchableHighlight
                    underlayColor='transparent'
                    style={styles.buttonContainer}
                    onPress={this._addNewReward}
                  >
                    <Text style={styles.buttonText}>
                      Add New Reward
                    </Text>
                  </TouchableHighlight>
              </View>
              <View style={{marginBottom: 55}}></View>
           </View>
          </View>
      </View>
      
      );
      pages.push(
       <View key="bigWinnings" style={{flex: 1}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: flexRatio - 1}}>
          <View style={{padding: 15}}>
            <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                Columbus Big Winning
            </Text>
            <Text style={{color: 'white', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.03}}>
                Offer small chances of big winning, which your customers will love
            </Text>
          </View>
          <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#eee'}}>
            <View>
              <View style={{justifyContent: 'center', padding: 15}}>
                <Text style={{color: 'black', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04}}>
                    Bigwinning List
                </Text>
              </View>
              <ListView
                  enableEmptySections={true}
                  dataSource={this.props.loyalReward != undefined && this.props.loyalReward.bigWinnings != undefined && this.props.loyalReward.bigWinnings.length > 0 ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.loyalReward.bigWinnings) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                  renderRow={
                    (rowData) =>
                    <View style={{padding: 15}}>
                      <View>
                        <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}>{rowData.title} <Text style={{color: 'black', backgroundColor: '#FFCF00', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}> 1 : {rowData.odds} </Text> chance</Text>
                      </View>
                      <TouchableHighlight
                        underlayColor='transparent'
                        onPress={this._removeBigWinning.bind(this, rowData.title)}
                      >
                        <Text style={styles.buttonText}>
                          <Text style={{color: 'black', backgroundColor: '#ff4b14', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}> Remove </Text>
                        </Text>
                      </TouchableHighlight>
                    </View>
                  }
                />
              </View>
              <View>
                <View style={{justifyContent: 'center', padding: 15}}>
                  <Text style={{color: 'black', fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04}}>
                      Recent Winners
                  </Text>
                </View>
                <ListView
                  enableEmptySections={true}
                  dataSource={this.props.recentBigWinners != undefined && this.props.recentBigWinners.length > 0 ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.recentBigWinners) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                  renderRow={
                    (rowData) =>
                    <View style={{padding: 15}}>
                      <View>
                        <View>
                          <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}>
                          {rowData.phoneNumber} <Text style={{color: 'black', backgroundColor: '#FFCF00', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.04 }}> {rowData.reward.title} </Text>
                          </Text>
                        </View>
                          
                      </View>
                    </View>
                  }
                />
              </View>
            </View>
           <View style={{paddingTop: 15}}>
            <TextInput
                onChangeText={this._handleNewBigWinning}
                placeholderTextColor='#88898C'
                placeholder='Enter Reward Name'
                style={styles.transInput}
                autoCapitalize="words"
                value={this.props.newBigWinning}
              />
            <TextInput
                keyboardType='phone-pad'
                onChangeText={this._handleOdds}
                placeholderTextColor='#88898C'
                placeholder='Enter Odds'
                style={styles.transInput}
                value={this.props.odds}
              />
              <View style={{height: 55, marginTop: 15}}>
                  <TouchableHighlight
                    underlayColor='transparent'
                    style={styles.buttonContainer}
                    onPress={this._addNewBigWinning}
                  >
                    <Text style={styles.buttonText}>
                      Add New Big Winning
                    </Text>
                  </TouchableHighlight>
              </View>
              <View style={{marginBottom: 55}}></View>
           </View>
          </View>
      </View>
      );
    }

    return pages;
  }

  _handleOfferExtraPoint() {
    function loyalSwitch(){
      this.props.offerExtraPoint(this.props.store._id, this.props.customerRewardInfo.phoneNumber, this.props.extraPoint, this.props.loyalReward);
    }
    var bindedSwitch = loyalSwitch.bind(this);
    Alert.alert(
      'Confirmation',
      'You offer ' + this.props.extraPoint + ' extra points to ' + this.props.customerRewardInfo.phoneNumber + '.',
      [
        {text: 'Confirm', onPress: bindedSwitch},
        {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }

  _handleOfferReward(title, point) {
    function loyalSwitch(phoneNumber, title, point){
      this.props.offerReward(this.props.store._id, phoneNumber, title, point);
    }
    var bindedSwitch = loyalSwitch.bind(this, this.props.customerRewardInfo.phoneNumber, title, point);
    Alert.alert(
      'Confirmation',
      'You offer ' + title + ' (' + point + ') to ' + this.props.customerRewardInfo.phoneNumber + '.',
      [
        {text: 'Confirm', onPress: bindedSwitch},
        {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }

  _handleSwitch(title, point) {
    function loyalSwitch(){
      this.props.serviceSwitch(this.props.store._id, this.props.store.services.loyal == false);
    }
    var bindedSwitch = loyalSwitch.bind(this);
    Alert.alert(
      'Confirmation',
      this.props.store.services.loyal == true ? 'Are you sure you do not want to use Columbus Rewards?' : 'Do you want to use Columbus Rewards?',
      [
        {text: 'YES', onPress: bindedSwitch},
        {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }

  _search() {
  	this.props.searchForReward(this.props.store._id, this.props.loyalPhoneNumber, this.props.loyalReward)
  }

  

  _handleLoyalExtraPoint(text) {
    text = text.match(/\d/g);
    if(text != undefined)
      text = text.join("");
    this.props.updateLoyalExtraPoint(text)
  }

  _handleNewReward(text) {
    this.props.updateLoyalNewReward(text)
  }

  _handlePointRequired(text) {
    text = text.match(/\d/g);
    if(text != undefined)
      text = text.join("");
  	this.props.updateLoyalPointRequired(text)
  }

  _addNewReward() {
    if(this.props.newReward == undefined || this.props.newReward == "" || this.props.pointRequired == undefined || this.props.pointRequired == ""){
      Alert.alert(
        "Sorry",
        "Please enter title and required points",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
  	this.props.addNewReward(this.props.store._id, this.props.newReward,this.props.pointRequired)
  }
  _removeReward(title) {
  	this.props.removeReward(this.props.store._id, title)
  }

  _handleNewBigWinning(text) {
    this.props.updateLoyalBigWinning(text)
  }

  _handleOdds(text) {
    text = text.match(/\d/g);
    if(text != undefined)
      text = text.join("");
    this.props.updateLoyalOdds(text)
  }

  _addNewBigWinning() {
    if(this.props.newBigWinning == undefined || this.props.newBigWinning == "" || this.props.odds == undefined || this.props.odds == ""){
      Alert.alert(
        "Sorry",
        "Please enter title and odds",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.addNewBigWinning(this.props.store._id, this.props.newBigWinning,this.props.odds)
  }
  _removeBigWinning(title) {
    this.props.removeBigWinning(this.props.store._id, title)
  }

  _handleLoyalPhoneNumber(text){
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
    this.props.updateLoyalPhoneNumber(phoneNumber)
  }

  render() {
    return (
      <Swiper style={styles.wrapper} 
            showsButtons={false}
            dot={<View style={{backgroundColor:'#fff', width: 15, height: 15, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
            activeDot={<View style={{backgroundColor: '#f7ff00', width: 15, height: 15,  marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
            >
      
        {this.loadPages()}

      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
   transInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    fontFamily: 'Arial',
    fontSize: 13,
    fontWeight: '200',
    height: 55,
    padding: 15,
  },
  container: {
  },
  buttonContainer: {
	alignItems: 'center',
	backgroundColor: '#fff',
	borderWidth: 0,
	flex: 1,
	justifyContent: 'center',
  },
  offerButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#AAA',
    borderWidth: 0,
    flex: 1,
    justifyContent: 'center',
  },
  enableLoyalButtonContainer: {
	alignItems: 'center',
	backgroundColor: '#19b766',
	borderWidth: 0,
	flex: 1,
	justifyContent: 'center',
  },
  disabledLoyalButtonContainer: {
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
})