import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

const serviceDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      serDetailsCardContainer: getCommonContainer(
        {
          status: {
            ...getSelectField({
              label: {
                labelName: "Status",
                labelKey: "HR_STATUS_LABEL"
              },
              placeholder: {
                labelName: "Select Status",
                labelKey: "HR_STATUS_PLACEHOLDER"
              },
              jsonPath: "Employee[0].serviceHistory[0].serviceStatus",
              gridDefination: {
                xs: 12,
                sm: 4
              },
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
          serviceFromDate: {
            ...getDateField({
              label: {
                labelName: "Service From Date",
                labelKey: "HR_SER_FROM_DATE_LABEL"
              },
              placeholder: {
                labelName: "Service From Date",
                labelKey: "HR_SER_FROM_DATE_LABEL"
              },
              pattern: getPattern("Date"),
              jsonPath: "Employee[0].serviceHistory[0].serviceFrom",
              gridDefination: {
                xs: 12,
                sm: 4
              },
              props: {
                // inputProps: {
                //   min: getTodaysDateInYMD(),
                //   max: getFinancialYearDates("yyyy-mm-dd").endDate
                // }
              }
            })
          },
          serviceToDate: {
            ...getDateField({
              label: {
                labelName: "Service To Date",
                labelKey: "HR_SER_TO_DATE_LABEL"
              },
              placeholder: {
                labelName: "Service To Date",
                labelKey: "HR_SER_TO_DATE_LABEL"
              },
              pattern: getPattern("Date"),
              jsonPath: "Employee[0].serviceHistory[0].serviceTo",
              gridDefination: {
                xs: 12,
                sm: 4
              },
              props: {
                // inputProps: {
                //   min: getTodaysDateInYMD(),
                //   max: getFinancialYearDates("yyyy-mm-dd").endDate
                // }
              }
            })
          },
          location: {
            ...getSelectField({
              label: {
                labelName: "Location",
                labelKey: "HR_LOCATION_LABEL"
              },
              placeholder: {
                labelName: "Select Location",
                labelKey: "HR_LOCATION_PLACEHOLDER"
              },
              jsonPath: "Employee[0].serviceHistory[0].location",
              gridDefination: {
                xs: 12,
                sm: 4
              },
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
          orderNo: {
            ...getTextField({
              label: {
                labelName: "Order No",
                labelKey: "HR_ORDER_NO_LABEL"
              },
              placeholder: {
                labelName: "Enter Order No",
                labelKey: "HR_ORDER_NO_PLACEHOLDER"
              },
              pattern: getPattern("TradeName") || null,
              jsonPath: "Employee[0].serviceHistory[0].orderNo"
            }),
            gridDefination: {
              xs: 12,
              sm: 4
            }
          },
          currentWorkCont: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            gridDefination: {
              xs: 12,
              sm: 4
            },
            props: {
              style: {
                display: "flex",
                alignItems: "flex-end",
                height: "100%"
              }
            },
            children: {
              currentlyWorkingHere: {
                uiFramework: "custom-molecules-local",
                componentPath: "SwitchWithLabel",
                props: {
                  items: [
                    {
                      label: "Currently Working Here"
                    }
                  ],
                  SwitchProps: {
                    color: "primary"
                  },
                  jsonPath: "Employee[0].serviceHistory[0].isCurrentPosition"
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
    addItemLabel: "ADD SERVICE ENTRY",
    headerName: "Service",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].serviceDetails",
    prefixSourceJsonPath:
      "children.cardContent.children.tradeUnitCardContainer.children"
  },
  type: "array"
};

export const serviceDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Service Details",
      labelKey: "HR_SER_DET_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  serviceDetailsCard
});
