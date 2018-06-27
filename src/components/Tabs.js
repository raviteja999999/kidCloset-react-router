import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: 'red',
  },
  tabsIndicator: {
    backgroundColor: 'red',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 280,
    fontWeight: 50,
   // fontSize : '1.5rem',
    marginRight: 0,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'red',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize : '1.3 rem'
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class CustomizedTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
         
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            //classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<span style = {{color : 'blue',fontSize : '1.5rem'}} >"Tab 1"</span>}
     
    
          />
          <Tab
            disableRipple
            //classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Tab 2"
           
          />
          <Tab
            disableRipple
            //classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Tab 3"
          
          />
        </Tabs>
        <Typography className={classes.typography}>Ant Design UI powered by Material-UI</Typography>
      </div>
    );
  }
}

CustomizedTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTabs);