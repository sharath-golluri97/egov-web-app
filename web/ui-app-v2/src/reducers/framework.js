const intialState = {
  specs: {},
  form: {},
  fields: {},
  dropDownData: {},
  moduleAction: "",
  moduleName: "",
  moduleMaster: "",
  loadingStatus: false
};

const framework = (state = intialState, action) => {
  const { type, target } = action;

  switch (type) {
    case "HANDLE_CHANGE":
      const { value } = action;
      return { ...state, form: { ...state.form, [target]: value } };

    case "SET_SPECS":
      const { specs } = action;
      return { ...state, specs };

    case "SET_FORM":
      const { formData } = action;
      return { ...state, form: formData || {} };

    case "SET_FIELD_PROPERTY":
      const { property } = action;
      return { ...state, fields: { ...state.fields, [target]: property } };

    case "SET_ACTION_NAME":
      const { actionName } = action;
      return { ...state, actionName };

    case "SET_MODULE_NAME":
      const { moduleName } = action;
      return { ...state, moduleName };

    case "SET_DROPDOWN_DATA":
      const { dropDownData } = action;
      return {
        ...state,
        dropDownData: { ...state.dropDownData, [target]: dropDownData }
      };

    case "LOADING_STATUS":
      const { loadingStatus } = action.loadingStatus;
      return { ...state, loadingStatus };

    default:
      return state;
  }
};

export default framework;