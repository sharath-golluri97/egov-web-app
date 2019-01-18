import * as actionTypes from "./actionTypes";

const initialState = {
  name: "MIHY",
  route: "",
  previousRoute: "",
  toast: {
    message: "",
    open: false,
    errorType: ""
  },
  spinner: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROUTE:
      return {
        ...state,
        previousRoute: action.route
          ? window.location.pathname
          : state.previousRoute,
        route: action.route
      };
    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: {
          message: action.message,
          open: action.open,
          errorType: action.errorType
        }
      };
    case actionTypes.TOGGLE_SPINNER:
      return {
        ...state,
        spinner: !state.spinner
      };
    default:
      return state;
  }
};
export default appReducer;
