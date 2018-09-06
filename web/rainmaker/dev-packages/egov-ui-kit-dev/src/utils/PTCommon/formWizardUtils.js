import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import get from "lodash/get";
import { fetchFromLocalStorage, trimObj } from "egov-ui-kit/utils/commons";
import { getQueryValue } from "./index";

export const fetchAllPTMDMSData = (tenantId) => {
  let requestBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "PropertyTax",
          masterDetails: [
            {
              name: "Floor",
            },
            {
              name: "OccupancyType",
            },
            {
              name: "OwnerShipCategory",
            },
            {
              name: "OwnerType",
            },
            {
              name: "PropertySubType",
            },
            {
              name: "PropertyType",
            },
            {
              name: "SubOwnerShipCategory",
            },
            {
              name: "UsageCategoryDetail",
            },
            {
              name: "UsageCategoryMajor",
            },
            {
              name: "UsageCategoryMinor",
            },
            {
              name: "UsageCategorySubMinor",
            },
            {
              name: "OwnerTypeDocument",
            },
          ],
        },
      ],
    },
  };

  fetchGeneralMDMSData(requestBody, "PropertyTax", [
    "Floor",
    "OccupancyType",
    "OwnerShipCategory",
    "OwnerType",
    "PropertySubType",
    "PropertyType",
    "SubOwnerShipCategory",
    "UsageCategoryDetail",
    "UsageCategoryMajor",
    "UsageCategoryMinor",
    "UsageCategorySubMinor",
  ]);
};

export const getMultipleOwnerInfo = (form) => {
  return Object.keys(form)
    .filter((formkey) => formkey.indexOf("ownerInfo_") !== -1)
    .reduce((acc, curr, currIndex, arr) => {
      const ownerData = [...acc];
      const currForm = form[curr];
      const ownerObj = {
        document: {},
      };
      Object.keys(currForm.fields).map((field) => {
        const jsonPath = currForm.fields[field].jsonPath;
        if (jsonPath.toLowerCase().indexOf("document") !== -1) {
          ownerObj.document[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
            get(form, `${curr}.fields.${field}.value`, undefined) || null;
        } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
          ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
            get(form, `${curr}.fields.${field}.value`, undefined) || "Male";
        } else {
          ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
            get(form, `${curr}.fields.${field}.value`, undefined) || null;
        }
      });
      ownerData.push(ownerObj);
      return ownerData;
    }, []);
};

export const getSingleOwnerInfo = (form) => {
  const { ownerInfo } = form;
  const ownerObj = {
    document: {},
  };
  Object.keys(ownerInfo.fields).map((field) => {
    const jsonPath = ownerInfo.fields[field].jsonPath;
    if (jsonPath.toLowerCase().indexOf("document") !== -1) {
      ownerObj.document[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
        get(ownerInfo, `fields.${field}.value`, undefined) || null;
    } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = get(ownerInfo, `fields.${field}.value`, undefined) || "Male";
    } else {
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = get(ownerInfo, `fields.${field}.value`, undefined) || null;
    }
  });
  const ownerArray = [ownerObj];
  return ownerArray;
};

export const validateUnitandPlotSize = (plotDetails, form) => {
  let isValid = true;
  Object.keys(form).forEach((formKey, ind) => {
    if (formKey.startsWith("customSelect_")) {
      const floorCardIndex = formKey.split("_")[1];
      const { fields } = form[formKey];
      const floorNo = fields.floorName.value;
      const unitTotal = Object.keys(form).reduce((unitTotal, key) => {
        if (key.startsWith(`floorDetails_${floorCardIndex}_`)) {
          const form1 = form[key];
          if (form1 && form1.fields.builtArea.value) {
            unitTotal += parseFloat(form1.fields.builtArea.value);
          }
        }
        return unitTotal;
      }, 0);
      const plotSizeInFt = parseFloat(plotDetails.fields.plotSize.value) * 9;
      if (unitTotal > plotSizeInFt) {
        alert(`Total area of floor ${floorNo} has exceeded the plot size`);
        isValid = false;
      }
    }
  });
  return isValid;
};

export const normalizePropertyDetails = (properties, search) => {
  const propertyInfo = trimObj(JSON.parse(JSON.stringify(properties)));
  const property = propertyInfo[0] || {};
  const isReassesment = !!getQueryValue(search, "isReassesment");
  const propertyId = getQueryValue(search, "propertyId");
  if (isReassesment && propertyId) {
    property.propertyId = propertyId;
  }
  const { propertyDetails } = property;
  const units = propertyDetails[0].units.filter((item, ind) => {
    return item !== null;
  });
  var sumOfUnitArea = 0;
  units.forEach((unit) => {
    let unitAreaInSqYd = parseFloat(unit.unitArea) / 9;
    unit.unitArea = Math.round(unitAreaInSqYd * 1000) / 1000;
    sumOfUnitArea += unit.unitArea;
  });
  if (propertyDetails[0].propertySubType === "SHAREDPROPERTY") {
    propertyDetails[0].buildUpArea = sumOfUnitArea;
  }
  propertyDetails[0].units = units;
  return propertyInfo;
};
