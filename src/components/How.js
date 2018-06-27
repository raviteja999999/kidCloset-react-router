import React from 'react';
import Paper from 'material-ui/Paper';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';

const style = {
  height: '70vmin',
  width: '70vmin',
  margin: '5vmin',
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'yellow',
};

const Message = (props) => (
  <div style={{ fontFamily: 'Delius', textAlign: 'center', paddingLeft: '10vmin', paddingRight: '10vmin', paddingTop: '10vmin' }}>
    <Flexbox justifyContent="center" flexDirection="column">
      <p style={{ fontSize: '5vmin'}}>{props.title}</p>
      <p style={{ fontSize: '3vmin'}}>{props.subtitle}</p>
    </Flexbox>
  </div>
);

const How = () => (
  <div style={{ color: 'rgb(255,192,203)' }}>
  <MuiThemeProvider>
    <div style={{ color: 'rgb(255,192,203)' }}>
      <Flexbox flexWrap="wrap" justifyContent="center">
        <Paper
          style={ {...style, backgroundColor: 'rgb(320,320,320)'} }
          zDepth={2}
          circle
        >
          <Message title="Create a style profile for your Kid." subtitle="A quick quiz will help your personal Stylists curate the perfect box for your little one." />
        </Paper>
        <Paper style={ {...style, backgroundColor: 'rgb(250,250,250)'} } zDepth={2} circle>
          <Message title="Get a personalized box delivered." subtitle="10 to 15 options of fine quality and latest clothing will be handpicked just for your child." />
        </Paper>
        <Paper style={ {...style, backgroundColor: 'rgb(240,240,240)'} } zDepth={2} circle>
          <Message title="Pay only for what you keep." subtitle="Keep only what you love and send back the rest with free return shipping. Contact us at 9873-772-629 or ankit@budstrends.com if you have any queries." />
        </Paper>
      </Flexbox>
  </div>
  </MuiThemeProvider>
  </div>
);

export default How;
