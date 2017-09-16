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
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import DatePicker from 'react-native-datepicker'


//har nu lagt på github

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
      overlayShow: false,
    };
    this.handlePress=this.handlePress.bind(this);
    this.onDateChange=this.onDateChange.bind(this);
    this.openOverlay = this.openOverlay.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);

//    this.hideKeyboard = this.hideKeyboard.bind(this)
  }
  

  openOverlay() {
    this.setState({ overlayShow: true });
  }

  closeOverlay() {
    this.setState({ overlayShow: false });
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
  
  // i textinput
  //onFocus={()=>this.setState({buttonOpacity:0.1})}
                
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
      
          <View style={styles.x1}>
      
            <Text>{this.state.logtext}</Text>
            <TouchableHighlight onPress={this.openOverlay}>
              <Text>follow up</Text>
            </TouchableHighlight>
          </View>
            <View style={styles.y}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                onBlur={()=>this.setState({buttonOpacity:1.0})}
                onFocus={()=>this.openOverlay()}
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
                
          <AnimatedOverlay
                backgroundColor={'black'}
                opacity={0.5}
                onPress={this.closeOverlay}
                overlayShow={this.state.overlayShow}
          />
                
                
                
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
  
  overlay: { //should go in separate overaly file
    flex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
  },  
  
});

AppRegistry.registerComponent('Whenwhat', () => Whenwhat);

//should go in separate overaly file
class AnimatedOverlay extends Component {
  props: {
    onPress?: () => void;
    backgroundColor?: string;
    opacity?: number;
    duration?: number;
    overlayShow?: boolean;
    pointerEvents?: string;
    initValue?: number;
    onAnimationFinished?: (value: number) => void;
    style?: any;
    useNativeDriver: boolean;
    children?: any;
  }

  static defaultProps = {
    onPress: () => {},
    pointerEvents: null,
    backgroundColor: '#000',
    opacity: 0.5,
    duration: 300,
    overlayShow: false,
    initValue: 0,
    onAnimationFinished: () => {},
    style: null,
    useNativeDriver: false,
    children: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(props.initValue),
      overlayShow: props.overlayShow,
    };
  }

  componentDidMount() {
    this.doAnimation();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.overlayShow !== nextProps.overlayShow) {
      this.setState({ overlayShow: nextProps.overlayShow });
    }
  }

  componentDidUpdate() {
    this.doAnimation();
  }

  doAnimation() {
    const {
      overlayShow,
      opacity,
      duration,
      onAnimationFinished,
      useNativeDriver,
    } = this.props;

    const toValue = overlayShow ? opacity : 0;
    Animated.timing(this.state.opacity, {
      toValue,
      duration,
      useNativeDriver,
    }).start(() => {
      onAnimationFinished(toValue);
    });
  }

  render() {
    let { pointerEvents } = this.props;
    const { onPress, style, children } = this.props;
    const backgroundColor = { backgroundColor: this.props.backgroundColor };
    const opacity = { opacity: this.state.opacity };
    const size = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    };

    if (!pointerEvents) pointerEvents = this.state.overlayShow ? 'auto' : 'none';

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[styles.overlay, backgroundColor, size, style, opacity]}
      >
        <TouchableOpacity onPress={onPress} style={[styles.overlay, size]} />
        {children}
      </Animated.View>
    );
  }
}

