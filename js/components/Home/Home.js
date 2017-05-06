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
  Dimensions,
  InteractionManager,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'


import dismissKeyboard from 'dismissKeyboard'
import CustomerCell from '../../elements/CustomerCell'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux'
var flexRatio = (Dimensions.get('window').height / 50);

export default class Home extends Component {
  constructor() {
    super();

    this.goMode = this.goMode.bind(this);

    this._handleWaitlistPhoneNumber = this._handleWaitlistPhoneNumber.bind(this);
    this._handleCheckinPhoneNumber = this._handleCheckinPhoneNumber.bind(this);
    this._handleCurrentCustomerName = this._handleCurrentCustomerName.bind(this);
    this._decrementSeats = this._decrementSeats.bind(this);
    this._incrementSeats = this._incrementSeats.bind(this);
    this._handleNewWaitlist = this._handleNewWaitlist.bind(this);
    this._handleNewCheckin = this._handleNewCheckin.bind(this);
    this._handleSubscriptionSwitch = this._handleSubscriptionSwitch.bind(this);

    this.loadPages = this.loadPages.bind(this);
    this.loadMainComponent = this.loadMainComponent.bind(this);
    this.generateBanners = this.generateBanners.bind(this);
 
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    this.props.updateHomeSeats(2);
    this.props.subscriptionSwitch(true);
    if(this.props.store.services.loyal == true){
      console.log("tata");
      this.props.loadLoyalReward(this.props.store._id);
    }
  }
  componentWillUpdate (nextProps, nextState){
    if(this.props.sideBanner == undefined){
      console.log("generate banner");
      this.props.getBanner(this.props.store._id);
    }
  }


  componentDidMount() {
    function autoScroll(){
      var rewardsViewGoTo = 0;
      if(Math.abs(this.refs._rewardsListView.scrollProperties.offset - (this.state.rewardsListHeight - this.state.rewardsViewHeight)) <= 10){
        rewardsViewGoTo = 0;
      }else if(this.refs._rewardsListView.scrollProperties.offset + (this.state.rewardsCellHeight * 2) > this.state.rewardsListHeight - this.state.rewardsViewHeight){
        rewardsViewGoTo = this.state.rewardsListHeight - this.state.rewardsViewHeight;
      }else{
        rewardsViewGoTo = this.refs._rewardsListView.scrollProperties.offset + (this.state.rewardsCellHeight * 2);
      }
      this.refs._rewardsListView.scrollTo({ x: 0, y: rewardsViewGoTo, animated: true });

      var bigWinningViewGoTo = 0;
      if(Math.abs(this.refs._bigWinningListView.scrollProperties.offset - (this.state.bigWinningListHeight - this.state.bigWinningViewHeight)) <= 10){
        bigWinningViewGoTo = 0;
      }else if(this.refs._bigWinningListView.scrollProperties.offset + (this.state.bigWinningCellHeight * 2) > this.state.bigWinningListHeight - this.state.bigWinningViewHeight){
        bigWinningViewGoTo = this.state.bigWinningListHeight - this.state.bigWinningViewHeight;
      }else{
        bigWinningViewGoTo = this.refs._bigWinningListView.scrollProperties.offset + (this.state.bigWinningCellHeight * 2);
      }
      this.refs._bigWinningListView.scrollTo({ x:0, y: bigWinningViewGoTo, animated: true });
    }
    InteractionManager.runAfterInteractions(() => {
      if(this.props.store.services.loyal == true){
        this.state.autoScroll = setInterval(autoScroll.bind(this), 6000);
      }
    });
  }
  componentWillUnmount() {
  }

  _handleSubscriptionSwitch() {
    this.props.subscriptionSwitch(!this.props.subscription);
  }

  _handleCurrentCustomerName(text) {
    this.props.updateHomeCustomerName(text)
  }
  _handleWaitlistPhoneNumber(text) {
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
    this.props.updateWaitlistPhoneNumber(phoneNumber)
  }

  _handleCheckinPhoneNumber(text) {
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
    this.props.updateCheckinPhoneNumber(phoneNumber)
  }

   _decrementSeats() {
    if(this.props.homeSeats > 1){
      this.props.updateHomeSeats(parseInt(this.props.homeSeats) - 1)
    }
  }

  _incrementSeats() {
    if(this.props.homeSeats < 15){
     this.props.updateHomeSeats(parseInt(this.props.homeSeats) + 1)
    }
  }


  _handleNewCheckin() {

    if(this.props.checkinPhoneNumber == undefined || this.props.checkinPhoneNumber.length < 14){
      Alert.alert(
        "Sorry",
        "Please enter your phone number",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.checkin(this.props.store._id, this.props.checkinPhoneNumber, this.props.store.name, !this.props.subscription)
  }

  

  _handleNewWaitlist() {

    if(this.props.waitlistPhoneNumber == undefined || this.props.waitlistPhoneNumber.length < 14){
      Alert.alert(
        "Sorry",
        "Please enter your phone number",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }else if(this.props.homeCustomerName == undefined || this.props.homeCustomerName == ""){
      Alert.alert(
        "Sorry",
        "Please enter your name",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ]
      );
      return;
    }
    this.props.waitlistEnqueue(this.props.store._id, this.props.homeCustomerName, this.props.waitlistPhoneNumber, this.props.homeSeats, !this.props.subscription)
  }

  generateBanners(){
    var banners = [];
    for(var i = 0 ; i < this.props.sideBanner.length; i++){
      banners.push(
        <View key={i} style={{flex: 1, backgroundColor: '#222', justifyContent: 'center'}}>
          <Image
            source={{uri: this.props.sideBanner[i]}}
            style={{flex:1}}
            resizeMode={Image.resizeMode.cover}
          >
          </Image>
        </View>
      );
    }
    return banners;
  }

  loadPages(){
    var pages = [];
    pages.push(
        <View style={{flex: 1, backgroundColor: '#FFCF00'}} key="mainPage">
          <TouchableWithoutFeedback 
            onPress={dismissKeyboard}>
            <View>
              <View style={{height: 20}}></View>
             
            </View>
          </TouchableWithoutFeedback>
          <View style={{flex: flexRatio - 1}}>
            <TouchableWithoutFeedback 
              onPress={dismissKeyboard}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{padding: 15, color: 'black',backgroundColor: '#FFCF00', fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24}}>
                    {this.props.store && this.props.store.name != undefined ? this.props.store.name : "Welcome!"}  
                  </Text> 
                </View>
                 <View>
                    <TouchableHighlight
                        onPress={this.goMode}
                        underlayColor='transparent'
                        style={{padding: 15}}
                      >
                        <Image
                          source={require('../../../public/assets/img/crossIcon.png')}
                          style={{width: 35, height: 35}}
                        />
                    </TouchableHighlight>
                  </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={{flex: 1, flexDirection: 'row'}}>
            {this.loadMainComponent()}              
            </View>
          </View>
        </View>
    );

    if(this.props.store.services.waitlist){
      pages.push(
          <View style={{flex: 1}} key="waitlistPage">
            <View style={{height: 20,backgroundColor: '#FFCF00'}}></View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{padding: 15, color: 'black',backgroundColor: '#FFCF00', fontFamily: 'Arial', fontWeight: 'bold', fontSize: 24}}>
                Waitlist
              </Text> 
            </View>
            <View style={{flex:1 , backgroundColor: '#eee'}}>
              <ListView
                enableEmptySections={true}
                dataSource={this.props.store ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.store.queue) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
                renderRow={
                  (rowData) =>
                  <CustomerCell
                    data={rowData}
                    noRemove={true}/>
                }
              />
            </View>
            <View style={{marginTop: 55}}></View>
          </View>
      );
    }

    return pages;
  }

  loadMainComponent() {
    var mainCompnent = [];
    if(this.props.store.services.waitlist){
      mainCompnent.push(
        <TouchableWithoutFeedback 
              key="Reserve"
              onPress={dismissKeyboard}>
        <View style={{flex: 1, backgroundColor: '#222'}}>
            <View style={{padding: 15}}>
              <Text style={{fontSize: Dimensions.get('window').width * 0.06, fontWeight: 'bold', fontFamily: 'Arial', color: 'white'}}>
                Waitlist
              </Text>
            </View>
            <View style={{padding: 15}}>
              <Text style={{fontSize: Dimensions.get('window').width * 0.04, fontWeight: 'bold', fontFamily: 'Arial', color: '#fff'}}>
                Now, <Text style={{backgroundColor: '#f7ff00', paddingLeft: 40, paddingRight: 40, color: 'black'}}> {this.props.store ? this.props.store.queue.length : ""} </Text> Parties Waiting 
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 15}}>
                <TouchableHighlight
                    style={this.props.subscription ? {backgroundColor: '#FFCF00'} : {backgroundColor: 'white'}}
                    underlayColor='transparent'
                    onPress={this._handleSubscriptionSwitch}
                  >
                  <View style={{width: 30, height: 30}}></View>
                </TouchableHighlight>
                <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
                  <Text style={{fontFamily: 'arial', fontSize: 13}}>Subscribe exclusive offers from {this.props.store.name}</Text>
                </View>
              </View>
              <TextInput
                maxLength={30}
                onChangeText={this._handleCurrentCustomerName}
                placeholderTextColor='#88898C'
                placeholder='Enter Name'
                autoCapitalize="words"
                style={{marginBottom: 15}, styles.transInput}
                value={this.props.homeCustomerName}
              />
              <TextInput
                keyboardType='phone-pad'
                maxLength={14}
                onChangeText={this._handleWaitlistPhoneNumber}
                placeholderTextColor='#88898C'
                placeholder='Enter Phone #'
                style={styles.transInput}
                value={this.props.waitlistPhoneNumber}
              />
              <View style={styles.seatsRow}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  { this.props.homeSeats > 1 ?
                  <TouchableHighlight
                    onPress={this._decrementSeats}
                    underlayColor='transparent'
                  >
                    <Image
                      source={require('../../../public/assets/img/simpleMinus.png')}
                      style={{width: 45, height: 45}}
                    />
                  </TouchableHighlight>
                  : null }
                </View>

                <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center'}}>
                      {this.props.homeSeats}
                  </Text>
                </View>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                   { this.props.homeSeats < 15 ?
                  <TouchableHighlight
                    onPress={this._incrementSeats}
                    underlayColor='transparent'
                  >
                      <Image
                        source={require('../../../public/assets/img/simplePlus.png')}
                        style={{width: 45, height: 45}}
                      />
                  </TouchableHighlight>
                  : null}
                </View>
            </View>{/*seatRow*/}
            <View style={{height: 55, marginTop: 15}}>
                <TouchableHighlight
                  onPress={this._handleNewWaitlist}
                  style={styles.buttonContainer}
                  underlayColor='transparent'
                >
                  <Text style={styles.buttonText}>
                    Reserve
                  </Text>
                </TouchableHighlight>
            </View>
          </View>
          <View style={{marginBottom: 55}}></View>
        </View>
        </TouchableWithoutFeedback>
      );
    }

    if(!this.props.store.services.waitlist && this.props.store.services.loyal){
      mainCompnent.push(
        <TouchableWithoutFeedback 
              key="rewardsSub"
              onPress={dismissKeyboard}>
          <View style={{flex: 1, backgroundColor: '#222'}}>
            {
              this.props.sideBanner != undefined ? 
              <Swiper 
                  key="swip"
                  showsButtons={false} 
                  showsPagination={false}
                  width={Dimensions.get('window').width * 0.5}
                  height={Dimensions.get('window').height - 100}
                  autoplayTimeout={5}
                  autoplay={true}>
                  {this.generateBanners()}
              </Swiper>
               : <View></View>
            }   
          </View>
        </TouchableWithoutFeedback>
      );
    }

    if(this.props.store.services.waitlist && this.props.store.services.loyal){
      mainCompnent.push(
        <View key="divider" style={{width: 15, backgroundColor: 'transparent'}}>
        </View> 
      );
    }

    if(this.props.store.services.waitlist && !this.props.store.services.loyal){
      mainCompnent.push(
         <TouchableWithoutFeedback 
              key="waitlistSub"
              onPress={dismissKeyboard}>
          <View style={{flex: 1, backgroundColor: '#222'}}>    
            {
              this.props.sideBanner != undefined ? 
              <Swiper
                  showsButtons={false} 
                  showsPagination={false}
                  width={Dimensions.get('window').width * 0.5}
                  height={Dimensions.get('window').height - 100}
                  autoplayTimeout={5}
                  autoplay={true}>
                    {this.generateBanners()}
              </Swiper>
               : <View></View>
            }   
          </View>
        </TouchableWithoutFeedback>
      );
    }

    if(this.props.store.services.loyal){
      mainCompnent.push(
        <View key="Checkin" style={{flex:1, backgroundColor: '#EEE'}}>
          <TouchableWithoutFeedback 
              onPress={dismissKeyboard}>
            <View>
              <View style={{padding: 15}}>
                <Text style={{fontSize: Dimensions.get('window').width * 0.06, fontWeight: 'bold', fontFamily: 'Arial', color: 'black'}}>
                  Check-in
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {this.props.loyalReward !=undefined && this.props.loyalReward.rewards != undefined && this.props.loyalReward.rewards.length > 0  ?
            <View style={{padding: 15, backgroundColor: 'rgba(255,255,255,0.7)'}}>
              <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.025 }}>Get following rewards</Text>
            </View>
            :null}
          <ListView
            enableEmptySections={true}
            ref='_rewardsListView'
            onLayout={ (e) => {
              const height = e.nativeEvent.layout.height
              this.setState({rewardsViewHeight: height })
            }}
            onContentSizeChange={ (contentWidth, contentHeight) => {
              this.setState({rewardsListHeight: contentHeight })
            }}
            dataSource={this.props.loyalReward !=undefined && this.props.loyalReward.rewards != undefined && this.props.loyalReward.rewards.length > 0 ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.loyalReward.rewards) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
            renderRow={
              (rowData) =>
              <View 
                onLayout={ (e) => {
                  const height = e.nativeEvent.layout.height
                  this.setState({rewardsCellHeight: height })
                }}
                style={{padding: 15, backgroundColor: 'rgba(255,255,255,0.7)'}}>
                <View>
                  <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.025 }}>{rowData.title} <Text style={{color: 'black', backgroundColor: '#FFCF00', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.03 }}> {rowData.point} </Text> pt</Text>
                </View>
              </View>
            }
          />

          {this.props.loyalReward != undefined && this.props.loyalReward.bigWinnings != undefined && this.props.loyalReward.bigWinnings.length > 0 ?
            <View style={{padding: 15}}>
              <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.025}}>Every check-in, chance of big winning!</Text>
            </View>
            :null}
          <ListView
            enableEmptySections={true}
            ref='_bigWinningListView'
            onLayout={ (e) => {
              const height = e.nativeEvent.layout.height
              this.setState({bigWinningViewHeight: height })
            }}
            onContentSizeChange={ (contentWidth, contentHeight) => {
              this.setState({bigWinningListHeight: contentHeight })
            }}
            dataSource={this.props.loyalReward !=undefined && this.props.loyalReward.bigWinnings != undefined && this.props.loyalReward.bigWinnings.length > 0 ? new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.loyalReward.bigWinnings) : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])}
            renderRow={
              (rowData) =>
              <View 
                onLayout={ (e) => {
                  const height = e.nativeEvent.layout.height
                  this.setState({bigWinningCellHeight: height })
                }}
                style={{padding: 15}}>
                <View>
                  <Text style={{color: 'black', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.025 }}>{rowData.title} <Text style={{color: 'white', backgroundColor: '#F25B5B', fontFamily: 'Arial', fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.03 }}> 1 : {rowData.odds} </Text> chance!</Text>
                </View>
              </View>
            }
          />
          <TouchableWithoutFeedback 
              onPress={dismissKeyboard}>
            <View style={{justifyContent: 'flex-end', marginBottom: 55}}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 15}}>
                  <TouchableHighlight
                      style={this.props.subscription ? {backgroundColor: '#FFCF00'} : {backgroundColor: 'white'}}
                      underlayColor='transparent'
                      onPress={this._handleSubscriptionSwitch}
                    >
                    <View style={{width: 30, height: 30}}></View>
                  </TouchableHighlight>
                  <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
                    <Text style={{fontFamily: 'arial', fontSize: 13}}>Subscribe exclusive offers from {this.props.store.name}</Text>
                  </View>
                </View>
                <TextInput
                  keyboardType='phone-pad'
                  maxLength={14}
                  onChangeText={this._handleCheckinPhoneNumber}
                  placeholderTextColor='#88898C'
                  placeholder='Enter Phone #'
                  style={styles.transInput}
                  value={this.props.checkinPhoneNumber}
                />
                <View style={{height: 55, marginTop: 15}}>
                  <TouchableHighlight
                      style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', flex: 1}}
                      underlayColor='transparent'
                      onPress={this._handleNewCheckin}
                    >
                    <Text style={styles.buttonText}>Check In</Text>
                  </TouchableHighlight>
                </View>
            </View>
          </TouchableWithoutFeedback>

        </View>
      );
    }
    return mainCompnent;
  }

  goMode(){
    if(this.props.store.services.loyal == true)
      clearInterval(this.state.autoScroll);

    this.props.resetBanner();
    Actions.mode();
  }

  render() {
    var estmin = '';
    if(this.props.store != undefined && this.props.store.estmin){
      if(!(this.props.store.waiting == undefined || this.props.store.waiting == 0)){
        estmin = "" + (this.props.store.estmin * this.props.store.waiting) + " Min Wait";
      }
        
    }
    return (
        <View>
          <Swiper style={styles.wrapper} 
            showsButtons={false}
            dot={<View style={{backgroundColor:'#fff', width: 15, height: 15, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
            activeDot={<View style={{backgroundColor: '#FFCF00', width: 15, height: 15,  marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
            >
            {this.loadPages()}
          </Swiper>
        </View>
    )
  }
  
}

var styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapper: {
    paddingTop: 15,
  },
  slide: {
    flex: 1,
  },
  seatsRow:{
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  transInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    fontFamily: 'Arial',
    fontSize: 13,
    fontWeight: '200',
    height: 55,
    padding: 15,
  },
})
