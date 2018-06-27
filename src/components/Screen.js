import React from 'react';
import ReactDOM from 'react-dom';
import Flexbox from 'flexbox-react';
import { startLogin, skipLogin, login, startLogout,startLoginGoogle,startLoginFacebook,startSignInEmail,startSignUpEmail,sendPasswordResetEmail } from '../actions/auth';
import { connect } from 'react-redux';
import { firebase } from  '../firebase/firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from './Header';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import FacebookLoginButton from "react-social-login-buttons/lib/buttons/FacebookLoginButton";
import GoogleLoginButton from "react-social-login-buttons/lib/buttons/GoogleLoginButton";
import InputLabel from '@material-ui/core/InputLabel';
import { FormLabel } from '@material-ui/core';
import Form from './Form';
import MediaQuery from 'react-responsive';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff5722",
      main: "#ff5722",
      dark: "#ff5722",
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const ColoredLine = ({ color,width }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 0,
          width: width,
      }}
  />
);

export class Screen extends React.Component  
{

  constructor(props)
  {
    super(props);
    this.state = {
      signIn : props.signIn,
      signUp : props.signUp,
      forgotPassword: props.forgotPassword,
      placeholderEmail : "email",
      placeholderPassword : "password",
      value: 0,
      email: props.email,
      password: props.password,
      errorEmail : false,
      errorPassword : false,
      emailClick: false,
      passwordClick: false,
      activeClick : true,
      header : true,
      buttons: true,
      styleBox : props.styleBox,
      mainBackground : "box-layout__landscape__new",
      showOr : true,
      lineLength : "12.25vmax",
      styleAppBar :   props.styleAppBar,
      styleCloseButton :   props.styleCloseButton,    
    }

    this.props.error && this.props.handleError();
    
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.setForgotPassword = this.setForgotPassword.bind(this);
    this.handleSubmitSignIn = this.handleSubmitSignIn.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    this.handleSubmitForgotPassword = this.handleSubmitForgotPassword.bind(this);
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
    this.clickBoxlayout = this.clickBoxlayout.bind(this);
    this.onClickPassword = this.onClickPassword.bind(this);
    this.onClickEmail = this.onClickEmail.bind(this);
    this.login = this.login.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);


     if(props.view == 'portrait')
     {
          this.state.styleBox =   {backgroundColor: '#f5f5f5',width: '48.8vh',borderRadius: '0px 0px 15px 15px'};
          this.state.styleAppBar = {width: '42vh' ,borderTopLeftRadius: '15px',boxShadow: 'none',height: '60px' };
          this.state.styleCloseButton = { background: '#f5f5f5',border: '0',boxShadow: 'none',height: '60px',width: '6.8vh',borderTopRightRadius: '15px',fontSize: '1.6vh'};
     }
     if(props.signIn)
     {
      this.state.value = 0;
      this.state.header = true;
      this.state.buttons= true;
     }
     if(props.signUp)
     {
      this.state.value = 1;
      this.state.header = true;
      this.state.buttons= true;
     }
     if(props.forgotPassword)
     {
       this.state.header = false;
       this.state.buttons= false;
     }
}


  
  signIn()
  {
    if(!this.state.signIn)
    {
      
      this.state.activeClick = false;
      this.setState(
        () =>{
          return{
            signIn: true,
            signUp: false,
            forgotPassword: false,
            placeholderEmail : "email",
            placeholderPassword : "password",
            errorEmail : false,
            errorPassword : false,
            value: 0,
            email: '',
            password: '',
            emailClick: false,
            passwordClick: false,
            
          }
        }
      );
      this.props.handleSignIn();
      this.props.handleEmail('');
      this.props.handlePassword('');
      this.props.error && this.props.handleError();
    }
  }

  signUp()
  {      
    if(!this.state.signUp)
    {
      this.state.activeClick = false;
      this.setState(
        () =>{
          return{
            signUp: true,
            signIn: false,
            value: 1,
            placeholderEmail : "email",
            placeholderPassword : "password",
            errorEmail : false,
            errorPassword : false,
            email: '',
            password: '',
            emailClick: false,
            passwordClick: false,            
             }
        }
      );
      this.props.handleSignUp();
      this.props.handleEmail('');
      this.props.handlePassword('');
      this.props.error && this.props.handleError();
    }
  }

  handleSubmitSignIn(event)
  {
      event.preventDefault();
      this.state.activeClick = false;
      const email = event.target[0].value;
      const password = event.target[1].value;
      email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} );
      password ||  this.setState( () => { return{placeholderPassword: "please enter your password" ,errorPassword:true }} );
      email && password && this.props.startSignInEmail(email,password);
  }

  handleSubmitSignUp(event)
  {
      event.preventDefault();
      const email = event.target[1].value;
      const password = event.target[2].value;
      email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} );
      password ||  this.setState( () => { return{placeholderPassword: "please enter your password" ,errorPassword:true }} );
      email && password && this.props.startSignUpEmail(email,password);
  }

  setForgotPassword()
  {
      this.state.activeClick = false;
      this.setState(
        () =>{
          
          return{
            signIn : false,
            forgotPassword: true,
            header: false,
            email: '',
            errorEmail : false,
            emailClick: false,
            placeholderEmail: "email",
            buttons: false,
            showOr : false,
          }
          
        }
      )
      this.props.handleForgotPassword();
      this.props.handleEmail('');
      this.props.error && this.props.handleError();
  }

  handleSubmitForgotPassword(event)
  {
    event.preventDefault();
    const email = event.target[0].value;
    email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} );
    email && this.props.sendPasswordResetEmail(email); 
  }

  handleOnChangeEmail(event)
  {
    event.preventDefault();
    const email_ = event.target.value;
    this.setState(()=>{return{email : email_}});
    this.props.handleEmail(email_);
  }

  handleOnChangePassword(event)
  {
      event.preventDefault();
      const Password = event.target.value;
      this.setState(() => {return{placeholderPassword : "password",errorPassword: false,password: Password}});
      this.props.handlePassword(Password);
  }

  clickBoxlayout()
  {
    if(this.state.activeClick)
    {
        this.state.emailClick && (this.state.email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} ));
    
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.state.emailClick &&this.state.email && this.setState( () => {  if(!re.test(this.state.email)){ return{placeholderEmail: "enter a valid email id" ,errorEmail: true } }                                 
                }  );
        this.state.passwordClick &&(this.state.password ||  this.setState( () => { return{placeholderPassword: "please enter your password" ,errorPassword:true }} ));           
        this.state.forgotPasswordClick && (this.state.forgotPasswordEmail ||  this.setState( () => { return{placeholderForgotPassword: "please enter your email id" ,errorForgotPassword:true }} ));
        this.state.forgotPasswordClick && this.state.forgotPasswordEmail && this.setState( () => {  if(!re.test(this.state.forgotPasswordEmail)){ return{placeholderForgotPassword: "enter a valid email id" ,errorForgotPassword: true } }                                 
                }  );
    }
    else
    {
        this.state.activeClick = true ;
    }
  }

  onClickEmail()
  {
    this.state.emailClick = true;
    this.state.activeClick = false;
    this.props.error && this.props.handleError();
    this.state.passwordClick && (this.state.password || this.setState(() => {return{placeholderPassword: "please enter your password" ,errorPassword:true }}));
    this.setState( () => { return{ placeholderEmail: "email",errorEmail: false }} );
  }

  onClickPassword()
  {
    this.state.passwordClick = true;
    this.state.activeClick = false;
    this.setState(() => {return{placeholderPassword : "password",errorPassword: false}});
    this.props.error && this.props.handleError();
    this.state.emailClick && (this.state.email ||  this.setState( () => { return{placeholderEmail: "please enter your email id" ,errorEmail:true }} ));
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.state.emailClick &&this.state.email && this.setState( () => {  if(!re.test(this.state.email)){ return{placeholderEmail: "enter a valid email id" ,errorEmail: true } }   
                }  );
  }

  login()
  {
    this.state.activeClick = false;
    this.props.error && this.props.handleError();
    this.props.handleSignIn();
    this.props.handleEmail('');
    this.props.handlePassword('');

    this.setState(()=>
    {return{
      signIn:true,
      forgotPassword: false,
      header: true,
      placeholderEmail : "email",
      placeholderPassword : "password",
      errorEmail : false,
      errorPassword : false,
      email: '',
      password: '',
      emailClick: false,
      passwordClick: false,
      value: 0,
      buttons: true,
      showOr: true,
    }});
  }

  handleSubmitForm(event)
  {
    if(this.state.signIn)
      this.handleSubmitSignIn(event);
    if(this.state.signUp)  
      this.handleSubmitSignUp(event);
    if(this.state.forgotPassword)
      this.handleSubmitForgotPassword(event);  
  }



    render()
    {
            return(     
                    <div className = "box-layout__parent" onClick = {this.clickBoxlayout}>
                    <div className = {this.state.mainBackground} > </div>
                   
                    
         
                    <Header loginPress={this.loginPress} uid={this.state.uid} quiz={false} startLogout={this.startLogout} disableLogin = {true}/>
           
                    
                    <MediaQuery maxWidth={1660}  >
                      {(matches) => {
                                  if (matches) {
                                  console.log("matches");
                                  return null;
                                  
                                }
                                  else
                                  {
                                    return null
                                  } 
                                    }}
                    </MediaQuery>



                    <Flexbox flexDirection = "column" justifyContent = "center" style = {{height: '80vh'}}  >
                    <div className="box-layout__new" >
                     
                    {this.state.header && (<Flexbox flexDirection="row" justifyContent = "center"  ><div ><MuiThemeProvider theme = {theme}><AppBar  color='default' position= 'static' style = {this.props.styleAppBar} >
                  
                    <Tabs
                         value={this.state.value}
                         indicatorColor="primary"
                         textColor = "primary"                    
                         style = {{ fontFamily: 'Delius' }}
                         outline = 'none' >   

                  
                    <Tab  label={<span style = {this.props.textStyleTab} > Sign in </span>} style={this.props.styleTabSignin} onClick={this.signIn}   />
                    <Tab label={<span style = {this.props.textStyleTab} > Sign up </span>} style={this.props.styleTabSignup} onClick={this.signUp}  /> 


                    </Tabs>
                    </AppBar></MuiThemeProvider></div>  
                    <button onClick={ this.props.closeloginbox} style = {this.props.styleCloseButton}> x </button> 
                    </Flexbox>) }  

                     <Flexbox justifyContent = "center"  >
                
                    { this.state.forgotPassword || (<div   style = {this.props.styleBox} > 

                    <Flexbox  flexDirection = "column" >
                    {this.state.buttons && (  
                      <div >

                    <MediaQuery query = "(orientation: landscape)">
                    <Flexbox flexDirection="row" justifyContent = "center"  style = {{margin : '2vh 0vh 0vh 0vh'}}>  
                      <GoogleLoginButton onClick = {this.props.startLoginGoogle}  style ={this.props.styleSocialButtons } > <span style = {this.props.styleGoogle}>Login with Google</span></GoogleLoginButton>
                      <FacebookLoginButton onClick={this.props.startLoginFacebook}   style={this.props.styleSocialButtons}> <span style = {this.props.styleFacebook}>Login with Facebook</span></FacebookLoginButton>         
                    </Flexbox>
                        </MediaQuery>

                    
                        <MediaQuery query = "(orientation: portrait)">
                    <Flexbox flexDirection="column" alignItems = "center" style = {{margin : '2vh 0vh 0vh 0vh'}}>  
                      <GoogleLoginButton onClick = {this.props.startLoginGoogle}  style ={ {width : '32vh'} } > <span style = {{margin : '0px 0px 0px 22px',fontSize: '1.9vh'}}>Login with Google</span></GoogleLoginButton>
                      <FacebookLoginButton onClick={this.props.startLoginFacebook}   style={ {width : '32vh'} }/*style = {{margin: "20px",width:'255px'}}*/> <span style = {{margin: '0px 0px 0px 17px',fontSize: '1.9vh'}}>Login with Facebook</span></FacebookLoginButton>         
                    </Flexbox>
                        </MediaQuery>
                    
                      </div>
              
                    )
                    }
                     {this.state.showOr && (<div>
                     <MediaQuery query = "(orientation: landscape)">
                     <Flexbox flexDirection = "row" justifyContent = "center" style = {this.props.styleLine} ><ColoredLine color = "#f5f5f5" width = {this.props.lineLength} /> <p style={this.props.styleOr}>OR</p><ColoredLine color = "#f5f5f5" width = {this.props.lineLength}/></Flexbox>
                     </MediaQuery>

                     <MediaQuery query = "(orientation: portrait)">
                     <Flexbox flexDirection = "row" justifyContent = "center" style = {{padding: '6vh 7.5vh 0vh 7.5vh'}} ><ColoredLine color = "#f5f5f5" width = {this.state.lineLength} /> <p style={{fontFamily: 'Delius',fontSize: '1.7vh'}}>OR</p><ColoredLine color = "#f5f5f5" width = {this.state.lineLength}/></Flexbox>
                     </MediaQuery>
                     </div>
                     )}
                
                  
                      <Form 
                        email = {this.state.placeholderEmail} 
                        password = {this.state.placeholderPassword} 
                        error_email = {this.state.errorEmail}
                        error_password = {this.state.errorPassword}
                        on_change_email = { this.handleOnChangeEmail }
                        on_click_email = { this.onClickEmail}
                        on_change_password = {this.handleOnChangePassword}
                        on_click_password = { this.onClickPassword} 
                        handle_submit_form = {this.handleSubmitForm}
                        set_forgot_password = {this.setForgotPassword}
                        signin = {this.state.signIn}
                        signup = {this.state.signUp}
                        forgot_password = {this.state.forgotPassword}
                        style_textfield = {this.props.styleTextfield}
                        style_submit_buttons = {this.props.styleSubmitButtons}
                        email_value = {this.state.email}
                        password_value = {this.state.password}
                        login = {this.login}
                        formHeightSignIn = {this.props.formHeightSignIn}
                        formHeightSignUp = {this.props.formHeightSignUp}                     
                        >
                      </Form>                 
               

                    </Flexbox>

                    <div style = {{backgroundColor: '#ff8a80'}}>
                    <Flexbox flexDirection = "row" flexWrap = "wrap" justifyContent="center" >
                    {this.props.error && (<p style = {this.props.styleErrorMessage} >{this.props.error}</p>)}
                    </Flexbox>
                    </div>
                    </div>)}

                    {this.state.forgotPassword && (<div style = {this.props.styleBoxForgotPassword}>
                            
                      <Form 
                        email = {this.state.placeholderEmail} 
                        password = {this.state.placeholderPassword} 
                        error_email = {this.state.errorEmail}
                        error_password = {this.state.errorPassword}
                        on_change_email = { this.handleOnChangeEmail }
                        on_click_email = { this.onClickEmail}
                        on_change_password = {this.handleOnChangePassword}
                        on_click_password = { this.onClickPassword} 
                        handle_submit_form = {this.handleSubmitForm}
                        set_forgot_password = {this.setForgotPassword}
                        signin = {this.state.signIn}
                        signup = {this.state.signUp}
                        forgot_password = {this.state.forgotPassword}
                        style_textfield = {this.props.styleTextfield}
                        style_submit_buttons = {this.props.styleSubmitButtons}
                        email_value = {this.state.email}
                        password_value = {this.state.password}
                        login = {this.login}
                        fontSize = {this.props.fontSize}   
                        styleForgotPasswordSubmitButton = {this.props.styleForgotPasswordSubmitButton}                  
                        >
                      </Form>               
                     
                      <div style = {{backgroundColor: '#ff8a80'}}>
                    <Flexbox flexDirection = "row" flexWrap = "wrap">
                    {this.props.error && (<p style = {this.props.styleErrorMessage} >{this.props.error}</p>)}
                    </Flexbox>
                    </div>
                  
                      
                        </div>
                      )}

                     

                    </Flexbox>
                   
                    </div>
                    </Flexbox>
                  
                  </div>
              );      
}
};

const mapDispatchToProps = (dispatch) => ({
    skipLogin: () => { dispatch(login(1)); },
    startLogin: () => { dispatch(startLogin()); console.log('start login'); },
    startLogout: () => { dispatch(startLogout()); },
    startLoginGoogle: () => dispatch(startLoginGoogle(dispatch)),
    startLoginFacebook: () => dispatch(startLoginFacebook(dispatch)),
    startSignInEmail: (email,password) =>  { dispatch(startSignInEmail(email,password,dispatch)) },
    startSignUpEmail: (email,password) =>  { dispatch(startSignUpEmail(email,password,dispatch)) },
    sendPasswordResetEmail: (email) => { dispatch(sendPasswordResetEmail(email,dispatch)) },
    handleError: () => { dispatch ({type: 'ERROR' , error_message: '' })  },
    
  });

  const mapStateToProps = (state) => {
    return {
      error: state.auth.error,
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(Screen);
  {/*<ColoredLine color = "#f5f5f5" width = {this.state.lineLength}/>*/}