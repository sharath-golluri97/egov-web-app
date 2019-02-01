import {
  getStepperObject,
  getCommonHeader,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { footer } from "./createResource/footer";
import {
  employeeDetails,
  professionalDetails
} from "./createResource/employee-details";
import { jurisdictionDetails } from "./createResource/jurisdiction-details";
import { assignmentDetails } from "./createResource/assignment-details";
import { serviceDetails } from "./createResource/service-details";
import { otherDetails } from "./createResource/other-details";
import set from "lodash/set";
import get from "lodash/get";
import { httpRequest } from "../../../../ui-utils";
import { commonTransform, objectArrayToDropdown } from "../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { getEmployeeData } from "./viewResource/functions";

export const stepsData = [
  { labelName: "Employee Details", labelKey: "HR_NEW_EMPLOYEE_FORM_HEADER" },
  {
    labelName: "Jurisdiction Details",
    labelKey: "HR_JURISDICTION_DETAILS_HEADER"
  },
  { labelName: "Assignment Details", labelKey: "HR_ASSIGN_DET_HEADER" },
  { labelName: "Service Details", labelKey: "HR_SER_DET_HEADER" },
  { labelName: "Other Details", labelKey: "HR_OTHER_DET_HEADER" }
];
export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);
// export const queryValue = getQueryArg(
//   window.location.href,
//   "applicationNumber"
// );

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Create New Employee`,
    labelKey: "HR_COMMON_APPL_NEW_HEADER"
  })
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    employeeDetails,
    professionalDetails
  }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    jurisdictionDetails
  },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {
    assignmentDetails
  },
  visible: false
};

export const formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {
    serviceDetails
  },
  visible: false
};

export const formwizardFifthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form5"
  },
  children: {
    otherDetails
  },
  visible: false
};

const getMdmsData = async (state, dispatch, tenantId) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "Department"
            },
            {
              name: "Designation"
            }
          ]
        },
        {
          moduleName: "ACCESSCONTROL-ROLES",
          masterDetails: [
            {
              name: "roles"
            }
          ]
        },
        {
          moduleName: "egov-location",
          masterDetails: [
            {
              name: "TenantBoundary",
              filter: "$.*.hierarchyType"
            }
          ]
        },
        {
          moduleName: "egov-hrms",
          masterDetails: [
            {
              name: "Degree"
            },
            {
              name: "EmployeeStatus"
            },
            {
              name: "EmployeeType"
            }
          ]
        }
      ]
    }
  };
  try {
    const response = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(
      prepareFinalObject("createScreenMdmsData", get(response, "MdmsRes"))
    );
  } catch (e) {
    console.log(e);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "create",
  // hasBeforeInitAsync:true,
  beforeInitScreen: (action, state, dispatch) => {
    const tenantId = localStorage.getItem("tenant-id");
    getMdmsData(state, dispatch, tenantId);
    let employeeCode = getQueryArg(window.location.href, "employeeCode");
    employeeCode &&
      getEmployeeData(state, dispatch, employeeCode).formwizardFifthStep;
    //   dispatch(prepareFinalObject("Licenses", [{ licenseType: "PERMANENT" }]));
    //   dispatch(prepareFinalObject("LicensesTemp", []));
    //   // getData(action, state, dispatch);
    //   getData(action, state, dispatch).then(responseAction => {
    //     const queryObj = [{ key: "tenantId", value: tenantId }];
    //     getBoundaryData(action, state, dispatch, queryObj);
    //     let props = get(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props",
    //       {}
    //     );
    //     props.value = tenantId;
    //     props.disabled = true;
    //     set(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props",
    //       props
    //     );
    //     dispatch(
    //       prepareFinalObject(
    //         "Licenses[0].tradeLicenseDetail.address.city",
    //         tenantId
    //       )
    //     );
    //     //hardcoding license type to permanent
    //     set(
    //       action.screenConfig,
    //       "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLicenseType.props.value",
    //       "PERMANENT"
    //     );
    //   });

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
        stepper,
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        formwizardFourthStep,
        formwizardFifthStep,
        footer
      }
    }
    // breakUpDialog: {
    //   uiFramework: "custom-containers-local",
    //   componentPath: "ViewBreakupContainer",
    //   props: {
    //     open: false,
    //     maxWidth: "md",
    //     screenKey: "apply"
    //   }
    // }
  }
};

export default screenConfig;
