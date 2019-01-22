import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

export const employeeDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Employee Details",
      labelKey: "HR_NEW_EMPLOYEE_FORM_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  employeeDetailsContainer: getCommonContainer({
    employeeName: {
      ...getTextField({
        label: {
          labelName: "Name",
          labelKey: "HR_COMMON_TABLE_COL_NAME"
        },
        placeholder: {
          labelName: "Enter Employee Name",
          labelKey: "HR_EMP_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("TradeName") || null,
        jsonPath: "Employee[0].employeeName"
      })
    },
    employeeID: {
      ...getTextField({
        label: {
          labelName: "Employee ID",
          labelKey: "HR_EMP_ID_LABEL"
        },
        placeholder: {
          labelName: "Enter Employee ID",
          labelKey: "HR_EMP_ID_PLACEHOLDER"
        },
        pattern: getPattern("TradeName") || null,
        jsonPath: "Employee[0].employeeID"
      })
    },
    mobileNumber: {
      ...getTextField({
        label: {
          labelName: "Mobile No.",
          labelKey: "HR_MOB_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "HR_MOB_NO_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("MobileNo"),
        jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber"
      })
    },
    gender: {
      ...getSelectField({
        label: { labelName: "Gender", labelKey: "HR_GENDER_LABEL" },
        placeholder: {
          labelName: "Select Gender",
          labelKey: "HR_GENDER_PLACEHOLDER"
        },
        required: true,
        jsonPath: "Licenses[0].gender",
        props: {
          className: "hr-generic-selectfield",
          data: [
            {
              value: "Male",
              label: "Male"
            },
            {
              value: "Female",
              label: "Female"
            }
          ],
          optionValue: "value",
          optionLabel: "label"
        }
      })
    },
    dateOfAppointment: {
      ...getDateField({
        label: {
          labelName: "Date of Appointment",
          labelKey: "HR_APPT_DATE_LABEL"
        },
        placeholder: {
          labelName: "Enter Date of Appointment",
          labelKey: "HR_APPT_DATE_PLACEHOLDER"
        },
        pattern: getPattern("Date"),
        jsonPath: "Licenses[0].appointmentDate",
        props: {
          // inputProps: {
          //   min: getTodaysDateInYMD(),
          //   max: getFinancialYearDates("yyyy-mm-dd").endDate
          // }
        }
      })
    },

    employeeType: {
      ...getSelectField({
        label: { labelName: "Employee Type", labelKey: "HR_EMP_TYPE_LABEL" },
        placeholder: {
          labelName: "Select Employee Type",
          labelKey: "HR_EMP_TYPE_PLACEHOLDER"
        },
        required: true,
        jsonPath: "Licenses[0].employeeType",
        props: {
          className: "hr-generic-selectfield",
          data: [
            {
              value: "Male",
              label: "Male"
            },
            {
              value: "Female",
              label: "Female"
            }
          ],
          optionValue: "value",
          optionLabel: "label"
        }
      })
    },

    status: {
      ...getSelectField({
        label: { labelName: "Status", labelKey: "HR_STATUS_LABEL" },
        placeholder: {
          labelName: "Select Status",
          labelKey: "HR_STATUS_PLACEHOLDER"
        },
        required: true,
        jsonPath: "Licenses[0].status",
        props: {
          className: "hr-generic-selectfield",
          data: [
            {
              value: "Permanent",
              label: "Permanent"
            },
            {
              value: "Temporary",
              label: "Temporary"
            }
          ],
          optionValue: "value",
          optionLabel: "label"
        }
      })
    },

    role: {
      ...getSelectField({
        label: { labelName: "Role", labelKey: "HR_ROLE_LABEL" },
        placeholder: {
          labelName: "Select Role",
          labelKey: "HR_ROLE_PLACEHOLDER"
        },
        required: true,
        jsonPath: "Licenses[0].role",
        props: {
          className: "hr-generic-selectfield",
          data: [
            {
              value: "JE-1",
              label: "JE-1"
            },
            {
              value: "JE-2",
              label: "JE-2"
            }
          ],
          optionValue: "value",
          optionLabel: "label"
        }
      })
    }
  })
});
