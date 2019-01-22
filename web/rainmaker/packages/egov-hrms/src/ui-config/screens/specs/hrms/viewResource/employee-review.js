import { getCommonCard } from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getEmployeeDetailsView } from "./view-employee-details";
import { getJurisdictionDetailsView } from "./view-jurisdiction-details";
import { getAssignmentDetailsView } from "./view-assignment-details";
import { getOtherDetailsView } from "./view-other-details";
import { hrCommonFooter } from "./footer";

export const employeeReviewDetails = isReview => {
  const viewEmployeeDetails = getEmployeeDetailsView(isReview);
  const viewJurisdictionDetails = getJurisdictionDetailsView(isReview);
  const viewAssignementDetails = getAssignmentDetailsView(isReview);
  const viewOtherDetails = getOtherDetailsView(isReview);
  const footer = isReview ? hrCommonFooter() : {};
  return getCommonCard({
    viewEmployeeDetails,
    viewJurisdictionDetails,
    viewAssignementDetails,
    viewOtherDetails,
    footer
  });
};
