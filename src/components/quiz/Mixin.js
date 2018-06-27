import React from 'react';
import Flexbox from 'flexbox-react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { firebase, database } from '../../firebase/firebase';
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
};

export default class Section2 extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    this.state = {
      quiz: props.quiz,
      sizetop: props.sizetop ? props.sizetop : 1,
      sizebottom: props.sizebottom ? props.sizebottom : 1,
      skincolor: props.skincolor,
      section2Add: props.section2Add,
      back: props.back,
      next: props.next,
      comment: props.comment,
      addComment: props.addComment,
      hintText: 'Anything else you want to tell us, e.g., requirement for fabric, fit etc.',
      styles: props.styles,
      characterName: props.characterName,
      kidName: props.kidName,
      votecounts: props.votecounts,
      stylecounts: props.stylecounts,
      mobileNumber: props.mobileNumber,
      address: props.address,
      section: props.section,
      height: props.height,
      height1: '',
      height2: '',
      waist: props.waist,
      bodyType: props.bodyType,
      printMessage: false,
      msgPrintedOnce: false,
      slim: false,
      regular: false,
      healthy: false,
      priceListmap: props.priceList,
      uid: props.uid,
      sex: props.sex,
      printmobileError: false,
      heightscaleunit: 'Feet',
      widthscaleunit: 'Cms',
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
    if(this.state.height1 && this.state.height2) {
      // convert to cms. 
      this.state.height = (parseInt(this.state.height) * 12 + parseInt(this.state.height2)) * 2.54;
    }
    if( this.state.mobileNumber ) console.log('length of mobile is', this.state.mobileNumber.length);
    if (this.state.comment) this.state.addComment(this.state.uid, this.state.section, this.state.comment);
    // Check if mobile number has been entered. 
    if( this.state.mobileNumber )
      if ( this.state.mobileNumber.length !== 10 ) {
        console.log('no of digits in mobile inadequate'); 
        this.state.printmobileError = true; this.setState({ printmobileError: true});
      }
      else {
        this.setState({printmobileError: false});
        this.state.printmobileError = false;
      }
    if(!this.state.mobileNumber) {this.state.printmobileError = true; this.setState({ printmobileError: true});console.log('mobile not entered');console.log('this.state.printmobileError', this.state.printmobileError);}
    
    if(this.state.msgPrintedOnce) {
      if(!this.state.printmobileError){
          console.log('this.state.printmobileError', this.state.printmobileError);
          if (this.state.waist && this.state.height) this.setState({printMessage: true});
          this.state.section2Add(this.state.uid, this.state.sizetop, this.state.sizebottom, this.state.characterName, this.state.mobileNumber, this.state.address, this.state.height, this.state.waist, this.state.bodyType, this.priceList);
      // Just for the time being not sending the proper priceList.
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
         this.state.section2Add(this.state.uid, this.state.sizetop, this.state.sizebottom, this.state.characterName, this.state.mobileNumber, this.state.address, this.state.height, this.state.waist, this.state.bodyType, this.priceList);
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
    console.log(event.target.name);
    this.state.bodyType = event.target.name;
    if(event.target.name === "Slim") {
      this.setState({ slim: true, regular: false, healthy: false, bodyType: "slim" });
    }
    if(event.target.name === "Regular") {
      this.setState({ slim: false, regular: true, healthy: false, bodyType: "regular" });
    }
    if(event.target.name === "Healthy") {
      this.setState({ slim: false, regular: false, healthy: true, bodyType: "healthy" });
    }
  }

  render() {
    return (
      <div style={{ fontFamily: "Delius" }}>
        <InputGroup compact>
          <label className="label__text">
            {`Height of ${this.state.kidName}`}
          </label>
          <br />
          <Select defaultValue="Feet" onChange={this.heightscale}>
            <Option value="Cms">Cms</Option>
            <Option value="Feet">Feet</Option>
          </Select>
          {this.state.heightscaleunit === 'Feet' && this.state.heightscaleunit ?
            <div fontFamily="Delius">
              <InputNumber style={{ width: '5vmax' }} min={1} max={5} /> {' feet'}
              <InputNumber style={{ width: '5vmax' }} min={0} max={11} /> {' inches'}
            </div> :
            <div>
              <Input style={{ width: '5vmax' }} /> {' cms'}
            </div>
          }
        </InputGroup>

        <form onSubmit={this.handleSubmit}>
          <Flexbox flexDirection="column" justifyContent="space-around" alignItems="center" style={{ textAlign: 'center' }} >
            <div>
              <MuiThemeProvider>
                <div style={styles.div}>
              <Flexbox flexDirection="column" alignItems="center" justifyContent="center">
                <div style={{ paddingBottom: '4vmin' }}>
                  <label className="label__text">
                    {`${this.state.kidName}'s size for top:`}
                    <br />
                    <select value={this.state.sizetop} onChange={this.sizetopChange} >
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
                    <select value={this.state.sizebottom} onChange={this.sizebottomChange} >
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
                
                
                {this.state.printMessage ? 
                  <div>
                    <h2> {"OR"} </h2>
                    <label className="label__text">
                    {`What kind of fit do you want for ${this.state.kidName}?`}
                    </label>
                    <Flexbox flexDirection="row" justifyContent="center" alignItems="center">
                      <input onChange={this.handlebodyType} type="checkbox" checked={this.state.slim} name="Slim" value="Slim" style={styles.Checkbox} /> <div style={styles.Checkbox}> {'Slim'} </div>
                      <input onChange={this.handlebodyType} type="checkbox" checked={this.state.regular} name="Regular" value="Regular" style={styles.Checkbox} /><div style={styles.Checkbox}> {'Regular'} </div>
                      <input onChange={this.handlebodyType} type="checkbox" checked={this.state.healthy} name="Healthy" value="Healthy" style={styles.Checkbox} /><div style={styles.Checkbox}> {'Healthy'} </div>
                    </Flexbox> 
                    </div> : 
                    <div />
                  }
                <div>
                {this.state.printMessage ? <div style={{ color: 'red', fontFamily: 'Delius', marginTop: '10px' }}>{'Please enter the size details. If you do not know the exact length, then please share the body shape details.'}</div> : <div />}
                </div>
              </Flexbox>
              </div>
              </MuiThemeProvider>
            </div>
            {/*<Flexbox flexDirection='column' alignItems="center" style={styles.div}> 
            <h3 style={{ fontFamily: 'Delius', padding: '0px', margin: '0px' }}> {'How much do you want to spend on:'} </h3>
           {
                this.designs.map((key) => {
                    return (
                        <Flexbox key={key} flexDirection="column" alignItems="center">
                          <h4 style={{ fontFamily: 'Delius', padding: '0px', margin: '0px', textDecoration: 'underline' }}>{key}</h4>
                          <CheckboxGroup
                            name={key}
                            value={this.state.checked}
                            onChange={this.checkedChange}
                          >
                            <Flexbox flexDirection="row">
                              <label style={styles.label}><Checkbox value={`lower${key}`} style={styles.checkbox}/> {`< Rs ${this.priceList.get(key)[0]}`}</label>
                              <label style={styles.label}><Checkbox value={`mid${key}`} style={styles.checkbox}/> {`Rs ${this.priceList.get(key)[0]}-${this.priceList.get(key)[1]}`}</label>
                              <label style={styles.label}><Checkbox value={`upper${key}`} style={styles.checkbox}/>{`> Rs ${this.priceList.get(key)[1]}`}</label>
                            </Flexbox>
                          </CheckboxGroup>
                        </Flexbox>
                    );
                  })
              }
            </Flexbox>*/}
          <div style={styles.div}>
          <div>
          <MuiThemeProvider>
            <TextField
              hintText={`What is ${this.state.kidName}'s favourite character`}
              hintStyle={styles.hintStyle}

              onChange={this.characterNameChange}
              defaultValue={this.state.characterName ? this.state.characterName : ''}
              style={styles.textfield_style}
            />
          </MuiThemeProvider>
        </div>
        <div>
            <MuiThemeProvider>
              <TextField
                hintText={this.state.hintText}
                hintStyle={styles.hintStyle}
                onChange={this.addComment}
                defaultValue={this.state.comment ? this.state.comment : ''}
                style={styles.textfield_style}
              />
            </MuiThemeProvider>
          </div>
            
            <div>
              <MuiThemeProvider>
                <TextField
                  hintText="Mobile number"
                  hintStyle={styles.hintStyle}
                  onChange={this.addMobileNumber}
                  value={this.state.mobileNumber ? this.state.mobileNumber : ''}
                  style={styles.textfield_style}
                />
              </MuiThemeProvider>
            </div>
            <div>
              <MuiThemeProvider>
                <TextField
                  hintText="Address"
                  hintStyle={styles.hintStyle}
                  onChange={this.addAddress}
                  defaultValue={this.state.address ? this.state.address : ''}
                  style={styles.textfield_style}
                />
              </MuiThemeProvider>
            </div>
          </div>
            {this.state.printmobileError ? <div> {this.state.mobileNumber ? <div className="error__message" style={{ paddingTop: '3vmin', color: 'red' }}>
            {'Please enter a mobile no of 10 digits'}
            </div> : <div className="error__message" style={{ paddingTop: '3vmin', color: 'red' }}>
            {'Please enter mobile number'}
            </div>}</div> : <div />}
            <div>
              <MuiThemeProvider>
                <Flexbox justifyContent="space-around" width="88vw" padding="5vh">
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