import React from 'react';
import Flexbox from 'flexbox-react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { firebase } from '../../firebase/firebase';
import  database  from '../../firebase/firebase';
import { RaisedButton, Typography } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { DropDownMenu, MenuItem, FlatButton } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// import Select from 'react-select';
// Am currently using select from React. See if react-select is required.
import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import { next, back, setsection, section1Add, section2Add, rating, stylerating, addComment, subindexincrement, subindexdecrement, addStyleNumber, addcharacter } from '../../actions/quiz';

// Using - https://hacker0x01.github.io/react-datepicker/
// List the options smartly using map.
import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import 'antd/dist/antd.css';
const InputGroup = Input.Group;
const Option = Select.Option;

const styles = {
  textfield_style: {
    fontFamily: 'Delius',
    width: '70vmin'
  },
  hintStyle: {
    color: 'black',
    width: '70vmin',
  },
  checkbox: {
    width: '1em',
    height: '1em',
  },
  label: {
    fontFamily: 'Delius',
    paddingLeft: '2vmin', 
    paddingRight: '2vmin',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  paper: {
    height: '70vmin',
    width: '70vmin',
    margin: '5vmin',
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: 'yellow',
  },
  div: {
    border: '2px solid',
    borderColor: 'rgb(230, 230, 230)',
    borderCornerShape: 'scoop',
    width: '90vmin',
    paddingBottom: '5vmin',
    paddingTop: '5vmin',
    margin: '5vmin',
  },
 Checkbox: {
      fontFamily: 'Delius',
      paddingLeft: '2vmin', 
      paddingRight: '2vmin',
      paddingTop: '0px',
      paddingBottom: '0px',
    },
  InputNumberStyle: {
    width: '20vh',
    marginLeft: '2vmax',
  },
};

export  class Section2 extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    this.state = {
      quiz: props.quiz,
      sizetop: props.sizetop ? props.sizetop : 0,
      sizebottom: props.sizebottom ? props.sizebottom : 0,
      skincolor: props.skincolor,
      section2Add: props.section2Add,
      back: props.back,
      next: props.next,
      comment: props.comment,
      addComment: props.addComment,
      hintText: 'Anything else you want to tell us, e.g., requirement for fabric, fit etc.',
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
      characterName: props.characterName,
      kidName: props.kidName,
      votecounts: props.votecounts,
      stylecounts: props.stylecounts,
      mobileNumber: props.mobileNumber,
      address: props.address,
      section: props.section,
      height: props.height,
      // These 3 are lengths in inches. Convert the cms into inches.
      height1: undefined,
      height2: undefined,
      waist1: undefined,
      waist: props.waist,
      bodyType: props.bodyType,
      printMessage: false,
      msgPrintedOnce: false,
      slim: props.bodyType ? props.bodyType === 0 : false,
      regular: props.bodyType ? props.bodyType === 1 : false,
      healthy: props.bodyType ? props.bodyType === 2 : false,
      priceListmap: props.priceList,
      uid: props.uid,
      sex: props.sex,
      ageGroup: props.ageGroup,
      printmobileError: false,
      heightscaleunit: 'Feet',
      waistscaleunit: 'Cms',
      checkedPrice: props.checkedPrice,
      checkedFabric: props.checkedFabric,
    };

    database.ref(`users/${this.state.uid}/quiz/general/sizetop`).once('value').then((snapshot) => {
      this.setState({ sizetop: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/sizebottom`).once('value').then((snapshot) => {
      this.setState({ sizebottom: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/height`).once('value').then((snapshot) => {
      this.setState({ height : snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/waist`).once('value').then((snapshot) => {
      this.setState({ waist: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/bodyType`).once('value').then((snapshot) => {
      this.setState({bodyType : snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/characterName`).once('value').then((snapshot) => {
      this.setState({ characterName: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/mobileNumber`).once('value').then((snapshot) => {
      this.setState({ mobileNumber: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/address`).once('value').then((snapshot) => {
      this.setState({ address: snapshot.val() });
    });
    database.ref(`users/${this.state.uid}/quiz/general/checkedPrice`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => { 
        this.state.checkedPrice.push(childSnapshot.val()); 
      });
      console.log('checked price read from store', this.state.checkedPrice);
    });

    database.ref(`users/${this.state.uid}/quiz/general/checkedFabric`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => { 
        this.state.checkedFabric.push(childSnapshot.val()); 
      });
      console.log('checked fabric read from store', this.state.checkedFabric);
    });

    this.priceList = new Map();
    if (this.state.sex === 'Boy')
    {
      this.priceList.set('T-Shirts', [700, 1200]);
    }
    else 
    {
      this.priceList.set('Dresses', [1000, 1800]);
      this.priceList.set('Tops', [700, 1200]);
    }
    
    
    this.priceList.set('Bottoms', [9000, 1400]);
    
    this.designs = Array.from(this.state.stylecounts.keys(), (x) => (this.state.stylecounts.get(x) > 1 ? x : '')).filter(word => word.length > 0);
    // Now we have to keep only the elements form the positive array in pricelist and designs. 
    this.sizetopChange = this.sizetopChange.bind(this);
    this.sizebottomChange = this.sizebottomChange.bind(this);
    this.skincolorChange = this.skincolorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.backbutton = this.backbutton.bind(this);
    this.addComment = this.addComment.bind(this);
    this.characterNameChange = this.characterNameChange.bind(this);
    this.heightscale = this.heightscale.bind(this);
    this.heightChange = this.heightChange.bind(this);
    this.waistChange = this.waistChange.bind(this);
    this.addMobileNumber = this.addMobileNumber.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.handlebodyType = this.handlebodyType.bind(this);
    this.handleheight1change = this.handleheight1change.bind(this);
    this.handleheight2change = this.handleheight2change.bind(this);
    this.handleheightchange = this.handleheightchange.bind(this);
    this.handlewaist1change = this.handlewaist1change.bind(this);
    this.handlewaistchange = this.handlewaistchange.bind(this);
  }

sizetopChange(event) {
    this.setState({ sizetop: event.target.value });
  }
  sizebottomChange(event) {
    this.setState({ sizebottom: event.target.value });
  }

  skincolorChange(event) {
    this.setState({ skincolor: event.target.value });
  }

  characterNameChange(event, value) {
    this.setState({ characterName: value });
  }

  heightscale(value) {
    console.log('height dropdown');
    console.log(value);
    this.setState({ heightscaleunit: value });
 }

  widthscale(value) {
    this.setState({ widthscaleunit: value});
  }

  heightChange(event, value) {
    this.setState({ height:  value });
  }

  waistChange(event, value) {
    this.setState({ waist: value });
  }
  addMobileNumber(event, value) {
    if (value.charAt(value.length - 1).match(/[0-9]/)) {
      this.setState({ mobileNumber: value });
    }
    console.log('mobile number is', this.state.mobileNumber);
  }

  addAddress(event, value) {
    this.setState({ address: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Next in section 2 pressed');
    if (this.state.comment) this.state.addComment(this.state.uid, this.state.section, this.state.comment);
    // Check if mobile number has been entered. 
    
    if(this.state.msgPrintedOnce) {
      if(!this.state.printmobileError){
          if (this.state.waist && this.state.height) 
            this.setState({printMessage: true});
          this.state.section2Add(this.state.uid, this.state.sizetop, this.state.sizebottom, this.state.characterName, this.state.mobileNumber, this.state.address, this.state.height, this.state.waist, this.state.bodyType, this.priceList, this.state.checkedPrice, this.state.checkedFabric);
      // Just for the time being not sending the proper priceList.
      window.scrollTo(0,0);
      }
    }
    else if(!this.state.waist || !this.state.height) {
      this.setState({ msgPrintedOnce: true});
      this.state.msgPrintedOnce = true;
      this.setState({ printMessage: true });
      this.state.printMessage = true;
      window.scrollTo(0,0);
    }
    else {
      console.log('Information entered for waist and height');
      console.log(this.state.height == false);
      console.log(this.state.height);
      console.log(this.state.waist == false);
      console.log(this.state.waist);
      if(!this.state.printmobileError){
         this.state.section2Add(this.state.uid, this.state.sizetop, this.state.sizebottom, this.state.characterName, this.state.mobileNumber, this.state.address, this.state.height, this.state.waist, this.state.bodyType, this.priceList, this.state.checkedPrice, this.state.checkedFabric);
          window.scrollTo(0,0);
      }
    }
   //  if (this.state.printmobileError) {console.log('trying a forced update');this.forceUpdate();}
}

  backbutton() {
    this.state.back();
  }

  addComment(e, v) {
    this.setState({ comment: v });
  }

  checkedChange = (newchecked, key) => {
    console.log('printing the parameters passed while checking');
    console.log(newchecked,key);
   // console.log(this.state.checked);
    this.setState({
      checked: newchecked, 
    });
    //this.state.priceListmap.set(key, newchecked);

    console.log('a box ticked');
    console.log(this.state.checked);
  }

  handlebodyType(event) {
    console.log('Body type ticked');
    console.log(event.target.name);
    this.state.bodyType = event.target.name;
    if(event.target.name === "Slim" || event.target.name === "Petite") {
      this.setState({ slim: true, regular: false, healthy: false, bodyType: 0 });
      console.log('Slim-- ticked', this.state.bodyType);
    }
    if(event.target.name === "Regular") {
      this.setState({ slim: false, regular: true, healthy: false, bodyType: 1 });
      console.log('Regular-- ticked', this.state.bodyType);
    }
    if(event.target.name === "Husky" || event.target.name === "Plus") {
      this.setState({ slim: false, regular: false, healthy: true, bodyType: 2 });
      console.log('Healthy-- ticked', this.state.bodyType);
    }
  }

  handleheight1change(value){
    if(value) {
    // console.log('value is not null');
     if (value.toString().charAt(value.toString().length - 1).match(/[0-9]/)) {
     this.setState({height1: value});
     this.state.height1 = value;
      // console.log('value is', value);
     }
    }
    if(this.state.height1 && this.state.height2) 
    {
      this.setState({height: (parseInt(this.state.height1) * 12 + parseInt(this.state.height2)) * 2.54});
    }
  }

  handleheight2change(value){
    if(value){
       if (value.toString().charAt(value.toString().length - 1).match(/[0-9]/)) {
        this.setState({height2: value});
        this.state.height2 = value;
      }
    }
    if(this.state.height1 && this.state.height2) 
    {
      this.setState({height: (parseInt(this.state.height1) * 12 + parseInt(this.state.height2)) * 2.54});
    }
  }

  handleheightchange(value){
    if(value){
      if (value.toString().charAt(value.toString().length - 1).match(/[0-9]/)) {
      this.setState({height: value});
      this.state.height = value;
      }
    }
  }

  handlewaist1change(value){
    if(value){ 
      if (value.toString().charAt(value.toString().length - 1).match(/[0-9]/)) {
        this.setState({waist1: value});
        this.state.waist1 = value;
      }
    }
    if (this.state.waist1){ 
      this.setState({waist: parseInt(this.state.waist1) * 2.54});
    }
  }

  handlewaistchange(value){
    if (value) {
      if (value.toString().charAt(value.toString().length - 1).match(/[0-9]/)) {
        this.setState({waist: value});
        this.state.waist = value;
      }
    }
  }
  render() {
    return (
      <div style={{ fontFamily: "Delius" }}>
        

        <form onSubmit={this.handleSubmit}>
          <Flexbox flexDirection="column" justifyContent="space-around" alignItems="center" style={{ textAlign: 'center' }} >
            <div>
              <MuiThemeProvider>
              <div style={styles.div}>
              <Flexbox flexDirection="column" alignItems="center" justifyContent="center">
                <div style={{ paddingBottom: '4vmin' }}>
                  <div style={{fontFamily: 'Delius'}}>
                    {"Now that we are understanding your preferences. Let’s get the last inches (it’s actually a few cms) straightened out. Lookout for a mailer from us containing a fun measurement duo, so we can get the fittings right for your kiddo, down to those last centimeters."}
                  </div>
                  <label className="label__text">
                    {`${this.state.kidName}'s size for top:`}
                    <br />
                    <select value={this.state.sizetop ? this.state.sizetop : 0} onChange={this.sizetopChange} >
                      <option value={0}>Select</option>
                      <option value={1}>1-2 year</option>
                      <option value={2}>2-3 year</option>
                      <option value={3}>3-4 year</option>
                      <option value={4}>4-5 year</option>
                      <option value={5}>5-6 year</option>
                      <option value={6}>6-7 year</option>
                      <option value={7}>7-8 year</option>
                      <option value={8}>8-9 year</option>
                      <option value={9}>9-10 year</option>
                      <option value={10}>10-11 year</option>
                      <option value={11}>11-12 year</option>
                      <option value={12}>12-13 year</option>
                    </select>
                  </label>
                </div>
                <div style={{ paddingBottom: '2vmin' }}>
                  <label className="label__text">
                  {`${this.state.kidName}'s size for bottom:`}
                    <br/>
                    <select value={this.state.sizebottom ? this.state.sizebottom : 0} onChange={this.sizebottomChange} >
                      <option value={0}>Select</option>
                      <option value={1}>1-2 year</option>
                      <option value={2}>2-3 year</option>
                      <option value={3}>3-4 year</option>
                      <option value={4}>4-5 year</option>
                      <option value={5}>5-6 year</option>
                      <option value={6}>6-7 year</option>
                      <option value={7}>7-8 year</option>
                      <option value={8}>8-9 year</option>
                      <option value={9}>9-10 year</option>
                      <option value={10}>10-11 year</option>
                      <option value={11}>11-12 year</option>
                      <option value={12}>12-13 year</option>
                    </select>
                  </label>
                </div>
                <div>
                
                <label className="label__text">
                  {`What is the height of ${this.state.kidName}?`}
                  <InputGroup compact>
                    <div>
                      <Select defaultValue="Feet" style={{width: '15vh'}} onChange={(value) => {this.setState({ heightscaleunit: value});}}>
                        <Option value="Cms">Cms</Option>
                        <Option value="Feet">Feet</Option>
                      </Select>
                    </div>
                    <div>
                      {this.state.heightscaleunit === 'Feet' ?
                        <div fontFamily="Delius">
                          <InputNumber style={styles.InputNumberStyle} value={this.state.height1} onChange={this.handleheight1change}/> 
                          <div style={{fontFamily: 'Delius'}}> {' feet'} </div>
                          <InputNumber style={styles.InputNumberStyle} value={this.state.height2} onChange={this.handleheight2change}/> 
                          <div style={{fontFamily: 'Delius'}}> {' inches'} </div>
                        </div> 
                        :
                        <div>
                          <InputNumber style={styles.InputNumberStyle} value={this.state.height} onChange={this.handleheightchange}/> 
                          <div style={{fontFamily: 'Delius'}}> {' cms'} </div>
                        </div>
                      }
                    </div>
                  </InputGroup>
                </label>



              <label className="label__text">
              {`What is waist length of ${this.state.kidName}?`}
              <InputGroup compact>
              <Select defaultValue="Cms" style={{width: '15vh'}} onChange={(value) => {this.setState({ waistscaleunit: value});} } >
                <Option value="Cms">Cms</Option>
                <Option value="Inches">Inches</Option>
              </Select>
              {this.state.waistscaleunit === 'Inches' ?
                <div fontFamily="Delius">
                  <InputNumber style={styles.InputNumberStyle} value={this.state.waist1} onChange={this.handlewaist1change}
                  /> 
                  <div style={{fontFamily: 'Delius'}}> {' inches'} </div>
                </div> :
                <div>
                  <InputNumber style={styles.InputNumberStyle} value={this.state.waist} onChange={this.handlewaistchange}/> 
                  <div style={{fontFamily: 'Delius'}}> {' cms'} </div>
                </div>
              }
            </InputGroup>
            </label>

                
                {this.state.printMessage ? 
                  <div>
                    <h2> {"OR"} </h2>
                    <label className="label__text">
                    {`What kind of fit do you want for ${this.state.kidName}?`}
                    </label>
                    <Flexbox flexDirection="row" justifyContent="center" alignItems="center">
                      <input onChange={this.handlebodyType} type="checkbox" checked={this.state.bodyType == 0} name={this.state.sex === 'Boy' ? 'Slim' : 'Petite'}  value={this.state.sex === 'Boy' ? 'Slim' : 'Petite'} style={styles.Checkbox} /> <div style={styles.Checkbox}> {this.state.sex === 'Boy' ? 'Slim' : 'Petite'} </div>
                      <input onChange={this.handlebodyType} type="checkbox" checked={this.state.bodyType == 1} name={this.state.sex === 'Boy' ? 'Regular' : 'Regular'} value={this.state.sex === 'Boy' ? 'Regular' : 'Regular'} style={styles.Checkbox} /><div style={styles.Checkbox}> {this.state.sex === 'Boy' ? 'Regular' : 'Regular'} </div>
                      <input onChange={this.handlebodyType} type="checkbox" checked={this.state.bodyType == 2} name={this.state.sex === 'Boy' ? 'Husky' : 'Plus'} value={this.state.sex === 'Boy' ? 'Husky' : 'Plus'} style={styles.Checkbox} /><div style={styles.Checkbox}> {this.state.sex === 'Boy' ? 'Husky' : 'Plus'} </div>
                    </Flexbox> 
                      </div> : <div />}
                
                {this.state.printMessage ? <div style={{ color: 'red', fontFamily: 'Delius', marginTop: '10px' }}>{'Please enter the size details. If you do not know the exact length, then please share the body shape details.'}</div> : <div />}
                </div>
              </Flexbox>
              </div>
              </MuiThemeProvider>
            </div>
            <div>
              <MuiThemeProvider>
                <Flexbox justifyContent="space-around" width="88vw" padding="5vh" marginbottom="40px">
                  <RaisedButton label="Back" onClick={this.state.back} />
                  <RaisedButton label="Next" type="submit" />
                </Flexbox>
              </MuiThemeProvider>
            </div>
            
          </Flexbox>
        </form>
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
    quiz: state.quiz,
    index: state.quiz.index,
    name: state.quiz.name,
    sex: state.quiz.sex,
    ageGroup: state.quiz.ageGroup,
    kidName: fbargs.kidName,
    dob: state.quiz.dob,
    sizetop: state.quiz.sizetop,
    sizebottom: state.quiz.sizebottom,
    skincolor: state.quiz.skincolor,
    votecounts: state.quiz.votecounts,
    stylecounts: state.quiz.stylecounts,
    stylenumbers: state.quiz.stylenumbers,
    comments: state.quiz.comments,
    subindex: state.quiz.subindex,
    characterName: state.quiz.characterName,
    mobileNumber: state.quiz.mobileNumber,
    address: state.quiz.address,
    height: state.quiz.height,
    waist: state.quiz.waist,
    bodyType: state.quiz.bodyType,
    priceList: state.quiz.priceList,
    checkedPrice: state.quiz.checkedPrice,
    checkedFabric: state.quiz.checkedFabric,
  };
};

// My naming convention: I will do a different of casing so as not to have the linting error.
const mapDispatchToProps = dispatch => {
  return {
    next: (uid) => dispatch(next(uid)),
    back: () => dispatch(back()),
    setsection: (index) => dispatch(setsection(index)),
    subindexincrement: () => dispatch(subindexincrement()),
    subindexdecrement: () => dispatch(subindexdecrement()),
    section1Add: (uid, name, kidName, dob, sex, ageGroup, mobileNumber) => dispatch(section1Add(uid, name, kidName, dob, sex, ageGroup, mobileNumber)),
    section2Add: (uid, sizetop, sizebottom, characterName, mobileNumber, address, height, waist, bodyType, priceList, checkedPrice, checkedFabric) => dispatch(section2Add(uid, sizetop, sizebottom, characterName, mobileNumber, address, height, waist, bodyType, priceList, checkedPrice, checkedFabric)),
    rating: (uid, selection, votecount) => dispatch(rating(uid, selection, votecount)),
    stylerating: (uid, selection, votecount) => dispatch(stylerating(uid, selection, votecount)),
    addComment: (uid, section, comment) => dispatch(addComment(uid, section, comment)),
    addStyleNumber: (uid, styeinstance, expectedNumber) => dispatch(addStyleNumber(uid, styeinstance, expectedNumber)),
    addcharacter: (uid, characterName) => dispatch(addcharacter(uid, characterName)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Section2);