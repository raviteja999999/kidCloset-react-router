import { firebase, database } from '../firebase/firebase';
import React from 'react';

export default class Admin extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    this.state = {
      uid: '',
      sex: '',
      kidName: '',
      name: '',
      dob: '',
    };
    
   
  }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      database.ref(`users/${this.state.uid}/quiz/general/sex`).once('value').then((snapshot) => {
        this.setState({ sex: snapshot.val() });
      });
  
      database.ref(`users/${this.state.uid}/quiz/general/kidName`).once('value').then((snapshot) => {
        this.setState({ kidName: snapshot.val() });
      });
  
      database.ref(`users/${this.state.uid}/quiz/general/name`).once('value').then((snapshot) => {
        this.setState({ name: snapshot.val() });
      });
  
      database.ref(`users/${this.state.uid}/quiz/general/dob`).once('value').then((snapshot) => {
        console.log('this we are picking from fb', snapshot.val());
      
        this.setState({ strdob: snapshot.val() });
        console.log('dob is', this.state.dob);
        
      });

      database.ref(`users/${this.state.uid}/quiz/votecounts/key`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { 
          this.state.votecountsKey.push(childSnapshot.val()); 
        });
      });
      
      database.ref(`users/${this.state.uid}/quiz/votecounts/value`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { 
          this.state.votecountsValue.push(childSnapshot.val()); 
        });
        this.themes.forEach((style) => {
          let index = this.state.votecountsKey.lastIndexOf(style);
          if (index > -1){
            this.state.themes = this.state.themes + this.state.votecountsKey[index] + ':' + this.state.votecountsValue[index] + ',';
          }
        });
      });

      database.ref(`users/${this.state.uid}/quiz/stylecounts/key`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { 
          this.state.stylecountsKey.push(childSnapshot.val()); 
        });
      });

      database.ref(`users/${this.state.uid}/quiz/stylecounts/value`).once('value').then((snapshot) => {
        
        snapshot.forEach((childSnapshot) => { 
          this.state.stylecountsValue.push(childSnapshot.val()); 
        });

        this.styles.forEach((style) => {
          let index = this.state.stylecountsKey.lastIndexOf(style);
          if (index > -1){
            this.state.styleValue.push(this.state.stylecountsValue[index]);
            this.state.styleKey.push(this.state.stylecountsKey[index]);
            this.state.style = this.state.style + this.state.stylecountsKey[index] + ':' + this.state.stylecountsValue[index] + ',';
          }
        });
        
        data6 = [
          {
            name: this.state.name,
            kidName: this.state.kidName,
            sex: this.state.sex,
            uid: this.state.uid,
            dob: this.state.dob,
            address: this.state.address,
            characterName: this.state.characterName, 
            bodyType: this.state.bodyType, 
            sizebottom: this.state.sizebottom, 
            sizetop: this.state.sizetop,
            waist: this.state.waist, 
            height: this.state.height,
            style: this.state.style,
          },
        ];
        console.log('data6 is', data6);
        this.setState({name: this.state.name});
      });


      event.preventDefault();
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
}

