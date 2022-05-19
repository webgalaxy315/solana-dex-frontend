import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

// Import Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Import Buy Actions
import { productFetchData, buyOrderPostData } from '../actions/buyOrder';

// Declare Styles
const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    flexBasis: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit * 3,
    width: 200,
  },
});

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      quantityWanted: '',
      quantityLabel: 'Quantity',
      quantityError: false,
      buyOrderError: false,
      totalPrice: '',
      selectedProduct: {},
    };
  }

  // Fetch Product Data on Componenet Mount
  componentDidMount() {
    this.props.fetchData('http://localhost:8000/api/products');
  }

  handleClose = () => {
    this.setState({ buyOrderError: false });
  };

  // Function to handle change in Product dropdown menu
  handleChange = event => {
    // Declare Event Target Variables
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    if ([name].toString() === 'name') {
      this.setState(
        {
          selectedProduct: this.props.products[value],
        },
        () => {},
      );
    }
  };

  handlePriceChange = event => {
    const { value } = event.target;

    // If Product not selected from Dropdown OR value is string Return true
    if (!this.state.selectedProduct || isNaN(value)) {
      return true;
    }

    // Declare Variables
    const { price } = this.state.selectedProduct;

    // Set State
    this.setState(
      {
        quantityWanted: value,
      },
      () => {
        this.validateQuantity(value);
        this.setState({ totalPrice: price * this.state.quantityWanted });
      },
    );
  };

  // Function to Validate Value
  validateQuantity = value => {
    if (value > this.state.selectedProduct.quantity) {
      this.setState({
        quantityError: true,
        quantityLabel: `Value can not exceed ${
          this.state.selectedProduct.quantity
        }`,
      });
    } else {
      this.setState({
        quantityError: false,
        quantityLabel: 'Quantity',
      });
    }
  };

  // Function to Post Data
  handlePostOrder = () => {
    const { selectedProduct, quantityWanted } = this.state;

    if (!selectedProduct || quantityWanted === '' || quantityWanted === 0) {
      this.setState({
        buyOrderError: true,
      });
      alert('No Product or Quantity Selected');
      return true;
    }

    let header = {
      user: {
        id: 1,
      },
      product: {
        id: selectedProduct.id,
        price: selectedProduct.price,
      },
      quantityWanted: quantityWanted,
    };
    this.props.postData('http://localhost:8000/api/order', header);
  };

  render() {
    // Declare State and Props Variable
    const { classes, products } = this.props;
    const {
      name,
      quantityWanted,
      totalPrice,
      quantityError,
      quantityLabel,
    } = this.state;

    // Declare Products Selection Component
    // Loops through this.props.prodcuts to display products
    const ProductsSelection = () => (
      <TextField
        select
        id="product"
        name="name"
        value={name}
        onChange={this.handleChange}
        label="Select Product"
        className={classes.textField}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {products.map((product, index) => (
          <MenuItem key={index} value={index}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>
    );

    const NumberFormatCustom = config => {
      const { inputRef, onChange, ...other } = config;

      return (
        <NumberFormat
          {...other}
          ref={inputRef}
          onValueChange={values => {
            onChange({
              target: {
                value: values.value,
              },
            });
          }}
          thousandSeparator
          prefix="$"
        />
      );
    };

    // Declare Price Input
    const PriceInput = () => (
      <TextField
        className={classNames(classes.margin, classes.textField)}
        value={totalPrice}
        disabled
        label="Price"
        name="totalPrice"
        id="product-price"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    );

    return (
      <div className={classes.root}>
        {products.length !== 0 ? (
          <div>
            <ProductsSelection />
            <TextField
              error={quantityError}
              type={'number'}
              inputProps={{
                min: '0',
                max: this.state.selectedProduct.quantity,
              }}
              value={quantityWanted}
              onChange={this.handlePriceChange}
              label={quantityLabel}
              name="quantityWanted"
              id="product-quantity"
              className={classNames(classes.margin, classes.textField)}
            />
            <PriceInput />
            <Button
              onClick={this.handlePostOrder}
              variant="raised"
              color="primary"
              className={classes.button}
            >
              Buy Coin
            </Button>
          </div>
        ) : null}
        {/* <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={buyOrderError}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Please select an order.</span>}
        /> */}
      </div>
    );
  }
}

Buy.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  postData: PropTypes.func.isRequired,
  buyOrder: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    products: state.products,
    buyOrder: state.buyOrder,
    isLoading: state.buyOrderIsLoading,
    hasErrored: state.buyOrderHasErrored,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(productFetchData(url)),
    postData: (url, header) => dispatch(buyOrderPostData(url, header)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Buy),
);
