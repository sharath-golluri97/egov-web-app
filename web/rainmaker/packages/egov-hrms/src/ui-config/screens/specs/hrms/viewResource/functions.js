import get from "lodash/get";
import { createEmployee } from "../../../../..//ui-utils/commons";

export const createApiCall = async (state, dispatch) => {
  let queryObject = [
    {
      key: "tenantId",
      value: JSON.parse(localStorage.getItem("user-info")).tenantId
    }
  ];
  let employeeObject = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee",
    []
  );

  let response = await createEmployee(queryObject, employeeObject);
  console.log("Create========", response);
};
