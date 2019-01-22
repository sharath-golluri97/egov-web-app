import {
  getStepperObject,
  getCommonHeader,
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getCommonParagraph
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { employeeReviewDetails } from "./viewResource/employee-review";

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Create New Employee - Summary`,
    labelKey: "HR_SUMMARY_HEADER"
  })
});

const tradeReview = employeeReviewDetails(true);

const screenConfig = {
  uiFramework: "material-ui",
  name: "review",
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
        tradeReview
      }
    }
  }
};

export default screenConfig;
