import React from 'react';
import Flexbox from 'flexbox-react';
import { ClipLoader } from 'react-spinners';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import ImageLoader from 'react-load-image';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MediaQuery from 'react-responsive';
import ImageFilter from 'react-image-filter';
import Icon from 'react-icons-kit';
import { checkmark } from 'react-icons-kit/icomoon/checkmark';
import { cross } from 'react-icons-kit/icomoon/cross';
import { thumbsOUp } from 'react-icons-kit/fa/thumbsOUp';
import { thumbsODown } from 'react-icons-kit/fa/thumbsODown';
import TextField from 'material-ui/TextField';

// We will have carditem as a standard template, which the user can like or unlike. It will take props. The buttons should lead to an action such that the item gets a rating. A section will have multiple cards, all enclosed within a single flex. I will have an initial array, which will list the images and their locations, and the actions that need to be passed.

// This should be class based component.

// I want a like button which when clicked transforms itself.

// Will have to dispatch a generic action so that the exact variable in the state gets updated.

// We will have a like button to left, dislike button to right, and the count of net likes in mid with sign.

// Make sure that the current rating can be displayed on the screen.
const styles = {
  Checkbox: {
    fontFamily: 'Delius',
    fontSize: '20px',
    paddingLeft: '2vmin',
    paddingRight: '2vmin',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  label: {
    fontFamily: 'Delius',
    paddingLeft: '2vmin',
    paddingRight: '2vmin',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
};

export default class ImageCard extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    let defaultVote = props.section === 4 ? 1 : 2; // For section 4, default vote will be 1.
    defaultVote = props.section === 8 ? 0 : defaultVote;
    this.state = {
      src: `/images/newquiz/${props.ageGroup}/${props.sex}/${props.category}/${props.design}.jpg`,
      design: props.design,
      vote: props.vote || props.vote === 0 ? props.vote : defaultVote, // Will set this using map.
      rating: props.rating,
      section: props.section,
      sliderText: [],
      kidName: props.kidName,
      temp: '',
      sliderMin: 0,
      sliderMax: 4,
      imageStatus: false,
      cardstyle: props.cardstyle, 
      hue: props.vote ? 0.6 - (0.3 * props.vote) : 0,
      // For brands
      never: props.vote === 0,
      sometimes: props.vote === 1,
      often: props.vote === 2,
      uid: props.uid,
      sex: props.sex,
      characterName: props.characterName,
      addcharacter: props.addcharacter,
    };
    this.likeHandler = this.likeHandler.bind(this);
    this.unlikeHandler = this.unlikeHandler.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.handlebrands = this.handlebrands.bind(this);
    this.characterNameChange = this.characterNameChange.bind(this);
    this.setSliderText();
    this.state.temp = this.state.sliderText[this.state.vote];
    if (this.state.section === 6) this.state.src = `/images/newquiz/${props.sex}/Patterns/${props.design}.jpg`;
    if (this.state.section === 7) this.state.src = `/images/newquiz/${props.sex}/colours/${props.design}.jpg`;
    if (this.state.section === 8) this.state.src = `/images/quiz/Brands/${props.design}.jpg`;
  }

  setSliderText() {
    switch (this.state.section) {
      case 3:
        if (this.state.sex === 'Girl') {
          this.state.sliderText = ['Noways!', 'Probably not', 'Neutral', 'Probably yes', 'That\'s her'];
        } else {
          this.state.sliderText = ['Noways!', 'Probably not', 'Neutral', 'Probably yes', 'That\'s him'];
        }
        // The text for a rating from -2 to 2.
        break;
      case 4:
        this.state.sliderText = ['Not at all!', 'Very little', 'Neutral', 'Fairly', 'Always!'];
        break;
      case 5:
        this.state.sliderText = ['Nope!', 'Unlikely', 'Might be', 'Likely', 'Definitely!'];
        break;
      case 6:
        this.state.sliderText = ['Yuk!', 'Dislike', 'It\'s ok', 'Good', 'Awesome!'];
        break;
      case 7:
        this.state.sliderText = ['Yuk!', 'Dislike', 'It\'s ok', 'Good', 'Awesome!'];
        break;
      case 8:
        this.state.sliderText = ['Never', 'Sometimes', 'Often'];
        this.state.sliderMax = 2;
        break;
      default:
        this.state.sliderText = [];
    }
  }

  characterNameChange(event, value) {
    // this.setState({ characterName: value });
    this.state.characterName = value;
    this.state.addcharacter(this.state.uid, value);
  }

  likeHandler() {
    console.log("like");
    this.state.vote = this.state.vote ? this.state.vote + 1 : 1;
    this.state.vote = this.state.vote > 4 ? 4 : this.state.vote;// If greater than mex, then don't increase
    this.setState({ temp: this.state.sliderText[this.state.vote] });
    console.log('temp is now this after liking', this.state.temp);
    this.state.rating(this.state.uid, this.state.design, this.state.vote);
    // console.log(`${this.state.design} has vote ${this.state.vote}`);
    this.state.hue = this.state.vote > 4 ? this.state.hue : this.state.hue - 0.3;
    // Here stylerating will be dispatched if the call came from section4.
  }

  unlikeHandler() {
    this.state.vote = this.state.vote ? this.state.vote - 1 : 0;
    this.state.vote = this.state.vote < 0 ? 0 : this.state.vote;
    this.setState({ temp: this.state.sliderText[this.state.vote] });
    this.state.rating(this.state.uid, this.state.design, this.state.vote);
    this.state.hue = this.state.vote > 4 ? this.state.hue : this.state.hue + 0.3;
    // console.log(`${this.state.design} has vote ${this.state.vote}`);
  }

  handleSlider(event, value) {
    this.setState({ vote: value });
    this.setState({ temp: this.state.sliderText[value], hue: 0.6 - (0.3 * value) });
    this.state.rating(this.state.uid, this.state.design, value);
  }

  handleImageLoaded() {
    this.setState({ imageStatus: true });
  }

  handlebrands(event) {
    // console.log(event.target.name);
    if (event.target.name === 'Never') {
      this.setState({ never: true, sometimes: false, often: false });
      this.state.rating(this.state.uid, this.state.design, 0);
      // console.log('Never');
    }
    if (event.target.name === 'Sometimes') {
      this.setState({ never: false, sometimes: true, often: false });
      this.state.rating(this.state.uid, this.state.design, 1);
      // console.log('Sometimes');
    }
    if (event.target.name === 'Often') {
      this.setState({ never: false, sometimes: false, often: true });
      this.state.rating(this.state.uid, this.state.design, 2);
      // console.log('Often');
    }
  }
  // Later on, pass styling variables as prop from the parent depending upon the section.

  render() {
    let fontcolor = this.state.vote > 2 ? 'green' : 'red';
    fontcolor = this.state.vote !== 2 ? fontcolor : 'black';
    // Font color for the message that is being displayed. Note that this
    
    return (
      
      <div style={{ paddingBottom: '5vw' }}>
      {console.log("re-rendered", this.state.temp, "section is", this.state.section)}
        <MuiThemeProvider>
          <Card style={this.state.cardstyle}>
            <div>
              {this.state.temp}
            </div>
            <div>
              {'print'}
            </div>
          
            {this.state.section !== 8 ? <CardText style={{ textAlign: 'center', fontSize: '6vmin', fontFamily: 'Delius' }}>
              {this.state.design.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1); })}
            </CardText> : <div />
            }
            <CardMedia>
              <Flexbox alignItems="center" flexDirection="column">
                <ClipLoader
                  color={'#F5A623'} 
                  loading={!this.state.imageStatus}
                />
                <img src={this.state.src} onLoad={this.handleImageLoaded.bind(this)} style={{...this.state.cardstyle, padding: '0'}} />
                
              </Flexbox>
            </CardMedia>
          
            <CardActions style={{ paddingLeft: '0px', paddingRight: '0px', paddingTop: '0px' }}>
                <Flexbox flexDirection="column">
                  <div>
                    <Slider
                      min={this.state.sliderMin}
                      max={this.state.sliderMax}
                      step={1}
                      value={this.state.vote}
                      onChange={this.handleSlider}
                      style={{ height: '1vh', padding: '0px', paddingBottom: '3vmax' }}
                    />
                  </div>
                  <div>
                    <Flexbox flexDirection="row" justifyContent="space-between" alignItems="center" style={{ textAlign: 'center' }} >
                      { this.state.section !== 8 ?
                        <button onClick={this.unlikeHandler} style={{ fontSize: '6vmin', color: 'red', border: '12px', fontFamily: 'Delius' }}> <Icon icon={thumbsODown} size={25} /></button> :
                        <div style={{ fontFamily: 'Delius', fontcolor: 'Red', fontSize: '14px' }}> {'Never'} </div>
                      }

                      {this.state.section !==8 ? 
                        <div style={{ fontSize: '3vmin', color: fontcolor, fontFamily: 'Delius', textAlign: 'center', padding: '0px' }}>
                          { this.state.temp }
                        </div> :
                        <div style={{ fontFamily: 'Delius', fontSize: '14px' }}> {'Sometimes'} </div>
                      }


                      {this.state.section !== 8 ?
                        <button style={{ fontSize: '3vmin', color: 'Green', border: '6px', fontFamily: 'Delius' }} onClick={this.likeHandler}>
                          <Icon icon={thumbsOUp} size={25} />
                        </button>
                        :
                        <div style={{ fontFamily: 'Delius', fontcolor: 'Green', fontSize: '14px' }}> {'Often'} </div>
                      }
                    </Flexbox>
                  </div>
                </Flexbox>
              </CardActions>
              {
                this.state.design === 'Cartoons-Characters' && this.state.vote > 2 ?
                <MuiThemeProvider>
                <TextField
                  hintText={`What is ${this.state.kidName}'s favourite character`}
                  hintStyle={{...this.state.cardstyle, marginLeft: '0', marginRight: '0'}}
                  onChange={this.characterNameChange}
                  defaultValue={this.state.characterName ? this.state.characterName : ''}
                  style={{...this.state.cardstyle, marginLeft: '0', marginRight: '0'}}
                />
              </MuiThemeProvider> : <div />
               }
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

