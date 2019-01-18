import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../..//ui-utils/commons";
import { convertEpochToDate, convertDateToEpoch } from "../../utils/index";
import { toggleSnackbarAndSetText } from "mihy-ui-framework/ui-redux/app/actions";
import { textToLocalMapping } from "./searchResults";
import { validateFields } from "../../utils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "tenantId",
      value: JSON.parse(localStorage.getItem("user-info")).tenantId
    },
    { key: "limit", value: "200" },
    { key: "offset", value: "0" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchFormValid = validateFields(
    "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!isSearchFormValid) {
    dispatch(
      toggleSnackbarAndSetText(
        true,
        "Please fill valid fields to start search",
        "warning"
      )
    );
  } else if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x === "")
  ) {
    dispatch(
      toggleSnackbarAndSetText(
        true,
        "Please fill at least one field to start search",
        "warning"
      )
    );
  } else {
    // showHideProgress(true, dispatch);
    // const response = await getSearchResults(queryObject);
    const response = {
      Licenses: [
        {
          employeeID: "EMP-JAL-1234",
          name: "Ravinder Pal Singh",
          role: "Accountant",
          designation: "Junior Accountant",
          department: "Administration"
        },
        {
          employeeID: "EMP-JAL-1234",
          name: "Ravinder Pal Singh",
          role: "Accountant",
          designation: "Junior Accountant",
          department: "Administration"
        },
        {
          employeeID: "EMP-JAL-1234",
          name: "Ravinder Pal Singh",
          role: "Accountant",
          designation: "Junior Accountant",
          department: "Administration"
        },
        {
          employeeID: "EMP-JAL-1234",
          name: "Ravinder Pal Singh",
          role: "Accountant",
          designation: "Junior Accountant",
          department: "Administration"
        },
        {
          employeeID: "EMP-JAL-1234",
          name: "Ravinder Pal Singh",
          role: "Accountant",
          designation: "Junior Accountant",
          department: "Administration"
        },
        {
          employeeID: "EMP-JAL-1234",
          name: "Ravinder Pal Singh",
          role: "Accountant",
          designation: "Junior Accountant",
          department: "Administration"
        }
      ]
    };
    try {
      let data = response.Licenses.map(item => ({
        [get(textToLocalMapping, "Employee ID")]: item.employeeID || "-",
        [get(textToLocalMapping, "Name")]: item.name || "-",
        [get(textToLocalMapping, "Role")]: item.role || "-",
        [get(textToLocalMapping, "Designation")]: item.designation || "-",
        [get(textToLocalMapping, "Department")]: item.department || "-"
      }));

      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.title",
          `${textToLocalMapping["Search Results for Employee"]} (${
            response.Licenses.length
          })`
        )
      );
      // showHideProgress(false, dispatch);
      showHideTable(true, dispatch);
    } catch (error) {
      // showHideProgress(false, dispatch);
      dispatch(toggleSnackbarAndSetText(true, error.message, "error"));
      console.log(error);
    }
  }
};
// const showHideProgress = (booleanHideOrShow, dispatch) => {
//   dispatch(
//     handleField(
//       "search",
//       "components.div.children.progressStatus",
//       "visible",
//       booleanHideOrShow
//     )
//   );
// };

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};
