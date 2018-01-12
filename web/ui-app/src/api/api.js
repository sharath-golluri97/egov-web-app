var common = require('../components/common/common');
var axios = require('axios');

var instance = axios.create({
  baseURL: window.location.origin,
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

var counter = 0;

var authToken = localStorage.getItem('token');

var requestInfo = {
  apiId: 'org.egov.pt',
  ver: '1.0',
  ts: '27-06-2017 10:30:12',
  action: 'asd',
  did: '4354648646',
  key: 'xyz',
  msgId: '654654',
  requesterId: '61',
  authToken: authToken,
};

var tenantId = localStorage.getItem('tenantId') ? localStorage.getItem('tenantId') : 'default';

function extractErrorMsg(errorObj, localeCode, descriptionCode) {
  var translatedErrorMsg = common.translate(errorObj[localeCode]);
  if (errorObj[localeCode] === translatedErrorMsg) return errorObj[descriptionCode] || translatedErrorMsg;
  else return translatedErrorMsg;
}

const sendMessageToParentIframe = (type, message) => {
  window.parent.postMessage({ message, type }, '*');
};

module.exports = {
  commonApiPost: (
    context,
    queryObject = {},
    body = {},
    doNotOverride = false,
    isTimeLong = false,
    noPageSize = false,
    authToken = '',
    userInfo = '',
    isStateLevel = false
  ) => {
    var url = context;
    if (url && url[url.length - 1] === '/') url = url.substring(0, url.length - 1);
    if (!doNotOverride) {
      if (url.split('?').length > 1) {
        url +=
          '&tenantId=' +
          (localStorage.getItem('tenantId')
            ? isStateLevel ? localStorage.getItem('tenantId').split('.')[0] : localStorage.getItem('tenantId')
            : 'default');
      } else {
        url +=
          '?tenantId=' +
          (localStorage.getItem('tenantId')
            ? isStateLevel ? localStorage.getItem('tenantId').split('.')[0] : localStorage.getItem('tenantId')
            : 'default');
      }
    } else {
      url += '?';
    }
    for (var variable in queryObject) {
      if (typeof queryObject[variable] !== 'undefined') {
        url += '&' + variable + '=' + queryObject[variable];
      }
    }

    if (/_search/.test(context) && !noPageSize) {
      url += '&pageSize=200';
    }

    requestInfo.authToken = localStorage.getItem('token');
    if (isTimeLong) {
      requestInfo.ts = new Date().getTime();
    }

    if (authToken) {
      requestInfo['authToken'] = authToken;
    }

    body['RequestInfo'] = requestInfo;

    if (userInfo) {
      body['RequestInfo']['userInfo'] = userInfo;
    }

    return instance
      .post(url, body)
      .then(function(response) {
        return response.data;
      })
      .catch(function(response) {
        let _err = '',
          _error_type = 'api_error';

        try {
          if (response && response.response && response.response.data && response.response.data[0] && response.response.data[0].error) {
            response.response.data[0].error.message || '';
            if (response.response.data[0].error.errorFields && Object.keys(response.response.data[0].error.errorFields).length) {
              for (var i = 0; i < response.response.data[0].error.errorFields.length; i++) {
                _err += '\n ' + response.response.data[0].error.errorFields[i].message + ' ';
              }
            }
          } else if (response && response.response && response.response.data && response.response.data.error) {
            _err = response.response.data.error.message
              ? response.response.data.error.fields
                ? 'a) ' + extractErrorMsg(response.response.data.error, 'message', 'description') + ' : '
                : extractErrorMsg(response.response.data.error, 'message', 'description')
              : '';
            let fields = response.response.data.error.fields || [];
            for (var i = 0; i < fields.length; i++) {
              _err += i + 1 + ') ' + extractErrorMsg(fields[i], 'code', 'message') + '.';
            }
          } else if (response && response.response && response.response.data && response.response.data.Errors) {
            if (response.response.data.Errors.length == 1) {
              _err += common.translate(response.response.data.Errors[0].message) + '.';
            } else {
              for (var i = 0; i < response.response.data.Errors.length; i++) {
                _err += i + 1 + ') ' + common.translate(response.response.data.Errors[i].message) + '.';
              }
            }
          } else if (response && response.response && response.response.data && response.response.data.hasOwnProperty('Data')) {
            _err = common.translate(response.response.data.Message) + '.';
          } else if (response && response.response && !response.response.data && response.response.status === 400) {
            if (counter == 0) {
              document.title = 'eGovernments';
              _error_type = 'token_expired';
              _err = 'Session expired. Please login again.';
            }
          } else if (response) {
            _err = "Oops! Something isn't right. Please try again later.";
          } else {
            _err = 'Server returned unexpected error. Please contact system administrator.';
          }
        } catch (e) {
          if (e.message) {
            _err = e.message;
          } else _err = "Oops! Something isn't right. Please try again later.";
        }
        // send message to parent iframe
        sendMessageToParentIframe(_error_type, _err);
      });
  },
  commonApiGet: (context, queryObject = {}, doNotOverride = false, noPageSize = false) => {
    var url = context;
    if (!doNotOverride) url += '?tenantId=' + (localStorage.getItem('tenantId') || 'default');
    else url += '?';
    for (var variable in queryObject) {
      if (typeof queryObject[variable] !== 'undefined') {
        url += '&' + variable + '=' + queryObject[variable];
      }
    }

    if (/_search/.test(context) && !noPageSize) {
      url += '&pageSize=500';
    }
    return instance
      .get(url)
      .then(function(response) {
        return response.data;
      })
      .catch(function(response) {
        if (
          response &&
          response.response &&
          response.response.data &&
          response.response.data[0] &&
          (response.response.data[0].error || response.response.data[0].Errors[0])
        ) {
          var _err = response.response.data[0].error.message || '';
          if (response.response.data[0].error.errorFields && Object.keys(response.response.data[0].error.errorFields).length) {
            for (var i = 0; i < response.response.data[0].error.errorFields.length; i++) {
              _err += '\n ' + response.response.data[0].error.errorFields[i].message + ' ';
            }
            throw new Error(_err);
          }
        } else {
          throw new Error('Something went wrong, please try again later.');
        }
      });
  },
  getAll: arrayOfRequest => {
    return instance.all(arrayOfRequest).then(axios.spread(function(acct, perms) {}));
  },
};
