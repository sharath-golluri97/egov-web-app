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

const assignmentDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      asmtDetailsCardContainer: getCommonContainer(
        {
          asmtDateContainer: getCommonContainer({
            assignFromDate: {
              ...getDateField({
                label: {
                  labelName: "Assigned From Date",
                  labelKey: "HR_ASMT_FROM_DATE_LABEL"
                },
                placeholder: {
                  labelName: "Assigned From Date",
                  labelKey: "HR_ASMT_FROM_DATE_PLACEHOLDER"
                },
                pattern: getPattern("Date"),
                jsonPath: "EmployeeTemp[0].assignments[0].fromDate",
                props: {
                  // inputProps: {
                  //   min: getTodaysDateInYMD(),
                  //   max: getFinancialYearDates("yyyy-mm-dd").endDate
                  // }
                }
              })
            },
            assignToDate: {
              ...getDateField({
                label: {
                  labelName: "Assigned To Date",
                  labelKey: "HR_ASMT_TO_DATE_LABEL"
                },
                placeholder: {
                  labelName: "Assigned To Date",
                  labelKey: "HR_ASMT_TO_DATE_PLACEHOLDER"
                },
                pattern: getPattern("Date"),
                jsonPath: "EmployeeTemp[0].assignments[0].toDate",
                props: {
                  // inputProps: {
                  //   min: getTodaysDateInYMD(),
                  //   max: getFinancialYearDates("yyyy-mm-dd").endDate
                  // }
                }
              })
            },
            dummyDiv: {
              uiFramework: "custom-atoms",
              componentPath: "Div",
              gridDefination: {
                xs: 12,
                sm: 6
              },

              children: {}
            },
            currentAssignment: {
              uiFramework: "custom-molecules-local",
              componentPath: "SwitchWithLabel",
              props: {
                items: [
                  {
                    label: "Currently Assigned Here"
                  }
                ],
                SwitchProps: {
                  color: "primary"
                }
              }
            }
          }),
          department: {
            ...getSelectField({
              label: {
                labelName: "Department",
                labelKey: "HR_DEPT_LABEL"
              },
              placeholder: {
                labelName: "Select Department",
                labelKey: "HR_DEPT_PLACEHOLDER"
              },
              required: true,
              jsonPath: "EmployeeTemp[0].assignments[0].department",
              props: {
                className: "hr-generic-selectfield",
                data: [
                  {
                    value: "Value 1",
                    label: "Value 1"
                  },
                  {
                    value: "Value 2",
                    label: "Value 2"
                  }
                ],
                optionValue: "value",
                optionLabel: "label"
              }
            })
          },
          designation: {
            ...getSelectField({
              label: { labelName: "Designation", labelKey: "HR_DESG_LABEL" },
              placeholder: {
                labelName: "Select Designation",
                labelKey: "HR_DEPT_PLACEHOLDER"
              },
              required: true,
              jsonPath: "EmployeeTemp[0].assignments[0].designation",
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
          reportingTo: {
            ...getTextField({
              label: {
                labelName: "Reporting To",
                labelKey: "HR_REP_TO_LABEL"
              },
              placeholder: {
                labelName: "Reporting To",
                labelKey: "HR_REP_TO_LABEL"
              },
              pattern: getPattern("TradeName") || null,
              jsonPath: "EmployeeTemp[0].assignments[0].reportingTo"
            })
          },
          headOfDepartmentCont: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            gridDefination: {
              xs: 12,
              sm: 6
            },
            props: {
              style: {
                display: "flex",
                alignItems: "flex-end",
                height: "100%"
              }
            },
            children: {
              headOfDepartment: {
                uiFramework: "custom-molecules-local",
                componentPath: "SwitchWithLabel",
                props: {
                  items: [
                    {
                      label: "Head Of Department"
                    }
                  ],
                  SwitchProps: {
                    color: "primary"
                  }
                }
              }
            }
          }
        },
        {
          style: {
            overflow: "visible"
          }
        }
      )
    }),
    items: [],
    addItemLabel: "ADD ASSIGNMENT",
    headerName: "Jurisdiction",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].assignments",
    prefixSourceJsonPath:
      "children.cardContent.children.tradeUnitCardContainer.children"
  },
  type: "array"
};

export const assignmentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Assignment Details",
      labelKey: "HR_ASSIGN_DET_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  assignmentDetailsCard
});
