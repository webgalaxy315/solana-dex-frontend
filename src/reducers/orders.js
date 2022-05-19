export function ordersHasErrored(state = false, action) {
  switch (action.type) {
    case 'ORDER_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function ordersIsLoading(state = false, action) {
  switch (action.type) {
    case 'ORDER_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function orders(state = [], action) {
  switch (action.type) {
    case 'ORDER_FETCH_DATA_SUCCESS':
      return action.orders;

    default:
      return state;
  }
}
