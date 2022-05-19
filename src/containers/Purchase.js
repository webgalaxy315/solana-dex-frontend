import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

// Import Material-Ui Components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import BuyIcon from '@material-ui/icons/AddShoppingCart';
import SellIcon from '@material-ui/icons/RemoveShoppingCart';
import { withStyles } from '@material-ui/core/styles';

// Import Buy and Sell Components
import Buy from '../componenets/Buy';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 350,
  },
});

class Purchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  // Function To Handle Tab Change
  handleChange = (event, value) => {
    this.setState({ value });
  };

  // Function To Handle Swipeable view change
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    // Declare State and Props Variables
    const { classes, theme } = this.props;
    const { value } = this.state;

    // Declare Tab Container Component, takes in child node, and swipe direction
    const TabContainer = ({ children, dir }) => {
      return (
        <div dir={dir} style={{ padding: 8 * 3 }}>
          {children}
        </div>
      );
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab icon={<BuyIcon />} label="BUY" />
            <Tab icon={<SellIcon />} label="SELL" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Buy />
          </TabContainer>
          <TabContainer dir={theme.direction}>Sell Stuff</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

// Declare Prop Types
Purchase.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Purchase);
