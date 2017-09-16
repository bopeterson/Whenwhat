/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


//xxx make sure to check xxx in datepicker/index.js and datepicker/style.js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  TextInput,
  Keyboard,
} from 'react-native';

import DatePicker from 'react-native-datepicker'


//https://facebook.github.io/react-native/releases/0.27/docs/datepickerios.html
//<DatePickerIOS></DatePickerIOS>
//även 
//https://github.com/xgfe/react-native-datepicker/blob/master/index.android.js

//var Mailer = require('react-native-mail');

var Mailer = require('NativeModules').RNMail;

export default class Whenwhat extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      text:'',logtext:'What',
      date: new Date(),
    };
    this.handlePress=this.handlePress.bind(this);
    this.onDateChange=this.onDateChange.bind(this);

//    this.hideKeyboard = this.hideKeyboard.bind(this)
  }
  
  onDateChange(date) {
    this.setState({date: date});
  }
  
  handlePress(e,i) {
    if (this._textInput.isFocused()) {
      Keyboard.dismiss(); //detta funkar inte rakt av, 
      this.setState({logtext:'dismissing'});
        
    } else {
      this.setState({logtext:i});
      
    }

    /*
    Mailer.mail({
          subject: 'need help',
          recipients: ['bo.peterson@mah.se'],
          body: 'Some text',
          isHTML: true,
        }, (error, event) => {
            if(error) {
              AlertIOS.alert('Error', 'Could not send mail. Please send a mail to support@example.com');
            }
        });
    */
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.x1}>
            <Text>{this.state.logtext}</Text>
            <TouchableHighlight>
              <Text>follow up</Text>
            </TouchableHighlight>
          </View>
            <View style={styles.y}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                onBlur={()=>this.setState({buttonOpacity:1.0})}
                onFocus={()=>this.setState({buttonOpacity:0.1})}
                value={this.state.text}
                placeholder={'enter subject here'}
                ref={instance => { this._textInput = instance; }}
              />
            </View>
          <View style={styles.x}>
              <Text>When</Text>

            
          </View>
          <View style={styles.z}>
            <View style={[styles.buttonRow,{opacity:this.state.buttonOpacity}]}>
                <TouchableHighlight style={styles.button1} onPress={(e,i) => this.handlePress(e,1)} underlayColor={'#FFFFFF'} activeOpacity={0.5}>
                <Text style={{textAlign:'center',}}>1</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button1} onPress={(e,i) => this.handlePress(e,2)} underlayColor={'#FFFFFF'} activeOpacity={0.5}>
                <Text style={{textAlign:'center',}}>2</Text>
              </TouchableHighlight>
              <View style={styles.button}>
              </View>
              <View style={styles.button2}>
                <Text>{JSON.stringify(this.state.date)}</Text>
              </View>
            </View>
            <View style={[styles.buttonRow,{opacity:this.state.buttonOpacity}]}>
              <DatePicker
                style={styles.button1}
                date={this.state.date}
                mode="date"
                placeholder="temp"
                format="YYYY-MM-DD"
                onDateChange={this.onDateChange}
              />
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
            </View>
            <View style={[styles.buttonRow,{opacity:this.state.buttonOpacity}]}>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
            </View>
            <View style={[styles.buttonRow,{opacity:this.state.buttonOpacity}]}>
              <TouchableHighlight style={styles.button2} onPress={(e,i) => this.handlePress(e,0)} underlayColor={'#FFFFFF'} activeOpacity={0.5}>
                <Text style={{textAlign:'center',}}>0</Text>
              </TouchableHighlight>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
            </View>
            <View style={[styles.buttonRow,{opacity:this.state.buttonOpacity}]}>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
            </View>
            <View style={[styles.buttonRow,{opacity:this.state.buttonOpacity}]}>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button2}>
              </View>
              <DatePicker
                style={styles.button1}
                date={this.state.date}
                mode="date"
                placeholder="custom"
                format="YYYY-MM-DD"
                onDateChange={this.onDateChange}
              />
                  
                
                
                
                {/*<TouchableHighlight style={styles.button1} onPress={(e,i) => this.handlePress(e,'custom')}>
                <Text style={{textAlign:'center',}}>custom</Text>
              </TouchableHighlight>*/}
            </View>
          </View>
          <View style={styles.x1}>
            <TouchableHighlight>
              <Text>kugghjul</Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text> i </Text>
            </TouchableHighlight>
          </View>
               
                
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  buttonRow: {
    flex:1,
    flexDirection:'row',
    margin:0,
    backgroundColor:'white',
  },
  
  button: {
    flex:1,
    marginRight:1,
    marginBottom:1,
    backgroundColor:'lightyellow',
  },
  button1: {
    //opacity:1,
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    marginRight:1,
    marginBottom:1,
    backgroundColor:'lightyellow',
  },

  button2: {
    flex:2,
    alignItems:'center',
    justifyContent: 'center',
    marginRight:2,
    marginBottom:1,
    backgroundColor:'lightyellow',
  },
   

  x1: {
    flex:0.09,
    backgroundColor:'skyblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  
  x: {
    flex:0.09,
    backgroundColor:'skyblue',
  },
  y: {
    flex:0.07,
    backgroundColor:'lightblue',
  },
  z: {
    flex:0.5,
    backgroundColor:'white',
  },
  
  
  
  container: {
    flex:1,

    //justifyContent: 'center',
    //alignItems: 'center',


    backgroundColor:'lightyellow',
  },
  
  subContainer: {//adjust for status bar on
    flex:1,
    //alignItems:'center',
    marginTop:24, //Environment.statusBarHeight, 
    backgroundColor:'steelblue',
  },  
  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('Whenwhat', () => Whenwhat);
