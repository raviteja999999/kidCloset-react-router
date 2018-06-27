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
import { firebase, database } from '../../firebase/firebase';
import Icon from 'react-icons-kit';
import { plusCircle } from 'react-icons-kit/fa/plusCircle';
import { minusCircle } from 'react-icons-kit/fa/minusCircle';     


// We will have carditem as a standard template, which the user can like or unlike. It will take props. The buttons should lead to an action such that the item gets a rating. A section will have multiple cards, all enclosed within a single flex. I will have an initial array, which will list the images and their locations, and the actions that need to be passed.
// We can have agree or disagree for this section.
const styles = {
  div: {
    fontFamily: 'Delius',
    border: '2px solid',
    borderColor: 'rgb(230, 230, 230)',
    borderCornerShape: 'scoop',
    alignItems: 'center',
    textAlign: 'center',
  },
};
const Likes = (props) => (
  <div style={{ ...styles.div, width: '15vmax', paddingTop: '10px', paddingBottom: '10px' }}>
    <div style={{ fontFamily: 'Delius', textDecoration: 'underline', paddingBottom: '2px' }}> {props.liked ? 'Likes' : 'Dislikes'} </div>
    {props.categoryArray.map((theme) => {
    return (
      <div key={theme}>   
        { props.votecounts.get(theme) > 2 && props.liked ? <div style={{ alignContent: 'center' }}> {`${theme}`} </div> : <div />}
        { props.votecounts.get(theme) < 2 && !props.liked ? <div style={{ alignContent: 'center' }}> {`${theme}`} </div> : <div />}
      </div>
    );
  })}
  </div>
);


export default class Summary extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    this.state = {
      styleinstance: props.styleinstance,
      // The type of key is varying for different sections, not sure if it is fine. Will change the ones for earlier section to string as well.
      section: props.section,
      rating: props.rating,
      // It's just that a different action stylerating will be passed for section4. Everything else remains the same.
      votecounts: props.votecounts,
      stylecounts: props.stylecounts,
      // Also instead of votecounts, stylecounts will be passed for section4, but it will look the same. 
      next: props.next,
      back: props.back,
      addComment: props.addComment, 
      currentitem: props.currentitem + 1,
      sizeofmap: props.sizeofmap,
      comment: props.comment, // Take it from the props/store.
      hintText: 'Anything else you want to tell us',
      positiveArray: props.positiveArray,
      goNext: props.section !== 5,
      printMessage: false,
      subindexdecrement: props.subindexdecrement,
      subindexincrement: props.subindexincrement,
      kidName: props.kidName,
      commentPresent: true,
      comments: props.comments,
      sex: props.sex,
      stylenumbers: props.stylenumbers,
      addStyleNumber: props.addStyleNumber,
      uid: props.uid,
    };
    this.themes = ['Casual', 'Party', 'Active', 'Trendy', 'Classy', 'Bold', 'Dynamic', 'Charismatic'];

    if (this.state.sex === 'Boy') {
      this.styles = ['Bottoms', 'T-Shirts', 'Shirts'];
    }
    else {
      this.styles = ['Bottoms', 'Dresses', 'T-Shirts', 'Tops'];
    }
    
    this.designs = ['Blouse', 'Chinos', 'Cold shoulder', 'Ruffles', 'Sleeveless', 'Tunic', 'Crop top', 'Shirt', 'Sleeveless top', 'Half sleeve', 'Full sleeve', 'Polo', 'Round neck', 'Culottes', 'Jeans', 'Shorts', 'Trousers', 'Joggers', 'Rompers-Overalls', 'Jumpsuits-Dungarees', 'Cargo', 'Trousers', 'Culottes', 'Jeans', 'Shorts', 'Skirts', 'Jeggings', 'Leggings', 'Half sleeve shirts', 'Full sleeve shirts', 'Above knee', 'Below knee', 'Party', 'Gown', 'Dresses', 'Casual dress', 'Party dress', 'Gown'];
    
    this.patterns = ['Nature', 'Beach', 'Objects-Figures', 'Prints', 'Stripes', 'Geometrical-Abstract', 'Solid-Plain', 'Cartoons-Characters', 'Plaids', 'Stars', 'Camouflage', 'Polka', 'Floral', 'Prints', 'Stripes', 'Hearts', 'Solid-Plain', 'Patches', 'Gingham', 'Plaids', 'Animal', 'Abstract', 'Geometrical'];
    this.colors = ['Pink', 'Blue', 'Red', 'White', 'Grey', 'Orange', 'Green', 'Black', 'Brown', 'Yellow', 'Glitter-Shimmer', 'Blue', 'Khaki', 'Red', 'White', 'Purple', 'Grey', 'Orange', 'Green', 'Black', 'Brown', 'Yellow', 'Olive'];
    this.subcolors = ['Ferrari', 'Red', 'Burgandy', 'Chilli', 'Raspberry', 'Persian', 'Sangria', 'Carnation', 'Bubble Gum', 'Hot Pink', 'Fuchsia', 'Brick', 'Cerise', 'Baby Blue', 'Egyptian', 'Navy', 'Electric', 'Azure', 'CornFlower', 'Banana', 'Yellow', 'Gold', 'Lemon', 'Tuscany', 'Royal', 'Melon', 'Salamander', 'Orange', 'Sandstone', 'Apricot', 'Tangerine', 'Ginger', 'Lavender', 'Lilac', 'Grape', 'Lollipop', 'Eggplant', 'Violet', 'Tea', 'Mint', 'Forest', 'Kelly', 'Army', 'Tortilla', 'Brown', 'Chocolate', 'Cinnamon', 'Pearl river', 'Stone', 'Steel', 'Iron', 'Abalone'];
    this.brands = ['Mothercare', 'Chalk (Pantaloons)', 'Gap kids', 'Gini and Jony', 'H&M', 'Nauti Nati', 'UCB', 'US Polo', 'Zara', 'Biba'];

    // Make sure that you avoid duplicates.
    this.patterns = this.patterns.filter((item, pos) => { return this.patterns.indexOf(item) === pos; });
    this.colors = this.colors.filter((item, pos) => { return this.colors.indexOf(item) === pos; });
    this.designs = this.designs.filter((item, pos) => { return this.designs.indexOf(item) === pos; });

    this.nextPress = this.nextPress.bind(this);
    this.backPress = this.backPress.bind(this);
    this.addComment = this.addComment.bind(this);

    this.fbarray = [];
    console.log('In summary');
    console.log(this.state.comments);
    this.state.comments.forEach((item, key) => {
      this.fbarray.push(item.toString());
    });
    console.log(this.fbarray);
    
    this.computeStyleNumbers();
  }

  computeStyleNumbers() {
    //
    console.log('computing stylenumbers');
    let sum = 0;
    for (let i = 0; i < this.styles.length; i += 1) {
      sum += this.state.stylecounts.get(this.styles[i]) ? Math.pow(this.state.stylecounts.get(this.styles[i]), 1.5) : Math.pow(2, 1.5);
    }
    for (let i = 0; i < this.styles.length; i += 1) {
      if (this.state.stylenumbers.get(this.styles[i]) === undefined) {
        this.state.stylenumbers.set(this.styles[i], Math.floor((this.state.stylecounts.get(this.styles[i]) ? Math.pow(this.state.stylecounts.get(this.styles[i]), 1.5) : Math.pow(2, 1.5) * 15 / sum)));
        this.state.addStyleNumber(this.state.uid, this.styles[i], Math.floor((this.state.stylecounts.get(this.styles[i]) ? Math.pow(this.state.stylecounts.get(this.styles[i]), 1.5) : Math.pow(2, 1.5) * 15 / sum)));
      }
    }
    console.log('stlyecounts is', this.state.stylecounts);
    console.log('expected no of items calculated', this.state.stylenumbers);
  }

  nextPress() {
    this.state.next();
  }

  backPress() {
    this.state.back();
  }

  minusHandler(key) {
    this.state.stylenumbers.set(key, this.state.stylenumbers.get(key) - 1);
    this.state.addStyleNumber(this.state.uid, key, this.state.stylenumbers.get(key));
    // console.log('minus handler', key, this.styles, this.state.stylenumbers);
    this.setState({ sex: this.state.sex });
  }

  plusHandler(key) {
    this.state.stylenumbers.set(key, this.state.stylenumbers.get(key) + 1);
    this.state.addStyleNumber(this.state.uid, key, this.state.stylenumbers.get(key));
    this.setState({ sex: this.state.sex });
  }
  // We also need the comment stored in store for autofill.
  addComment(e, v) {
    this.setState({ comment: v });
    console.log(e, v);
  }
  render() {
    console.log(this.state.section);
    return (
      // First create one for theme. Then see if you can make it resuable.
      <div>
        {/* Outer box needs to have a border. */}
        <Flexbox flexWrap="wrap" justifyContent="space-around" alignItems="center">
          <div style={{ ...styles.div, width: '40vmax', alignContent: 'center', marginBottom: '5vh' }}>
            <Flexbox flexDirection="column">
              <h3 style={{ fontFamily: 'Delius', textDecoration: 'underline' }}> {'Themes'} </h3>
              <Flexbox flexDirection="row" justifyContent="space-around" alignItems="center" paddingBottom="5vmin">
                <Likes categoryArray={this.themes} votecounts={this.state.votecounts} liked />
                <Likes categoryArray={this.themes} votecounts={this.state.votecounts} />
              </Flexbox>
            </Flexbox>
          </div>
          <div style={{ ...styles.div, width: '40vmax', alignContent: 'center', marginBottom: '5vh' }}>
            <Flexbox flexDirection="column">
              <h3 style={{ fontFamily: 'Delius', textDecoration: 'underline' }}> {'Styles'} </h3>
              <h4 style={{ fontFamily: 'Delius' }}> {'Following is the expected number of styles that we will be sending as per your inputs. You may request a higher or a lower number.'} </h4>
              <Flexbox flexDirection="column" justifyContent="space-around" alignItems="center" paddingBottom="5vmin">
                {this.styles.map((styleinstance) => {
                  return (
                    <Flexbox key={styleinstance} flexDirection="row" justifyContent="space-around" >
                      {`${styleinstance}:`}
                      <div onClick={this.plusHandler.bind(this,styleinstance)} style={{marginLeft: '8px', marginRight: '8px'}}>
                        <Icon icon={plusCircle} size={25} />
                      </div>
                      {`${this.state.stylenumbers.get(styleinstance)}`}
                      <div onClick={this.minusHandler.bind(this,styleinstance)} style={{marginLeft: '8px', marginRight: '8px'}}>
                        <Icon icon={minusCircle} size={25} />
                      </div>
                    </Flexbox>
                  );
                })}
              </Flexbox>
            </Flexbox>
          </div>
          <div style={{ ...styles.div, width: '40vmax', alignContent: 'center', marginBottom: '5vh' }}>
            <Flexbox flexDirection="column">
              <h3 style={{ fontFamily: 'Delius', textDecoration: 'underline' }}> {'Designs'} </h3>
              <Flexbox flexDirection="row" justifyContent="space-around" alignItems="center" paddingBottom="5vmin">
                <Likes categoryArray={this.designs} votecounts={this.state.votecounts} liked />
                <Likes categoryArray={this.designs} votecounts={this.state.votecounts} />
              </Flexbox>
            </Flexbox>
          </div>
          <div style={{ ...styles.div, width: '40vmax', alignContent: 'center', marginBottom: '5vh' }}>
            <Flexbox flexDirection="column">
              <h3 style={{ fontFamily: 'Delius', textDecoration: 'underline' }}> {'Patterns'} </h3>
              <Flexbox flexDirection="row" justifyContent="space-around" alignItems="center" paddingBottom="5vmin">
                <Likes categoryArray={this.patterns} votecounts={this.state.votecounts} liked />
                <Likes categoryArray={this.patterns} votecounts={this.state.votecounts} />
              </Flexbox>
            </Flexbox>
          </div>
          <div style={{ ...styles.div, width: '40vmax', alignContent: 'center', marginBottom: '5vh' }}>
            <Flexbox flexDirection="column">
              <h3 style={{ fontFamily: 'Delius', textDecoration: 'underline' }}> {'Colours'} </h3>
              <Flexbox flexDirection="row" justifyContent="space-around" alignItems="center" paddingBottom="5vmin">
                <Likes categoryArray={this.colors} votecounts={this.state.votecounts} liked />
                <Likes categoryArray={this.colors} votecounts={this.state.votecounts} />
              </Flexbox>
            </Flexbox>
          </div>
          <div style={{ ...styles.div, width: '40vmax', alignContent: 'center', marginBottom: '5vh' }}>
            <Flexbox flexDirection="column">
              <h3 style={{ fontFamily: 'Delius', textDecoration: 'underline' }}> {'Comments'} </h3>
              <Flexbox flexDirection="column" justifyContent="space-around" alignItems="center" paddingBottom="5vmin">
                {this.fbarray.map((item) => {
                  return (
                    <div> {item} </div>
                );
                })
                }
              </Flexbox>
            </Flexbox>
          </div>
        </Flexbox>
        <MuiThemeProvider>
          <Flexbox justifyContent="space-between" marginLeft="10%" marginRight="10%" marginBottom="20px">
            <RaisedButton label="Back" onClick={this.backPress} />
            <RaisedButton label="Complete" onClick={this.nextPress} />
          </Flexbox>
        </MuiThemeProvider>
      </div>
    );
  }
}

