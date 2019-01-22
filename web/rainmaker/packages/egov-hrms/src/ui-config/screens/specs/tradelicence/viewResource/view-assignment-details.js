import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "../applyResource/footer";

const assignmentCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: getCommonGrayCard({
      assignmentCardContainer: getCommonContainer({
        reviewAssignedFrom: getLabelWithValue(
          {
            labelName: "Assigned From Date",
            labelKey: "HR_ASMT_FROM_DATE_LABEL"
          },
          {
            labelName: "23/01/2018"
          }
          //   { jsonPath: "Licenses[0].licenseType" }
        ),
        reviewAssignedTo: getLabelWithValue(
          {
            labelName: "Assigned To Date",
            labelKey: "HR_ASMT_TO_DATE_LABEL"
          },
          {
            labelName: "23/01/2019"
          }
          //   { jsonPath: "Licenses[0].tradeName" }
        ),
        reviewCurrentAssigned: getLabelWithValue(
          {
            labelName: "Currently Assigned Here",
            labelKey: "HR_CURR_ASSIGN_LABEL"
          },
          { labelName: "Yes" }
          // {jsonPath: "Licenses[0].validFrom"}
        ),
        reviewDepartment: getLabelWithValue(
          { labelName: "Department", labelKey: "HR_DEPT_LABEL" },
          { labelName: "IT" }
          // {
          //   jsonPath: "Licenses[0].validTo",
          //   callBack: convertEpochToDate
          // }
        ),
        reviewDesignation: getLabelWithValue(
          { labelName: "Designation", labelKey: "HR_DESG_LABEL" },
          { labelName: "Junior Engineer" }
          // {
          //   jsonPath: "Licenses[0].validTo",
          //   callBack: convertEpochToDate
          // }
        ),
        reviewReportTo: getLabelWithValue(
          { labelName: "Reporting To", labelKey: "HR_REP_TO_LABEL" },
          { labelName: "Rahul Dev" }
          // {
          //   jsonPath: "Licenses[0].validTo",
          //   callBack: convertEpochToDate
          // }
        ),
        reviewHOD: getLabelWithValue(
          { labelName: "Head of Department", labelKey: "HR_HOD_LABEL" },
          { labelName: "Yes" }
          // {
          //   jsonPath: "Licenses[0].validTo",
          //   callBack: convertEpochToDate
          // }
        )
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.accessories",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

export const getAssignmentDetailsView = (isReview = true) => {
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
            labelName: "Assignment Details",
            labelKey: "HR_ASSIGN_DET_HEADER"
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
    viewOne: assignmentCard
  });
};
