import React from 'react';
import Form from 'muicss/lib/react/form';
import Flexbox from 'flexbox-react';
import { RaisedButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import  database  from '../../firebase/firebase';
import { connect } from 'react-redux';
import { section1Add ,setsection } from '../../actions/quiz';
import AppRouter, { history } from '../../routers/AppRouter';
import Header from '../Header';
import {startLogout} from '../../actions/auth';

const styles = {
  hintStyle: {
    color: 'black',
    fontFamily: 'Delius',
  },
  paper: {
    height: '50vmin',
    width: '90vmin',
    margin: '5vmin',
    textAlign: 'center',
    display: 'inline-block',
  },
  div: {
    border: '2px solid',
    borderColor: 'rgb(230, 230, 230)',
    borderCornerShape: 'scoop',
    width: '90vmin',
    boxShadow: '4px solid red',
    margin: '5vmin',
  },
  checkbox: {
    width: '1em',
    height: '1em',
  },
};

const Title = props => (
  <div>
    <h1 style={{
      textAlign: 'center', fontFamily: 'Delius', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '5vw', paddingRight: '5vw'
    }}
    >{props.title}
    </h1>
    <h3 style={{
      textAlign: 'center', fontFamily: 'Delius', paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '0px', paddingBottom: '0px'
    }}
    >{props.subtitle}
    </h3>
    <h3 style={{
      textAlign: 'center', fontFamily: 'Delius', paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '0px', paddingBottom: '0px'
    }}
    >{props.subtitle2}
    </h3>
  </div>
);


export  class Section1 extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    this.state = {
      uid: props.uid,
      checked: [],
      name: props.name,
      kidName: props.kidName,
      dob: props.dob,
      calendarFocused: false,
      section1Add: props.section1Add,
     // styles: props.styles,
     styles : {
      container: {
        color: '#006aff',
        marginTop: '10px',
        justifyContent: 'right', // Not working.
        alignSelf: 'stretch', // Not working
        alignItems: 'end', // Not working
        textAlign: 'center',
      },
      inner_container: {
      },
      button: {
        background: '$blue',
        display: 'inline-block',
        fontSize: '$font-size-large',
        fontWeight: 300,
        lineHeight: 1,
        padding: '$s-size',
        textDecoration: 'none',
        textAlign: 'center',
        fontFamily: 'Delius',
        paddingTop: '0px',
      },
      muitext: {
        fontFamily: 'Delius',
        textAlign: 'center',
      // text align to center is not working.
      },
      label: {
        fontFamily: 'Delius',
      },
    },
      printMessage: false,
      printNameMessage: false,
      printdobMessage: false, 
      printsexMessage: false,
      sex: props.sex,
      strdob: '',
      ageGroup: '',
      mobileNumber: props.mobileNumber,
      printmobileError: false,
    };
   // console.log(this.props.styles);
    database.ref(`users/${this.state.uid}/quiz/general/sex`).once('value').then((snapshot) => {
      this.setState({ sex: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/mobileNumber`).once('value').then((snapshot) => {
      this.setState({ mobileNumber: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/kidName`).once('value').then((snapshot) => {
      this.setState({ kidName: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/name`).once('value').then((snapshot) => {
      this.setState({ name: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/dob`).once('value').then((snapshot) => {
      this.setState({ strdob: snapshot.val() });
      console.log('dob is', this.state.dob);
    });

    this.nameChange = this.nameChange.bind(this);
    this.daughterNameChange = this.daughterNameChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSex = this.handleSex.bind(this);
    this.addMobileNumber = this.addMobileNumber.bind(this);
    //console.log(this.state.uid)
  }


  onDateChange(event, date) {
    console.log('On date change');
    console.log(date);
    this.setState({ dob: date.toString() });
  }
  
  handleSex(event) {
    if (event.target.name === 'Boy') {
      this.setState({ sex: 'Boy' });
    }
    if (event.target.name === 'Girl') {
      this.setState({ sex: 'Girl' });
    }
  }
 
  daughterNameChange(event, value) {
    if (value.charAt(value.length - 1).match(/[a-zA-Z ]/) || value.charAt(value.length - 1) === ''  ) {
      this.setState({ kidName: value });
    }
  }

  nameChange(event, value) {
    if (value.charAt(value.length - 1).match(/[a-zA-Z ]/) || value.charAt(value.length - 1) === '') {
      this.setState({ name: value });
    }
  }

  addMobileNumber(event, value) {
    if (value.charAt(value.length - 1).match(/[0-9]/) || value.charAt(value.length - 1) === '') {
      this.setState({ mobileNumber: value });
    }
    console.log('mobile number is', this.state.mobileNumber);
  }

  handleSubmit(event) {
    console.log('submit enetered');
    event.preventDefault();
    console.log('on submit of section 1');
    console.log(this.state.dob);
    if (this.state.mobileNumber) {
      if (this.state.mobileNumber.length !== 10) {
        this.state.printmobileError = true; this.setState({ printmobileError: true });
      } else {
        this.setState({ printmobileError: false });
        this.state.printmobileError = false;
      }
    }

    if (!this.state.dob) this.state.dob = this.state.strdob;
    if (this.state.kidName && this.state.name && this.state.dob && this.state.sex && !this.state.printmobileError) {
      // Extract the age group category
      let dstring = this.state.dob.toString();
      let pos = dstring.indexOf(' ');
      dstring = dstring.substring(pos + 1, dstring.length - 1);
      pos = dstring.indexOf(' ');
      dstring = dstring.substring(pos + 1, dstring.length - 1);
      pos = dstring.indexOf(' ');
      dstring = dstring.substring(pos + 1, dstring.length - 1);
      let year = dstring.substring(0, 4);
      // console.log('year', year);
      const age = 2018 - parseInt(year);
      // console.log('age is ', age);
      if (age < 4) {
        this.state.ageGroup = '2-4';
        // console.log('age group is', this.state.ageGroup);
      } else if (age > 9) {
        this.state.ageGroup = '9-12';
        // console.log('age group is', this.state.ageGroup);
      } else {
        this.state.ageGroup = '5-8';
        // console.log('age group is', this.state.ageGroup);
      }
      this.state.section1Add(this.state.uid, this.state.name, this.state.kidName, this.state.dob, this.state.sex, this.state.ageGroup, this.state.mobileNumber);
      console.log(this.props.index);
      this.props.setsection(3);
      database.ref(`users/${this.state.uid}/quiz/general/index`).set(3);
      {history.push('/section3.0')}
      window.scrollTo(0, 0);
     // console.log(this.props.index);
      //{history.push('/quiz')};
    } 
    if (!this.state.kidName) this.setState({ printMessage: true });
    if (!this.state.name) this.setState({ printNameMessage: true });
    if (!this.state.dob) this.setState({ printdobMessage: true });
    if (!this.state.sex) this.setState({ printsexMessage: true });
}

  render() {
    return (
      <div>
      <Header  uid={this.state.uid} quiz={true} startLogout={this.props.startLogout} disableLogin = {false}/>
      <Title title="Welcome!" subtitle="Answer a few quick questions to help us build your kiddo style profile. Once complete, your answers will help your personal Stylists to handpick your products." subtitle2="Have more than one child? You’ll be able to add your other children later." /> 
      <Flexbox justifyContent="center">
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Flexbox flexDirection="column" justifyContent="center" height="100%" alignItems="center" style={{ textAlign: 'center' }} >
              <h3 style={{ textAlign: 'left', fontFamily: 'Delius' }}> {'You are shopping for'} </h3>
              <Flexbox flexDirection="row" justifyContent="flex-start" alignItems="center">
                <input onChange={this.handleSex} type="checkbox" checked={this.state.sex === 'Boy'} name="Boy" value="Boy" style={styles.checkbox} /> <div style={{marginRight: '20px'}}> {'Boy'} </div>
                <input onChange={this.handleSex} type="checkbox" checked={this.state.sex === 'Girl'} name="Girl" value="Girl" style={styles.checkbox} /><div style={{marginRight: '20px'}}  > {'Girl'} </div>
              </Flexbox>
          
            <MuiThemeProvider>
              <TextField
                hintText={this.state.name ? this.state.name : 'Your name'}
                floatingLabelText="Name"
                floatingLabelFixed
                hintStyle={styles.hintStyle}
                style={this.state.styles.muitext}
                onChange={this.nameChange}
                value={this.state.name ? this.state.name : ''}
               />
            </MuiThemeProvider>
            <MuiThemeProvider>
              <TextField
                hintText={this.state.kidName ? this.state.kidName : 'Name of your child'}
                floatingLabelText="Child's name"
                floatingLabelFixed
                hintStyle={styles.hintStyle}
                style={this.state.styles.muitext}
                onChange={this.daughterNameChange}
                value={this.state.kidName ? this.state.kidName : ''}
              />
            </MuiThemeProvider>
            <MuiThemeProvider>
              {this.state.dob || this.state.strdob ?
                <DatePicker floatingLabelFixed floatingLabelText='DOB'  hintStyle={styles.hintStyle} hintText={this.state.strdob ? this.state.strdob.substring(4, 15) : 'Birthday'} style={{ textAlign: 'center', fontFamily: 'Delius' }} onChange={this.onDateChange} openToYearSelection /> 
              :
                <DatePicker floatingLabelFixed floatingLabelText='DOB'  hintStyle={styles.hintStyle} hintText={this.state.kidName ? `${this.state.kidName}'s birthday` : 'Birthday'} style={{ textAlign: 'center', fontFamily: 'Delius' }} onChange={this.onDateChange} openToYearSelection />
              }
            </MuiThemeProvider>

            <MuiThemeProvider>
              <TextField
                hintText="Mobile number"
                floatingLabelText="Mobile"
                floatingLabelFixed
                hintStyle={styles.hintStyle}
                onChange={this.addMobileNumber}
                value={this.state.mobileNumber ? this.state.mobileNumber : ''}
                style={this.state.styles.muitext}
              />
            </MuiThemeProvider>
           
            <div>
              {this.state.printMessage ?
                <div className="error__message" style={{ paddingTop: '3vmin', color: 'red' }}>
                  {'Please enter your kid\'s name to proceed further'}
                </div> : <div />
              }
              {this.state.printNameMessage ?
                <div className="error__message" style={{ paddingTop: '3vmin', color: 'red' }}>
                  {'Please enter your name'}
                </div> : <div />
              }
              {this.state.printdobMessage ?
                <div className="error__message" style={{ paddingTop: '3vmin', color: 'red' }}>
                  {'Please enter date of birth'}
                </div> : <div />
              }
              {this.state.printsexMessage ? <div className="error__message" style={{ paddingTop: '3vmin', color: 'red' }}>
                {'Please let us know if you are shopping for a girl or boy'}
                </div> : <div />
              }
              {this.state.printmobileError ? <div> {this.state.mobileNumber ? <div className="error__message" style={{ paddingTop: '3vmin', color: 'red' }}>
              {'Please enter a mobile no of 10 digits'}
              </div> : <div className="error__message" style={{ paddingTop: '3vmin', color: 'red' }}>
              {'Please enter mobile number'}
              </div>}</div> : <div />}
            </div>
            <MuiThemeProvider>
              <Flexbox padding='3vmin' marginTop='10vh'>
                <RaisedButton label="Next" type="submit" style={ {...this.state.styles.button, marginBottom: '70vw' }}
              />
              </Flexbox>
            </MuiThemeProvider>
          </Flexbox>
        </Form>
        </div>
        </Flexbox>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('this should come earlier');
  const fbargs = {
    kidName: state.quiz.kidName,
  };
  // fbar = await db.ref(`words/${userId}`).once('value');
  // database.ref(`users/${state.auth.uid}/quiz/general/kidName`).once('value').then( (snapshot) => {
  //   fbargs.kidName = snapshot.val();
  //   // console.log('fb args');
  //   // console.log(fbargs.kidName);
  // });
  return {
    uid: state.auth.uid,
    name: state.quiz.name,
    sex: state.quiz.sex,
    ageGroup: state.quiz.ageGroup,
    kidName: fbargs.kidName,
    dob: state.quiz.dob,
    characterName: state.quiz.characterName,
    mobileNumber: state.quiz.mobileNumber,
    address: state.quiz.address,
    height: state.quiz.height,
    waist: state.quiz.waist,
    bodyType: state.quiz.bodyType,
    styles: state.quiz.styles,
    index: state.quiz.index,
  };
};

// My naming convention: I will do a different of casing so as not to have the linting error.
const mapDispatchToProps = dispatch => {
  return {
    startLogout : ()=>dispatch(startLogout()),
    section1Add: (uid, name, kidName, dob, sex, ageGroup, mobileNumber) => dispatch(section1Add(uid, name, kidName, dob, sex, ageGroup, mobileNumber)),
    setsection: (index) => { dispatch(setsection(index)) },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Section1);