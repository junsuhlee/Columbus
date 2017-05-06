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
} from 'react-native'

var flexRatio = (Dimensions.get('window').height / 50);
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'


import Chart from 'react-native-chart';


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
} 
if(mm<10){
    mm='0'+mm
} 

export default class Analytic extends Component {
  constructor() {
    super();

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var tomorrowDD = tomorrow.getDate();
    var tomorrowMM = tomorrow.getMonth()+1;
    var tomorrowYYYY = tomorrow.getFullYear();

    if(tomorrowDD<10){
        tomorrowDD='0'+tomorrowDD;
    } 
    if(tomorrowMM<10){
        tomorrowMM='0'+tomorrowMM;
    } 

    this.state = {
    	data: [
		    [1, 5],
		    [2, 6],
		    [3, 7],
		    [4, 2]
		],
		fromDate: yyyy + '-' + mm + '-' + dd,
		toDate: yyyy + '-' + tomorrowMM + '-' + tomorrowDD,
		type: 'hour',
    };

    this._setFromDate = this._setFromDate.bind(this);
    this._setToDate = this._setToDate.bind(this);
    this._setType = this._setType.bind(this);
    
  }

  componentWillMount(){
    console.log(this.state);
  	this.props.setDate(this.state.fromDate, this.state.toDate, this.props.store._id, this.state.type);
  }

  _setType(type) {
  	this.state.type = type;
  	this.props.setDate(this.state.fromDate, this.state.toDate, this.props.store._id, this.state.type);
  	this.setState({});
  }

  _setFromDate(date) {
  	console.log("set date start" + date);
  	this.state.fromDate = date;
  	this.props.setDate(this.state.fromDate, this.state.toDate, this.props.store._id, this.state.type);
  	this.setState({});
  }

  _setToDate(date) {
  	console.log("set date start" + date);
  	this.state.toDate = date;
  	this.props.setDate(this.state.fromDate, this.state.toDate, this.props.store._id, this.state.type);
  	this.setState({});
  }


  render() {
 
 	

    return (
        <View style={styles.container}>
          <View style={{flex: 1}}></View>
          <View style={{flex: flexRatio - 1}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'white', padding: 15, fontFamily: 'Arial', textAlign: 'left' ,fontWeight: 'bold', fontSize: Dimensions.get('window').width * 0.09}}>
                  Analytic
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingTop: 15}}>
          	<View style={{flexDirection: 'row'}}>
  	        	<View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
  		            <DatePicker
  				        style={{height: 45}}
  				        date={this.state.fromDate}
  				        mode="date"
  				        placeholder="select date"
  				        format="YYYY-MM-DD"
  				        minDate={(yyyy - 1) + '-' + mm + '-' + dd}
  				        maxDate={yyyy + '-' + mm + '-' + dd}
  				        confirmBtnText="Confirm"
  				        cancelBtnText="Cancel"
  				        showIcon={false}
  				        customStyles={{
  				          dateInput: {
  				            borderWidth: 0,
  				            backgroundColor: '#FFCF00',
  				          },
  				          dateText: {
  				          	fontFamily: 'Arial',
  				          	color: 'black',
                      fontWeight: 'bold',
  				          	fontSize: Dimensions.get('window').width * 0.03,
  				          }
  				        }}
  				        onDateChange={this._setFromDate}
  				      />
  				     <View style={{alignItems: 'center', justifyContent: 'center', height: 40, backgroundColor: 'transparent'}}>
    				     <Text 
    				     		style={{color: 'white',
    				     		    textAlign: 'center',
    				     		    fontFamily: 'Arial',
                        fontWeight: 'bold',
    				          	fontSize: Dimensions.get('window').width * 0.03
    				          	}}> - </Text>
  				     </View>
  		             <DatePicker
  				        style={{height: 45}}
  				        date={this.state.toDate}
  				        mode="date"
  				        placeholder="select date"
  				        format="YYYY-MM-DD"
  				        minDate={(yyyy - 1) + '-' + mm + '-' + dd}
  				        maxDate={yyyy + '-' + mm + '-' + dd}
  				        confirmBtnText="Confirm"
  				        cancelBtnText="Cancel"
  				        showIcon={false}
  				        customStyles={{
  				          dateInput: {
  				            borderWidth: 0,
  				            backgroundColor: '#FFCF00'
  				          },
  				          dateText: {
  				          	fontFamily: 'Arial',
  				          	color: 'black',
                      fontWeight: 'bold',
  				          	fontSize: Dimensions.get('window').width * 0.03,
  				          }
  				        }}
  				        onDateChange={this._setToDate}
  				      />
  			      </View>
  			      <View style={{flex:0.3}}></View>
  		    </View>

          	<View style={{marginTop: 10, flex:1, justifyContent: 'center'}}>
          		{this.props.chartData != undefined ?
          			<Chart
  		                style={{width: Dimensions.get('window').width * 1.0, height: Dimensions.get('window').height * 0.5}}
  		                data={this.props.chartData}
  		                type="line"
  		                color="#FFCF00"
  		                lineWidth={5}
  		                axisColor="#fff"
  		                axisLabelColor="#fff"
  		                tightBounds={true}
  		                yAxisWidth={40}
  		                xAxisHeight={40}
  		                showDataPoint={false}
  		                axisLineWidth={3}
  		          	
  		                hideHorizontalGridLines={true}
  		                verticalGridStep={1}
  		             /> : null
          		}
               </View>
               </View>
               <View style={{paddingTop: 15}}>
               	<View style={{flexDirection: 'row'}}>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'Monday')}
               			>
               			<Text style={this.state.type == 'Monday' ? styles.buttonClicked : styles.button}>Mon</Text>
               		</TouchableHighlight>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'Tuesday')}
               			>
               			<Text style={this.state.type == 'Tuesday' ? styles.buttonClicked : styles.button}>Tue</Text>
               		</TouchableHighlight>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'Wednesday')}
               			>
               			<Text style={this.state.type == 'Wednesday' ? styles.buttonClicked : styles.button}>Wed</Text>
               		</TouchableHighlight>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'Thursday')}
               			>
               			<Text style={this.state.type == 'Thursday' ? styles.buttonClicked : styles.button}>Thu</Text>
               		</TouchableHighlight>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'Friday')}
               			>
               			<Text style={this.state.type == 'Friday' ? styles.buttonClicked : styles.button}>Fri</Text>
               		</TouchableHighlight>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'Saturday')}
               			>
               			<Text style={this.state.type == 'Saturday' ? styles.buttonClicked : styles.button}>Sat</Text>
               		</TouchableHighlight>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'Sunday')}
               			>
               			<Text style={this.state.type == 'Sunday' ? styles.buttonClicked : styles.button}>Sun</Text>
               		</TouchableHighlight>
               	</View>
               	<View style={{flexDirection: 'row'}}>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'hour')}
               			>
               			<Text style={this.state.type == 'hour' ? styles.halfButtonClicked : styles.halfButton}>Hourly</Text>
               		</TouchableHighlight>
               		<TouchableHighlight
                    style={styles.buttonContainer}
               			onPress={this._setType.bind(this, 'day')}
               			>
               			<Text style={this.state.type == 'day' ? styles.halfButtonClicked : styles.halfButton}>Daily</Text>
               		</TouchableHighlight>
               	</View>
               </View>
             </View>
          </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
	   flex: 1,
	   justifyContent: 'center',
  },
  buttonContainer: {
    
  },
  buttonClicked: {
  	color: 'black',
  	backgroundColor: 'white',
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
  	textAlign: 'center',
    padding:15,
  	width: Dimensions.get('window').width > 300 ? Dimensions.get('window').width / 7: Dimensions.get('window').width * 0.33
  },
  button: {
  	color: 'white',
    padding:15,
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: Dimensions.get('window').width > 300 ? Dimensions.get('window').width / 7: Dimensions.get('window').width * 0.33
  },
  halfButtonClicked: {
  	color: 'black',
    padding:15,
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
  	backgroundColor: 'white',
  	width: Dimensions.get('window').width/2
  },
  halfButton: {
  	color: 'white',
    padding:15,
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
  	textAlign: 'center',
    width: Dimensions.get('window').width/2
  },
})