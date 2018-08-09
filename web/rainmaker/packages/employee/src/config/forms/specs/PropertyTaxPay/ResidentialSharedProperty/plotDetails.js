import { MDMS } from "egov-ui-kit/utils/endPoints";
import { measuringUnit, occupancy, subUsageType, beforeInitFormForPlot } from "../utils/reusableFields";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";

const formConfig = {
  name: "plotDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMajor",
      type: "textfield",
      floatingLabelText: "PT_FORM2_USAGE_TYPE",
      value: "Residential",
      required: true,
      disabled: true,
      numcols: 4,
    },
    ...subUsageType,
    ...occupancy,
    superArea: {
      id: "assessment-super-area",
      jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
      type: "number",
      floatingLabelText: "Total Super Built-up Area",
      hintText: "Enter Super Built-up Area",
      ErrorText: "Can be maximimum 8 digits",
      toolTip: true,
      toolTipMessage: "Total Carpet Area + Total balcony area + Total thickness of outer walls + Total common area (lift, stairs, lobby etc.)",
      required: true,
      pattern: "^([0-9]){0,8}$",
      numcols: 4,
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFormData("Properties[0].propertyDetails[0].units[0].unitArea", field.value));
      },
    },
    ...measuringUnit,
  },
  isFormValid: false,
  ...beforeInitFormForPlot,
};

export default formConfig;