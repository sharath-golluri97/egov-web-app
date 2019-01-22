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

import { getUploadFilesMultiple } from "../../utils";

export const otherDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Other Details",
      labelKey: "HR_OTHER_DET_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),

  educationQualification: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: getCommonGrayCard({
        header: getCommonSubHeader(
          {
            labelName: "Education Qualification",
            labelKey: "HR_ED_QUAL_HEADER"
          },
          {
            style: {
              marginBottom: 18
            }
          }
        ),
        serDetailsCardContainer: getCommonContainer(
          {
            degree: {
              ...getSelectField({
                label: {
                  labelName: "Degree",
                  labelKey: "HR_DEGREE_LABEL"
                },
                placeholder: {
                  labelName: "Select Degree",
                  labelKey: "HR_DEGREE_PLACEHOLDER"
                },
                jsonPath:
                  "EmployeeTemp[0].otherDetails.educationDetails[0].degree",
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
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
            year: {
              ...getSelectField({
                label: {
                  labelName: "Year",
                  labelKey: "HR_YEAR_LABEL"
                },
                placeholder: {
                  labelName: "Select Year",
                  labelKey: "HR_YEAR_PLACEHOLDER"
                },
                jsonPath:
                  "EmployeeTemp[0].otherDetails.educationDetails[0].year",
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
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
            university: {
              ...getSelectField({
                label: {
                  labelName: "University",
                  labelKey: "HR_UNIVERSITY_LABEL"
                },
                placeholder: {
                  labelName: "Select University",
                  labelKey: "HR_UNIVERSITY_PLACEHOLDER"
                },
                jsonPath:
                  "EmployeeTemp[0].otherDetails.educationDetails[0].university",
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
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
            stream: {
              ...getSelectField({
                label: {
                  labelName: "Stream",
                  labelKey: "HR_STREAM_LABEL"
                },
                placeholder: {
                  labelName: "Select Stream",
                  labelKey: "HR_STREAM_PLACEHOLDER"
                },
                jsonPath:
                  "EmployeeTemp[0].otherDetails.educationDetails[0].stream",
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
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
            remarks: {
              ...getTextField({
                label: {
                  labelName: "Remarks",
                  labelKey: "HR_REMARKS_LABEL"
                },
                placeholder: {
                  labelName: "Enter Remarks",
                  labelKey: "HR_REMARKS_PLACEHOLDER"
                },
                pattern: getPattern("TradeName") || null,
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
                jsonPath:
                  "EmployeeTemp[0].otherDetails.educationDetails[0].remarks"
              })
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
      addItemLabel: "ADD QUALIFICATIONS",
      headerName: "Education Qualification",
      headerJsonPath:
        "children.cardContent.children.header.children.head.children.Accessories.props.label",
      sourceJsonPath: "Employee[0].otherDetails.educationDetails",
      prefixSourceJsonPath:
        "children.cardContent.children.tradeUnitCardContainer.children"
    },

    type: "array"
  },
  departmentDetails: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: getCommonGrayCard({
        header: getCommonSubHeader(
          {
            labelName: "Department Test Details",
            labelKey: "HR_DEPT_TEST_HEADER"
          },
          {
            style: {
              marginBottom: 18
            }
          }
        ),
        serDetailsCardContainer: getCommonContainer(
          {
            testName: {
              ...getSelectField({
                label: {
                  labelName: "Test Name",
                  labelKey: "HR_TEST_NAME_LABEL"
                },
                placeholder: {
                  labelName: "Select Test Name",
                  labelKey: "HR_TEST_NAME_PLACEHOLDER"
                },
                jsonPath:
                  "EmployeeTemp[0].otherDetails.deptTestDetails[0].testName",
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
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
            year: {
              ...getSelectField({
                label: {
                  labelName: "Year",
                  labelKey: "HR_YEAR_LABEL"
                },
                placeholder: {
                  labelName: "Select Year",
                  labelKey: "HR_YEAR_PLACEHOLDER"
                },
                jsonPath:
                  "EmployeeTemp[0].otherDetails.deptTestDetails[0].year",
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
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
            remarks: {
              ...getTextField({
                label: {
                  labelName: "Remarks",
                  labelKey: "HR_REMARKS_LABEL"
                },
                placeholder: {
                  labelName: "Enter Remarks",
                  labelKey: "HR_REMARKS_PLACEHOLDER"
                },
                pattern: getPattern("TradeName") || null,
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
                jsonPath:
                  "EmployeeTemp[0].otherDetails.deptTestDetails[0].remarks"
              })
            },
            uploadFile: getUploadFilesMultiple(
              "Employee[0].deptTestDetails[0].documents"
            )
          },
          {
            style: {
              overflow: "visible"
            }
          }
        )
      }),
      items: [],
      addItemLabel: "ADD TEST",
      headerName: "Department Test Details",
      headerJsonPath:
        "children.cardContent.children.header.children.head.children.Accessories.props.label",
      sourceJsonPath: "Employee[0].serviceDetails",
      prefixSourceJsonPath:
        "children.cardContent.children.tradeUnitCardContainer.children"
    },
    type: "array"
  }
});

// export const otherDetails = getCommonCard({
//   header: getCommonTitle(
//     {
//       labelName: "Other Details",
//       labelKey: "HR_OTHER_DET_HEADER"
//     },
//     {
//       style: {
//         marginBottom: 18
//       }
//     }
//   ),
//   otherDetailsCard
// });
