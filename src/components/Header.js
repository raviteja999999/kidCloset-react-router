import React from 'react';
import Flexbox from 'flexbox-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {firebase} from '../firebase/firebase'

// Take the quiz will come if its both logged in and quiz is false. 

const Header = ({ loginPress, uid, quiz, startLogout,disableLogin }) => (
  
  
  <header className="header">
    <div className="header__content">
      <img src="/images/log_final.jpg" height="50vw" alt="logo" style={{ padding: '0px',margin: '5px 32vw 10px 0px' }} />
      <div>
        {quiz ?
          <a href="/home">
          <button className="button button--link" href="/home" style={{ fontFamily: 'Delius' }} >Home
          </button> 
        </a> : <div />
        }
        {

          !disableLogin ? ( !uid ?
         <button className="button button--link" style={{ fontFamily: 'Delius',margin: '0px 0px 0px 0vw' }} onClick={loginPress}  >Login</button> : <button className="button button--link" onClick={startLogout} style={{ fontFamily: 'Delius' }}>Logout</button>) : <button className="button button--link" style={{ fontFamily: 'Delius',margin: '0px 0px 0px 100px' }} onClick={loginPress} disabled >Login</button>}
        
        
        {!quiz && !!uid ?
          <a href="/quiz">
            <button className="button button--link" style={{ fontFamily: 'Delius' }} href="/quiz" >Take the quiz</button>
          </a>
          : <div />
        }
      </div>
    </div>
  </header>
);
//  It returns a functions that dispatches the action startLogOut. Note that action startLogout is different from the variable/function startLogout. 

export default Header;