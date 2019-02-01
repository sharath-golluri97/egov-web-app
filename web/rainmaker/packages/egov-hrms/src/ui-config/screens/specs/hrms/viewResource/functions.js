import get from "lodash/get";
import set from "lodash/set";
import {
  createEmployee,
  updateEmployee,
  getSearchResults
} from "../../../../..//ui-utils/commons";
import { convertDateToEpoch } from "../../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { epochToYmdDate } from "../../utils";

// SET ALL SIMPLE DATES IN YMD FORMAT
const setDateInYmdFormat = (obj, values) => {
  values.forEach(element => {
    set(obj, element, epochToYmdDate(get(obj, element)));
  });
};

// SET ALL MULTIPLE OBJECT DATES IN YMD FORMAT
const setAllDatesInYmdFormat = (obj, values) => {
  values.forEach(element => {
    let elemObject =
      get(obj, `${element.object}`, []) === null
        ? []
        : get(obj, `${element.object}`, []);
    for (let i = 0; i < elemObject.length; i++) {
      element.values.forEach(item => {
        set(
          obj,
          `${element.object}[${i}].${item}`,
          epochToYmdDate(get(obj, `${element.object}[${i}].${item}`))
        );
      });
    }
  });
};

export const furnishEmployeeData = (state, dispatch) => {
  let employeeObject = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee",
    []
  );
  setDateInYmdFormat(employeeObject[0], ["dateOfAppointment", "user.dob"]);
  setAllDatesInYmdFormat(employeeObject[0], [
    { object: "assignments", values: ["fromDate", "toDate"] },
    { object: "serviceHistory", values: ["serviceFrom", "serviceTo"] }
  ]);
  dispatch(prepareFinalObject("Employee", employeeObject));
};

export const handleCreateUpdateEmployee = (state, dispatch) => {
  let uuid = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee[0].uuid",
    null
  );
  if (uuid) {
    updateApiCall(state, dispatch);
  } else {
    createApiCall(state, dispatch);
  }
};

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

export const updateApiCall = async (state, dispatch) => {
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
  let response = await updateEmployee(queryObject, employeeObject);
  console.log("Update========", response);
};

export const getEmployeeData = async (state, dispatch, employeeId) => {
  let queryObject = [
    {
      key: "codes",
      value: employeeId
    }
  ];
  let response = await getSearchResults(queryObject);
  dispatch(prepareFinalObject("Employee", get(response, "Employees")));
  furnishEmployeeData(state, dispatch);
};
