import get from "lodash/get";
import set from "lodash/set";
import { createEmployee } from "../../../../..//ui-utils/commons";

export const createApiCall = async (state, dispatch) => {
  const tenantId = JSON.parse(localStorage.getItem("user-info")).tenantId;
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    }
  ];
  let employeeObject = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee",
    []
  );
  set(employeeObject[0], "tenantId", tenantId);
  set(employeeObject[0], "user.tenantId", tenantId);
  set(employeeObject[0], "jurisdictions[0].tenantId", tenantId);

  let response = await createEmployee(queryObject, employeeObject);
  console.log("Create========", response);
};
