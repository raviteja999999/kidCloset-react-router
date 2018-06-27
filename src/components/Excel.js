import Workbook from 'react-excel-workbook';
import React from 'react';
import CSVReader from 'react-csv-reader';
import { firebase, database } from '../firebase/firebase';

let data6 = [];
let data7 = [];
let data8 = []; // This is for user with name, kidname, kidDob, phone number and address.
let largestAtrribute = 0;
let currentAttribute = 0;

export default class Excel extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    this.state = {
      uid: '',
      sex: '',
      kidName: '',
      name: '',
      dob: '',
      mobile: '',
      address: '',
      bodyType: '',
      characterName: '',
      sizebottom: '',
      sizetop: '',
      waist: '',
      stylecountsKey: [],
      stylecountsValue: [],
      commentsKey: [],
      commentsValue: [],
      styleKey: [],
      styleValue: [],
      votecountsKey: [],
      arraydesignKey: [],
      arraydesignValue: [],
      arraycolorKey: [],
      arraycolorValue: [],
      arraysubcolorKey: [],
      arraysubcolorValue: [],
      arraypatternKey: [],
      arraypatternValue: [],
      arraythemeKey: [],
      arraythemeValue: [],
      votecountsValue: [],
      checkedPrice: [],
      checkedFabric: [],
      expectedStyleKey: [],
      expectedStyleValue: [],
      predictedStyleKey: [],
      predictedStyleValue: [],
      price: '',
      fabric: '',
      style: '',
      colors: '',
      subcolors: '',
      designs: '',
      patterns: '',
      themes: '',
      comments: '',
      brands: '',
      expectedstyleStr: '',
      predictedstyle: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForce = this.handleForce.bind(this);
    this.handleDarkSideForce = this.handleDarkSideForce.bind(this);

    this.themes = ['Casual', 'Party', 'Active', 'Trendy', 'Classy', 'Bold', 'Dynamic', 'Charismatic', 'Cool'];
    this.styles = ['Bottoms', 'Dresses', 'T-Shirts', 'Tops', 'Shirts'];
    this.designs = ['Blouse', 'Chinos', 'Cold shoulder', 'Ruffles', 'Sleeveless', 'Tunic', 'Crop top', 'Shirt', 'Sleeveless top', 'Half sleeve', 'Full sleeve', 'Polo', 'Round neck', 'Culottes', 'Jeans', 'Shorts', 'Trousers', 'Joggers', 'Rompers-Overalls', 'Jumpsuits-Dungarees', 'Cargo', 'Trousers', 'Culottes', 'Jeans', 'Shorts', 'Skirts', 'Jeggings', 'Leggings', 'Half sleeves shirts', 'Full sleeves shirts', 'Above knee', 'Below knee', 'Gown', 'Dresses', 'Casual dress', 'Party dress', 'Gown'];
    this.patterns = ['Nature', 'Beach', 'Objects-Figures', 'Prints', 'Stripes', 'Geometrical-Abstract', 'Solid-Plain', 'Cartoons-Characters', 'Plaids', 'Stars', 'Camouflage', 'Polka', 'Floral', 'Prints', 'Stripes', 'Hearts', 'Solid-Plain', 'Patches', 'Gingham', 'Plaids', 'Animal', 'Abstract', 'Geometrical'];
    this.colors = ['Pink', 'Blue', 'Red', 'White', 'Grey', 'Orange', 'Green', 'Black', 'Brown', 'Yellow', 'Glitter-Shimmer', 'Blue', 'Khaki', 'Red', 'White', 'Purple', 'Grey', 'Orange', 'Green', 'Black', 'Brown', 'Yellow', 'Olive'];
    this.subcolors = ['Ferrari', 'Reds', 'Burgandy', 'Chilli', 'Raspberry', 'Persian', 'Sangria', 'Carnation', 'Bubble Gum', 'Hot Pink', 'Fuchsia', 'Brick', 'Cerise', 'Baby Blue', 'Egyptian', 'Navy', 'Electric', 'Azure', 'CornFlower', 'Banana', 'Yellows', 'Gold', 'Lemon', 'Tuscany', 'Royal', 'Melon', 'Salamander', 'Oranges', 'Sandstone', 'Apricot', 'Tangerine', 'Ginger', 'Lavender', 'Lilac', 'Grape', 'Lollipop', 'Eggplant', 'Violet', 'Tea', 'Mint', 'Forest', 'Kelly', 'Army', 'Tortilla', 'Browns', 'Chocolate', 'Cinnamon', 'Pearl river', 'Stone', 'Steel', 'Iron', 'Abalone'];
    this.brands = ['Mothercare', 'Chalk (Pantaloons)', 'Gap kids', 'Gini and Jony', 'H&M', 'Nauti Nati', 'UCB', 'US Polo', 'Zara', 'Biba'];
    // Make sure that you avoid duplicates.
    this.patterns = this.patterns.filter((item, pos) => { return this.patterns.indexOf(item) === pos; });
    this.colors = this.colors.filter((item, pos) => { return this.colors.indexOf(item) === pos; });
    this.designs = this.designs.filter((item, pos) => { return this.designs.indexOf(item) === pos; });
  }
  handleChange(event) {
    this.state.uid = event.target.value;
  }
  
  handleSubmit(event) {
    database.ref(`users/${this.state.uid}/quiz/general/sex`).once('value').then((snapshot) => {
      this.state.sex = snapshot.val();
      if (this.state.sex === 'Boy') {
        this.styles = ['Bottoms', 'T-Shirts', 'Shirts'];
      } else {
        this.styles = ['Bottoms', 'Dresses', 'T-Shirts', 'Tops'];
      }
    });
  
    database.ref(`users/${this.state.uid}/quiz/general/kidName`).once('value').then((snapshot) => {
      this.setState({ kidName: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/name`).once('value').then((snapshot) => {
      this.setState({ name: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/mobileNumber`).once('value').then((snapshot) => {
      this.setState({ mobile: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/dob`).once('value').then((snapshot) => {
      this.setState({ dob: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/address`).once('value').then((snapshot) => {
      this.setState({ address: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/characterName`).once('value').then((snapshot) => {
      // this.setState({ characterName: snapshot.val() });
      const tempCharacter = [];
      snapshot.forEach((childSnapshot) => {
        tempCharacter.push(childSnapshot.val());
      });
      this.state.characterName = tempCharacter[tempCharacter.length - 1];
    });

    database.ref(`users/${this.state.uid}/quiz/general/bodyType`).once('value').then((snapshot) => {
      if (this.state.sex === 'Boy') {
        switch (snapshot.val()) {
          case 0:
            this.state.bodyType = 'Slim';
            break;
          case 1:
            this.state.bodyType = 'Regular';
            break;
          case 2:
            this.state.bodyType = 'Husky';
            break;
          default: 
            break;
        }
      } else {
        switch (snapshot.val()) {
          case 0:
            this.state.bodyType = 'Petite';
            break;
          case 1:
            this.state.bodyType = 'Regular';
            break;
          case 2:
            this.state.bodyType = 'Plus';
            break;
          default:
            break;
        }
      }
    });

    database.ref(`users/${this.state.uid}/quiz/general/sizebottom`).once('value').then((snapshot) => {
      this.setState({ sizebottom: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/sizetop`).once('value').then((snapshot) => {
      this.setState({ sizetop: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/waist`).once('value').then((snapshot) => {
      this.setState({ waist: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/height`).once('value').then((snapshot) => {
      this.setState({ height: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/stylecounts/key`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.stylecountsKey.push(childSnapshot.val());
      });
    });

    database.ref(`users/${this.state.uid}/quiz/stylenumbers/value`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.expectedStyleValue.push(childSnapshot.val());
      });
      console.log('Stylenumbers are', this.state.expectedStyleValue);
    });

    database.ref(`users/${this.state.uid}/quiz/stylenumbers/key`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.expectedStyleKey.push(childSnapshot.val());
      });
      console.log('expected no of styles are', this.state.expectedStyleKey, this.state.expectedStyleValue);
      for (let i = 0; i < this.state.expectedStyleKey.length; i += 1) {
        // Just see if it is the last occurrence
        const lastIndex = this.state.expectedStyleKey.lastIndexOf(this.state.expectedStyleKey[i]);
        const firstIndex = this.state.expectedStyleKey.indexOf(this.state.expectedStyleKey[i]);
        if (lastIndex === i) {
          this.state.expectedstyleStr += '-' + this.state.expectedStyleKey[i] + ':' + this.state.expectedStyleValue[i];
          console.log(lastIndex, i, this.state.expectedStyleKey[i]);
        }
        if (firstIndex === i) {
          this.state.predictedstyle += '-' + this.state.expectedStyleKey[i] + ':' + this.state.expectedStyleValue[i];
        }
      }
      console.log('after removing the duplicates, the string is', this.state.expectedstyleStr);
    });

    database.ref(`users/${this.state.uid}/quiz/stylecounts/value`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.stylecountsValue.push(childSnapshot.val());
      });
    });

    database.ref(`users/${this.state.uid}/quiz/general/checkedPrice`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.checkedPrice.push(childSnapshot.val());
        this.state.price = this.state.price + '-' + childSnapshot.val();
      });
    });

    database.ref(`users/${this.state.uid}/quiz/general/checkedFabric`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.checkedFabric.push(childSnapshot.val());
        this.state.fabric = this.state.fabric + '-' + childSnapshot.val();
      });
      
      this.styles.forEach((style) => {
        const index = this.state.stylecountsKey.lastIndexOf(style);
        if (index > -1) {
          this.state.styleValue.push(this.state.stylecountsValue[index]);
          this.state.styleKey.push(this.state.stylecountsKey[index]);
        }
      });

      // Computing the predicted number of styles by the al
    });

    // Now reading all votecounts. Will include, themes, colors, patterns and subcolors.
    database.ref(`users/${this.state.uid}/quiz/votecounts/key`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.votecountsKey.push(childSnapshot.val());
      });
    });
    // Votecounts read.

    // Now filter out the remaining things in votecounts.
    database.ref(`users/${this.state.uid}/quiz/votecounts/value`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.votecountsValue.push(childSnapshot.val());
      });

      // Reading the themes.
      let pos = 0;
      this.themes.forEach((style) => {
        const index = this.state.votecountsKey.lastIndexOf(style);
        if (index > -1) {
          currentAttribute += 1;
          this.state.themes = this.state.themes + this.state.votecountsKey[index] + ':' + this.state.votecountsValue[index] + ',';
          this.state.arraythemeKey[pos] = this.state.votecountsKey[index];
          this.state.arraythemeValue[pos] = this.state.votecountsValue[index];
          pos += 1;
        }
      });

      if (currentAttribute > largestAtrribute) largestAtrribute = currentAttribute;
      currentAttribute = 0;

      // Reading the colors.
      pos = 0;
      this.colors.forEach((style) => {
        const index = this.state.votecountsKey.lastIndexOf(style);
        if (index > -1) {
          currentAttribute += 1;
          this.state.colors = this.state.colors + this.state.votecountsKey[index] + ':' + this.state.votecountsValue[index] + ',';
          this.state.arraycolorKey[pos] = this.state.votecountsKey[index];
          this.state.arraycolorValue[pos] = this.state.votecountsValue[index];
          pos += 1;
        }
      });

      if (currentAttribute > largestAtrribute) largestAtrribute = currentAttribute;
      currentAttribute = 0;

      // Reading brands
      this.brands.forEach((style) => {
        const index = this.state.votecountsKey.lastIndexOf(style);
        //const brandValue = 0;
        if (index > -1) {
          this.state.brands = this.state.brands + this.state.votecountsKey[index] + ':' + this.state.votecountsValue[index]*2 + ',';
        }
      });

      // Reading sub-colours
      pos = 0;
      this.subcolors.forEach((style) => {
        const index = this.state.votecountsKey.lastIndexOf(style);
        if (index > -1) {
          currentAttribute += 1;
          
          this.state.arraysubcolorKey[pos] = this.state.votecountsKey[index];
          console.log('reading sub-colors');
          if (this.state.votecountsValue[index] === 0) {
            this.state.arraysubcolorValue[pos] = 2;
           
          } else if (this.state.votecountsValue[index] === 1) {
            this.state.arraysubcolorValue[pos] = 4;
          } else {
            this.state.arraysubcolorValue[pos] = 0;
          }
          console.log(this.state.arraysubcolorKey[pos], this.state.arraysubcolorValue[pos]);
          this.state.subcolors = this.state.subcolors + this.state.arraysubcolorKey[pos] + ':' + this.state.arraysubcolorValue[pos] + ',';
          pos += 1;
        }
      });

      if (currentAttribute > largestAtrribute) largestAtrribute = currentAttribute;
      currentAttribute = 0;

      // Reading patterns.
      pos = 0;
      this.patterns.forEach((style) => {
        const index = this.state.votecountsKey.lastIndexOf(style);
        if (index > -1) {
          currentAttribute += 1;
          this.state.patterns = this.state.patterns + this.state.votecountsKey[index] + ':' + this.state.votecountsValue[index] + ',';
          this.state.arraypatternKey[pos] = this.state.votecountsKey[index];
          this.state.arraypatternValue[pos] = this.state.votecountsValue[index];
          pos += 1;
        }
      });

      if (currentAttribute > largestAtrribute) largestAtrribute = currentAttribute;
      currentAttribute = 0;

      // Reading designs.
      console.log('we will be reading designs here');
      pos = 0;
      this.designs.forEach((style) => {
        const index = this.state.votecountsKey.lastIndexOf(style);
        if (index > -1) {
          currentAttribute += 1;
          this.state.designs = this.state.designs + this.state.votecountsKey[index] + ':' + this.state.votecountsValue[index] + ',';
          this.state.arraydesignKey[pos] = this.state.votecountsKey[index];
          this.state.arraydesignValue[pos] = this.state.votecountsValue[index];
          pos += 1;
        }
      });

      if (currentAttribute > largestAtrribute) largestAtrribute = currentAttribute;
      currentAttribute = 0;
      for (let i = 0; i < 20; i += 1) {
        data7.push({
          name: this.state.name, style: this.state.styleKey[i], stylevote: this.state.styleValue[i], design: this.state.arraydesignKey[i], designvote: this.state.arraydesignValue[i], theme: this.state.arraythemeKey[i], themevote: this.state.arraythemeValue[i], color: this.state.arraycolorKey[i], colorvote: this.state.arraycolorValue[i], subcolor: this.state.arraysubcolorKey[i], subcolorvote: this.state.arraysubcolorValue[i], pattern: this.state.arraypatternKey[i], patternvote: this.state.arraypatternValue[i]
        });
      }
    });// Read the components in votecounts.
    database.ref(`users/${this.state.uid}/quiz/comments/key`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.commentsKey.push(childSnapshot.val());
      });
    });

    database.ref(`users/${this.state.uid}/quiz/comments/value`).once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => { 
        this.state.commentsValue.push(childSnapshot.val());
        var index = this.state.commentsValue.length - 1; 
        this.state.comments = this.state.comments + this.state.commentsKey[index] + ':' + this.state.commentsValue[index] + ',';
      });
      data6 = [
        {
          name: this.state.name ? this.state.name : '',
          kidName: this.state.kidName ? this.state.kidName : '',
          sex: this.state.sex ? this.state.sex : '',
          uid: this.state.uid ? this.state.uid : '',
          dob: this.state.dob ? this.state.dob : '',
          address: this.state.address ? this.state.address : '',
          mobile: this.state.mobile ? this.state.mobile : '',
          characterName: this.state.characterName ? this.state.characterName : '',
          bodyType: this.state.bodyType ? this.state.bodyType : '',
          sizebottom: this.state.sizebottom ? this.state.sizebottom : '',
          sizetop: this.state.sizetop ? this.state.sizetop : '',
          waist: this.state.waist ? this.state.waist : '',
          height: this.state.height ? this.state.height : '',
          style: this.state.style ? this.state.style : '',
          themes: this.state.themes ? this.state.themes : '',
          colors: this.state.colors ? this.state.colors : '',
          subcolors: this.state.subcolors ? this.state.subcolors : '',
          patterns: this.state.patterns ? this.state.patterns : '',
          designs: this.state.designs ? this.state.designs : '',
          comments: this.state.comments ? this.state.comments : '',
          brands: this.state.brands ? this.state.brands : '',
          checkedPrice: this.state.checkedPrice ? this.state.checkedPrice : '',
          checkedFabric: this.state.checkedFabric ? this.state.checkedFabric : '',
          price: this.state.price ? this.state.price : '',
          fabric: this.state.fabric ? this.state.fabric : '',
          expectedstyleStr: this.state.expectedstyleStr ? this.state.expectedstyleStr : '',
          predictedstyle: this.state.predictedstyle ? this.state.predictedstyle : '',
        },
      ];
      console.log('data6 is', data6);
      // console.log('printing all the')
      console.log('data7 is', data7);
      this.setState({ name: this.state.name });
    });
    event.preventDefault();
  }

  handleForce(data) {
    console.log('a file inputed', data);
    this.setState();
    console.log('first element', data[0]);
    data.forEach((user) => {
      console.log(user);
      // For each of the user, push an entry into an array.
      database.ref(`users/${user[3]}/quiz/general/name`).once('value').then((snapshot) => {
        this.state.name = snapshot.val();
      });
      database.ref(`users/${user[3]}/quiz/general/kidName`).once('value').then((snapshot2) => {
        this.state.kidName = snapshot2.val();
      });
      database.ref(`users/${user[3]}/quiz/general/sex`).once('value').then((snapshot2) => {
        this.state.sex = snapshot2.val();
      });
      database.ref(`users/${user[3]}/quiz/general/mobileNumber`).once('value').then((snapshot3) => {
        this.state.mobile = snapshot3.val();
        console.log('mobile', this.state.mobile);
      });
      database.ref(`users/${user[3]}/quiz/general/address`).once('value').then((snapshot5) => {
        this.state.address = snapshot5.val();
      });
      database.ref(`users/${user[3]}/quiz/general/dob`).once('value').then((snapshot6) => {
        this.state.dob = snapshot6.val();
        data8.push({
          email: user[0],
          firstlogin: user[1],
          lastlogin: user[2],
          userid: user[3],
          name: this.state.name,
          kidName: this.state.kidName,
          dob: this.state.dob,
          mobile: this.state.mobile,
          address: this.state.address,
          sex: this.state.sex,
        });
      });
    });
      console.log('another time', this.state.name);
          // console.log(user[0], user[3], this.state.name);
          
  }

  handleDarkSideForce() {
    console.log('error in reading a csv file');
  }
  render() {
    return (
      <div className="row text-center" style={{marginTop: '100px'}}>
        <CSVReader
        cssClass="csv-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={this.handleForce}
        onError={this.handleDarkSideForce}
        />
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <h3> {`Name: ${this.state.name}`} </h3>
        <h3> {`Address: ${this.state.address}`} </h3>
        <h3> {`Mobile: ${this.state.mobile}`} </h3>
        <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary">Download excel!</button>}>
          <Workbook.Sheet data={data6} name="Sheet A">
            <Workbook.Column label="name" value="name" />
            <Workbook.Column label="kidName" value="kidName" />
            <Workbook.Column label="sex" value="sex" />
            <Workbook.Column label="uid" value="uid" />
            <Workbook.Column label="dob" value="dob" />
            <Workbook.Column label="address" value="address" />
            <Workbook.Column label="mobile" value="mobile" />
            <Workbook.Column label="characterName" value="characterName" />
            <Workbook.Column label="bodyType" value="bodyType" />
            <Workbook.Column label="sizebottom" value="sizebottom" />
            <Workbook.Column label="sizetop" value="sizetop" />
            <Workbook.Column label="waist" value="waist" />
            <Workbook.Column label="height" value="height" />
            <Workbook.Column label="style" value="style" />
            <Workbook.Column label="colors" value="colors" />
            <Workbook.Column label="subcolors" value="subcolors" />
            <Workbook.Column label="designs" value="designs" />
            <Workbook.Column label="themes" value="themes" />
            <Workbook.Column label="comments" value="comments" />
            <Workbook.Column label="brands" value="brands" />
            <Workbook.Column label="patterns" value="patterns" />
            <Workbook.Column label="price" value="price" />
            <Workbook.Column label="fabric" value="fabric" />
            <Workbook.Column label="predictedStyle" value="predictedstyle" />
            <Workbook.Column label="customer-requested" value="expectedstyleStr" />
          </Workbook.Sheet>
          <Workbook.Sheet data={data7} name="Ratings">
            <Workbook.Column label="name" value="name" />
            <Workbook.Column label="style" value="style" />
            <Workbook.Column label="stylevote" value="stylevote" />
            <Workbook.Column label="design" value="design" />
            <Workbook.Column label="designvote" value="designvote" />
            <Workbook.Column label="theme" value="theme" />
            <Workbook.Column label="themevote" value="themevote" />
            <Workbook.Column label="color" value="color" />
            <Workbook.Column label="colorvote" value="colorvote" />
            <Workbook.Column label="subcolor" value="subcolor" />
            <Workbook.Column label="subcolorvote" value="subcolorvote" />
            <Workbook.Column label="pattern" value="pattern" />
            <Workbook.Column label="paternvote" value="patternvote" />
          </Workbook.Sheet>
        </Workbook>
        <Workbook filename="customer.xlsx" element={<button className="btn btn-lg btn-primary">Download customers!</button>}>
        <Workbook.Sheet data={data8} name="Customer">
          <Workbook.Column label="email" value="email" />
          <Workbook.Column label="firstlogin" value="firstlogin" />
          <Workbook.Column label="lastlogin" value="lastlogin" />
          <Workbook.Column label="userid" value="userid" />
          <Workbook.Column label="name" value="name" />
          <Workbook.Column label="kidName" value="kidName" />
          <Workbook.Column label="dob" value="dob" />
          <Workbook.Column label="mobile" value="mobile" />
          <Workbook.Column label="address" value="address" />
          <Workbook.Column label="sex" value="sex" />
        </Workbook.Sheet>
        </Workbook>
      </div>
    );
  }
}
