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

const jurisdictionDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      jnDetailsCardContainer: getCommonContainer(
        {
          hierarchy: {
            ...getSelectField({
              label: { labelName: "Hierarchy", labelKey: "HR_HIERARCHY_LABEL" },
              placeholder: {
                labelName: "Select Hierarchy",
                labelKey: "HR_HIERARCHY_PLACEHOLDER"
              },
              required: true,
              jsonPath: "Employee[0].jurisdictions[0].hierarchy",
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
          boundaryType: {
            ...getSelectField({
              label: {
                labelName: "Boundary Type",
                labelKey: "HR_BOUNDARY_TYPE_LABEL"
              },
              placeholder: {
                labelName: "Select Boundary Type",
                labelKey: "HR_BOUNDARY_TYPE_PLACEHOLDER"
              },
              required: true,
              jsonPath: "Employee[0].jurisdictions[0].boundaryType",
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
          boundary: {
            ...getSelectField({
              label: { labelName: "Boundary", labelKey: "HR_BOUNDARY_LABEL" },
              placeholder: {
                labelName: "Select Boundary",
                labelKey: "HR_BOUNDARY_PLACEHOLDER"
              },
              required: true,
              jsonPath: "Employee[0].jurisdictions[0].boundary",
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
    addItemLabel: "ADD JURISDICTION",
    headerName: "Jurisdiction",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].jurisdictions",
    prefixSourceJsonPath:
      "children.cardContent.children.tradeUnitCardContainer.children"
  },
  type: "array"
};

export const jurisdictionDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Jurisdiction Details",
      labelKey: "HR_JURIS_DET_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  jurisdictionDetailsCard
});
