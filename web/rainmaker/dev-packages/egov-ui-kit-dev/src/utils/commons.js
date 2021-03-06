import set from "lodash/set";
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import { httpRequest } from "egov-ui-kit/utils/api";
import { TENANT } from "egov-ui-kit/utils/endPoints";
import commonConfig from "config/common.js";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import get from "lodash/get";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";

export const statusToMessageMapping = {
  rejected: "Rejected",
  closed: "Closed",
  open: "Opened",
  "re-assign": "Re-assigned",
  assigned: "Assigned",
  resolved: "Resolved",
  reassignrequested: "Re-assign Requested",
};

//status messages in home page and my complaints page
export const statusToLocalisationKeyMapping = {
  rejected: "CS_COMMON_STATUS_REJECTED",
  closed: "CS_COMMON_STATUS_CLOSED",
  open: "CS_COMMON_STATUS_SUBMITTED",
  reopened: "CS_COMMON_STATUS_REOPENED",
  reassigned: "CS_COMMON_STATUS_REASSIGNED",
  assigned: "CS_COMMON_STATUS_ASSIGNED",
  resolved: "CS_COMMON_STATUS_RESOLVED",
  reassignrequested: "CS_COMMON_STATUS_REASSIGN_REQUESTED",
};

export const displayStatus = (status) => {
  return status ? statusToMessageMapping[status && status.toLowerCase()] : "";
};

export const displayLocalizedStatusMessage = (status) => {
  return status ? statusToLocalisationKeyMapping[status && status.toLowerCase()] : "";
};
export const transformById = (payload, id) => {
  return (
    payload &&
    payload.reduce((result, item) => {
      if (!item.hasOwnProperty("active") || (item.hasOwnProperty("active") && item.active)) {
        result[item[id]] = {
          ...item,
        };
      }

      return result;
    }, {})
  );
};

export const hyphenSeperatedDateTime = (d) => {
  return d;
};

export const getQueryArg = (url, name) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const addQueryArg = (url, queries = []) => {
  const urlParts = url.split("?");
  const path = urlParts[0];
  let queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach((query) => {
    const key = query.key;
    const value = query.value;
    const newQuery = `${key}=${value}`;
    queryParts.push(newQuery);
  });
  const newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

export const isFieldEmpty = (field) => {
  if (field === undefined || field === null) {
    return true;
  }
  if (typeof field !== "object") {
    field = field.toString().trim();
    return isEmpty(field);
  }
  return false;
};

export const slugify = (term) => {
  return term.toLowerCase().replace(/\s+/, "-");
};

export const persistInLocalStorage = (obj) => {
  Object.keys(obj).forEach((objKey) => {
    const objValue = obj[objKey];
    window.localStorage.setItem(objKey, objValue);
  }, this);
};

export const fetchFromLocalStorage = (key) => {
  return window.localStorage.getItem(key) || null;
};

export const getRequestUrl = (url, params) => {
  let query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  return url + "?" + query;
};

export const prepareForm = (params) => {
  let formData = new FormData();
  for (var k in params) {
    formData.append(k, params[k]);
  }
  return formData;
};

const getMonthName = (monthIndex) => {
  switch (monthIndex) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "";
  }
};

const getCurrLocation = () => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currLoc = {};
        currLoc.lat = position.coords.latitude.toFixed(6);
        currLoc.lng = position.coords.longitude.toFixed(6);
        resolve(currLoc);
      });
    }
  });
};

export const getCurrentAddress = async () => {
  var currLoc = await getCurrLocation();
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currLoc.lat},${currLoc.lng}&key=${commonConfig.MAP_API_KEY}`;
  try {
    return axios.get(url).then((res) => {
      if (res.data.status === "OK") {
        if (res.data.results[0]) {
          var currAddress = {};
          currAddress.lat = currLoc.lat;
          currAddress.lng = currLoc.lng;
          currAddress.address = res.data.results[0].formatted_address;
          return currAddress;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const mapCompIDToName = (IDObj, compID) => {
  return IDObj[compID] ? IDObj[compID].serviceCode : "Default";
};

export const getDateFromEpoch = (epoch) => {
  const dateObj = new Date(epoch);
  const year = dateObj
    .getFullYear()
    .toString()
    .slice(2, 4);
  const month = getMonthName(dateObj.getMonth() + 1);
  const day = dateObj.getDate();
  return day + "-" + month + "-" + year;
};

export const getBodyClassFromPath = (path) => {
  let bodyClass = path
    .split("/")
    .filter((part) => part.trim().length > 0)
    .join("-");
  return bodyClass;
};

// remove the previous tokens; temp fix
// forEach not present in the prototype chain of some older browsers
export const addBodyClass = (path) => {
  const bodyClass = getBodyClassFromPath(path);
  try {
    document.body.classList.forEach((className) => document.body.classList.remove(className));
    bodyClass && document.body.classList.add(bodyClass);
  } catch (error) {}
};

export const prepareFormData = (form) => {
  const formFields = form.fields;
  return Object.keys(formFields).reduce((formData, fieldKey) => {
    const { file, jsonPath } = formFields[fieldKey];
    let { value } = formFields[fieldKey];
    if (file) {
      value = ((form.files && form.files[fieldKey]) || []).map((fieldFile) => fieldFile.fileStoreId);
    }
    return set(formData, jsonPath, value);
  }, {});
};

export const getTranslatedLabel = (labelKey, localizationLabels) => {
  let translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && typeof translatedLabel === "object" && translatedLabel.hasOwnProperty("message"))
      translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

export const fetchImages = (actionArray) => {
  let imageArray = [];
  actionArray.forEach((action, index) => {
    action.action === "open" && action.media && imageArray.push(action.media);
  });
  return imageArray[0] ? imageArray[0] : [];
};

export const getUserInfo = () => {
  let userInfo = localStorage.getItem("user-info");
  try {
    userInfo = JSON.parse(userInfo);
  } catch (error) {
    userInfo = null;
  }
  return userInfo;
};

export const getCityNameByCode = (code, cities) => {
  const city = (cities || []).filter((city) => city.key === code);
  return (city && city.length && city[0].text) || "";
};

export const isImage = (url) => {
  const acceptedImageTypes = ["jpg", "jpeg", "png"];
  const urlParts = url && url.split("?");
  const imageType = urlParts && urlParts.length && urlParts[0].split(".") && urlParts[0].split(".").length && urlParts[0].split(".").pop();
  return (imageType && acceptedImageTypes.indexOf(imageType) !== -1) || false;
};

//using in Employee Screens

const dateDiffInDays = (a, b) => {
  var millsPerDay = 1000 * 60 * 60 * 24;
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / millsPerDay);
};

// export const getCommaSeperatedAddress = (buildingName, street) => {
//   return buildingName && street ? `${buildingName}, ${street}` : "NA";
// };

export const getTransformedStatus = (status) => {
  let transformedStatus = "";
  switch (status && status.toLowerCase()) {
    case "open":
    case "new":
    case "reassignrequested":
      transformedStatus = "UNASSIGNED";
      break;
    case "resolved":
    case "rejected":
    case "closed":
      transformedStatus = "CLOSED";
      break;
    case "assigned":
      transformedStatus = "ASSIGNED";
      break;
    default:
      transformedStatus = "UNASSIGNED";
      break;
  }
  return transformedStatus;
};

export const getFileSize = (file) => {
  const size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

export const isFileImage = (file) => {
  const mimeType = file["type"];
  return (mimeType && mimeType.split("/")[0] == "image") || false;
};

export const getNameFromId = (obj, id, defaultValue) => {
  return obj && id && obj[id] ? obj[id].name : defaultValue;
};

export const getPropertyFromObj = (obj, id, property, defaultValue) => {
  return obj && obj[id] ? obj[id][property] : defaultValue;
};

export const returnSLAStatus = (slaHours, submittedTime) => {
  const millsToAdd = slaHours * 60 * 60 * 1000;
  const toBeFinishedBy = millsToAdd + submittedTime;
  let slaStatement = "";
  const daysCount = dateDiffInDays(new Date(Date.now()), new Date(toBeFinishedBy));
  if (daysCount < 0) {
    slaStatement = Math.abs(daysCount) === 1 ? `Overdue by ${Math.abs(daysCount)} day` : `Overdue by ${Math.abs(daysCount)} days`;
  } else {
    slaStatement = Math.abs(daysCount) === 1 ? `${Math.abs(daysCount)} day left` : `${Math.abs(daysCount)} days left`;
  }
  return {
    slaStatement,
    daysCount,
  };
};

export const getCommaSeperatedAddress = (address, cities) => {
  let name = address && address.locality && address.locality.name ? address.locality.name : "";
  let cityName = address && address.city ? address.city : "";
  let pincode = address && address.pincode ? address.pincode : "";
  // cities &&
  //   cities.forEach((city) => {
  //     if (city.code === cityValue) {
  //       cityName = city.name;
  //     }
  //   });
  const addressKeys = ["doorNo", "buildingName", "street"];
  let addressArray = addressKeys.reduce((result, curr) => {
    if (address && address[curr]) {
      result.push(address[curr]);
    }
    return [...result];
  }, []);
  addressArray = pincode ? [...addressArray, name, cityName, pincode] : [...addressArray, name, cityName];
  return addressArray.join(", ");
};

export const getLatestCreationTime = (complaint) => {
  for (let i = 0; i < complaint.actions.length; i++) {
    if (complaint.actions[i].action === "reopen") {
      return complaint.actions[i].when;
    }
  }
  return complaint.auditDetails.createdTime;
};

export const transformLocalizationLabels = (localizationLabels) => {
  let labelsById = transformById(localizationLabels, "code");
  return labelsById;
};

export const flatten = (arr) => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
  }, []);
};

export const getTenantForLatLng = async (lat, lng) => {
  let queryObjList = [{ key: "lat", value: lat }, { key: "lng", value: lng }, { key: "tenantId", value: commonConfig.tenantId }];
  let response;
  if (lat && lng) {
    try {
      response = await httpRequest(TENANT.POST.URL, TENANT.POST.ACTION, queryObjList);
      return response.Tenant.code;
    } catch (error) {
      //throw and error
      throw new Error(error.message);
    }
  }
};

export const findLatestAssignee = (actionArray) => {
  for (let i = 0; i < actionArray.length; i++) {
    if (actionArray[i].status === "assigned") {
      return actionArray[i].assignee;
    }
  }
  return null;
};

const getLatestAction = (actionArr) => {
  return actionArr.reduce((result, current) => {
    if (current.when > result) {
      result = current.when;
    }
    return result;
  }, 0);
};

// export const getAddressDetail = (addressDetail) => {
//   const { houseNoAndStreetName, landmark, mohalla, city } = addressDetail;
//   return houseNoAndStreetName && landmark
//     ? `${houseNoAndStreetName},${mohalla},${landmark},${city}`
//     : !houseNoAndStreetName && landmark
//     ? `${mohalla},${landmark},${city}`
//     : houseNoAndStreetName && !landmark
//     ? `${houseNoAndStreetName},${mohalla},${city}`
//     : `${mohalla},${city}`;
// };

export const transformComplaintForComponent = (complaints, role, employeeById, citizenById, categoriesById, displayStatus) => {
  const defaultPhoneNumber = "";
  const transformedComplaints = Object.values(complaints.byId).map((complaintDetail, index) => {
    let filedUserName = complaintDetail && complaintDetail.citizen && complaintDetail.citizen.name;
    let isFiledByCSR =
      complaintDetail &&
      complaintDetail.actions &&
      complaintDetail.actions[complaintDetail.actions.length - 1].by &&
      complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[1] &&
      complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[1] === "Citizen Service Representative";
    return {
      header: getPropertyFromObj(complaints.categoriesById, complaintDetail.serviceCode, "serviceCode", "NA"),
      date: complaintDetail.auditDetails.createdTime,
      latestCreationTime: getLatestCreationTime(complaintDetail),
      complaintNo: complaintDetail.serviceRequestId,
      images: fetchImages(complaintDetail.actions).filter((imageSource) => isImage(imageSource)),
      complaintStatus: complaintDetail.status && getTransformedStatus(complaintDetail.status),
      rawStatus: complaintDetail.status && complaintDetail.status,
      address: complaintDetail.address ? complaintDetail.address : "",
      addressDetail: complaintDetail.addressDetail ? complaintDetail.addressDetail : {},
      reassign: complaintDetail.status === "reassignrequested" ? true : false,
      reassignRequestedBy:
        complaintDetail.status === "reassignrequested"
          ? getPropertyFromObj(employeeById, complaintDetail.actions[0].by.split(":")[0], "name", "NA")
          : "NA",
      latestActionTime: complaintDetail && complaintDetail.actions && getLatestAction(complaintDetail.actions),
      submittedBy: filedUserName ? (isFiledByCSR ? `${filedUserName} (Citizen Service Desk)` : filedUserName) : "NA",
      citizenPhoneNumber: complaintDetail && complaintDetail.citizen && complaintDetail.citizen.mobileNumber,
      assignedTo: complaintDetail && getPropertyFromObj(employeeById, findLatestAssignee(complaintDetail.actions), "name", "NA"),
      employeePhoneNumber:
        employeeById && employeeById[findLatestAssignee(complaintDetail.actions)]
          ? employeeById[findLatestAssignee(complaintDetail.actions)].mobileNumber
          : defaultPhoneNumber,
      status:
        role === "citizen"
          ? displayStatus(complaintDetail.status, complaintDetail.assignee, complaintDetail.actions.filter((complaint) => complaint.status)[0].action)
          : getTransformedStatus(complaintDetail.status) === "CLOSED"
          ? complaintDetail.rating
            ? displayStatus(`${complaintDetail.rating}/5`)
            : displayStatus(complaintDetail.actions[0].status)
          : displayStatus(
              returnSLAStatus(
                getPropertyFromObj(categoriesById, complaintDetail.serviceCode, "slaHours", "NA"),
                getLatestCreationTime(complaintDetail)
              ).slaStatement
            ),
      SLA: returnSLAStatus(getPropertyFromObj(categoriesById, complaintDetail.serviceCode, "slaHours", "NA"), getLatestCreationTime(complaintDetail))
        .daysCount,
    };
  });
  return transformedComplaints;
};

export const startSMSRecevier = () => {
  try {
    if (typeof androidAppProxy !== "undefined") {
      window.androidAppProxy.requestSMS();
    }
  } catch (error) {}
};

export const upperCaseFirst = (word) => {
  return word[0].toUpperCase() + word.slice(1, word.length);
};

//Specific for MDMS Screens
export const mergeMDMSDataArray = (oldData, newRow) => {
  const rawData = [...oldData];
  rawData.forEach((item, index) => {
    if (item.code === newRow.code) {
      //Update Case
      rawData.splice(index, 1);
    }
  });
  const mergedData = [newRow, ...rawData];
  return mergedData;
};

export const fetchDropdownData = async (dispatch, dataFetchConfig, formKey, fieldKey, boundary) => {
  const { url, action, requestBody, queryParams } = dataFetchConfig;
  try {
    if (url) {
      const payloadSpec = await httpRequest(url, action, queryParams || [], requestBody);
      const dropdownData = boundary
        ? // ? jp.query(payloadSpec, dataFetchConfig.dataPath)
          payloadSpec.TenantBoundary[0].boundary
        : dataFetchConfig.dataPath.reduce((dropdownData, path) => {
            dropdownData = [...dropdownData, ...get(payloadSpec, path)];
            return dropdownData;
          }, []);
      const ddData =
        dropdownData &&
        dropdownData.reduce((ddData, item) => {
          let option = { label: item.name, value: item.code };
          //Only for boundary
          item.area && (option.area = item.area);
          ddData.push(option);
          return ddData;
        }, []);
      dispatch(setFieldProperty(formKey, fieldKey, "dropDownData", ddData));
    }
  } catch (error) {
    const { message } = error;
    if (fieldKey === "mohalla") {
      dispatch(toggleSnackbarAndSetText(true, "There is no admin boundary data available for this tenant", true));
    } else {
      dispatch(toggleSnackbarAndSetText(true, message, true));
    }
    return;
  }
};

export const trimObj = (obj) => {
  if (!Array.isArray(obj) && typeof obj != "object") return obj;
  for (var key in obj) {
    obj[key.trim()] = typeof obj[key] === "string" ? obj[key].trim() : trimObj(obj[key]);
    if (key === "") delete obj[key];
  }
  return obj;
};

export const hasTokenExpired = (status, data) => {
  if (status === 401) {
    if (data && data.Errors && Array.isArray(data.Errors) && data.Errors.length > 0 && data.Errors[0].code === "InvalidAccessTokenException")
      return true;
  }
  return false;
};
