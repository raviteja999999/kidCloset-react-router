import React from 'react';
import Flexbox from 'flexbox-react';
import { ClipLoader } from 'react-spinners';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import ImageLoader from 'react-load-image';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import MediaQuery from 'react-responsive';
import ImageFilter from 'react-image-filter';
import Icon from 'react-icons-kit';
import { checkmark } from 'react-icons-kit/icomoon/checkmark'; 
import { cross } from 'react-icons-kit/icomoon/cross';

let styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '44vmin',
    border: '1px solid grey'
  },
  child: { 
    width: '21vmin', 
    height: '22vmin', 
    border: '1px solid grey' 
  },
 };

const iconStyles = {
  marginRight: 24,
};

const styles1 = {
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
    this.state = {
      design: props.design,
      vote: [], // Pick the truth values from the votecount array.
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
      colorcode: [],
      colorname: [],
      tilesData: [],
      votecounts: props.votecounts,
      landscape: props.landscape,
    };
    this.subcolors();
    this.subcolors(this.state.design);
    this.state.temp = this.state.sliderText[this.state.vote];
    // console.log('inside sub-color card. Printing the data', this.state.colorcode, this.state.colorname);
    console.log('Inside sub-color card');
    for (let i = 0; i < this.state.colorcode.length; i += 1) {
      this.state.vote[i] = this.state.votecounts.get(this.state.colorname[i]) ? this.state.votecounts.get(this.state.colorname[i]) : 0;
    }
    console.log('votes for sub-colors as picked from vote-counts', this.state.vote);
    if (this.state.landscape) {
      styles.root.width = '20vw';
      styles.child.width = '9vw';
      styles.child.height = '9vw';
    }
    else {
      styles.root.width = '44vw';
      styles.child.width = '21vw';
      styles.child.height = '22vw';
    }
  }

  subcolors(color) {
    switch (color) {
      case 'Red':
        this.state.colorname = ['Ferrari', 'Reds', 'Burgandy', /* 'Chilli', 'Raspberry', 'Persian', */'Sangria'];
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
        this.state.colorname = ['Banana', 'Yellows', 'Gold', 'Lemon', 'Tuscany'/* , 'Royal' */];
        this.state.colorcode = ['#FCF4A3', '#FFF200', '#F9A602', '#EFFD5F', '#FCD12A'/* , '#FADA5E' */];
        break;
      case 'Orange':
        this.state.colorname = ['Melon'/* , 'Salamander' */, 'Oranges', 'Sandstone', /* 'Apricot', */ 'Tangerine', 'Ginger'];
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
        this.state.colorname = ['Tortilla', 'Browns', 'Chocolate', 'Cinnamon'];
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

  colortouch(index) {
    console.log('some color changed');
    this.state.vote[index] = (this.state.vote[index] + 1) % 3;
    this.setState({ vote: this.state.vote });
    this.state.rating(this.state.uid, this.state.colorname[index], this.state.vote[index]);
  }

  render() {
    return (
      <div style={{ paddingBottom: '5vw' }}>
        <MuiThemeProvider>
          <div style={{ ...styles.root, width: this.state.landscape ? '20vw' : '44vw' }}>
            {this.state.colorcode.map((code) => {
              const index = this.state.colorcode.indexOf(code);
              return (
                <div key={index} style={{...styles.child, backgroundColor: code, width: this.state.landscape ? '9vw' : '21vw', height: this.state.landscape ? '9vw' : '22vw'}} onClick={this.colortouch.bind(this, index)}>
                  <div style={{ color: 'White', fontFamily: 'Delius', fontSize: '14px', textAlign: 'center' }} >
                    {this.state.colorname[index]}
                  </div>
                  {this.state.vote[index] !== 0 ?
                    <Flexbox style={{ color: 'White' }} justifyContent="center">
                      <Icon icon={this.state.vote[index] === 1 ? checkmark : cross} />
                    </Flexbox> : <div />
                  }
                </div>
             );
            })
          }
          </div>
       
        </MuiThemeProvider>
      </div>
    );
  }
}

