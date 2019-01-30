import {
  getCommonHeader,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { employeeReviewDetails } from "./viewResource/employee-review";
import { hrViewFooter } from "./viewResource/footer";
import { searchApiCall } from "./viewResource/functions";

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `View Employee Information`,
    labelKey: "HR_VIEW_HEADER"
  })
});

const tradeView = employeeReviewDetails(false);

const screenConfig = {
  uiFramework: "material-ui",
  name: "view",
  beforeInitScreen: (action, state, dispatch) => {
    searchApiCall(state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        tradeView,
        footer: hrViewFooter()
      }
    },
    deactivateEmployee: {
      uiFramework: "custom-molecules-local",
      componentPath: "ActionDialog",
      props: {
        open: false
      },
      type: "array"
    }
  }
};

export default screenConfig;
