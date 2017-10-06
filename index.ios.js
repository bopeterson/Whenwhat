/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */



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



//xxx make sure to check xxx in datepicker/index.js and datepicker/style.js
//från objective c-appen:
/*
    UIColor *lightorange=[UIColor colorWithRed:254.0/255.0 green:179.0/255.0 blue:110.0/255.0 alpha:1]; '#FEB36E', //ligth orange

Behöver not inte ta hänsyn till oldSelectedCategory

- (IBAction)datePickerCancelButtonTouchUpInside:(id)sender {
    //here we must restore what was chosen before datepicker opened
    selectedCategory=oldSelectedCategory;
    selectedDate=oldSelectedDate;
    [self hideDatePicker];

    [self prettyPrint];
    //XX[self printStat:_cmd];
}

- (IBAction)customButtonTouchUpInside:(id)sender {

    oldSelectedCategory=selectedCategory;
    oldSelectedDate=selectedDate;
    selectedCategory=CUSTOM;
    
    [self showDatePicker];
    [self selectCustomDate];

    //XX[self printStat:_cmd];
}







*/

/*
vilka states?

selectedDigit
selectedCategory
selectedDay
selectedUnit
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
} from 'react-native';

import DatePicker from 'react-native-datepicker'

import Moment from 'moment';

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


export default class Whenwhat extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      text:'',
      logtext:'What',
      digit: 0,
      category: 'DIGITUNIT',
      day: 0,
      unit: 0,
      date: Moment().format('YYYY-MM-DD HH:mm'), //new Date(),
      overlayShow: false,
    };
    this.handleDigitPress=this.handleDigitPress.bind(this);
    this.handleUnitPress=this.handleUnitPress.bind(this);
    this.handleDayPress=this.handleDayPress.bind(this);
    this.handleBackPress=this.handleBackPress.bind(this);
    this.handleSettingsPress=this.handleSettingsPress.bind(this);
    this.handleInfoPress=this.handleInfoPress.bind(this);
    this.onDateChange=this.onDateChange.bind(this);
    this.openOverlay = this.openOverlay.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);

//    this.hideKeyboard = this.hideKeyboard.bind(this)
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
  
  onDateChange(dateStr,date) {
    this.setState({category:'CUSTOM',date: dateStr});
    //xxx prettyprint och lite till kanske???
    
    //xxx ska detta med oldcategory in någonstans? troligtvis inte
    /*
    oldSelectedCategory=selectedCategory;
    oldSelectedDate=selectedDate;
    selectedCategory=CUSTOM;
    
    [self showDatePicker];
    [self selectCustomDate];
    */
    
  }
  
  handleDigitPress(e,i) {
    let digit=this.state.digit;
    let category=this.state.category;
    //set digit to zero if day or custom was selected right before. otherwise old digit would be concatenated to pressed digit
    if (category != 'DIGITUNIT') {
        digit=0;
        category='DIGITUNIT';
    }
    
    if (digit<100) {
        digit=digit*10+i;
        //xxx[self prettyPrint];
    }
    if (digit!=1) {
        //[self setUnitLabelsPlural];
    }
    else {
        //[self setUnitLabelsSingular];
    }
    this.setState({digit:digit,category:category});
  }

  handleUnitPress(e,i) {
    if (this.state.digit==0) {
      this.setState({digit:1});
    }
    this.setState({category:'DIGITUNIT',unit:i});
    //[self prettyPrint];
  }


  handleDayPress(e,i) {
      this.setState({category:'DAY',day:i});
      //xxx prettyprint
      
  }

  
  prettyPrint() {
    let pretty='';
    const {digit, unit, category, day} = this.state;
    if (category=='DIGITUNIT') {
      if (digit==0) {
        //this could logically be handled by the option below, but in formalTime it needs its own option. 
        pretty=digit+" "+units[unit]+'s';
      } else {
        pretty=digit+" "+units[unit]+(digit!=1?'s':'');
      }
    } else if (category=='CUSTOM') {
      ///xxx dela upp på två rader
      pretty=this.state.date;
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
        formal=digit+units[unit]+(digit!=1?'s':'');
      }
    } else if (category=='CUSTOM') {
      ///xxx se över olika datumformat
      
      /*
-(NSString*)formatFormalTime:(NSDate*)date{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"en_US_POSIX"]]; 
    [dateFormatter setDateFormat:@"hhmmayyyy-MM-dd"];
    return [dateFormatter stringFromDate:date];
}
      
      
      
      */
      
      
      formal=this.state.date;
    } else if (category=='DAY') {
      formal=daysLong[day];
    } else {
      formal='notvalid';
    }
    return formal;
  }


  handleBackPress(e,i) {
    if (this.state.category=='DIGITUNIT') {
      this.setState((prevState, props) => ({
        digit: Math.floor(prevState.digit/10)
      }));
      //xxx prettyprint    
    }
  }
  
  handleSettingsPress(e,i) {
    this.setState({logtext:'gear'});
  }


  handleInfoPress(e,i) {
    this.setState({logtext:'info'});
  }

  
  // i textinput
  //onFocus={()=>this.setState({buttonOpacity:0.1})}
                
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
      
          <View style={styles.x1a}>
      
      <Text style={[styles.whenwhat]}>What</Text>
            
            <WWButton slots={2} showBorderLeft={true} showBorderRight={false} showBorderTop={true} text={'follow up'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,7)} />
          </View>
            <View style={styles.y}>
              <TextInput
                style={{fontSize:26, borderColor: 'transparent', borderTopWidth:4,borderLeftWidth: 14,borderRightWidth: 14  }}
                onChangeText={(text) => this.setState({text})}
                onBlur={()=>this.closeOverlay()}
                onFocus={()=>this.openOverlay()}
                value={this.state.text}
                placeholder={'enter subject'}
                ref={instance => { this._textInput = instance; }}
              />
            </View>
            <View style={styles.x}>
          
            <TouchableHighlight>
              <Text style={styles.whenwhat}>When</Text>
                
            </TouchableHighlight>
          <AnimatedOverlay
                backgroundColor={'white'}
                opacity={0.9}
                onPress={this.closeOverlay}
                overlayShow={this.state.overlayShow}
          />
                
            </View>
          <View style={styles.z}>
            <View style={[styles.buttonRow]}>
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'1'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,1)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'2'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,2)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'3'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,3)} />
              <View style={styles.dateDisplay}>
                <Text style={styles.dateDisplayText}>{this.prettyPrint()}</Text>
              </View>
            </View>
            <View style={[styles.buttonRow]}>
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'4'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,4)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'5'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,5)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'6'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,6)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={units[0]} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,0)} />
              <WWButton slots={1} showBorderRight={false} showBorderTop={true} text={units[1]} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,1)} />
            </View>
            <View style={[styles.buttonRow]}>
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'7'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,7)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'8'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,8)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'9'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,9)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={units[2]} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,2)} />
              <WWButton slots={1} showBorderRight={false} showBorderTop={true} text={units[3]} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,3)} />

            </View>
            <View style={[styles.buttonRow]}>
              <WWButton slots={2} showBorderRight={true} showBorderTop={true} text={'0'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,0)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={'⌫'} textStyle={styles.buttonText} onPress={(e,i) => this.handleBackPress(e,0)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={units[4]} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,4)} />
              <WWButton slots={1} showBorderRight={false} showBorderTop={true} text={units[5]} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,5)} />
            </View>
            <View style={[styles.buttonRow]}>
                <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={days[0]} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,0)} />
                <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={days[1]} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,1)} />
                <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={days[2]} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,2)} />
                <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={days[3]} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,3)} />
                <WWButton slots={1} showBorderRight={false} showBorderTop={true} text={days[4]} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,4)} />
            </View>
            <View style={[styles.buttonRow]}>
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={days[5]} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,5)} />
              <WWButton slots={1} showBorderRight={true} showBorderTop={true} text={days[6]} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,6)} />
              <WWButton slots={2} showBorderRight={true} showBorderTop={true} text={days[7]} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,7)} />
              <DatePicker
                style={[{flex:1}, styles.button]}
                customStyles={{textStyle:styles.buttonText}}
                showBorderTop={true}
                date={this.state.date}
                mode="datetime"
                placeholder="custom"
                format="YYYY-MM-DD HH:mm"
                onDateChange={this.onDateChange}
              />
                  
                
                
                

            </View>
                
          
          <AnimatedOverlay
                backgroundColor={'white'}
                opacity={0.9}
                onPress={this.closeOverlay}
                overlayShow={this.state.overlayShow}
          />
                
                
                
          </View>
          <View style={styles.x1b}>
            
                <TouchableHighlight onPress={(e,i) => this.handleSettingsPress(e,0)} underlayColor={lightOrange} activeOpacity={0.5}>
                <Image source={require('./img/gearwhite64x64.png')} style={{width: 40, height: 40}}/>
            </TouchableHighlight>
            <TouchableHighlight onPress={(e,i) => this.handleInfoPress(e,0)} underlayColor={lightOrange} activeOpacity={0.5}>
                <Image source={require('./img/infowhite64x64.png')} style={{width: 40, height: 40}}/>
            </TouchableHighlight>
                
          <AnimatedOverlay
                backgroundColor={'white'}
                opacity={0.9}
                onPress={this.closeOverlay}
                overlayShow={this.state.overlayShow}
          />
                
          </View>

        </View>
                
                
                
                
                
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  buttonRow: {
    //flex:1,
    height:Math.floor((Dimensions.get('window').height-24)/6/2+0.99),
    flexDirection:'row',
    margin:0,
    backgroundColor:'white',
  },

  buttonText: {
    color: 'darkorange',
    fontSize: 16,
    //textAlign:'content', //doesn't make any difference
  },
  
  
  button: {
    alignItems:'center',
    justifyContent: 'center',
    //marginRight:1,
    //borderTopWidth:StyleSheet.hairlineWidth,
    backgroundColor:'white',
    borderColor: 'darkorange',
  },


  dateDisplay: {
    flex:1,
    borderColor: 'darkorange',
    borderTopWidth:StyleSheet.hairlineWidth,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:lightOrange,
  },

  dateDisplayText: {
    textAlign: 'center',
    fontSize: 16,
  },
   

  x1a: {
    flex:0.09,
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  x1b: {
    flex:0.23,
    backgroundColor:lightOrange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    //alignSelf: 'flex-end',
    //position: 'absolute',
    //bottom: 0,
  },
  
  
  x: {
    flex:0.09,
    backgroundColor:'white',
  },
  y: {
    flex:0.07,
    backgroundColor:lightOrange,
  },
  z: {
    flex:0.5,
    backgroundColor:'white',
  },
  
  whenwhat: {
    color:'orange',
    fontSize:32, //height seems to bo 20% more than fontSize. max 40 works on iphone 5
    marginLeft:14,
  },
  
  
  container: {
    flex:1,

    //justifyContent: 'center',
    //alignItems: 'center',


    backgroundColor:'white',
  },
  
  subContainer: {//adjust for status bar on
    flex:1,
    //alignItems:'center',
    marginTop:24, //Environment.statusBarHeight, 
    backgroundColor:lightOrange,
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



class WWButton extends Component {
//flex:this.props.slots
    
  
  render() {
    let width=this.props.slots*Math.floor(Dimensions.get('window').width/5+0.99);
    let height=Math.floor((Dimensions.get('window').height-24)/6/2);

    const borderRightWidth=this.props.showBorderRight ? StyleSheet.hairlineWidth : 0;
    const borderLeftWidth=this.props.showBorderLeft ? StyleSheet.hairlineWidth : 0;
    const borderTopWidth=this.props.showBorderTop ? StyleSheet.hairlineWidth : 0;
    const borderBottomWidth=this.props.showBorderBottom ? StyleSheet.hairlineWidth : 0;
    

    return (
                <TouchableHighlight style={[{width:width,borderLeftWidth:borderLeftWidth,borderRightWidth:borderRightWidth,borderTopWidth:borderTopWidth,borderBottomWidth:borderBottomWidth,},styles.button]} onPress={this.props.onPress} underlayColor={'#FFFFFF'} activeOpacity={0.5}>
                <Text style={this.props.textStyle}>{this.props.text}</Text>
              </TouchableHighlight>
      
    )
  }
}



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

