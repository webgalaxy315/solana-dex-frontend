import { combineReducers } from 'redux';
import { orders, ordersHasErrored, ordersIsLoading } from './orders';
import {
  products,
  buyOrder,
  buyOrderIsLoading,
  buyOrderHasErrored,
} from './buyOrder';

export default combineReducers({
  orders,
  ordersHasErrored,
  ordersIsLoading,
  products,
  buyOrder,
  buyOrderIsLoading,
  buyOrderHasErrored,
});
