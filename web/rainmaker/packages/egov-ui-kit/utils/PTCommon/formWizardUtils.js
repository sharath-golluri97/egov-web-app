"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizePropertyDetails = exports.validateUnitandPlotSize = exports.getSingleOwnerInfo = exports.getMultipleOwnerInfo = exports.fetchAllPTMDMSData = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _actions = require("egov-ui-kit/redux/common/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("egov-ui-kit/utils/commons");

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchAllPTMDMSData = exports.fetchAllPTMDMSData = function fetchAllPTMDMSData(tenantId) {
  var requestBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [{
        moduleName: "PropertyTax",
        masterDetails: [{
          name: "Floor"
        }, {
          name: "OccupancyType"
        }, {
          name: "OwnerShipCategory"
        }, {
          name: "OwnerType"
        }, {
          name: "PropertySubType"
        }, {
          name: "PropertyType"
        }, {
          name: "SubOwnerShipCategory"
        }, {
          name: "UsageCategoryDetail"
        }, {
          name: "UsageCategoryMajor"
        }, {
          name: "UsageCategoryMinor"
        }, {
          name: "UsageCategorySubMinor"
        }, {
          name: "OwnerTypeDocument"
        }]
      }]
    }
  };

  (0, _actions.fetchGeneralMDMSData)(requestBody, "PropertyTax", ["Floor", "OccupancyType", "OwnerShipCategory", "OwnerType", "PropertySubType", "PropertyType", "SubOwnerShipCategory", "UsageCategoryDetail", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor"]);
};

var getMultipleOwnerInfo = exports.getMultipleOwnerInfo = function getMultipleOwnerInfo(form) {
  return Object.keys(form).filter(function (formkey) {
    return formkey.indexOf("ownerInfo_") !== -1;
  }).reduce(function (acc, curr, currIndex, arr) {
    var ownerData = [].concat((0, _toConsumableArray3.default)(acc));
    var currForm = form[curr];
    var ownerObj = {
      document: {}
    };
    Object.keys(currForm.fields).map(function (field) {
      var jsonPath = currForm.fields[field].jsonPath;
      if (jsonPath.toLowerCase().indexOf("document") !== -1) {
        ownerObj.document[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _get2.default)(form, curr + ".fields." + field + ".value", undefined) || null;
      } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
        ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _get2.default)(form, curr + ".fields." + field + ".value", undefined) || "Male";
      } else {
        ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _get2.default)(form, curr + ".fields." + field + ".value", undefined) || null;
      }
    });
    ownerData.push(ownerObj);
    return ownerData;
  }, []);
};

var getSingleOwnerInfo = exports.getSingleOwnerInfo = function getSingleOwnerInfo(form) {
  var ownerInfo = form.ownerInfo;

  var ownerObj = {
    document: {}
  };
  Object.keys(ownerInfo.fields).map(function (field) {
    var jsonPath = ownerInfo.fields[field].jsonPath;
    if (jsonPath.toLowerCase().indexOf("document") !== -1) {
      ownerObj.document[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _get2.default)(ownerInfo, "fields." + field + ".value", undefined) || null;
    } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _get2.default)(ownerInfo, "fields." + field + ".value", undefined) || "Male";
    } else {
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _get2.default)(ownerInfo, "fields." + field + ".value", undefined) || null;
    }
  });
  var ownerArray = [ownerObj];
  return ownerArray;
};

var validateUnitandPlotSize = exports.validateUnitandPlotSize = function validateUnitandPlotSize(plotDetails, form) {
  var isValid = true;
  Object.keys(form).forEach(function (formKey, ind) {
    if (formKey.startsWith("customSelect_")) {
      var floorCardIndex = formKey.split("_")[1];
      var fields = form[formKey].fields;

      var floorNo = fields.floorName.value;
      var unitTotal = Object.keys(form).reduce(function (unitTotal, key) {
        if (key.startsWith("floorDetails_" + floorCardIndex + "_")) {
          var form1 = form[key];
          if (form1 && form1.fields.builtArea.value) {
            unitTotal += parseFloat(form1.fields.builtArea.value);
          }
        }
        return unitTotal;
      }, 0);
      var plotSizeInFt = parseFloat(plotDetails.fields.plotSize.value) * 9;
      if (unitTotal > plotSizeInFt) {
        alert("Total area of floor " + floorNo + " has exceeded the plot size");
        isValid = false;
      }
    }
  });
  return isValid;
};

var normalizePropertyDetails = exports.normalizePropertyDetails = function normalizePropertyDetails(properties, search) {
  var propertyInfo = (0, _commons.trimObj)(JSON.parse(JSON.stringify(properties)));
  var property = propertyInfo[0] || {};
  var isReassesment = !!(0, _index.getQueryValue)(search, "isReassesment");
  var propertyId = (0, _index.getQueryValue)(search, "propertyId");
  if (isReassesment && propertyId) {
    property.propertyId = propertyId;
  }
  var propertyDetails = property.propertyDetails;

  var units = propertyDetails[0].units.filter(function (item, ind) {
    return item !== null;
  });
  var sumOfUnitArea = 0;
  units.forEach(function (unit) {
    var unitAreaInSqYd = parseFloat(unit.unitArea) / 9;
    unit.unitArea = Math.round(unitAreaInSqYd * 1000) / 1000;
    sumOfUnitArea += unit.unitArea;
  });
  if (propertyDetails[0].propertySubType === "SHAREDPROPERTY") {
    propertyDetails[0].buildUpArea = sumOfUnitArea;
  }
  propertyDetails[0].units = units;
  return propertyInfo;
};