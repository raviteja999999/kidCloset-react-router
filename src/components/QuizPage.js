import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import MediaQuery from 'react-responsive';
import  {firebase}  from '../firebase/firebase';
import  database  from '../firebase/firebase';
import QuizForm from '../components/quiz/QuizForm';
import Section1 from '../components/quiz/Section1';
import Section2 from './quiz/Section2';
import PriceSection from './quiz/PriceSection';
import Section3 from './quiz/Section3';
import { connect } from 'react-redux';
import AppRouter, { history } from '../routers/AppRouter';

import { next, back, setsection, section1Add, section2Add, rating, stylerating, addComment, subindexincrement, subindexdecrement, addStyleNumber, addcharacter } from '../actions/quiz';

import RaisedButton from 'material-ui/RaisedButton';
// import ColorInput from './quiz/ColorInput';
import Summary from './quiz/Summary';

const styles = {
  container: {
    color: '#006aff',
    marginTop: '10px',
    justifyContent: 'right', // Not working.
    alignSelf: 'stretch', // Not working
    alignItems: 'end', // Not working
    textAlign: 'center',
  },
  inner_container: {
  },
  button: {
    background: '$blue',
    display: 'inline-block',
    fontSize: '$font-size-large',
    fontWeight: 300,
    lineHeight: 1,
    padding: '$s-size',
    textDecoration: 'none',
    textAlign: 'center',
    fontFamily: 'Delius',
    paddingTop: '0px',
  },
  muitext: {
    fontFamily: 'Delius',
    textAlign: 'center',
  // text align to center is not working.
  },
  label: {
    fontFamily: 'Delius',
  },
};

let colorarray = ['Pink', 'Blue', 'Red', 'Grey', 'Orange', 'Green', 'Brown', 'Yellow', 'Blue', 'Red', 'Grey', 'Orange', 'Green', 'Brown', 'Yellow'];
colorarray = colorarray.filter((item, pos) => { return colorarray.indexOf(item) === pos; });

const nuid = 'e9XoJse2dGajBFzy1CcPNu3AlGB3';

let votecountKey = [];
let votecountValue = [];
let stylecountKey = [];
let stylecountValue = [];
let commentKey = [];
let commentValue = [];
// console.log('votecount is assigned some value. This comes on top of execution');

// This should be passed all the relevant data. It will then have subcomponents.
const PageSection = (props) => (
  <div>
    <h1 className="box-layout__title">{props.title}</h1>
    <p>This will be the body for the section. Just confirming if we will have to scroll when the page gets finished</p>
    <QuizForm />
  </div>
);
// Styling - leaving 5vw on left and right.
const Title = props => (
  <div>
    <h1 style={{
      textAlign: 'center', fontFamily: 'Delius', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '5vw', paddingRight: '5vw'
    }}
    >{props.title}
    </h1>
    <h3 style={{
      textAlign: 'center', fontFamily: 'Delius', paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '0px', paddingBottom: '0px'
    }}
    >{props.subtitle}
    </h3>
    <h3 style={{
      textAlign: 'center', fontFamily: 'Delius', paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '0px', paddingBottom: '0px'
    }}
    >{props.subtitle2}
    </h3>
  </div>
);

const Intro = props => (
  <div>
    {}
  </div>
);

export const QuizPage = ({
  uid, 
  index,
  name,
  sex,
  kidName,
  dob,
  ageGroup,
  next,
  back,
  setsection, 
  section1Add,
  sizetop,
  sizebottom,
  characterName,
  mobileNumber,
  address,
  skincolor,
  section2Add,
  votecounts,
  rating,
  stylecounts,
  stylenumbers,
  stylerating,
  comments,
  addComment,
  positiveArray,
  positivecolor,
  subindex,
  subindexdecrement,
  subindexincrement,
  quiz,
  height,
  waist,
  priceList,
  bodyType,
  checkedPrice,
  checkedFabric,
  addStyleNumber,
  addcharacter,
}) => (
  <div>
    <div>
      <MuiThemeProvider>
        <LinearProgress mode="determinate" value={index === 1 ? index * (100 / 9) : (index - 1) * (100 / 9)} />
      </MuiThemeProvider>
    </div>
      
      <div>
        {(() => {
          
        switch (index) {
            case 1:
               {
                 database.ref(`users/${uid}/quiz/comments/value`).once('value').then((snapshot) => {
                  snapshot.forEach((childSnapshot) => { commentValue.push(childSnapshot.val()); });
                  database.ref(`users/${this.state.uid}/quiz/general/index`).set(1);
                  console.log(this.state.uid);
                });
                
                return (
                  <div>
                    {/*<Title title="Welcome!" subtitle="Answer a few quick questions to help us build your kiddo style profile. Once complete, your answers will help your personal Stylists to handpick your products." subtitle2="Have more than one child? You’ll be able to add your other children later." />*/}
                    {/*<Section1 mobileNumber={mobileNumber} characterName={characterName} address={address} height={height} waist={waist} bodyType={bodyType} uid={uid} sex={sex} styles={styles} section1Add={section1Add} name={name} kidName={kidName} dob={dob} />*/}
                    {history.push('/section1')}
                  </div>
                   
                );
              }
            case 3:
                // There may be some problem here if you try to pick from history.
                for (let i = 0; i < votecountKey.length; i += 1) {
                  votecounts.set(votecountKey[i], votecountValue[i]);
                }
                database.ref(`users/${uid}/quiz/general/index`).set(3);
                // Here avoid tops and dresses for boys, and shirts for girls.
                return (
                  <div>
                    {/*<Title title={`How do you want to dress up ${kidName}?`} subtitle2="You may express your like or dislike through buttons or slider" />
                    <Section3 dob={dob} uid={uid} sex={sex} ageGroup={ageGroup} styles={styles} key={index} section={index} rating={rating} votecounts={votecounts} next={next} back={back} comment={comments.get(index)} addComment={addComment} kidName={kidName} />*/}
                     {history.push('/section3')}
                  </div>
                );
            case 4:
                database.ref(`users/${uid}/quiz/general/index`).set(4);
                return (
                  <div>
                   {/* <Title title={`What do you want in the closet for ${kidName}?`} subtitle="To know more about your preference we will ask for more info on what you like." />
                    <Section3 dob={dob} uid={uid} sex={sex} ageGroup={ageGroup} styles={styles} key={index} kidName={kidName} section={index} rating={stylerating} votecounts={stylecounts} next={next} back={back} comment={comments.get(index)} addComment={addComment} />*/}
                
                    {history.push('/section3')}
                    
                  </div>
                  // Have to implement a for each for all of the selected designs.
            );
            // I need to provide size of the array and the current index that is being provided. Based on this, it will be decided whether to print back and next buttons.
            // Using index and size of for the same.
            case 5:
                // Three cases for next and back. These will be dealt inside only. subindexincrement and subindexdecrement are meant for this section only.
                return (
                  <div>
                    <Section3 dob={dob} uid={uid} sex={sex} ageGroup={ageGroup} styles={styles} key={positiveArray[subindex]} styleinstance={positiveArray[subindex]} section={index} kidName={kidName} rating={rating} votecounts={votecounts} next={next} back={back} sizeofmap={positiveArray.length} currentitem={subindex} comment={comments.get(index)} addComment={addComment} subindexdecrement={subindexdecrement} subindexincrement={subindexincrement} subindex={subindex} />
               
                  </div>
                );
            case 6:
                  return (
                     <div>
                      <Title title={`What patterns will ${kidName} wear?`} />
                      <Section3 dob={dob} uid={uid} sex={sex} ageGroup={ageGroup} styles={styles} key={index} kidName={kidName} section={index} rating={rating} votecounts={votecounts} next={next} back={back} comment={comments.get(index)} addComment={addComment} addcharacter={addcharacter} />
                  
                   </div>
            );
            case 7:
                  return (
                    <div>
                      <Title title={`What colours will ${kidName} wear?`} subtitle="Please select flip me in case you want to give preference for colours in more detail." />
                      <Section3 dob={dob} uid={uid} sex={sex} ageGroup={ageGroup} styles={styles} key={index} section={index} kidName={kidName} rating={rating} votecounts={votecounts} back={back} next={next} setsection={setsection} comment={comments.get(index)} addComment={addComment} positivecolor={positivecolor} />
                
                    </div>
            );
            case 8:
              return (
                <div>
                  <Title title="Which labels do you generally shop for?" />
                  <Section3 dob={dob} uid={uid} styles={styles} key={index} kidName={kidName} section={index} rating={rating} votecounts={votecounts} next={next} back={back} comment={comments.get(index)} addComment={addComment} />
            
                </div>
              );
            case 9:
            {
              return (
                <div>
                  <Title title="Help us in sizing." />
                  <Section2 dob={dob} sex={sex} ageGroup={ageGroup} uid={uid} styles={styles} quiz={quiz} section2Add={section2Add} kidName={kidName} votecounts={votecounts} stylecounts={stylecounts} sizetop={sizetop} section={index} sizebottom={sizebottom} priceList={priceList} skincolor={skincolor} back={back} next={next} comment={comments.get(index)} addComment={addComment} characterName={characterName} mobileNumber={mobileNumber} address={address} height={height} waist={waist} bodyType={bodyType} checkedPrice={checkedPrice} checkedFabric={checkedFabric} />
                 
                </div>
              );
            }
            case 10:
            {
              return (
                <div>
                  <Title title="We are almost done here." />
                  <PriceSection dob={dob} sex={sex} ageGroup={ageGroup} uid={uid} styles={styles} quiz={quiz} section2Add={section2Add} kidName={kidName} votecounts={votecounts} stylecounts={stylecounts} sizetop={sizetop} section={index} sizebottom={sizebottom} priceList={priceList} skincolor={skincolor} back={back} next={next} comment={comments.get(index)} addComment={addComment} characterName={characterName} mobileNumber={mobileNumber} address={address} height={height} waist={waist} bodyType={bodyType} checkedPrice={checkedPrice} checkedFabric={checkedFabric}/>
                </div>
              );
            }
            case 11:
            {
              console.log('in quiz page for section 10');
              console.log(comments);
              database.ref(`users/${uid}/quiz/general/section`).set(12);
              return (
                <div>
                  <Title title="Summary of your preferences" subtitle2="Please press back if you want to make any edits. Press complete to submit your response" />
                  <Summary uid={uid} styles={styles} key={index} section={index} rating={rating} votecounts={votecounts} next={next} back={back} comment={comments.get(index)} comments={comments} addComment={addComment} kidName={kidName} stylecounts={stylecounts} stylenumbers={stylenumbers} sex={sex} addStyleNumber={addStyleNumber} />
                </div>
              );
            }
            default:
            {
             return (
                <div className={sex === 'Girl' ? 'box2-layout' : 'box2boy-layout'}>
                  <MediaQuery query="(orientation: landscape)">
                    <div className="box-layout__boxty">
                    <div styles={{ fontFamily: 'Delius', fontSize: '20px'}}>
                       { 'Hey! Thanks for letting us in on your style mantra. Now sit back & relax, while our in-house stylists work up their magic and send a box of spells made, just for you.'} 
                    </div>
                    <div styles={{ fontFamily: 'Delius', fontSize: '20px'}}>
                      {'In case you need any assistance in the meanwhile, contact us here: 98737 72629'}
                    </div>
                </div>
                    </MediaQuery>
                    <MediaQuery query="(orientation: portrait)">
                      <div className="box-layout__boxty">
                        <div styles={{ fontFamily: 'Delius', fontSize: '20px'}}>
                        {'Hey! Thanks for letting us in on your style mantra. Now sit back & relax, while our in-house stylists work up their magic and send a box of spells made, just for you.'} 
                      </div>
                      <br />
                      <div styles={{ fontFamily: 'Delius', fontSize: '20px'}}>
                        {'In case you need any assistance in the meanwhile, contact us here: 98737 72629'}
                      </div>
                      </div>
                    </MediaQuery>
                </div>
              );
              let fbarray = [];
              database.ref('quiz').push(quiz).then(() => { console.log('push completed'); });
              
              quiz.comments.forEach((item, key) => {
                fbarray.push(item.toString() + key.toString());
              });
              
              console.log('converting votecounts to string');
              console.log(quiz.votecounts);
              
              quiz.votecounts.forEach((item, key) => {
                fbarray.push(item.toString() + key.toString());
              });
             
              quiz.stylecounts.forEach((item, key) => {
                fbarray.push(item.toString() + key.toString());
              });
              
              if (quiz.dob) fbarray.push(quiz.dob.toString());
              database.ref('quiz').push(fbarray).then(() => {  console.log('push completed'); });
            }
        }
    })()}
      </div>
  </div>
);

const mapStateToProps = (state) => {
  // console.log('this should come earlier');
  const fbargs = {
    kidName: state.quiz.kidName,
  };
  // fbar = await db.ref(`words/${userId}`).once('value');
  // database.ref(`users/${state.auth.uid}/quiz/general/kidName`).once('value').then( (snapshot) => {
  //   fbargs.kidName = snapshot.val();
  //   // console.log('fb args');
  //   // console.log(fbargs.kidName);
  // });
  return {
    uid: state.auth.uid,
    quiz: state.quiz,
    index: state.quiz.index,
    name: state.quiz.name,
    sex: state.quiz.sex,
    ageGroup: state.quiz.ageGroup,
    kidName: fbargs.kidName,
    dob: state.quiz.dob,
    sizetop: state.quiz.sizetop,
    sizebottom: state.quiz.sizebottom,
    skincolor: state.quiz.skincolor,
    votecounts: state.quiz.votecounts,
    stylecounts: state.quiz.stylecounts,
    stylenumbers: state.quiz.stylenumbers,
    comments: state.quiz.comments,
    subindex: state.quiz.subindex,
    characterName: state.quiz.characterName,
    mobileNumber: state.quiz.mobileNumber,
    address: state.quiz.address,
    height: state.quiz.height,
    waist: state.quiz.waist,
    bodyType: state.quiz.bodyType,
    priceList: state.quiz.priceList,
    checkedPrice: state.quiz.checkedPrice,
    checkedFabric: state.quiz.checkedFabric,

    positiveArray: Array.from(state.quiz.stylecounts.keys(), (x) => {
      if (state.quiz.stylecounts.get(x) > 0 && x !== undefined && x.length > 0) 
        return x;
    }).filter(x => x !== undefined),
    // Note that we had to filter x through the filter method. First way could not work.
    positivecolor: Array.from(state.quiz.votecounts.keys(), (x) => {
      if (state.quiz.votecounts.get(x) > 0 && x !== undefined && x.length > 0 && colorarray.indexOf(x) > -1) {
        return x;
      }
    }).filter(x => x !== undefined),
  };
};

// My naming convention: I will do a different of casing so as not to have the linting error.
const mapDispatchToProps = dispatch => {
  return {
    next: (uid) => dispatch(next(uid)),
    back: () => dispatch(back()),
    setsection: (index) => dispatch(setsection(index)),
    subindexincrement: () => dispatch(subindexincrement()),
    subindexdecrement: () => dispatch(subindexdecrement()),
    section1Add: (uid, name, kidName, dob, sex, ageGroup, mobileNumber) => dispatch(section1Add(uid, name, kidName, dob, sex, ageGroup, mobileNumber)),
    section2Add: (uid, sizetop, sizebottom, characterName, mobileNumber, address, height, waist, bodyType, priceList, checkedPrice, checkedFabric) => dispatch(section2Add(uid, sizetop, sizebottom, characterName, mobileNumber, address, height, waist, bodyType, priceList, checkedPrice, checkedFabric)),
    rating: (uid, selection, votecount) => dispatch(rating(uid, selection, votecount)),
    stylerating: (uid, selection, votecount) => dispatch(stylerating(uid, selection, votecount)),
    addComment: (uid, section, comment) => dispatch(addComment(uid, section, comment)),
    addStyleNumber: (uid, styeinstance, expectedNumber) => dispatch(addStyleNumber(uid, styeinstance, expectedNumber)),
    addcharacter: (uid, characterName) => dispatch(addcharacter(uid, characterName)),
    styles: ()=>dispatch({type: 'STYLES',styles:{
      container: {
        color: '#006aff',
        marginTop: '10px',
        justifyContent: 'right', // Not working.
        alignSelf: 'stretch', // Not working
        alignItems: 'end', // Not working
        textAlign: 'center',
      },
      inner_container: {
      },
      button: {
        background: '$blue',
        display: 'inline-block',
        fontSize: '$font-size-large',
        fontWeight: 300,
        lineHeight: 1,
        padding: '$s-size',
        textDecoration: 'none',
        textAlign: 'center',
        fontFamily: 'Delius',
        paddingTop: '0px',
      },
      muitext: {
        fontFamily: 'Delius',
        textAlign: 'center',
      // text align to center is not working.
      },
      label: {
        fontFamily: 'Delius',
      },
    }}),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
