"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var actionList = {
  CITIZEN: [{
    id: 1535,
    name: "Complaints",
    url: "url",
    displayName: "Complaints",
    orderNumber: 1,
    enabled: true,
    serviceCode: "CS",
    code: "null",
    path: "Home",
    navigationURL: "my-complaints",
    leftIcon: "alert:warning",
    rightIcon: ""
  }],
  EMPLOYEE: [{
    id: 1535,
    name: "PropertyType",
    url: "url",
    displayName: "Open Complaints",
    orderNumber: 1,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Home",
    navigationURL: "all-complaints",
    leftIcon: "custom:open-complaints",
    rightIcon: ""

  }, {
    id: 1535,
    name: "PropertyType",
    url: "url",
    displayName: "Closed Complaints",
    orderNumber: 1,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Home",
    navigationURL: "closed-complaints",
    leftIcon: "custom:closed-complaints",
    rightIcon: ""

  }],
  GRO: [{
    id: 1535,
    name: "PropertyType",
    url: "url",
    displayName: "Open Complaints",
    orderNumber: 1,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Home",
    navigationURL: "all-complaints",
    leftIcon: "custom:open-complaints",
    rightIcon: ""
  }, {
    id: 1535,
    name: "PropertyType",
    url: "url",
    displayName: "Closed Complaints",
    orderNumber: 1,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Home",
    navigationURL: "closed-complaints",
    leftIcon: "custom:closed-complaints",
    rightIcon: ""

  }, {
    id: 1535,
    name: "Departments",
    url: "url",
    displayName: "Departments",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.Departments",
    navigationURL: "report/rainmaker-pgr/DepartmentWiseReport",
    leftIcon: "action:assignment"
  }, {
    id: 1535,
    name: "ComplaintType",
    url: "url",
    displayName: "Complaint Types",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.Complaint Types",
    navigationURL: "report/rainmaker-pgr/ComplaintTypeWiseReport",
    leftIcon: "action:assignment",
    rightIcon: ""
  }, {
    id: 1535,
    name: "AssigningOfficers",
    url: "url",
    displayName: "Assigning Officers",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.Assigning Officers",
    navigationURL: "report/rainmaker-pgr/AOWiseReport",
    leftIcon: "action:assignment",
    rightIcon: ""
  }, {
    id: 1535,
    name: "ULBEmployees",
    url: "url",
    displayName: "ULB Employees",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.ULB Employees",
    navigationURL: "report/rainmaker-pgr/FunctionaryWiseReport",
    leftIcon: "action:assignment",
    rightIcon: ""
  }, {
    id: 1535,
    name: "Source",
    url: "url",
    displayName: "Source",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.Source",
    navigationURL: "report/rainmaker-pgr/SourceWiseReport",
    leftIcon: "action:assignment",
    rightIcon: ""

  }],
  CSR: [{
    id: 1535,
    name: "PropertyType",
    url: "url",
    displayName: "All Complaints",
    orderNumber: 1,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Home",
    navigationURL: "all-complaints",
    leftIcon: "custom:open-complaints",
    rightIcon: ""
  }, {
    id: 1535,
    name: "PropertyType",
    url: "url",
    displayName: "Create Complaint",
    orderNumber: 1,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "create-complaint",
    navigationURL: "create-complaint",
    leftIcon: "content:add",
    rightIcon: ""
  }],
  "PGR-ADMIN": [{
    id: 1535,
    name: "Departments",
    url: "url",
    displayName: "Departments",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.Departments",
    navigationURL: "report/rainmaker-pgr/DepartmentWiseReport",
    leftIcon: "action:assignment"
  }, {
    id: 1535,
    name: "ComplaintType",
    url: "url",
    displayName: "Complaint Types",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.Complaint Types",
    navigationURL: "report/rainmaker-pgr/ComplaintTypeWiseReport",
    leftIcon: "action:assignment",
    rightIcon: ""
  }, {
    id: 1535,
    name: "AssigningOfficers",
    url: "url",
    displayName: "Assigning Officers",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.Assigning Officers",
    navigationURL: "report/rainmaker-pgr/AOWiseReport",
    leftIcon: "action:assignment",
    rightIcon: ""
  }, {
    id: 1535,
    name: "ULBEmployees",
    url: "url",
    displayName: "ULB Employees",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.ULB Employees",
    navigationURL: "report/rainmaker-pgr/FunctionaryWiseReport",
    leftIcon: "action:assignment",
    rightIcon: ""
  }, {
    id: 1535,
    name: "Source",
    url: "url",
    displayName: "Source",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "PGR Reports.Source",
    navigationURL: "report/rainmaker-pgr/SourceWiseReport",
    leftIcon: "action:assignment",
    rightIcon: ""
  }]
};

exports.default = actionList;