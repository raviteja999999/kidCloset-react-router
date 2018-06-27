import { firebase} from '../firebase/firebase';
import database from '../firebase/firebase';
import moment from 'moment';

const votecounts = new Map();

var stylecounts = new Map();

const comments = new Map();

const priceList = new Map();
const stylenumbers = new Map();


const votecountKey = [];
const votecountValue = [];
const stylecountKey = [];
const stylecountValue = [];
const stylenumbersKey = [];
const stylenumbersValue = [];

const quizReducerDefaultState = {
  index: 1,
  name: '',
  kidName: '',
  dob: '',
  sizetop: 0,
  sizebottom: 0,
  skincolor: 0,
  subindex: 0,
  characterName: '',
  mobileNumber: '',
  address: '',
  height: '',
  waist: '',
  bodyType: 0,
  sex: '',
  ageGroup: '',
  votecounts,
  stylecounts,
  comments,
  priceList,
  stylenumbers,
  checkedPrice: [],
  checkedFabric: [],
};

const max = 15;

export default (state = quizReducerDefaultState, action) => {
  switch (action.type) {
    case 'BACK':
      const temp = state.index === 3 ? 2 : state.index;
      database.ref(`users/${action.uid}/quiz/general/section`).set(temp > 0 ? temp - 1 : 0);
      return {
        ...state,
        index: temp > 0 ? temp - 1 : 0
        // index: state.index - 1
      };
    case 'NEXT':
      database.ref(`users/${action.uid}/quiz/general/section`).set(state.index < 15 ? state.index + 1 : 15);
    // database.ref(`users/${action.uid}/quiz/name`).set(state).then(() => { console.log('state push completed'); });
      return {
        ...state,
        index: state.index < 15 ? state.index + 1 : 15
      };
    case 'SETSECTION':
      database.ref(`users/${action.uid}/quiz/general/section`).set(action.index);
      console.log(action.index);
      return {
        ...state,
        index: action.index
      };
    case 'SUBINDEXINCREMENT':
      return {
        ...state,
        subindex: state.subindex + 1,
      };
    case 'SUBINDEXDECREMENT':
      return {
        ...state,
        subindex: state.subindex - 1,
      };
    case 'STYLES':
    console.log("it works");
      return{
        ...state,
        styles: action.styles,
      }  
    case 'SECTION1_ADD':
      // Do a firebase write.
      // UID will be in action.uid.
      database.ref(`users/${action.uid}/quiz/general/sex`).set(action.sex);
      database.ref(`users/${action.uid}/quiz/general/name`).set(action.name);
      database.ref(`users/${action.uid}/quiz/general/kidName`).set(action.kidName);
      database.ref(`users/${action.uid}/quiz/general/dob`).set(action.dob);
      database.ref(`users/${action.uid}/quiz/general/ageGroup`).set(action.dob);
      database.ref(`users/${action.uid}/quiz/general/section`).set(state.index + 2);
      database.ref(`users/${action.uid}/quiz/general/mobileNumber`).set(action.mobileNumber);
      
      // Read some of the other things into store
      database.ref(`users/${action.uid}/quiz/votecounts/key`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { votecountKey.push(childSnapshot.val()); });
      });
      database.ref(`users/${action.uid}/quiz/votecounts/value`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { votecountValue.push(childSnapshot.val()); });

        for (let i = 0; i < votecountKey.length; i += 1) {
          votecounts.set(votecountKey[i], votecountValue[i]);
        }
      });

      database.ref(`users/${action.uid}/quiz/stylenumbers/key`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { stylenumbersKey.push(childSnapshot.val()); });
      });
      database.ref(`users/${action.uid}/quiz/stylenumbers/value`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { stylenumbersValue.push(childSnapshot.val()); });
        for (let i = 0; i < stylenumbersKey.length; i += 1) {
          stylenumbers.set(stylenumbersKey[i], stylenumbersValue[i]);
        }
      });

      // Read some of the other things into store
      database.ref(`users/${action.uid}/quiz/stylecounts/key`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { stylecountKey.push(childSnapshot.val()); });
      });
      database.ref(`users/${action.uid}/quiz/stylecounts/value`).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => { stylecountValue.push(childSnapshot.val()); });

        for (let i = 0; i < stylecountKey.length; i += 1) {
          stylecounts.set(stylecountKey[i], stylecountValue[i]);
        }
        console.log('before deletion', stylecounts);
        if (action.sex === 'Boy') {
          console.log('its a boy');
          console.log(stylecounts.delete('Dresses'));
          stylecounts.delete('Tops');
        } else {
          console.log('its a girl');
          stylecounts.delete('Shirts');
        }
      });
        
      return {
        ...state,
        stylecounts,
        index: state.index + 2, // Taking section 2 towards the end.
        name: action.name,
        kidName: action.kidName,
        dob: action.dob,
        sex: action.sex,
        ageGroup: action.ageGroup,
        mobileNumber: action.mobileNumber,
      };
    case 'SECTION2_ADD':
      database.ref(`users/${action.uid}/quiz/general`).set({
        sex: state.sex, index: state.index + 1, name: state.name, kidName: state.kidName, dob: state.dob.toString(), sizetop: action.sizetop, sizebottom: action.sizebottom, characterName: action.characterName, mobileNumber: action.mobileNumber, address: action.address, height: action.height, waist: action.waist, bodyType: action.bodyType, priceList: action.priceList, checkedPrice: action.checkedPrice, checkedFabric: action.checkedFabric
      }).then(() => { console.log('Section2 push completed'); console.log(action.mobileNumber); });
      return {
        ...state,
        index: state.index + 1,
        sizetop: action.sizetop,
        sizebottom: action.sizebottom,
        characterName: action.characterName,
        mobileNumber: action.mobileNumber,
        address: action.address,
        height: action.height,
        waist: action.waist,
        bodyType: action.bodyType,
        priceList: action.priceList,
        checkedPrice: action.checkedPrice,
        checkedFabric: action.checkedFabric
      };
    case 'RATING':
      database.ref(`users/${action.uid}/quiz/votecounts/key`).push(action.selection).then(() => { console.log('push for key in vote'); });
      database.ref(`users/${action.uid}/quiz/votecounts/value`).push(action.vote).then(() => { console.log('push for value in vote'); });
      return {
        ...state,
        votecounts: votecounts.set(action.selection, action.vote)
      };
    case 'STYLERATING':
      database.ref(`users/${action.uid}/quiz/stylecounts/key`).push(action.selection).then(() => { console.log('push for key in vote'); });
      database.ref(`users/${action.uid}/quiz/stylecounts/value`).push(action.vote).then(() => { console.log('push for value in vote'); });
      return {
        ...state,
        stylecounts: stylecounts.set(action.selection, action.vote)
      };
    case 'ADDCOMMENT':
      database.ref(`users/${action.uid}/quiz/comments/key`).push(action.section).then(() => { console.log('push for key in comment'); });
      database.ref(`users/${action.uid}/quiz/comments/value`).push(action.comment).then(() => { console.log('push for value in comment'); });
      return {
        ...state,
        comments: comments.set(action.section, action.comment)
      };
    case 'EXPECTEDSTYLE':
      database.ref(`users/${action.uid}/quiz/stylenumbers/key`).push(action.styleinstance);
      database.ref(`users/${action.uid}/quiz/stylenumbers/value`).push(action.expectedNumber);
      return {
        ...state,
        stylenumbers: stylenumbers.set(action.styleinstance, action.expectedNumber)
      };
    case 'ADDCHARACTER':
      database.ref(`users/${action.uid}/quiz/general/characterName`).push(action.characterName);
      return {
        ...state,
        characterName: action.characterName,
      };
    default:
      return state;
  }
};
