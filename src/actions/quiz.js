import database from '../firebase/firebase';

export const next = (uid) => ({
  type: 'NEXT',
  uid,
});

export const setsection = (index) => ({
  type: 'SETSECTION',
  index,
 });

export const back = () => ({
  type: 'BACK'
});

export const subindexincrement = () => ({
  type: 'SUBINDEXINCREMENT'
});

export const subindexdecrement = () => ({
  type: 'SUBINDEXDECREMENT'
});

export const finish = () => ({
  type: 'FINISH'
});

export const section1Add = (uid, name, kidName, dob, sex, ageGroup, mobileNumber) => ({
  type: 'SECTION1_ADD',
  uid,
  name,
  kidName,
  dob,
  sex,
  ageGroup,
  mobileNumber,
});

export const section2Add = (uid, sizetop, sizebottom, characterName, mobileNumber, address, height, waist, bodyType, priceList, checkedPrice, checkedFabric) => ({
  type: 'SECTION2_ADD',
  uid,
  sizetop,
  sizebottom,
  characterName,
  mobileNumber,
  address,
  height,
  waist,
  bodyType,
  priceList,
  checkedPrice, 
  checkedFabric,
});

// Selection is a unique selection name like t-shirt, cool etc. Each will have a vote count.
// There will be an object votecount having selection name and associated votes.
// First just validate if it works in console.
export const rating = (uid, selection, vote) => ({
  type: 'RATING',
  uid,
  selection,
  vote
});

// Here the vote can only be positive and not negative. But why? Let it be. How does it matters if customer doesn't wants a design and wants to share this information as well.
// We are just giving it a different data structure for convenience.
export const stylerating = (uid, selection, vote) => ({
  type: 'STYLERATING',
  uid,
  selection,
  vote
});

// Right now I have kept section to be a number, later I should change it to a name.
export const addComment = (uid, section, comment) => ({
  type: 'ADDCOMMENT',
  uid,
  comment,
  section
});

export const addStyleNumber = (uid, styleinstance, expectedNumber) => ({
  type: 'EXPECTEDSTYLE',
  uid,
  styleinstance,
  expectedNumber,
});

export const addcharacter = (uid, characterName) => ({
  type: 'ADDCHARACTER',
  uid,
  characterName,
});
