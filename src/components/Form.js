import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Flexbox from 'flexbox-react';
import Button from '@material-ui/core/Button';
import { blue300, blue100 ,blue800} from 'material-ui/styles/colors';
import GradientButton from 'react-linear-gradient-button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    height : '65vh',
    justifyContent : "space-evenly",
    //backgroundColor : "red"
    
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: blue800,
    },
    fontSize : '12px',
    fontFamily : 'Delius'
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: blue800,
    },
    fontSize : '1.4vh',
    fontFamily : 'Delius'
  },
});

function CustomizedInputs(props) {
  const { classes } = props;
  //var style_submit_forgot_password_button = props.style_submit_buttons;
  //style_submit_forgot_password_button.width = '230px';
  //style_submit_forgot_password_button.margin = '10px 0px 0px 30px';
  //style_submit_forgot_password_button.height = '35px';
  const background = props.style_submit_buttons.background;
  const color = props.style_submit_buttons.color;
 // const fontSize = props.style_submit_buttons.fontSize;
  let fontSize = '2.3vh';
  let width = "10vmax"
 // let height = "45px"

 /* if(props.view === "portrait")
  {
    width = "20vmax"
   // height = "35px"
  } */
  let height;
  if(props.signin)
  {
     //height  = '28vh';
     //height = '266.28px'
     height = props.formHeightSignIn;
  }
  if(props.signup)
  {
     //height  = '43vh';
     //height = '408.93px'
     height = props.formHeightSignUp;
  }
  if(props.forgot_password)
  {
    //fontSize = '2vh'
    fontSize = props.fontSize;
   // width = '25vh';
    console.log(fontSize);
  }

  return (

      <form onSubmit={props.handle_submit_form}>
      <div style = {{  display: 'flex'/*,flexWrap: 'wrap'*/,flexDirection: 'column',alignItems: 'center',height,justifyContent: 'space-between', padding: '0vh 0vh 0vh 0vh'}}  >

      { props.signup && (<FormControl  style = {props.style_textfield} >
      <InputLabel
          FormLabelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }} 
          
        >
          name
        </InputLabel>
        <Input
          classes={{
            underline: classes.cssUnderline,
          }}
          type = "text"
        />
      </FormControl>)}

      { props.forgot_password && (
        
        <div style = {{display: 'flex',flexDirection: 'column',alignItems: 'flex-start',margin: '0px 0px 0px 15px'}}>

        <p  style={{fontFamily: 'Delius',/*fontSize: '1.7vh'*/fontSize,/*margin: '2vh 0vh 0vh 0vh'*/margin: '19px 0px 0px 0px'}}>No Problem, Please enter your registered mail address. <br/>We will mail you the reset link</p>
       
       
        <Flexbox flexDirection = "row" /*flexWrap = "wrap"*/ alignItems = "baseline" justifyContent = "space-between" >
      <FormControl   style = {props.style_textfield} >
        <InputLabel
          FormLabelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
          error = {props.error_email}
        >
          {props.email}
        </InputLabel>
        <Input
          classes={{
            underline: classes.cssUnderline,
          }}
          type = "email"
          error = {props.error_email}
          onClick = {props.on_click_email}
          onChange = {props.on_change_email}
          value = {props.email_value}
        />      
      </FormControl>
      <GradientButton type = "submit" gradient =  {['rgba(255,210,0,0.8)', 'rgba(255,90,0,5)']} borderRadius=  {8} background = "flare" color="white" style = {props.styleForgotPasswordSubmitButton} variant="contained">S&nbsp;U&nbsp;B&nbsp;M&nbsp;I&nbsp;T</GradientButton>
        </Flexbox> 

        <Flexbox flexDirection = "row"  alignItems = "baseline">
                     <p style={{fontFamily: 'Delius',/*fontSize: '1.7vh'*/fontSize,/*margin: '3vh 0vh 1vh 0vh'*/margin: '28.5px 0px 9.5px 0px'}}>remember password? click here to </p> <Button type = "text" style={{ color: "blue",/*fontSize: '1.7vh'*/fontSize ,fontFamily: 'Delius',backgroundColor: '#f5f5f5',outline: 'none',textTransform: 'none'}} disableRipple={true} onClick = {props.login} > Login </Button>
         </Flexbox>
        </div>
        )}


      { !props.forgot_password && ( 
      <FormControl   style = {props.style_textfield} >
        <InputLabel
          FormLabelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
          error = {props.error_email}
        >
          {props.email}
        </InputLabel>
        <Input
          classes={{
            underline: classes.cssUnderline,
          }}
          type = "email"
          error = {props.error_email}
          onClick = {props.on_click_email}
          onChange = {props.on_change_email}
          value = {props.email_value}
        />      
      </FormControl>
                )}

        

      { (props.signin) && (<FormControl  style = {props.style_textfield} >
      <InputLabel
          FormLabelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }} 
          error = {props.error_password}
        >
          {props.password}
        </InputLabel>
        <Input
          classes={{
            underline: classes.cssUnderline,
          }}
          type = "password"
          error = {props.error_password}
          onClick = {props.on_click_password}
          onChange = {props.on_change_password}
          value = {props.password_value}
        />
      </FormControl>)}


       { (props.signup) && (<FormControl  style = {props.style_textfield} >
      <InputLabel
          FormLabelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }} 
          error = {props.error_password}
        >
          {props.password}
        </InputLabel>
        <Input
          classes={{
            underline: classes.cssUnderline,
          }}
          type = "password"
          error = {props.error_password}
          onClick = {props.on_click_password}
          onChange = {props.on_change_password}
          value = {props.password_value}
        />
      </FormControl>)}


      { props.signup && (<FormControl  style = {props.style_textfield} >
      <InputLabel
          FormLabelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }} 
          
        >
          phone number
        </InputLabel>
        <Input
          classes={{
            underline: classes.cssUnderline,
          }}
          type = "text"
        />
      </FormControl>)}

        
        
      { props.signin && (<Flexbox flexDirection = "column" justifyContent = "space-around" style={{/*height : "14vh"*/height: '125.14px'}}><Button type = "text" style={{color: "blue",/*fontSize: '1.7vh'*/fontSize: '14.21px',fontFamily: 'Delius',outline: 'none',backgroundColor: '#f5f5f5',textTransform: 'none',margin: '2.5vh 0vh 0vh 0vh'}}   onClick = {props.set_forgot_password} disableRipple = {true} > Forgot password? </Button>   
     <div style = {{margin : '0vh 0vh 2vh 0vh'}}> <GradientButton type = "submit" gradient =  {['rgba(255,210,0,0.8)', 'rgba(255,90,0,5)']} borderRadius=  {8} background = "flare" color="white" style = {props.style_submit_buttons} >S&nbsp;I&nbsp;G&nbsp;N&emsp;I&nbsp;N</GradientButton> </div> </Flexbox>) }

      { props.signup && (<div style = {{margin:'1vh 0vh 2vh 0vh'}}> <GradientButton type = "submit" gradient =  {['rgba(255,210,0,0.8)', 'rgba(255,90,0,5)']} borderRadius=  {8} background = "flare" color="white" style = {props.style_submit_buttons} >S&nbsp;I&nbsp;G&nbsp;N&emsp;U&nbsp;P</GradientButton> </div>) }

          </div>
     
     </form> 
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputs);

// signIn margin: '10px 20.8vw 10px 10.55vw' signUp margin:'10px 0px 20px 0px'