import * as actionTypes from "./actionTypes";
import get from "lodash/get";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  reopenValidChecker: "",
  specs: {},
  data: {},
};

const mdmsReducer = (state = initialState, action) => {
  const { type, moduleName, masterName } = action;
  switch (type) {
    case actionTypes.SPECS_FETCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case actionTypes.DATA_FETCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case actionTypes.SPECS_FETCH_COMPLETE:
      return {
        ...state,
        loading: false,
        specs: {
          [moduleName]: {
            ...state[moduleName],
            [masterName]: action.payload,
          },
        },
      };
    case actionTypes.DATA_FETCH_COMPLETE:
      return {
        ...state,
        loading: false,
        data: {
          [moduleName]: {
            ...state[moduleName],
            [masterName]: action.payload.MdmsRes[moduleName][masterName],
          },
        },
        moduleName,
        masterName,
      };
    case actionTypes.SPECS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case actionTypes.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case actionTypes.REOPEN_PGR_COMPLAINT_TIME:
      return {
        ...state,
        reopenValidChecker: action.timeLimit
      }
    default:
      return state;
  }
};

export default mdmsReducer;
