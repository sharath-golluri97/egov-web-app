"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addWflowFileUrl = exports.getFileUrlFromAPI = exports.replaceStrInPath = exports.getLocaleLabels = exports.epochToYmd = exports.getTranslatedLabel = exports.transformById = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.getDateInEpoch = exports.trimObj = exports.fetchFromLocalStorage = exports.persistInLocalStorage = exports.slugify = exports.isFieldEmpty = exports.addQueryArg = exports.getQueryArg = exports.addComponentJsonpath = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _api = require("../ui-utils/api");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addComponentJsonpath = exports.addComponentJsonpath = function addComponentJsonpath(components) {
  var jsonPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "components";

  for (var componentKey in components) {
    if (components.hasOwnProperty(componentKey)) {
      if (components[componentKey].children) {
        components[componentKey].componentJsonpath = jsonPath + "." + componentKey;
        var childJsonpath = components[componentKey].componentJsonpath + ".children";
        addComponentJsonpath(components[componentKey].children, childJsonpath);
      } else {
        components[componentKey].componentJsonpath = jsonPath + "." + componentKey;
      }
    }
  }
  return components;
};

var getQueryArg = exports.getQueryArg = function getQueryArg(url, name) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var addQueryArg = exports.addQueryArg = function addQueryArg(url) {
  var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var urlParts = url.split("?");
  var path = urlParts[0];
  var queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach(function (query) {
    var key = query.key;
    var value = query.value;
    var newQuery = key + "=" + value;
    queryParts.push(newQuery);
  });
  var newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

var isFieldEmpty = exports.isFieldEmpty = function isFieldEmpty(field) {
  if (field === undefined || field === null) {
    return true;
  }
  if ((typeof field === "undefined" ? "undefined" : (0, _typeof3.default)(field)) !== "object") {
    field = field.toString().trim();
    return (0, _isEmpty2.default)(field);
  }
  return false;
};

var slugify = exports.slugify = function slugify(term) {
  return term.toLowerCase().replace(/\s+/, "-");
};

var persistInLocalStorage = exports.persistInLocalStorage = function persistInLocalStorage(obj) {
  Object.keys(obj).forEach(function (objKey) {
    var objValue = obj[objKey];
    window.localStorage.setItem(objKey, objValue);
  }, undefined);
};

var fetchFromLocalStorage = exports.fetchFromLocalStorage = function fetchFromLocalStorage(key) {
  return window.localStorage.getItem(key) || null;
};

var trimObj = exports.trimObj = function trimObj(obj) {
  if (!Array.isArray(obj) && (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) !== "object") return obj;
  for (var key in obj) {
    obj[key.trim()] = typeof obj[key] === "string" ? obj[key].trim() : trimObj(obj[key]);
    if (key === "") delete obj[key];
  }
  return obj;
};

var getDateInEpoch = exports.getDateInEpoch = function getDateInEpoch() {
  return new Date().getTime();
};

var getImageUrlByFile = exports.getImageUrlByFile = function getImageUrlByFile(file) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
  var mimeType = file["type"];
  return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

var transformById = exports.transformById = function transformById(payload, id) {
  return payload && payload.reduce(function (result, item) {
    result[item[id]] = (0, _extends3.default)({}, item);

    return result;
  }, {});
};

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

var epochToYmd = exports.epochToYmd = function epochToYmd(et) {
  // Return null if et already null
  if (!et) return null;
  // Return the same format if et is already a string (boundary case)
  if (typeof et === "string") return et;
  var date = new Date(et);
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  // date = `${date.getFullYear()}-${month}-${day}`;
  var formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + day;
  return formatted_date;
};

var getLocaleLabels = exports.getLocaleLabels = function getLocaleLabels(label, labelKey, localizationLabels) {
  if (labelKey) {
    var translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

var replaceStrInPath = exports.replaceStrInPath = function replaceStrInPath(inputString, search, replacement) {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };
  return inputString.replaceAll(search, replacement);
};

var getFileUrlFromAPI = exports.getFileUrlFromAPI = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileStoreId) {
    var queryObject, fileUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: "pb" }, { key: "fileStoreIds", value: fileStoreId }];
            _context.prev = 1;
            _context.next = 4;
            return (0, _api.httpRequest)("get", "/filestore/v1/files/url", "", queryObject);

          case 4:
            fileUrl = _context.sent;
            return _context.abrupt("return", fileUrl);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function getFileUrlFromAPI(_x3) {
    return _ref.apply(this, arguments);
  };
}();

var getAllFileStoreIds = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ProcessInstances) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", ProcessInstances && ProcessInstances.reduce(function (result, eachInstance) {
              if (eachInstance.documents) {
                var fileStoreIdArr = eachInstance.documents.map(function (item) {
                  return item.fileStoreId;
                });
                result[eachInstance.id] = fileStoreIdArr.join(",");
              }
              return result;
            }, {}));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getAllFileStoreIds(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var addWflowFileUrl = exports.addWflowFileUrl = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ProcessInstances) {
    var fileStoreIdByAction, fileUrlPayload, processInstances;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getAllFileStoreIds(ProcessInstances);

          case 2:
            fileStoreIdByAction = _context3.sent;
            _context3.next = 5;
            return getFileUrlFromAPI(Object.values(fileStoreIdByAction).join(","));

          case 5:
            fileUrlPayload = _context3.sent;
            processInstances = (0, _cloneDeep2.default)(ProcessInstances);

            processInstances.map(function (item) {
              if (item.documents && item.documents.length > 0) {
                item.documents.forEach(function (i) {
                  i.link = fileUrlPayload[i.fileStoreId];
                  i.title = i.documentType;
                  i.name = decodeURIComponent(fileUrlPayload[i.fileStoreId].split(",")[0].split("?")[0].split("/").pop().slice(13));
                  i.linkText = "View";
                });
              }
            });
            //setProcessInstances(processInstances);

            localStorage.setItem("ProcessInstances", JSON.stringify(processInstances));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function addWflowFileUrl(_x5) {
    return _ref3.apply(this, arguments);
  };
}();