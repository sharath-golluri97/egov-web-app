import get from "lodash/get";
import set from "lodash/set";
import { createEmployee } from "../../../../..//ui-utils/commons";
import { convertDateToEpoch } from "../../utils";

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
  set(
    employeeObject[0],
    "dateOfAppointment",
    convertDateToEpoch(get(employeeObject[0], "dateOfAppointment"))
  );
  set(
    employeeObject[0],
    "user.dob",
    convertDateToEpoch(get(employeeObject[0], "user.dob"))
  );
  set(
    employeeObject[0],
    "assignments[0].fromDate",
    convertDateToEpoch(get(employeeObject[0], "assignments[0].fromDate"))
  );
  set(
    employeeObject[0],
    "assignments[0].toDate",
    convertDateToEpoch(get(employeeObject[0], "assignments[0].toDate"))
  );
  set(
    employeeObject[0],
    "serviceHistory[0].serviceFrom",
    convertDateToEpoch(get(employeeObject[0], "serviceHistory[0].serviceFrom"))
  );
  set(
    employeeObject[0],
    "serviceHistory[0].serviceTo",
    convertDateToEpoch(get(employeeObject[0], "serviceHistory[0].serviceTo"))
  );

  let response = await createEmployee(queryObject, employeeObject);
  console.log("Create========", response);
};
