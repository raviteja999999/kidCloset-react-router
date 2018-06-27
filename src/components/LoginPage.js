import React from 'react';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import Flexbox from 'flexbox-react';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MediaQuery from 'react-responsive';
import Slider from 'react-slick';
import Sticky from 'react-sticky-el';
import How from './How';
import Header from './Header';
import Phone from './Phone';
import Screen from './Screen';
import Tabs from './Tabs';

const settings = {
  dots: true,
  
};



export const tHeader = ({ loginPress }) => (
  <header className="header">
    <div className="header__content">
      <img src="/images/log_final.jpg" height="50vw" alt="logo" style={{ padding: '0px' }} />
        <div>
          <a>
            <button className="button button--link" style={{ fontFamily: 'Delius' }} onClick={loginPress} >Login</button>
          </a>
          <a href="#how">
            <button className="button button--link" href="#how" style={{ fontFamily: 'Delius' }} >How it works</button>
          </a>
        </div>
    </div>
  </header>
);

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.loginPress = this.loginPress.bind(this);
    this.closeloginbox = this.closeloginbox.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.print = this.print.bind(this);
    this.state = {
      showloginbox: false,
      uid: props.uid,
      signIn: true,
      signUp: false ,
      forgotPassword : false,
      email : '',
      password : '',
    };
 }
  loginPress() {
    this.setState({ showloginbox: true });
  }
  closeloginbox(){
    this.setState({showloginbox: false});
  }
  handleForgotPassword(){
    this.setState(()=>{return{forgotPassword:true,signIn:false,signUp:false,}});
  }

  handleSignIn(){
    this.setState(()=>{return{forgotPassword:false,signIn:true,signUp:false,}});
  }

  handleSignUp(){
    this.setState(()=>{return{forgotPassword:false,signIn:false,signUp:true,}});
  }
  handleEmail(Email){
    this.setState(()=>{return{email:Email}});
  }
  handlePassword(Password){
    this.setState(()=>{return{password:Password}});
  }
  print()
  {
    console.log(this.state.signIn,this.state.signUp,this.state.forgotPassword);
  }

  render() {
    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();
    return (
      <div>
       {this.state.showloginbox || (
       <div>   
        <MediaQuery  query="(orientation: portrait)">
        <div>
        <div className="box-layout__portrait" style={{ height: '95vh' }}>
        <Flexbox flexDirection="column" justifyContent="space-between">
        <Header loginPress={this.loginPress} uid={this.state.uid} quiz={false} startLogout={this.startLogout} disableLogin = {false}/>      
        </Flexbox>
        </div>
        <div id="how" style={{position: 'relative'}}>
        <How />
        </div>
        </div>
        </MediaQuery>


        <MediaQuery  query="(orientation: landscape)">
        <div>

        <div className="box-layout__landscape" >
        </div>
        <Header loginPress={this.loginPress} uid={this.state.uid} quiz={false} startLogout={this.startLogout} disableLogin = {false}/> 

        <div style={{height:'90vh'}}>
        </div>

        <div id="how" >
        <How />
        </div>

        </div>
        </MediaQuery>
       </div>
      )}

      {this.state.showloginbox && ( 
      <div>
      <MediaQuery query="(orientation: portrait)">
      {(matches)=>{
        if(matches)
        {
      {this.print()};
      {console.log("1")};
        return(
          <Screen  
          view = "portrait"
          styleBox = { {backgroundColor: '#f5f5f5',width: '48.8vh',borderRadius: '0px 0px 15px 15px'}}
          styleBoxForgotPassword = { {backgroundColor: '#f5f5f5',width: '60vh',borderRadius: '15px 15px 15px 15px'}}  
          styleAppBar = {{width: '42vh' ,borderTopLeftRadius: '15px',boxShadow: 'none',height: '61px' }} 
          styleCloseButton = {{background: '#f5f5f5',border: '0',boxShadow: 'none',height: '61px',width: '6.8vh',borderTopRightRadius: '15px',fontSize: '2vh'}} 
          closeloginbox = {this.closeloginbox}  
          styleTextfield = {{width: '30vmax',padding: '1px 1px 0px 1px'}}  
          styleSocialButtons = {{width: '15vh'}} 
          styleSubmitButtons = {{fontSize: '2.1vh',width: '30vmax',height:'3.8vh',background : "flare",color: "white",padding: '0px 0px 35px 0px'}} 
          styleTabSignin = {{outline : 'none',textTransform: 'none',margin : '0.7vmax 0vmax 0vmax 9vmax'}}
          styleTabSignup = {{outline : 'none',textTransform: 'none',margin : '0.7vmax 0vmax 0vmax 0px'}}
          textStyleTab = {{fontSize:'2vh'}}
          signIn = {this.state.signIn}
          signUp = {this.state.signUp}
          forgotPassword = {this.state.forgotPassword}
          handleSignIn = {this.handleSignIn}
          handleSignUp = {this.handleSignUp}
          handleForgotPassword = {this.handleForgotPassword}
          formHeightSignIn = '28vh'
          formHeightSignUp = '43vh' 
          fontSize = '1.5vh'
          styleForgotPasswordSubmitButton =  {{height:'2.2vh', width: '20vh'  ,background: 'flare' , color: 'white' , /*fontSize*/ fontSize: '1.8vh',/*margin: '0vh 0vh 0vh 5vh'*/margin: '0px 0px 0px 2.5vh',padding: '0px 0px 35px 0px'}} 
          styleErrorMessage = {{color: "red",fontFamily: "Delius",fontSize: "1.5vh"}}
          email = {this.state.email}
          handleEmail = {this.handleEmail}
          password = {this.state.password}
          handlePassword = {this.handlePassword} 
          > 
            </Screen>)}
          else
          {
            return null;
          }
          
          }}
        </MediaQuery>
          
        <MediaQuery query="(orientation: landscape)">
              <MediaQuery minWidth = {1640}>
               { (matches)=> 
                 {      
                if(matches) 
                { 
                  {this.print()};
                  {console.log("2")};
                return (
                <Screen view = "landscape_fluid" 
                styleBox = { {backgroundColor: '#f5f5f5',width: '45.5vw',borderRadius: '0px 0px 15px 15px'}}
                styleBoxForgotPassword = {{background:'#f5f5f5',width: '52.5vmax',borderRadius: '15px 15px 15px 15px',position: 'relative'}}  
                styleAppBar = {{width: '42vw' ,borderTopLeftRadius: '15px',boxShadow: 'none',height: '61px' }} 
                styleCloseButton = {{background: '#f5f5f5',border: '0',boxShadow: 'none',height: '61px',width: '3.5vw',borderTopRightRadius: '15px',fontSize: '0.82vw'}}
                closeloginbox = {this.closeloginbox}  
                styleTextfield = {{width: '30vmax',padding: '1px 1px 0px 1px'}}  
                styleSocialButtons = {{width: '14.8vmax'}} 
                styleSubmitButtons = {{fontSize: '1.18vw',width: '30vmax',height:'3.8vh',background: "flare",color: "white",padding: '0px 0px 45px 0px'}} 
                styleTabSignin = {{outline : 'none',textTransform: 'none',margin : '0.7vmax 0vmax 0vmax 9vmax'}}
                styleTabSignup = {{outline : 'none',textTransform: 'none',margin : '0.7vmax 0vmax 0vmax 0px'}}
                styleGoogle = {{margin : '0px 1.8vw 0vmax 1.8vmax',fontSize: '1vmax'}}
                styleFacebook = {{margin: '0px 1.5vw 0vmax 1vmax',fontSize: '1vmax'}}
                styleLine =  {{padding: '3.08vmax 6.17vmax 0vh 6.17vmax'}}
                styleOr =      {{fontFamily: 'Delius',fontSize : '1vmax'}}
                lineLength = '12.25vmax'
                textStyleTab = {{fontSize:'1.02vw'}}
                signIn = {this.state.signIn}
                signUp = {this.state.signUp}
                forgotPassword = {this.state.forgotPassword}
                handleSignIn = {this.handleSignIn}
                handleSignUp = {this.handleSignUp}
                handleForgotPassword = {this.handleForgotPassword}
                formHeightSignIn = '266.28px'
                formHeightSignUp = '408.93px'
                fontSize = '16.16px' 
                styleForgotPasswordSubmitButton =  {{/*height:'2.5vh'*/height: '23.5px' , width: '12.86vw'  ,background: "flare" , color: 'white' , /*fontSize*/ fontSize: '1.18vw',/*margin: '0vh 0vh 0vh 5vh'*/margin: '0px 0px 0px 47px',padding: '0px 0px 45px 0px'}}
                styleErrorMessage = {{color: "red",fontFamily: "Delius",fontSize: "0.8vw"}}
                email = {this.state.email}
                handleEmail = {this.handleEmail}
                password = {this.state.password}
                handlePassword = {this.handlePassword}   
                >
                </Screen> )                                            
                 }    
                else{ {this.print()};
                      {console.log("3")};                       
                     return (
                     <Screen view = "landscape_fixed"                            
                      styleBox = { {backgroundColor: '#f5f5f5',width: '746.2px',borderRadius: '0px 0px 15px 15px'}}
                      styleBoxForgotPassword = {{background:'#f5f5f5',width: '861px',borderRadius: '15px 15px 15px 15px'}}  
                      styleAppBar = {{width: '688.8px' ,borderTopLeftRadius: '15px',boxShadow: 'none',height: '61px' }} 
                      styleCloseButton = {{background: '#f5f5f5',border: '0',boxShadow: 'none',height: '61px',width: '57.4px',borderTopRightRadius: '15px',fontSize: '13.44px'}}
                      closeloginbox = {this.closeloginbox}
                      styleTextfield = {{width: '492px',padding: '1px 1px 0px 1px'}}  
                      styleSocialButtons = {{width: '242.72px'}} 
                      styleSubmitButtons = {{fontSize: '19.35px',width: '492px',height:'3.8vh',background: "flare",color: "white",padding: '0px 0px 45px 0px'}} 
                      styleTabSignin = {{outline : 'none',textTransform: 'none',margin : '11.48px 0vmax 0vmax 147.6px'}}
                      styleTabSignup = {{outline : 'none',textTransform: 'none',margin : '11.48px 0vmax 0vmax 0px'}}
                      styleGoogle = {{margin : '0px 29.52px 0vmax 29.52px',fontSize: '16.4px'}}
                      styleFacebook = {{margin: '0px 24.6px 0vmax 16.4px',fontSize: '16.4px'}}
                      styleLine =  {{padding: '50.51px 101.18px 0vh 101.18px'}}
                      styleOr =    {{fontFamily: 'Delius',fontSize : '16.4px'}}
                      lineLength = '200.9px'
                      textStyleTab = {{fontSize:'16.72px'}}
                      signIn = {this.state.signIn}
                      signUp = {this.state.signUp}
                      forgotPassword = {this.state.forgotPassword}
                      handleSignIn = {this.handleSignIn}
                      handleSignUp = {this.handleSignUp}
                      handleForgotPassword = {this.handleForgotPassword}
                      formHeightSignIn = '266.28px'
                      formHeightSignUp = '408.93px' 
                      fontSize = '16.16px'
                      styleForgotPasswordSubmitButton =  {{/*height:'2.5vh'*/height: '23.5px' , width: '210.9px'  ,background: "flare" , color: 'white' , /*fontSize*/ fontSize: '19.35px',/*margin: '0vh 0vh 0vh 5vh'*/margin: '0px 0px 0px 47px',padding: '0px 0px 45px 0px'}}
                      styleErrorMessage = {{color: "red",fontFamily: "Delius",fontSize: "13.12px"}}
                      email = {this.state.email}
                      handleEmail = {this.handleEmail}
                      password = {this.state.password}
                      handlePassword = {this.handlePassword} 
                      > 
                      </Screen>)
                    }
           }}
            </MediaQuery>                                
          </MediaQuery>
      </div>)}
      </div>)

          }
        }


const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
  };
};

export default connect(mapStateToProps)(LoginPage);
//width: '30vw',height:'4vh',margin: '0px 0px 15px 0px',fontSize: '25px',padding: '0px 0px 47px 0px'