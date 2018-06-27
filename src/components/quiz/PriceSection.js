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
  InputNumberStyle: {
    width: '10vmax',
    marginLeft: '2vmax',
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
      heightscaleunit: 'Feet',
      waistscaleunit: 'Cms',
      fabrics: [],
      checkedFabric: props.checkedFabric,
      checkedPrice: props.checkedPrice,
    };

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
      if (this.state.ageGroup === '2-4') {
        this.priceList.set('Shirts', [399, 399, 699, 999, 1199]);
        this.priceList.set('T-Shirts', [250, 299, 499, 699, 799]);
        this.priceList.set('Bottoms', [299, 299, 599, 899, 999]);
      }
      else {
        this.priceList.set('Shirts', [599, 599, 899, 1199, 1199]);
        this.priceList.set('T-Shirts', [499, 499, 799, 1099, 1099]);
        this.priceList.set('Bottoms', [799, 899, 1199, 1799, 1899]);
      }
    }
    else {
      if (this.state.ageGroup === '2-4') {
        this.priceList.set('Tops', [299, 299, 599, 899, 999]);
        this.priceList.set('T-Shirts', [250, 299, 499, 699, 799]);
        this.priceList.set('Bottoms', [299, 299, 599, 899, 999]);
        this.priceList.set('Dresses', [499, 499, 799, 1299, 1499]);
      }
      else {
        this.priceList.set('Tops', [599, 599, 899, 1199, 1199]);
        this.priceList.set('T-Shirts', [499, 499, 799, 1099, 1099]);
        this.priceList.set('Bottoms', [799, 899, 1199, 1299, 1799]);
        this.priceList.set('Dresses', [599, 599, 899, 1499, 1999]);
      }
    }
      
    this.designs = Array.from(this.state.stylecounts.keys(), (x) => (this.state.stylecounts.get(x) > 1 ? x : '')).filter(word => word.length > 0);
    console.log('In price section, the designs liked are', this.designs);
    // Now we have to keep only the elements form the positive array in pricelist and designs. 
    this.skincolorChange = this.skincolorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.backbutton = this.backbutton.bind(this);
    this.addComment = this.addComment.bind(this);
    this.characterNameChange = this.characterNameChange.bind(this);
    this.addAddress = this.addAddress.bind(this);
}

  skincolorChange(event) {
    this.setState({ skincolor: event.target.value });
  }

  characterNameChange(event, value) {
    this.setState({ characterName: value });
  }

  addAddress(event, value) {
    this.setState({ address: value });
  }

  handleSubmit() {
    this.state.section2Add(this.state.uid, this.state.sizetop, this.state.sizebottom, this.state.characterName, this.state.mobileNumber, this.state.address, this.state.height, this.state.waist, this.state.bodyType, this.priceList, this.state.checkedPrice, this.state.checkedFabric);
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
      checkedPrice: newchecked, 
    });
    this.state.checkedPrice = newchecked;
    //this.state.priceListmap.set(key, newchecked);

    console.log('a box ticked');
    console.log(this.state.checkedPrice);
  }

  checkedChangeFabric = (newchecked, key) => {
    console.log('printing the parameters passed while checking for fabric');
    console.log(newchecked,key);
   // console.log(this.state.checked);
    this.setState({
      checkedFabric: newchecked, 
    });
    this.state.checkedFabric = newchecked;
    //this.state.priceListmap.set(key, newchecked);

    console.log('a box ticked for fabric');
    console.log(this.state.checkedFabric);
  }

  render() {
    return (
      <div style={{ fontFamily: "Delius" }}>
        <form onSubmit={this.handleSubmit}>
          <Flexbox flexDirection="column" justifyContent="space-around" alignItems="center" style={{ textAlign: 'center' }} >
            {<Flexbox flexDirection='column' alignItems="center" style={styles.div}> 
            <h3 style={{ fontFamily: 'Delius', padding: '0px', margin: '0px', marginBottom: '10px', textDecoration: 'underline' }}> {'How much do you usually spend on:'} </h3>
           {
                this.designs.map((key) => {
                    return (
                        <Flexbox key={key} flexDirection="column" alignItems="center">
                          <h4 style={{ fontFamily: 'Delius', padding: '0px', margin: '0px', textDecoration: 'underline' }}>{key}</h4>
                          <CheckboxGroup
                            name={key}
                            value={this.state.checkedPrice}
                            onChange={this.checkedChange}
                          >
                            <Flexbox flexDirection="row">
                              <label style={styles.label}>
                                <Checkbox value={`lower:${key}`} style={styles.checkbox}/> {`< Rs ${this.priceList.get(key)[0]}`}
                              </label>
                              <label style={styles.label}>
                                <Checkbox value={`mid1:${key}`} style={styles.checkbox}/> {`Rs ${this.priceList.get(key)[1]}-${this.priceList.get(key)[2]}`}
                              </label>
                              <label style={styles.label}>
                                <Checkbox value={`mid2:${key}`} style={styles.checkbox}/> {`Rs ${this.priceList.get(key)[2]}-${this.priceList.get(key)[3]}`}
                              </label>
                              <label style={styles.label}>
                                <Checkbox value={`upper:${key}`} style={styles.checkbox}/>{`> Rs ${this.priceList.get(key)[3]}`}
                              </label>
                            </Flexbox>
                          </CheckboxGroup>
                        </Flexbox>
                    );
                  })
              }
              <h3 style={{ fontFamily: 'Delius', padding: '0px', margin: '0px', marginBottom: '10px', marginTop: '10px', textDecoration: 'underline' }}> {'Fabrics that you want to avoid'} </h3>
              <CheckboxGroup
                value={this.state.checkedFabric}
                onChange={this.checkedChangeFabric}
              >
                <label style={styles.label}>
                  <Checkbox value="Synthetics" style={styles.checkbox}/> {"Synthetics"}
                </label>
                <label style={styles.label}>
                  <Checkbox value="Blended" style={styles.checkbox}/> {"Blended"}
                </label>
                <label style={styles.label}>
                  <Checkbox value="Silk" style={styles.checkbox}/> {"Silk"}
                </label>
                
              </CheckboxGroup>
            </Flexbox>} 
          <div style={styles.div}>
          <div>
          
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
                  hintText="Address"
                  hintStyle={styles.hintStyle}
                  onChange={this.addAddress}
                  defaultValue={this.state.address ? this.state.address : ''}
                  style={styles.textfield_style}
                />
              </MuiThemeProvider>
            </div>
          </div>
            
            <div>
              <MuiThemeProvider>
                <Flexbox justifyContent="space-around" width="88vw" padding="5vh">
                  <RaisedButton label="Back" onClick={this.state.back} />
                  <RaisedButton label="Next" onClick={this.handleSubmit} />
                </Flexbox>
              </MuiThemeProvider>
            </div>
            
          </Flexbox>
        </form>
      </div>

    );
  }
}