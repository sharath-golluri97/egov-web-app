import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../createResource/footer";

export const getEmployeeDetailsView = (isReview = true) => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelName: "Employee Details",
            labelKey: "HR_NEW_EMPLOYEE_FORM_HEADER"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isReview,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "HR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              changeStep(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    viewOne: getCommonContainer({
      reviewName: getLabelWithValue(
        {
          labelName: "Name",
          labelKey: "HR_COMMON_TABLE_COL_NAME"
        },
        {
          labelName: "Ravi Verma"
        }
        //   { jsonPath: "Employee[0].user.name" }
      ),
      reviewEmpID: getLabelWithValue(
        {
          labelName: "Employee ID",
          labelKey: "HR_EMP_ID_LABEL"
        },
        {
          labelName: "324244"
        }
        //   { jsonPath: "Employee[0].id" }
      ),
      reviewMobile: getLabelWithValue(
        { labelName: "Mobile No", labelKey: "HR_MOB_NO_LABEL" },
        { labelName: "9611046140" }
        // {jsonPath: "Employee[0].user.mobileNumber"}
      ),
      reviewGender: getLabelWithValue(
        { labelName: "Gender", labelKey: "HR_GENDER_LABEL" },
        { labelName: "9611046140" }
        // {
        //   jsonPath: "Employee[0].user.gender",
        // }
      ),
      reviewDOA: getLabelWithValue(
        { labelName: "Date of Appointment", labelKey: "HR_APPT_DATE_LABEL" },
        { labelName: "12/12/2018" }
        // {
        //   jsonPath: "Employee[0].dateOfAppointment",
        // }
      ),
      reviewEmpType: getLabelWithValue(
        { labelName: "Employee Type", labelKey: "HR_EMP_TYPE_LABEL" },
        { labelName: "Temporary" }
        // {
        //   jsonPath: "Employee[0].employeeType",
        // }
      ),
      reviewStatus: getLabelWithValue(
        { labelName: "Status", labelKey: "HR_STATUS_LABEL" },
        { labelName: "Active" }
        // {
        //   jsonPath: "Employee[0].employeeStatus",
        // }
      ),
      reviewRole: getLabelWithValue(
        { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
        { labelName: "JE-1" }
        // {
        //   jsonPath: "Employee[0].user.role",
        // }
      )
    })
  });
};
