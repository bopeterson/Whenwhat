/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  DatePickerIOS,
} from 'react-native';


https://facebook.github.io/react-native/releases/0.27/docs/datepickerios.html
<DatePickerIOS></DatePickerIOS>


//var Mailer = require('react-native-mail');

var Mailer = require('NativeModules').RNMail;

export default class Whenwhat extends Component {
  
  constructor(props) {
    super(props);
    this.state={text:'',logtext:'What'};
    this.handlePress=this.handlePress.bind(this);
//    this.hideKeyboard = this.hideKeyboard.bind(this)
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
            <TouchableOpacity>
              <Text>follow up</Text>
            </TouchableOpacity>
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
                <TouchableOpacity style={styles.button1} onPress={(e,i) => this.handlePress(e,1)}>
                <Text style={{textAlign:'center',}}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={(e,i) => this.handlePress(e,2)}>
                <Text style={{textAlign:'center',}}>2</Text>
              </TouchableOpacity>
              <View style={styles.button}>
              </View>
              <View style={styles.button2}>
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
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
              <View style={styles.button}>
              </View>
            </View>
            <View style={[styles.buttonRow,{opacity:this.state.buttonOpacity}]}>
              <TouchableOpacity style={styles.button2} onPress={(e,i) => this.handlePress(e,0)}>
                <Text style={{textAlign:'center',}}>0</Text>
              </TouchableOpacity>
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
              <TouchableOpacity style={styles.button1} onPress={(e,i) => this.handlePress(e,'custom')}>
                <Text style={{textAlign:'center',}}>custom</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.x1}>
            <TouchableOpacity>
              <Text>kugghjul</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text> i </Text>
            </TouchableOpacity>
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
