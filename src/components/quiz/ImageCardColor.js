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

export default class ImageCardColor extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    let defaultVote = props.section === 4 ? 1 : 2; // For section 4, default vote will be 1.
    defaultVote = props.section === 8 ? 0 : defaultVote;
    this.state = {
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
      colorcode: props.colorcode,
    };
    this.likeHandler = this.likeHandler.bind(this);
    this.unlikeHandler = this.unlikeHandler.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.state.sliderText = ['Nope!', 'Unlikely', 'Might be', 'Likely', 'Definitely!'];
    this.state.temp = this.state.sliderText[this.state.vote];
  }

  
  likeHandler() {
    this.state.vote = this.state.vote ? this.state.vote + 1 : 1;
    this.state.vote = this.state.vote > 4 ? 4 : this.state.vote;// If greater than mex, then don't increase
    this.setState({ temp: this.state.sliderText[this.state.vote] });
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

  render() {
    let fontcolor = this.state.vote > 2 ? 'green' : 'red';
    fontcolor = this.state.vote !== 2 ? fontcolor : 'black';
    // Font color for the message that is being displayed. Note that this
    console.log('color code is', this.state.colorcode);
    return (
      <div style={{ paddingBottom: '5vw' }}>
        <MuiThemeProvider>
          <Card style={this.state.cardstyle}>
            <CardText style={{ textAlign: 'center', fontSize: '6vmin', fontFamily: 'Delius' }}>
              {this.state.design.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1); })}
            </CardText>
            <CardMedia>
              <div style={{ backgroundColor: this.state.colorcode, width: '30vw', height: '40vw'}} />
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
                        <button onClick={this.unlikeHandler} style={{ fontSize: '3vmin', color: 'red', border: '6px', fontFamily: 'Delius' }}>Dislike</button> :
                        <div style={{ fontFamily: 'Delius', fontcolor: 'Red', fontSize: '14px' }}> {'Never'} </div>
                      }

                      {this.state.section !==8 ?
                        <div style={{ fontSize: '3vmin', color: fontcolor, fontFamily: 'Delius', textAlign: 'center', padding: '0px' }}>
                          { this.state.temp }
                        </div> :
                        <div style={{ fontFamily: 'Delius', fontSize: '14px' }}> {'Sometimes'} </div>
                      }


                      {this.state.section !== 8 ?
                        <button
                          onClick={this.likeHandler}
                          style={{ fontSize: '3vmin', color: 'green', border: '6px', fontFamily: 'Delius' }}
                        >
                      Like
                        </button> :
                        <div style={{ fontFamily: 'Delius', fontcolor: 'Green', fontSize: '14px' }}> {'Often'} </div>
                      }
                    
                    </Flexbox>
                  </div>
                </Flexbox>
              </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

