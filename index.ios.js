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
    unitsSingular=[NSArray arrayWithObjects:@"minute",@"hour",@"day",@"week",@"month",@"year", nil];
    unitsPlural=[NSArray arrayWithObjects:@"minutes",@"hours",@"days",@"weeks",@"months",@"years", nil];
    UIColor *lightorange=[UIColor colorWithRed:254.0/255.0 green:179.0/255.0 blue:110.0/255.0 alpha:1]; '#FEB36E', //ligth orange

- (IBAction)digitButtonTouchUpInside:(id)sender{
    //set digit to zero if day or custom was selected right before. otherwise old digit would be concatenated to pressed digit
    if (selectedCategory!=DIGITUNIT) {
        selectedDigit=0;
    }
    
    selectedCategory=DIGITUNIT;

    if (selectedDigit<100) {
        selectedDigit=selectedDigit*10+([sender tag]-digitOffset);
        [self prettyPrint];
    }
    if (selectedDigit!=1) {
        [self setUnitLabelsPlural];
    }
    else {
        [self setUnitLabelsSingular];
    }

- (IBAction)backButtonTouchUpInside:(id)sender {
    if (selectedCategory==DIGITUNIT) {
        selectedDigit=selectedDigit/10;

- (IBAction)dayButtonTouchUpInside:(id)sender {
    selectedCategory=DAY;
    selectedDay=[sender tag];

- (void) prettyPrint {
    
    if (selectedCategory==DIGITUNIT) {
        [self outputLines:1];
        //first priority
        //step 1: prettyTime
        if (selectedDigit!=1) {
            if (selectedDigit==0 && (selectedUnit-unitOffset)==0) {
                //0 minutes actually translates to 1 hour by followupthen, so if 0 minutes is intended to mean "now" it wont work
                prettyTime=@"now";
            } else {
                prettyTime=[NSString stringWithFormat:@"%i %@",selectedDigit,[unitsPlural objectAtIndex:selectedUnit-unitOffset]];
            }
        } else {
            prettyTime=[NSString stringWithFormat:@"%i %@",selectedDigit,[unitsSingular objectAtIndex:selectedUnit-unitOffset]];
        }
        //step 2: formalTime
        if (selectedDigit!=1) {
            if (selectedDigit==0 && (selectedUnit-unitOffset)==0) {
                //0 minutes actually translates to 1 hour, so if 0 minutes is intended to mean "now" it wont work
                formalTime=[NSString stringWithFormat:@"%i%@",1,[unitsSingular objectAtIndex:selectedUnit-unitOffset]];
            } else {
                formalTime=[NSString stringWithFormat:@"%i%@",selectedDigit,[unitsPlural objectAtIndex:selectedUnit-unitOffset]];
            }
        } else {
            formalTime=[NSString stringWithFormat:@"%i%@",selectedDigit,[unitsSingular objectAtIndex:selectedUnit-unitOffset]];
        }
    } else if (selectedCategory==CUSTOM) {
        [self outputLines:2];
        //second priority
        //step 1: prettyTime
        prettyTime=[self formatPrettyTime:selectedDate];
        //step 2: formalTime
        formalTime=[self formatFormalTime:selectedDate];
    } else if (selectedCategory==DAY) {
        [self outputLines:1];
        prettyTime=[days objectAtIndex:selectedDay-dayOffset];
        formalTime=[days objectAtIndex:selectedDay-dayOffset];
    } else {
        [self outputLines:1];
        //step 1: prettyTime
        prettyTime=@"?";
        //step 2: formalTime
        formalTime=@"notvalid";
    }
    [digitlabelOutlet setText:prettyTime];
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
} from 'react-native';

import DatePicker from 'react-native-datepicker'

import Moment from 'moment';

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
      text:'',logtext:Dimensions.get('window').width,
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
    this.handleTomorrowPress=this.handleTomorrowPress.bind(this);
    this.handleBackPress=this.handleBackPress.bind(this);
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
  
  onDateChange(date) {
    this.setState({date: date});
  }
  
  handleDigitPress(e,i) {
      this.setState({logtext:i});
  }

  handleUnitPress(e,i) {
      this.setState({logtext:i});
  }


  handleDayPress(e,i) {
      this.setState({logtext:i});
  }

  handleTomorrowPress(e,i) {
      this.setState({logtext:i});
  }

  handleBackPress(e,i) {
      this.setState({logtext:i});
  }

  
  // i textinput
  //onFocus={()=>this.setState({buttonOpacity:0.1})}
                
  
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
                onBlur={()=>this.closeOverlay()}
                onFocus={()=>this.openOverlay()}
                value={this.state.text}
                placeholder={'enter subject here'}
                ref={instance => { this._textInput = instance; }}
              />
            </View>
            <View style={styles.x}>
          
            <TouchableHighlight>
              <Text>When</Text>
                
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
              <WWButton slots={1} lineRight={true} text={1} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,1)} />
              <WWButton slots={1} lineRight={true} text={2} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,2)} />
              <WWButton slots={1} lineRight={true} text={3} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,3)} />
              <View style={styles.button2}>
                <Text>{this.state.date}</Text>
              </View>
            </View>
            <View style={[styles.buttonRow]}>
              <WWButton slots={1} lineRight={true} text={4} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,4)} />
              <WWButton slots={1} lineRight={true} text={5} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,5)} />
              <WWButton slots={1} lineRight={true} text={6} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,6)} />
              <WWButton slots={1} lineRight={true} text={'minutes'} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,0)} />
              <WWButton slots={1} lineRight={false} text={'hours'} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,1)} />
            </View>
            <View style={[styles.buttonRow]}>
              <WWButton slots={1} lineRight={true} text={7} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,7)} />
              <WWButton slots={1} lineRight={true} text={8} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,8)} />
              <WWButton slots={1} lineRight={true} text={9} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,9)} />
              <WWButton slots={1} lineRight={true} text={'days'} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,2)} />
              <WWButton slots={1} lineRight={false} text={'weeks'} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,3)} />

            </View>
            <View style={[styles.buttonRow]}>
              <WWButton slots={2} lineRight={true} text={0} textStyle={styles.buttonText} onPress={(e,i) => this.handleDigitPress(e,0)} />
              <WWButton slots={1} lineRight={true} text={'<'} textStyle={styles.buttonText} onPress={(e,i) => this.handleBackPress(e,0)} />
              <WWButton slots={1} lineRight={true} text={'months'} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,2)} />
              <WWButton slots={1} lineRight={false} text={'years'} textStyle={styles.buttonText} onPress={(e,i) => this.handleUnitPress(e,3)} />
            </View>
            <View style={[styles.buttonRow]}>
                <WWButton slots={1} lineRight={true} text={'mon'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,0)} />
                <WWButton slots={1} lineRight={true} text={'tue'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,1)} />
                <WWButton slots={1} lineRight={true} text={'wed'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,2)} />
                <WWButton slots={1} lineRight={true} text={'thu'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,3)} />
                <WWButton slots={1} lineRight={false} text={'fri'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,4)} />
            </View>
            <View style={[styles.buttonRow]}>
              <WWButton slots={1} lineRight={true} text={'sat'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,5)} />
              <WWButton slots={1} lineRight={true} text={'sun'} textStyle={styles.buttonText} onPress={(e,i) => this.handleDayPress(e,6)} />
              <WWButton slots={2} lineRight={true} text={'tomorrow'} textStyle={styles.buttonText} onPress={(e,i) => this.handleTomorrowPress(e,6)} />
              <DatePicker
                style={[{flex:1}, styles.button]}
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
          <View style={styles.x1}>
            
            <TouchableHighlight>
              <Text>kugghjul</Text>
            </TouchableHighlight>
                
            <TouchableHighlight>
              <Text> i </Text>
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
    color: 'orange',
    fontSize: 16,
    //textAlign:'content', //doesn't make any difference
  },
  
  
  button: {
    alignItems:'center',
    justifyContent: 'center',
    //marginRight:1,
    borderTopWidth:StyleSheet.hairlineWidth,
    backgroundColor:'white',
    borderColor: 'orange',
  },

  button1: {
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
    backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  
  x: {
    flex:0.09,
    backgroundColor:'yellow',
  },
  y: {
    flex:0.07,
    backgroundColor:'green',
  },
  z: {
    flex:0.5,
    backgroundColor:'blue',
  },
  
  
  
  container: {
    flex:1,

    //justifyContent: 'center',
    //alignItems: 'center',


    backgroundColor:'purple',
  },
  
  subContainer: {//adjust for status bar on
    flex:1,
    //alignItems:'center',
    marginTop:24, //Environment.statusBarHeight, 
    backgroundColor:'orange',
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

    if (this.props.lineRight) {
      //width=width-10;
      borderRightWidth=StyleSheet.hairlineWidth; //eller 1
    } else {
      borderRightWidth=0;
    }

    return (
                <TouchableHighlight style={[{width:width,borderRightWidth:borderRightWidth},styles.button]} onPress={this.props.onPress} underlayColor={'#FFFFFF'} activeOpacity={0.5}>
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

