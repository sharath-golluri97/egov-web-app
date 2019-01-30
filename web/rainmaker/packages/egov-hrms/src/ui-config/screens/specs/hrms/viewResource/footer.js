import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import { ifUserRoleExists } from "../../utils";
import { toggleDeactivateDialog } from "../../utils";
import { createApiCall } from "./functions";

const getCommonCreateFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const hrCommonFooter = () => {
  // const purpose = "create";
  // const status = "success";
  // const applicationNo = "EMP-JAL-123";
  // const tenantId = "pb.amritsar";
  // const redirectionURL = `/mihy-ui-framework/hrms/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&tenantId=${tenantId}`;
  return getCommonCreateFooter({
    submitButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        submitButtonLabel: getLabel({
          labelName: "SUBMIT",
          labelKey: "HR_SUBMIT_LABEL"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: createApiCall
      }
    }
  });
};

export const hrViewFooter = () => {
  return getCommonCreateFooter({
    deactivateEmployee: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        deactivateEmployeeButtonLabel: getLabel({
          labelName: "DEACTIVATE EMPLOYEE",
          labelKey: "HR_DEACTIVATE_EMPLOYEE_LABEL"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: toggleDeactivateDialog
      }
    },
    editDetails: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        editDetailsButtonLabel: getLabel({
          labelName: "EDIT DETAILS",
          labelKey: "HR_EDIT_DETAILS_LABEL"
        }),
        editDetailsButtonIcon: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "keyboard_arrow_right"
          }
        }
      }
    }
  });
};
