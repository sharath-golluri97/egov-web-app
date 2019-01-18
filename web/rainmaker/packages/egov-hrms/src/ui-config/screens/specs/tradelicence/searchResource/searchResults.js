import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { sortByEpoch, getEpochForDate } from "../../utils";
import Icon from "@material-ui/core/Icon";
import { LabelContainer } from "mihy-ui-framework/ui-containers";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const getLocalTextFromCode = localCode => {
  return JSON.parse(localStorage.getItem("localization_en_IN")).find(
    item => item.code == localCode
  );
};

export const textToLocalMapping = {
  "Employee ID": get(
    getLocalTextFromCode("HR_COMMON_TABLE_COL_EMP_ID"),
    "message",
    "Employee ID"
  ),
  Name: get(
    getLocalTextFromCode("HR_COMMON_TABLE_COL_NAME"),
    "message",
    "Name"
  ),
  Role: get(
    getLocalTextFromCode("HR_COMMON_TABLE_COL_ROLE"),
    "message",
    "Role"
  ),
  Designation: get(
    getLocalTextFromCode("HR_COMMON_TABLE_COL_DESG"),
    "message",
    "Designation"
  ),
  Department: get(
    getLocalTextFromCode("HR_COMMON_TABLE_COL_DEPT"),
    "message",
    "Department"
  ),
  "Search Results for Employee": get(
    getLocalTextFromCode("HR_HOME_SEARCH_RESULTS_TABLE_HEADING"),
    "message",
    "Search Results for Employee"
  )
};

const selectToolbarStyle = {
  display: "flex",
  alignItems: "center",
  padding: "0 10px"
};

export const searchResults = {
  uiFramework: "custom-molecules-local",
  componentPath: "Table",
  visible: false,
  props: {
    data: [],
    columns: {
      [get(textToLocalMapping, "Employee ID")]: {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>
              <span
                style={{
                  color: "#FE7A51"
                }}
              >
                {rowData[get(textToLocalMapping, "Employee ID")]}
              </span>
            </Link>
          );
        }
      },
      [get(textToLocalMapping, "Name")]: {},
      [get(textToLocalMapping, "Role")]: {},
      [get(textToLocalMapping, "Designation")]: {},
      [get(textToLocalMapping, "Department")]: {}
    },
    title: get(textToLocalMapping, "Search Results for Employee"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: true,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      filterType: "checkbox",
      customToolbarSelect: (selectedRows, displayData, setSelectableRows) => {
        return (
          <Button style={{ color: "#FE7A51" }}>
            <DeleteIcon style={{ color: "#FE7A51" }} />
            DEACTIVATE
          </Button>
        );
      }
    }
    // customSortColumn: {
    //   column: "Application Date",
    //   sortingFn: (data, i, sortDateOrder) => {
    //     const epochDates = data.reduce((acc, curr) => {
    //       acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
    //       return acc;
    //     }, []);
    //     const order = sortDateOrder === "asc" ? true : false;
    //     const finalData = sortByEpoch(epochDates, !order).map(item => {
    //       item.pop();
    //       return item;
    //     });
    //     return { data: finalData, currentOrder: !order ? "asc" : "desc" };
    //   }
    // }
  }
};

const onRowClick = rowData => {
  return `/mihy-ui-framework/tradelicence/apply?employeeID=${
    rowData[get(textToLocalMapping, "Employee ID")]
  }`;
};
