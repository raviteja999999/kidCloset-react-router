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
import ImageCardColor from './ImageCardColor';
import { firebase, database } from '../../firebase/firebase';


// We will have carditem as a standard template, which the user can like or unlike. It will take props. The buttons should lead to an action such that the item gets a rating. A section will have multiple cards, all enclosed within a single flex. I will have an initial array, which will list the images and their locations, and the actions that need to be passed.
// We can have agree or disagree for this section.

export default class Section3 extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    this.state = {
      kidName: props.kidName,
      section: props.section,
      votecounts: props.votecounts,
      next: props.next,
      back: props.back,
      setsection: props.setsection,
      positivecolor: props.positivecolor.filter((item, pos) => { return props.positivecolor.indexOf(item) === pos; }),
      category: props.positivecolor[0],
      designs: [],
      currentsubindex: 0,
      rating: props.rating, 
      uid: props.uid,
    };
    this.selectcolors = this.selectcolors.bind(this);
    this.nextPress = this.nextPress.bind(this);
    this.backPress = this.backPress.bind(this);
    this.selectcolors();
  }

  selectcolors() {
    console.log('select colors called');
    switch (this.state.category) {
      case 'Red':
        this.state.designs = ['Ferrari', 'Red', 'Burgandy', 'Chilli', 'Raspberry', 'Persian', 'Sangria'];
        this.state.colorcode = ['#FF2800', '#D30000', '#B80F0A', '#C21807', '#D21F3C', '#CA3433', '#5E1914'];
        break;
      case 'Pink':
        this.state.designs = ['Carnation', 'Bubble Gum', 'Hot Pink', 'Fuchsia', 'Brick', 'Cerise'];
        this.state.colorcode = ['#FFA6C9', '#FE5BAC', '#F81894', '#FF00FF', '#FB607F', '#DE3163'];
        break;
      case 'Blue':
        this.state.designs = ['Baby Blue', 'Egyptian', 'Navy', 'Electric', 'Azure', 'CornFlower'];
        this.state.colorcode = ['#89CFF0', '#1134A6', '#000080', '#7EF9FF', '#007FFF', '#6593F5'];
        break;
      case 'Yellow':
        this.state.designs = ['Banana', 'Yellow', 'Gold', 'Lemon', 'Tuscany', 'Royal'];
        this.state.colorcode = ['#FCF4A3', '#FFF200', '#F9A602', '#EFFD5F', '#FCD12A', '#FADA5E'];
        break;
      case 'Orange':
        this.state.designs = ['Melon', 'Salamander', 'Orange', 'Sandstone', 'Apricot', 'Tangerine', 'Ginger'];
        this.state.colorcode = ['#F79862', 'rgb(240, 94, 35)', '#FC6600', '#D7722C', '#EF820D', '#F28500', '#BE5504'];
        break;
      case 'Purple':
        this.state.designs = ['Lavender', 'Lilac', 'Grape', 'Lollipop', 'Eggplant', 'Violet'];
        this.state.colorcode = ['#E4A0F7', '#B660Cd', '#6F2DA8', '#81007F', '#311432', '#B200ED'];
        break;
      case 'Green':
        this.state.designs = ['Tea', 'Mint', 'Forest', 'Kelly', 'Army'];
        this.state.colorcode = ['#D0F0C0', '#98FB98', '#0B6623', '#4CBB17', '#4B5320'];
        break;
      case 'Brown':
        this.state.designs = ['Tortilla', 'Brown', 'Chocolate', 'Cinnamon'];
        this.state.colorcode = ['#997950', 'Brown', '#2B1700', '#622A0F'];
        break;
      case 'Grey':
        this.state.designs = ['Pearl river', 'Stone', 'Steel', 'Iron', 'Abalone'];
        this.state.colorcode = ['#D9DDDC', '#877F7D', '#777B7E', '#48494B', '#D6CFC7'];
        break;
      default: break;
    }
  }

  nextPress() {
    // There will be two cases, one where pressing the next leads to internal change and other when it increases to 8. 
    console.log('next pressed');
    if(this.state.currentsubindex === this.state.positivecolor.length - 1) {
      // All the colors have been tranvered now and you can do a regular next. 
      this.state.setsection(8);
    }
    else {
      this.state.currentsubindex = this.state.currentsubindex + 1; 
      this.state.category = this.state.positivecolor[this.state.currentsubindex];
      this.selectcolors();
      this.setState({category: this.state.positivecolor[this.state.currentsubindex]});
   }
    window.scrollTo(0, 0);
  }

  backPress() {
    console.log('back pressed');
    if( this.state.currentsubindex === 0 )
    {
      this.state.setsection(7);
    }
    else {
      this.state.currentsubindex = this.state.currentsubindex - 1; 
      this.state.category = this.state.positivecolor[this.state.currentsubindex];
      this.selectcolors();
      this.setState({category: this.state.positivecolor[this.state.currentsubindex]});
    }
    window.scrollTo(0, 0);
  }

  render() {
    // Before every render, currentsubindex would have increased by 1.
   console.log('Render called');
   console.log('category is', this.state.category);
   console.log('subindex is', this.state.currentsubindex);
   console.log('sub-colours are', this.state.designs);
   return (
      <div {...ArrowKeysReact.events} tabIndex="1">
      <h1 style={{ fontFamily: 'Delius', textAlign: 'center' }}> {`What specific color do you want in ${this.state.category}`} </h1>
      <MuiThemeProvider>
          <div stye={{ fontFamily: 'Delius' }}>
            <Flexbox flexWrap="wrap" justifyContent="space-around" alignItems="center">
              {this.state.designs.map((design) => {
                return (
                  <div key={design}>
                    <MediaQuery query="(orientation: portrait)">
                      <ImageCardColor uid={this.state.uid} design={design} section={this.state.section} category={this.state.category} rating={this.state.rating} colorcode={this.state.colorcode[this.state.designs.indexOf(design)]} vote={this.state.votecounts.get(design)} kidName={this.state.kidName} cardstyle={{ width: this.state.section > 4 ? '44vmin' : '44vw' }} />
                    </MediaQuery>
                    <MediaQuery query="(orientation: landscape)">
                      <ImageCardColor ageGroup={this.state.ageGroup} sex={this.state.sex} uid={this.state.uid} design={design} section={this.state.section} category={this.state.category} rating={this.state.rating} colorcode={this.state.colorcode[this.state.designs.indexOf(design)]} vote={this.state.votecounts.get(design)} kidName={this.state.kidName} cardstyle={{ width: this.state.section > 4 ? '20vw' : '35vw', marginLeft: '5vw', marginRight: '5vw' }} />
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
              <Flexbox justifyContent="space-between" marginLeft="10%" marginRight="10%" marginBottom="20px">
                <RaisedButton label="Back" onClick={this.backPress} />
                <RaisedButton label="Next" onClick={this.nextPress} />
              </Flexbox>
            </div>
          }
        </MuiThemeProvider>
      </div>
    );
  }
}

