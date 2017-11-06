/* kvar att göra
layout settings
text och layout instructions

byt set och infoknappar till kugghjul och i (som måste göras orangea)

testa ipadlayout
testa iphone 5/SE

fixa så att tangentbord inte försvinner efter custom

byt ut retur mot skicka i tangentbordet

top bar iphone x

portrait ipad

kanske ha vit status på iphone, men inte på ipad? 

*/

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
  Image,
  NativeModules,
  AsyncStorage,
  Button,
  Switch,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';

//npm install --save react-navigation
import { 
  StackNavigator,
  NavigationActions,
} from 'react-navigation';

import DatePicker from 'react-native-datepicker'
import Moment from 'moment';

let smsGlobal=false;

const {width:screenwidth, height:screenheight}=Dimensions.get('window');
const maxDim=Math.max(screenheight,screenwidth); //width if landscape, height if portrait
const minDim=Math.min(screenheight,screenwidth); //width if portrait, height if landscape
const isPhone=((maxDim/minDim)>(4.5/3) ? true : false);
console.log("maxdim",maxDim,"mindim",minDim,"isphone",isPhone);

const whenwhatContainerFlex=0.07;//0.09;
const textInputContainerFlex=0.06;//0.07;
const buttonRowContainerFlex=0.55;
const gearInfoContainerFlex=1-(whenwhatContainerFlex+textInputContainerFlex+buttonRowContainerFlex);
const numberOfButtonRows=6;
const subContainerHeight=(isPhone?maxDim:minDim)-24;
const subContainerWidth=minDim;
const buttonRowHeight=0.1*Math.floor(((isPhone?maxDim:minDim)-24)/numberOfButtonRows*buttonRowContainerFlex);
const buttonWidth=Math.floor(minDim/5+0.5);

const getOrientation = () => (
  Dimensions.get('window').width>Dimensions.get('window').height ? 'LANDSCAPE' : 'PORTRAIT'
);

  


const getSms = () => {
  //true if sms is activated
  //only reads global variable
  return smsGlobal;
}

const setSms = (value) => {
  //sets both global variable and storage
  AsyncStorage.setItem('sms', value ? 'on':'off'); //
  smsGlobal = value; 
}

const smsStorageToGlobal = () => {
  AsyncStorage.getItem('sms').then((value) => {smsGlobal = (value==='on' ? true : false)});
}


let locale = NativeModules.SettingsManager.settings.AppleLocale.replace('_','-');
console.log(locale);
console.log(NativeModules.SettingsManager.settings);


//https://facebook.github.io/react-native/releases/0.27/docs/datepickerios.html
//<DatePickerIOS></DatePickerIOS>
//även 
//https://github.com/xgfe/react-native-datepicker/blob/master/index.android.js

//var Mailer = require('react-native-mail');

var Mailer = require('NativeModules').RNMail;

const lightOrange = '#FEB36E';

const days = ['mon','tue','wed','thu','fri','sat','sun','tomorrow'];
const daysLong = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','tomorrow'];
const units = ['minute','hour','day','week','month','year'];
const unitsPlural = ['minutes','hours','days','weeks','months','years'];

export default class MainView extends Component {
  
  static navigationOptions = {
    title: 'Whenwhat',
    //gesturesEnabled: false,
    header: null,
  };
  
  constructor(props) {
    super(props);
    this.state={
      text:'',
      logtext:'What',
      digit: 0,
      category: 'DIGITUNIT',
      day: 0,
      unit: 0,
      date: null,
      overlayShow: false,
    };
    
    smsStorageToGlobal();
    
    
    
    this.handleDigitPress=this.handleDigitPress.bind(this);
    this.handleUnitPress=this.handleUnitPress.bind(this);
    this.handleDayPress=this.handleDayPress.bind(this);
    this.handleBackPress=this.handleBackPress.bind(this);
    this.handleSettingsPress=this.handleSettingsPress.bind(this);
    this.handleInfoPress=this.handleInfoPress.bind(this);
    this.onDateChange=this.onDateChange.bind(this);
    this.openOverlay = this.openOverlay.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.fadeInOutParent = this.fadeInOutParent.bind(this);
    this.focus = this.focus.bind(this);
    this.resetStates = this.resetStates.bind(this);
    this.prettyPrint = this.prettyPrint.bind(this);
    this.sendButtonDimmed = this.sendButtonDimmed.bind(this);
    this.sendMail=this.sendMail.bind(this);
    
  }
  
  componentDidMount() {
    console.log('Main View did mount and ugly global is '+smsGlobal);
    setTimeout(()=>{console.log('Main View mounted a while ago and ugly global is '+smsGlobal)},1000);

  }

  keyboardDidShow (e) {
      const { height, screenX, screenY, width } = e.endCoordinates.height
      console.log(height)
  }

  openOverlay() {
    this.setState({ overlayShow: true });
  }

  closeOverlay() {
    if (this._textInput.isFocused()) {
      Keyboard.dismiss(); //detta funkar inte rakt av, 
      this.setState({logtext:'dismissing'});
    }
    this.setState({ overlayShow: false });
  }
  
  onDateChange(date) {
    console.log('ondatechange');
    this.setState({category:'CUSTOM',date: date});
  }
  
  handleDigitPress(e,i) {
    let digit=this.state.digit;
    let category=this.state.category;
    console.log("button "+i+" pressed");
    //set digit to zero if day or custom was selected right before. otherwise old digit would be concatenated to pressed digit
    if (category != 'DIGITUNIT') {
        digit=0;
        category='DIGITUNIT';
    }
    
    if (digit<100) {
        digit=digit*10+i;
    }
    this.setState({digit:digit,category:category});
  }

  handleUnitPress(e,i) {
    if (this.state.digit==0) {
      this.setState({digit:1});
    }
    this.setState({category:'DIGITUNIT',unit:i});
    console.log("unit pressed: "+i);
  }


  handleDayPress(e,i) {
      this.setState({category:'DAY',day:i});
  }
  
  prettyPrint() {
    let pretty='';
    const {digit, unit, category, day} = this.state;
    if (category=='DIGITUNIT') {
      if (digit==0) {
        //this could logically be handled by the option below, but in formalTime it needs its own option. 
        pretty=digit+" "+unitsPlural[unit];
      } else {
        pretty=digit+" "+(digit!=1?unitsPlural[unit]:units[unit]);
      }
    } else if (category=='CUSTOM') {
      pretty=this.state.date.toLocaleDateString(locale)+'\n'+
             this.state.date.toLocaleTimeString(locale, {hour:'2-digit',minute:'2-digit'});
    } else if (category=='DAY') {
      pretty=daysLong[day];
    } else {
      pretty='?';
    }
    return pretty;
  }
  
  formalTime() {
    let formal='';
    const {digit, unit, category, day} = this.state;
    if (category=='DIGITUNIT') {
      if (digit==0) {
        //0 units actually translates to 1 hour by followupthen, so if 0 minutes is intended to mean "now" it wont work. Set to 1 min instead
        formal='1minute';
      } else {
        formal=digit+(digit!=1?unitsPlural[unit]:units[unit]);
      }
    } else if (category=='CUSTOM') {
      //use format 1124pm2017-10-28. am/pm acts as separator between time and date
      //This can also be used 2324.28.Oct.2017
      const customFormat='hhmmaYYYY-MM-DD';
      formal=Moment(this.state.date).format(customFormat);
    } else if (category=='DAY') {
      formal=daysLong[day];
    } else {
      formal='notvalid';
    }
    if (getSms()) {
      formal = formal + '-sms';
    }
    return formal;
  }


  handleBackPress(e,i) {
    console.log("backpress");
    if (this.state.category=='DIGITUNIT') {
      this.setState((prevState, props) => ({
        digit: Math.floor(prevState.digit/10)
      }));  
    }
  }
  
  handleSettingsPress(e,i) {
    const { navigate } = this.props.navigation;
    navigate('Settings');
    
  }

  handleInfoPress(e,i) {
    const { navigate } = this.props.navigation;
    navigate('Instructions',{'key1':'value1','key2':'value2'});

  }

  sendButtonDimmed() {
    console.log("sendbuttondimmed")
    return (this.state.text.length==0);
  }
  
  focus() {
    console.log(this._textInput.isFocused());
    this._textInput.focus();
  }
  
  sendMail(e) {
    //event argument not used

    Mailer.mail({
      subject: this.state.text,
          recipients: [this.formalTime()+'@followupthen.com'],
          body: this.state.text,
          isHTML: false,
        }, (error, event) => {
          console.log("event: "+JSON.stringify(event,null,4));
                    
            if(error) {
              AlertIOS.alert('Error', 'Not configured to send email');
            } else {
              if (event=="sent") {
                this.fadeInOutParent();
                this.resetStates();
              } else if (event=="cancelled") {
                //do nothing
              }
            }
        });
  }
  
  resetStates() {
    this.setState(
      {      
        text:'',
        digit: 0,
        category: 'DIGITUNIT',
        day: 0,
        unit: 0,
        date: null,
        overlayShow: false,
      }
    )
    this.focus();
  }
  
  fadeInOutParent() {
    this._animated.fadeInOutChild();
  }
  
  
  /*
  onNavigationStateChange(prevState, newState, action) {
    console.log("navigation state change");
  }
  */
  
  
/* old text input  
<View style={styles.textInputContainer}>
  <TextInput
    style={styles.textInput}
    onChangeText={(text) => this.setState({text})}
    autoFocus={true}
    onBlur={()=>this.closeOverlay()}
    onFocus={()=>this.openOverlay()}
    value={this.state.text}
    placeholder={'enter subject'}
    ref={instance => { this._textInput = instance; }}
  />
</View>
*/
/*  
        <View style={styles.subContainer}>
          <View style={styles.whenwhatContainer}>
            <Text style={[styles.whenwhat]}>{'Whenwhat'}</Text>
            <WWButton width={{a:2,b:7}} showBorderLeft={true} showBorderRight={true} showBorderTop={true} showBorderBottom={true} text={'follow up'} dimmed={this.sendButtonDimmed()} textStyle={styles.buttonText} onPress={(e,i) => this.sendMail()} />
          </View>
          <ButtonRowContainer date={this.state.date}/>
        </View>

  */
  
//          <ButtonRowContainer date={this.state.date}/>
//      <KeyboardAvoidingView behavior="padding" style={[styles.form,{backgroundColor:'pink'}]}>

  
  render() {
    return (
      <View style={styles.container}>
      <View style={{height:24,backgroundColor:'transparent'}} />
      
      
      
        
      <KeyboardAvoidingView behavior="padding" style={[styles.form,{backgroundColor:lightOrange}]}>
    <View style={{flex:1}}>
      <ButtonRowContainer 
        handleDigitPress={this.handleDigitPress} 
        handleUnitPress={this.handleUnitPress} 
        handleDayPress={this.handleDayPress} 
        handleBackPress={this.handleBackPress} 
        handleSettingsPress={this.handleSettingsPress} 
        handleInfoPress={this.handleInfoPress}
        prettyPrint={this.prettyPrint}
        date={this.state.date}
        onDateChange={this.onDateChange}
        dimmed={this.sendButtonDimmed()}
        handleFollowUpPress={this.sendMail}
      />
    <FadeInOut
        style={[styles.fadeInOut,{}]}
        ref={instance => { this._animated = instance; }}
        children={<Text style={{color:'darkorange',fontSize:30}}>mail sent</Text>}
    />
        
    </View>
    <TextInput
      style={[styles.input,{backgroundColor:'white'}]}
      onChangeText={(text) => this.setState({text:text})}
      autoFocus={true}
      onBlur={()=>this.closeOverlay()}
      onFocus={()=>this.openOverlay()}
      value={this.state.text}
      placeholder={'enter subject'}
      ref={instance => { this._textInput = instance; }}
    />
  </KeyboardAvoidingView>

      </View>
      
      
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  input: {
    margin: 14,
    marginBottom: 4,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: 'darkorange',
    borderWidth: 1,
    fontSize: 16,
  },

  buttonRow: {
    flex:1,
    //height:buttonRowHeight,
    flexDirection:'row',
    margin:0,
    backgroundColor:'white',
  },

  buttonText: {
    color: 'darkorange',
    fontSize: 14,
    //textAlign:'content', //doesn't make any difference
  },
  
  
  button: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderTopColor: 'darkorange',
    borderLeftColor: 'darkorange',
    borderBottomColor: 'darkorange',
    borderRightColor: 'darkorange',
  },


  dateDisplay: {
    flex:1,
    borderColor: 'darkorange',
    borderTopWidth:StyleSheet.hairlineWidth,
    borderLeftWidth:StyleSheet.hairlineWidth,
    borderRightWidth:StyleSheet.hairlineWidth,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:lightOrange,
  },

  dateDisplayText: {
    textAlign: 'center',
    fontSize: 16,
  },

  whenwhatContainer: {
    flex:whenwhatContainerFlex,
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },
   


  gearInfoContainer: {
    flex:gearInfoContainerFlex,
    backgroundColor:lightOrange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    
  },
  
  
  
  textInputContainer: {
    flex:textInputContainerFlex,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:lightOrange,
  },
  


  
  buttonRowContainer: {
    flex:1,//buttonRowContainerFlex,
    backgroundColor:lightOrange,
  },
  
  whenwhat: {
    color:'orange',
    fontSize:36, //height seems to bo 20% more than fontSize. max 40 works on iphone 5
    marginLeft:14,
    alignSelf:'center',
  },
  
  
  container: {
    flex:1,
    width:minDim,
    //justifyContent: 'center',
    //alignItems: 'center',
    alignSelf:'center',
    backgroundColor:'transparent',
  },
  
  subContainer: {//adjust for status bar on top
    flex:1,
    //height:subContainerHeight,
    //width:subContainerWidth,
    //marginTop:24, //Environment.statusBarHeight, 
    backgroundColor:lightOrange,
  },  
  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  
  overlay: {
    flex: 1,
    top: 0,
    left: 0,
    height:0.0*subContainerHeight, //xxx
    width:subContainerWidth, //xxx
    position: 'absolute',
  },
  
  
  fadeInOut: {
    flex:1,
    flexDirection: 'column',
    position:'absolute',
    top:30,
    left: minDim/2-200/2,
    width: 200,
    height: 200,
    borderColor:'orange',
    borderWidth: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
  },  

});


class SettingsView extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  
  constructor(props) {
    super(props)
    this.state = {
      smsSwitch: getSms(),
    }
  }

  toggleSmsSwitch(value) {
    this.setState({smsSwitch:value});
    setSms(value);
  }

  render () {
    return (
      <View>
        <Text>sms-reminder</Text>
    <Switch 
      onValueChange={(value) => this.toggleSmsSwitch(value)} 
      value={ this.state.smsSwitch } 
    />
      
      </View>
    )
  }
}

class InstructionsView extends React.Component {
  static navigationOptions = {
    title: 'Instructions',
  };
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  }


  render () {
    return (
      <View>
        <Text>Instructions</Text>
       </View>
    )
  }
}

const MainNavigator = StackNavigator(
  {
    //Start: { screen: StartScreen },
    Main: { screen: MainView },
    Settings: { screen: SettingsView },
    Instructions: { screen: InstructionsView },

  },{
    //headerMode:'none' //use header for each navigator instead
  }
);

class WWButton extends Component {

  //slots=0: use flex 1, for the rightmost buttons to fill the remaining space
  render() {
    if (this.props.width.a==0) {
      //flex=1;
      widthstyle={flex:1};
    } else {
      widthstyle={width:this.props.width.a*Math.floor(minDim/this.props.width.b+0.5)};
    }

    const borderRightWidth=this.props.showBorderRight ? StyleSheet.hairlineWidth : 0;
    const borderLeftWidth=this.props.showBorderLeft ? StyleSheet.hairlineWidth : 0;
    const borderTopWidth=this.props.showBorderTop ? StyleSheet.hairlineWidth : 0;
    const borderBottomWidth=this.props.showBorderBottom ? StyleSheet.hairlineWidth : 0;
    
    const opacity=this.props.dimmed ? 0.3 : 1.0;
    const onPress=this.props.dimmed ? null : this.props.onPress;

    return (
                <TouchableHighlight style={[widthstyle,{borderLeftWidth:borderLeftWidth,borderRightWidth:borderRightWidth,borderTopWidth:borderTopWidth,borderBottomWidth:borderBottomWidth},styles.button]} onPress={onPress} underlayColor={'#FFFFFF'} activeOpacity={0.5}>
                <Text style={[{opacity:opacity},this.props.textStyle]}>{this.props.text}</Text>
              </TouchableHighlight>
      
    )
  }
}


class ButtonRowContainer extends Component {
  
  render () {
    return (
<View style={styles.buttonRowContainer}>
  <View style={[styles.buttonRow]}>
      <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'1'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i)=>this.props.handleDigitPress(e,1)} />
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'2'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,2)} />
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'3'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,3)} />
    
    <DatePicker
      style={[styles.button]}
      width={{a:9,b:42}}
      minDim={minDim}
      customStyles={{textStyle:styles.buttonText}}
      showBorderLeft={true}
      showBorderTop={true}
      showBorderRight={false}
      date={this.props.date}
      mode="datetime"
      placeholder="custom"
      onDateChange={this.props.onDateChange}
    />
    
    
      <WWButton width={{a:0,b:42}} showBorderLeft={true} showBorderRight={true} showBorderTop={true} showBorderBottom={false} text={'follow up'} dimmed={this.props.dimmed} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleFollowUpPress()} />
  </View>
  <View style={[styles.buttonRow]}>
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'4'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,4)} />
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'5'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,5)} />
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'6'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,6)} />
    <WWButton width={{a:9,b:42}} showBorderLeft={true} showBorderTop={true} text={units[0]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleUnitPress(e,0)} />
    <WWButton width={{a:0,b:42}} showBorderLeft={true} showBorderTop={true} showBorderRight={true} text={units[1]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleUnitPress(e,1)} />
  </View>
  <View style={[styles.buttonRow]}>
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'7'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,7)} />
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'8'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,8)} />
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'9'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,9)} />
    <WWButton width={{a:9,b:42}} showBorderLeft={true} showBorderTop={true} text={units[2]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleUnitPress(e,2)} />
    <WWButton width={{a:0,b:42}} showBorderLeft={true} showBorderTop={true} showBorderRight={true} text={units[3]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleUnitPress(e,3)} />

  </View>
  <View style={[styles.buttonRow]}>
    <WWButton width={{a:16,b:42}} showBorderLeft={true} showBorderTop={true} text={'0'} textStyle={[styles.buttonText,{fontSize:20}]} onPress={(e,i) => this.props.handleDigitPress(e,0)} />
    <WWButton width={{a:8,b:42}} showBorderLeft={true} showBorderTop={true} text={'⌫'} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleBackPress(e,0)} />
    <WWButton width={{a:9,b:42}} showBorderLeft={true} showBorderTop={true} text={units[4]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleUnitPress(e,4)} />
    <WWButton width={{a:0,b:42}} showBorderLeft={true} showBorderTop={true} showBorderRight={true} text={units[5]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleUnitPress(e,5)} />
  </View>
            
      
  <View style={[styles.buttonRow]}>
      <WWButton width={{a:6,b:42}} showBorderLeft={true} showBorderTop={true} text={days[0]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleDayPress(e,0)} />
      <WWButton width={{a:6,b:42}} showBorderLeft={true} showBorderTop={true} text={days[1]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleDayPress(e,1)} />
      <WWButton width={{a:6,b:42}} showBorderLeft={true} showBorderTop={true} text={days[2]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleDayPress(e,2)} />
      <WWButton width={{a:6,b:42}} showBorderLeft={true} showBorderTop={true} text={days[3]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleDayPress(e,3)} />
      <WWButton width={{a:6,b:42}} showBorderLeft={true} showBorderTop={true} text={days[4]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleDayPress(e,4)} />
      <WWButton width={{a:6,b:42}} showBorderLeft={true} showBorderTop={true} text={days[5]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleDayPress(e,5)} />
      <WWButton width={{a:0,b:42}} showBorderLeft={true} showBorderTop={true} showBorderRight={true} text={days[6]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleDayPress(e,6)} />


  
      
  </View>
  <View style={[styles.buttonRow]}>
    <WWButton width={{a:12,b:42}} showBorderLeft={true} showBorderTop={true} text={days[7]} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleDayPress(e,7)} />
    

      <WWButton width={{a:6,b:42}} showBorderLeft={true} showBorderTop={true} text={'set'} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleSettingsPress(e,0)} />
      <WWButton width={{a:6,b:42}} showBorderLeft={true} showBorderTop={true} text={'info'} textStyle={styles.buttonText} onPress={(e,i) => this.props.handleInfoPress(e,0)} />


      
    <View style={styles.dateDisplay}>
      <Text style={styles.dateDisplayText}>{this.props.prettyPrint()}</Text>
    </View>
      
      
      
  </View>{/* last buttonrow */}

</View>
      
    )
  }
}
/*
    <TouchableHighlight onPress={(e,i) => this.props.handleSettingsPress(e,0)} underlayColor={lightOrange} activeOpacity={0.5} style={{backgroundColor:lightOrange}}>
      <Image source={require('./img/gearwhite64x64.png')}/>
    </TouchableHighlight>
  <TouchableHighlight onPress={(e,i) => this.props.handleInfoPress(e,0)} underlayColor={lightOrange} activeOpacity={0.5} style={{backgroundColor:lightOrange}}>
      <Image source={require('./img/infowhite64x64.png')}/>
  </TouchableHighlight>
*/




class FadeInOut extends Component {
  props: {
    style?: any;
    children?: any;
  }

  static defaultProps = {
    style: null,
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }
 
  fadeInOutChild() {
    this.fadeIn();
  }

  fadeIn() {
    Animated.timing(this.state.opacity, {
      toValue:1,
      delay: 400,
      duration:900,
    }).start(()=>{
        this.fadeOut();
    });    
  }
  
  fadeOut() {
    Animated.timing(this.state.opacity, {
      toValue:0,
      delay: 2200,
      duration:900,
    }).start(()=>{
        //this.fadeIn();
    });
  }

  render() {
    const { style, children } = this.props;
    const opacity = { opacity: this.state.opacity };
    return (
      <Animated.View 
        style={[style, opacity]}
        pointerEvents={'none'}
      >
          {children}
      </Animated.View>
    );
  }
}

AppRegistry.registerComponent('Whenwhat', () => MainNavigator);

