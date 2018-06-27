import React from 'react';
import Flexbox from 'flexbox-react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ArrowKeysReact from 'arrow-keys-react';
import MediaQuery from 'react-responsive';
import ImageCard from './ImageCard';
import ColorSelection from './ColorSelection';
import { firebase} from '../../firebase/firebase';
import database from '../../firebase/firebase';
import { connect } from 'react-redux';
import { next, back, setsection, section1Add, section2Add, rating, stylerating, addComment, subindexincrement, subindexdecrement, addStyleNumber, addcharacter } from '../../actions/quiz';
import AppRouter, { history } from '../../routers/AppRouter';
import Header from '../Header';
import {startLogout} from '../../actions/auth';

// We will have carditem as a standard template, which the user can like or unlike. It will take props. The buttons should lead to an action such that the item gets a rating. A section will have multiple cards, all enclosed within a single flex. I will have an initial array, which will list the images and their locations, and the actions that need to be passed.
// We can have agree or disagree for this section.

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

export  class Section3 extends React.Component {
  constructor(props) {

    // Take the default values from the store.
  
    super(props);
    this.state = {
      styleinstance: props.styleinstance,
      // The type of key is varying for different sections, not sure if it is fine. Will change the ones for earlier section to string as well.
      section: props.index,
      rating: props.rating,
      // It's just that a different action stylerating will be passed for section4. Everything else remains the same.
      votecounts: props.votecounts,
      // Also instead of votecounts, stylecounts will be passed for section4, but it will look the same.
      next: props.index !== 5 || props.currentitem === props.sizeofmap - 1 ? props.next : props.subindexincrement,
      back: props.currentitem > 0 ? props.subindexdecrement : props.back,
      setsection: props.setsection,
      addComment: props.addComment, 
      currentitem: props.currentitem + 1,
      sizeofmap: props.sizeofmap,
      comment: props.comment ? props.comment : '',
      hintText: 'Anything else you want to tell us',
      positiveArray: props.positiveArray,
      goNext: props.section !== 5,
      printMessage: false,
      subindexdecrement: props.subindexdecrement,
      subindexincrement: props.subindexincrement,
      kidName: props.kidName,
      commentPresent: true,
      uid: props.uid,
      sex: props.sex,
      ageGroup: props.ageGroup,
      dob: props.dob,
      positivecolor: props.positivecolor,
      colorname: [],
      colorcode: [],
      showsubcolor: [],
      currentcolor: '',
      characterName: props.characterName,
      addcharacter: props.addcharacter,
      subindex: 0,
      flag: false,
      rating: props.rating,
    };

    
    //console.log("constructor runs");

    

    database.ref(`users/${this.state.uid}/quiz/general/kidName`).once('value').then((snapshot) => {
      this.setState({ kidName: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/sex`).once('value').then((snapshot) => {
      this.setState({ sex: snapshot.val() });
    });

    database.ref(`users/${this.state.uid}/quiz/general/index`).once('value').then((snapshot) => {
      if(snapshot.val()!=this.state.section)
      {
        console.log(snapshot.val(),'89',this.state.section);
        this.props.setsection(snapshot.val());
        this.state.section = snapshot.val();
        this.state.flag = true;
        history.push('/section3');
      }
      else
      {
        this.setState(()=>{return{flag: true}});
      }
    })

   // this.newFunction();

          //console.log(snapshot.val());
      //this.state.section = snapshot.val();
      //this.setState({ section: snapshot.val() });
      //this.newFunction();
   // console.log(this.state.section);

   /* database.ref(`users/${this.state.uid}/quiz/general/index`).once('value').then((snapshot) => {
      console.log(snapshot.val());
      //this.state.section = snapshot.val();
      this.setState({ section: snapshot.val() });
      this.newFunction();
      
    }); */

    ArrowKeysReact.config({
      left: this.nextPress,
      right: this.backPress,
    });
   
    //this.subcolors();
    // this.selectsubcolors(index);
    this.nextPress = this.nextPress.bind(this);
    this.backPress = this.backPress.bind(this);
    this.addComment = this.addComment.bind(this);
    this.setSection = this.setSection.bind(this);
    // If this is the section for colors, then I have to set the array. 
  }
  // These are more places to assign additional variables.
  newFunction(section) {
    switch (section) {
      case 3:
        this.state = { ...this.state, category: 'themes', designs: ['Casual', 'Party', 'Active', 'Classy'] };
        if (this.state.sex === 'Boy') {
          this.state.designs.push('Dynamic');
          this.state.designs.push('Cool');
        } else {
          this.state.designs.push('Charismatic');
          this.state.designs.push('Trendy');
        }
        this.state.commentPresent = false;
        break;
      case 4:
        this.state = { ...this.state, category: 'styles', designs: ['Bottoms'] };
        if (this.state.sex === 'Boy') {
          this.state.designs = ['Bottoms', 'Shirts', 'T-Shirts'];
        }
        else {
          this.state.designs = ['Bottoms', 'Dresses', 'Tops', 'T-Shirts'];
        }
        //console.log("it works");
        this.state.hintText = this.state.sex === 'Boy' ? `What else will ${this.state.kidName} wear, e.g., caps, wrist band etc.?` : `What else will ${this.state.kidName} wear, e.g., clips, ribbons, shoes etc.?`;
        break;
      case 5:
        // For this section the state will be decided by the props key which will point out the design.
        this.state.hintText = 'Any other style in ';
        this.selectdesign();
        break;
      case 6: // Patterns.
        if (this.state.sex === 'Boy') {
          this.state = { ...this.state, category: 'Patterns', designs: ['Cartoons-Characters', 'Nature', 'Beach', 'Objects-Figures', 'Stripes', 'Geometrical-Abstract', 'Solid-Plain', 'Plaids', 'Stars', 'Camouflage'] };
        } else {
          this.state = { ...this.state, category: 'Patterns', designs: ['Cartoons-Characters', 'Stars', 'Polka', 'Floral', 'Stripes', 'Hearts', 'Solid-Plain', 'Patches', 'Gingham', 'Plaids', 'Animal', 'Abstract', 'Geometrical'] };
        }

        this.state.hintText = `Any other pattern that ${this.state.kidName} likes?.`;
        break;
      case 7: // Colours.
        if (this.state.sex === 'Girl') {
          this.state = { ...this.state, category: 'Colours', designs: ['Pink', 'Blue', 'Red', 'Yellow', 'Grey', 'Orange', 'Green', 'Brown', 'White', 'Black', 'Glitter-Shimmer', 'Purple'] };
        } else {
          this.state = { ...this.state, category: 'Colours', designs: ['Blue', 'Red', 'Grey', 'Orange', 'Green', 'Brown', 'Yellow', 'White', 'Black'] };
        }
        this.state.hintText = `Any other color that ${this.state.kidName} likes eg. Silver etc.`;
        for (let i = 0; i < this.state.designs.length; i += 1) {
          this.subcolors(this.state.designs[i]);
          this.state.showsubcolor.push(false);
          for (let z = 0; z < this.state.colorname.length; z += 1) {
            if (this.state.votecounts.get(this.state.colorname[z])) {
              this.state.showsubcolor[i] = true;
            }
          }
        }
        // Has to be based on votecolors.
        break;
      case 7.1:
        // For this section the state will be decided by the props key which will point out the design.
        this.state.hintText = 'Any other style in ';
        this.selectcolors();
        break;
      case 8: // Brands.
        this.state = { ...this.state, category: 'Brands', designs: ['Chalk (Pantaloons)', 'Gap kids', 'Gini and Jony', 'H&M', 'Nauti Nati', 'UCB', 'US Polo', 'Zara'] };
        if (this.state.sex === 'Girl') this.state.designs.push('Biba');
        if (this.state.ageGroup === '2-4') this.state.designs.push('Mothercare');
        this.state.hintText = `Anywhere else where you shop for ${this.state.kidName} eg. Allen Solly kids etc.`;
        break;
      default: break;
    }
  }

  selectdesign() {
    this.state.hintText = this.state.hintText.concat(`${this.state.styleinstance} that ${this.state.kidName} likes?`);
    switch (this.state.styleinstance) {
      case 'Tops':
        this.state = { ...this.state, category: 'Tops', designs: ['Blouse', 'Cold shoulder', 'Ruffles', 'Sleeveless top', 'Tunic', 'Crop top', 'Shirt'] };
        break;
      case 'T-Shirts':
        this.state = { ...this.state, category: 'T-Shirts', designs: ['Sleeveless', 'Half sleeve', 'Full sleeve', 'Polo'] };
        // if (this.state.sex === 'Girl') this.state.designs.push('Round neck');
        break;
      case 'Bottoms':
        if (this.state.sex === 'Boy') {
          this.state = { ...this.state, category: 'Bottoms', designs: ['Chinos', 'Jeans', 'Shorts', 'Trousers', 'Joggers'] };
          if (this.state.ageGroup === '2-4') {
            this.state.designs.push('Rompers-Overalls');
          }
          if (this.state.ageGroup === '5-8') {
            this.state.designs.push('Jumpsuits-Dungarees');
            this.state.designs.push('Cargo');
          }
          if (this.state.ageGroup === '9-12') {
            this.state.designs.push('Cargo');
          }
        } else {
          this.state = { ...this.state, category: 'Bottoms', designs: ['Trousers', 'Culottes', 'Jeans', 'Shorts', 'Skirts', 'Jeggings', 'Leggings'] };
          if (this.state.ageGroup === '2-4') {
            this.state.designs.push('Rompers-Overalls');
          }
          if (this.state.ageGroup === '5-8' || this.state.ageGroup === '9-12') {
            this.state.designs.push('Jumpsuits-Dungarees');
            this.state.designs.push('Cargo');
          }
        }
        console.log('for age', this.state.ageGroup, 'bottoms are', this.state.designs);
        break;
      case 'Shirts':
        this.state = { ...this.state, category: 'Shirts', designs: ['Half sleeves shirt', 'Full sleeves shirt'] };
        break;
      case 'Dresses':
        if (this.state.ageGroup === '5-8' || this.state.ageGroup === '9-12') this.state = { ...this.state, category: 'Dresses', designs: ['Above knee', 'Below knee', 'Party dress', 'Gown'] };
        else if (this.state.ageGroup === '2-4' || this.state.ageGroup === '9-12') this.state = { ...this.state, category: 'Dresses', designs: ['Casual dress', 'Party dress', 'Gown'] };
        break;
      default: break;
    }
  }

  subcolors(color) {
    switch (color) {
      case 'Red':
        this.state.colorname = ['Ferrari', 'Red', 'Burgandy', /* 'Chilli', 'Raspberry', 'Persian', */'Sangria'];
        this.state.colorcode = ['#FF2800', '#D30000', '#B80F0A', /* '#C21807', '#D21F3C', '#CA3433', */'#5E1914'];
        break;
      case 'Pink':
        this.state.colorname = ['Carnation', 'Bubble Gum', 'Hot Pink', 'Fuchsia', /* 'Brick', */ 'Cerise'];
        this.state.colorcode = ['#FFA6C9', '#FE5BAC', '#F81894', '#FF00FF', /* '#FB607F', */'#DE3163'];
        break;
      case 'Blue':
        this.state.colorname = ['Baby Blue', /* 'Egyptian' , */ 'Navy', 'Electric', 'Azure', 'CornFlower'];
        this.state.colorcode = ['#89CFF0', /* '#1134A6', */'#000080', '#7EF9FF', '#007FFF', '#6593F5'];
        break;
      case 'Yellow':
        this.state.colorname = ['Banana', 'Yellow', 'Gold', 'Lemon', 'Tuscany'/* , 'Royal' */];
        this.state.colorcode = ['#FCF4A3', '#FFF200', '#F9A602', '#EFFD5F', '#FCD12A'/* , '#FADA5E' */];
        break;
      case 'Orange':
        this.state.colorname = ['Melon'/* , 'Salamander' */, 'Orange', 'Sandstone', /* 'Apricot', */ 'Tangerine', 'Ginger'];
        this.state.colorcode = ['#F79862'/* , 'rgb(240, 94, 35)' */, '#FC6600', '#D7722C', '#EF820D', /* '#F28500' */ '#BE5504'];
        break;
      case 'Purple':
        this.state.colorname = ['Lavender', 'Lilac', 'Grape', 'Lollipop', 'Eggplant', 'Violet'];
        this.state.colorcode = ['#E4A0F7', '#B660Cd', '#6F2DA8', '#81007F', '#311432', '#B200ED'];
        break;
      case 'Green':
        this.state.colorname = ['Tea', 'Mint', 'Forest', 'Kelly', 'Army'];
        this.state.colorcode = ['#D0F0C0', '#98FB98', '#0B6623', '#4CBB17', '#4B5320'];
        break;
      case 'Brown':
        this.state.colorname = ['Tortilla', 'Brown', 'Chocolate', 'Cinnamon'];
        this.state.colorcode = ['#997950', 'Brown', '#2B1700', '#622A0F'];
        break;
      case 'Grey':
        this.state.colorname = ['Pearl river', 'Stone', 'Steel', 'Iron', 'Abalone'];
        this.state.colorcode = ['#D9DDDC', '#877F7D', '#777B7E', '#48494B', '#D6CFC7'];
        break;
      default:
        break;
    }
  }

  selectsubcolors(index) {
    let color = this.state.designs[index];
    this.state.showsubcolor[index] = !this.state.showsubcolor[index];
    console.log('select color called with', color);
    this.setState({ colorname: this.state.colorname });
    console.log('colorname and colorcode set', this.state.colorname, this.state.colorcode);
  }

  nextPress() {
    const positiveArray = Array.from(this.state.votecounts.keys(), (x) => (this.state.votecounts.get(x) > 1 ? x : '')).filter(word => word.length > 0);
    // Default vote is 1. So, it a vote should be greater than 1 to go forward.
    const positiveArrayLength = positiveArray.length;
    this.state.goNext = this.state.section !== 4 || (positiveArrayLength > 0 && positiveArray[positiveArrayLength - 1]);
    // Latter is the condition that there is at least one like. Here the problem is on how to trigger a state change in parent component.
    if (this.state.section === 7) {
      this.state.setsection(8);
    }
    else if (this.state.goNext) 
    {
      if (this.state.comment) this.state.addComment(this.state.uid, this.state.section, this.state.comment);// Check the action, it unnecessarily creates a duplicate map entry.
     // console.log(this.state.section);
     // this.state.section = this.state.section+1;
     /// this.setState({section: this.state.section + 1 });
     //this.props.setsection(this.state.section+1);
     //history.push('quiz/');
      ///this.newFunction();
      ///this.state.next(this.state.uid);
     // console.log(this.state.section);
     console.log(this.state.styleinstance);
     this.props.setsection( this.state.section+1 );
     this.setState(()=>{return{section: this.state.section+1}});
     database.ref(`users/${this.state.uid}/quiz/general/index`).set(this.state.section + 1);
     this.state.subindex += 1;
     let str = this.state.subindex.toString(); 
     history.push('/section3'+'.'+ str);
     
     if(this.state.subindex == 1)
     {
       this.setState({votecounts: this.props.stylecounts});
       //console.log("it runs");
     }
     if(this.state.subindex == 2)
     {
       this.setState({votecounts: this.props.votecounts,styleinstance: this.props.styeinstance});

       //console.log("it runs");
     }
     
     
    }
    else this.setState({ printMessage: true });
    window.scrollTo(0, 0);
  }

  backPress() {
    if (this.state.comment) this.state.addComment(this.state.uid, this.state.section, this.state.comment);
    //this.setState({ section: this.state.section - 1 });
    //this.newFunction();
    //this.state.back();
    if(this.state.subindex > 0)
    {
    this.props.setsection(this.state.section - 1);
    this.setState(()=>{return{section: this.state.section-1}});
    database.ref(`users/${this.state.uid}/quiz/general/index`).set(this.state.section - 1);
    this.state.subindex -= 1;
    let str = this.state.subindex.toString();
    history.push('/section3'+'.'+str);
    }
    if(this.state.subindex == 0)
    {
      this.props.setsection(1);
      database.ref(`users/${this.state.uid}/quiz/general/index`).set(1);
      history.push('/section1');
    }
    window.scrollTo(0, 0);
  }

  setSection()
  {
    this.state.section = this.props.index;
  }

  // We also need the comment stored in store for autofill.
  addComment(e, v) {
    console.log('inside comment');
    this.setState({ comment: v });
    console.log(e, v);
  }
  render() {
    return (

      <div>  { this.state.flag && ( 
      <div><Header  uid={this.state.uid} quiz={true} startLogout={this.props.startLogout} disableLogin = {false}/>
       {/*this.state.section = this.props.index*/}
       {console.log(this.state.section,this.props.index)}
       {this.newFunction(this.state.section)}
       {this.subcolors(this.state.section)}
       {
        this.props.index == 4 ? <div>it works</div> :<div/> 
       }
      {(this.state.section === 3) && (<Title title="Welcome!" subtitle="Answer a few quick questions to help us build your kiddo style profile. Once complete, your answers will help your personal Stylists to handpick your products." subtitle2="Have more than one child? You’ll be able to add your other children later." />)}
      {(this.state.section === 4) && (<Title title={`What do you want in the closet for ${this.state.kidName}?`} subtitle="To know more about your preference we will ask for more info on what you like." />)}
      {(this.state.section === 6) && ( <Title title={`What patterns will ${this.state.kidName} wear?`} />)}
      {(this.state.section === 7) && (<Title title={`What colours will ${this.state.kidName} wear?`} subtitle="Please select flip me in case you want to give preference for colours in more detail." />)}
      {(this.state.section === 8) && (<Title title="Which labels do you generally shop for?" />)}
      
      <div {...ArrowKeysReact.events} tabIndex="1" >
       
        {this.state.section === 5 ? <h1 style={{ fontFamily: 'Delius', textAlign: 'center' }}> {`What will ${this.state.kidName} wear in ${this.state.styleinstance}?`} </h1> : <div /> }
        {this.state.printMessage ?
          <div className="error__message" style={{ paddingTop: '2vmin', paddingBottom: '2vmin', color: 'red', textAlign: 'center' }}>
            {'Please select at least one design to move further.'}
          </div> : <div />
        }
        <MuiThemeProvider>
          <div stye={{ fontFamily: 'Delius' }}>
            
            <Flexbox flexWrap="wrap" justifyContent="space-around" alignItems="center">
              {this.state.designs.map((design) => {
                // All relevant colours should display on the ColorSelection card. You want to give a list of the color codes. For each color, find out the color code array. 
                const index = this.state.designs.indexOf(design);
                this.state.currentcolor = design;
                this.selectsubcolors.bind(this, index); // This is not getting executed. 
                return (
                  <div key={design}>
                    <MediaQuery query="(orientation: portrait)">
                      { this.state.section !== 7 ?
                        <ImageCard characterName={this.state.characterName} addcharacter={this.state.addcharacter} ageGroup={this.state.ageGroup} sex={this.state.sex} uid={this.state.uid} design={design} section={this.state.section} category={this.state.category} rating={this.state.rating} vote={this.state.votecounts.get(design)} kidName={this.state.kidName} cardstyle={{ width: this.state.section > 4 ? '44vmin' : '44vw' }} />
                        :
                        <div>
                          { (design !== 'White' && design !== 'Black' && design !== 'Glitter-Shimmer' && design !== 'Purple') ?

                            <RaisedButton label="Flip me!" style={{ width: '44vmin' }} onClick={this.selectsubcolors.bind(this, index)} /> 
                            :
                            <div/>
                          }
                          { this.state.showsubcolor[index] ?
                            <div>
                              <div style={{ width: '44vmin', fontFamily: 'Delius', textAlign: 'center' }} > {'Tap once to like and twice to dislike'} </div>
                              <ColorSelection votecounts={this.state.votecounts} uid={this.state.uid} design={design} section={this.state.section} category={this.state.category} rating={this.state.rating} colorcode={this.state.colorcode} colorname={this.state.colorname}
                            vote={this.state.votecounts.get(design)} kidName={this.state.kidName} cardstyle={{ width: this.state.section > 4 ? '44vmin' : '44vw' }}/>
                              </div>
                            :
                            <ImageCard ageGroup={this.state.ageGroup} sex={this.state.sex} uid={this.state.uid} design={design} section={this.state.section} category={this.state.category} rating={this.state.rating} vote={this.state.votecounts.get(design)} kidName={this.state.kidName} cardstyle={{ width: this.state.section > 4 ? '44vmin' : '44vw' }} />
                         }
                        </div>
                      }
                    </MediaQuery>
                    <MediaQuery query="(orientation: landscape)">
                      { this.state.section !== 7 ?
                        <ImageCard characterName={this.state.characterName} addcharacter={this.state.addcharacter} ageGroup={this.state.ageGroup} sex={this.state.sex} uid={this.state.uid} design={design} section={this.state.section} category={this.state.category} rating={this.state.rating} vote={this.state.votecounts.get(design)} kidName={this.state.kidName} cardstyle={{ width: this.state.section > 4 ? '20vw' : '35vw', marginLeft: '5vw', marginRight: '5vw' }} />
                        :
                        <div>
                          { (design !== 'White' && design !== 'Black' && design !== 'Glitter-Shimmer' && design !== 'Purple') ?

                            <RaisedButton label="Flip me!" style={{ width: '20vw', marginLeft: '5vw', marginRight: '5vw' }} onClick={this.selectsubcolors.bind(this, index)} /> 
                            :
                            <div/>
                          }
                          { this.state.showsubcolor[index] ?
                            <div style={{ width: '20vw', marginLeft: '5vw', marginRight: '5vw' }}>
                              <div style={{ width: '44vmin', fontFamily: 'Delius', textAlign: 'center' }} > {'Tap once to like and twice to dislike'} </div>
                              <ColorSelection votecounts={this.state.votecounts} uid={this.state.uid} design={design} section={this.state.section} category={this.state.category} rating={this.state.rating} colorcode={this.state.colorcode} colorname={this.state.colorname}
                              vote={this.state.votecounts.get(design)} kidName={this.state.kidName} cardstyle={{ width: '20vw' }}
                              landscape
                            />
                              </div>
                            :
                            <ImageCard ageGroup={this.state.ageGroup} sex={this.state.sex} uid={this.state.uid} design={design} section={this.state.section} category={this.state.category} rating={this.state.rating} vote={this.state.votecounts.get(design)} kidName={this.state.kidName} cardstyle={{ width: '20vw', marginLeft: '5vw', marginRight: '5vw' }} />
                        }
                        </div>
                      }
                    </MediaQuery>
                  </div>
                );
              })}
            </Flexbox>
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          {
            <div>
              {this.state.commentPresent ?
                <div style={{ marginLeft: '5%', marginRight: '5%', marginBottom: '20px', marginTop: '40px' }}>
                  <TextField
                    hintText={this.state.hintText}
                    floatingLabelText="Comments"
                    floatingLabelFixed
                    hintStyle={{ fontFamily: 'Delius', fontSize: '20px' }}
                    onChange={this.addComment}
                    defaultValue={this.state.comment ? this.state.comment : ''}
                    fullWidth
                    style={{ fontFamily: 'Delius' }}
                  />
                </div> : <div />
              }
              {this.state.printMessage ?
                <div className="error__message" style={{ paddingTop: '2vmin', paddingBottom: '2vmin', color: 'red', textAlign: 'center' }}>
                  {'Please select at least one design to move further.'}
                </div> : <div />
              }
              <Flexbox justifyContent="space-between" marginLeft="10%" marginRight="10%" marginBottom="40px">
                <RaisedButton label="Back" onClick={this.backPress} />
                <RaisedButton label="Next" onClick={this.nextPress} />
              </Flexbox>
            </div>
          }
        </MuiThemeProvider>
      </div></div>)}
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

  console.log("props");
  const positiveArray = Array.from(state.quiz.stylecounts.keys(), (x) => {
    if (state.quiz.stylecounts.get(x) > 0 && x !== undefined && x.length > 0) 
      return x;
  }).filter(x => x !== undefined);

  const positivecolor= Array.from(state.quiz.votecounts.keys(), (x) => {
    if (state.quiz.votecounts.get(x) > 0 && x !== undefined && x.length > 0 && colorarray.indexOf(x) > -1) {
      return x;
    }
  }).filter(x => x !== undefined); 

  const subindex = state.quiz.subindex;

  return {
    uid: state.auth.uid,
    quiz: state.quiz,
    index: state.quiz.index,
    name: state.quiz.name,
    sex: state.quiz.sex,
    ageGroup: state.quiz.ageGroup,
    kidName: state.quiz.kidName,
    dob: state.quiz.dob,
    sizetop: state.quiz.sizetop,
    sizebottom: state.quiz.sizebottom,
    skincolor: state.quiz.skincolor,
    votecounts: state.auth.index === 5 ? state.quiz.votecounts :state.quiz.stylecounts,
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
    rating: state.quiz.rating,

    positiveArray: positiveArray,

    positivecolor: positivecolor,

    key: positiveArray[subindex],
    styleinstance: positiveArray[subindex],
    sizeofmap: positiveArray.length ,
    currentitem: subindex,
    comment: state.quiz.comments.get(state.quiz.index),
  };
};

// My naming convention: I will do a different of casing so as not to have the linting error.
const mapDispatchToProps = dispatch => {
  return {
    next: (uid) => dispatch(next(uid)),
    back: () => dispatch(back()),
    setsection: (index) => {console.log(index);dispatch(setsection(index));},
    subindexincrement: () => dispatch(subindexincrement()),
    subindexdecrement: () => dispatch(subindexdecrement()),
    section1Add: (uid, name, kidName, dob, sex, ageGroup, mobileNumber) => dispatch(section1Add(uid, name, kidName, dob, sex, ageGroup, mobileNumber)),
    section2Add: (uid, sizetop, sizebottom, characterName, mobileNumber, address, height, waist, bodyType, priceList, checkedPrice, checkedFabric) => dispatch(section2Add(uid, sizetop, sizebottom, characterName, mobileNumber, address, height, waist, bodyType, priceList, checkedPrice, checkedFabric)),
    rating: (uid, selection, votecount) => dispatch(rating(uid, selection, votecount)),
    stylerating: (uid, selection, votecount) => dispatch(stylerating(uid, selection, votecount)),
    addComment: (uid, section, comment) => dispatch(addComment(uid, section, comment)),
    addStyleNumber: (uid, styeinstance, expectedNumber) => dispatch(addStyleNumber(uid, styeinstance, expectedNumber)),
    addcharacter: (uid, characterName) => dispatch(addcharacter(uid, characterName)),
    startLogout : ()=>dispatch(startLogout()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Section3);

