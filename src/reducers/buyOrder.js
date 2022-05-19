export function buyOrderHasErrored(state = false, action) {
  switch (action.type) {
    case 'BUY_ORDER_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function buyOrderIsLoading(state = false, action) {
  switch (action.type) {
    case 'BUY_ORDER_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function buyOrder(state = false, action) {
  switch (action.type) {
    case 'BUY_ORDER_POST_DATA_SUCCESS':
      return action.isSuccess;

    default:
      return state;
  }
}

export function products(state = [], action) {
  switch (action.type) {
    case 'PRODUCT_FETCH_DATA_SUCCESS':
      return action.products;

    default:
      return state;
  }
}
