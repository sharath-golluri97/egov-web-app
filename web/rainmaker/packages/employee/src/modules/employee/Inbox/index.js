import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { Taskboard } from "./components";
import InboxData from "./components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./index.css";
import { httpRequest } from "egov-ui-kit/utils/api";
import _ from "lodash";

// DUMMY CONTRACT FOR REFERENCE
const taskboardData = [{ head: "34", body: "Total Task" }, { head: "12", body: "Nearing SLA" }, { head: "05", body: "Over SLA" }];
// DUMMY CONTRACT FOR REFERENCE
const tabdata = ["Assigned to me (4)", "All (30)"];
// DUMMY CONTRACT FOR REFERENCE
const inboxDataDUM = {
  headers: ["Module/Service", "Task ID", "Status", "Assigned By", "Assigned To", "SLA (Days Remaining)"],
  rows: [
    [
      { text: "Property Tax", subtext: "New Assessment" },
      { text: "TL-252-2828" },
      { text: "Initiated" },
      { text: "Raminder Pal" },
      { text: "Surjeet Singh" },
      { text: "01", badge: true },
    ],
    [
      { text: "Module/Service", subtext: "New Assessment" },
      { text: "TL-252-2828" },
      { text: "Initiated" },
      { text: "Raminder Pal" },
      { text: "Surjeet Singh" },
      { text: "01", badge: true },
    ],
    [
      { text: "Module/Service", subtext: "New Assessment" },
      { text: "TL-252-2828" },
      { text: "Initiated" },
      { text: "Raminder Pal" },
      { text: "Surjeet Singh" },
      { text: "01", badge: true },
    ],
    [
      { text: "Module/Service", subtext: "New Assessment" },
      { text: "TL-252-2828" },
      { text: "Initiated" },
      { text: "Raminder Pal" },
      { text: "Surjeet Singh" },
      { text: "01", badge: true },
    ],
  ],
};

const prepareInboxDataRows = (data) => {
  if (_.isEmpty(data)) return [];
  return data.map((item) => {
    var sla = item.businesssServiceSla && item.businesssServiceSla / (1000 * 60 * 60 * 24);
    return [
      { text: _.get(item, "moduleName", "--"), subtext: item.moduleName },
      { text: item.businessId },
      { text: item.state && item.state.state },
      { text: item.assigner ? item.assigner.name : "" },
      { text: item.assignee ? item.assignee.name : "" },
      { text: Math.floor(sla), badge: true },
      { historyButton: true },
    ];
  });
};

class Inbox extends Component {
  state = {
    value: 0,
    tabData: [],
    taskboardData: [],
    inboxData: [{ headers: [], rows: [] }],
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount = async () => {
    const uuid = _.get(this.props, "userInfo.uuid");
    const tenantId = localStorage.getItem("tenant-id");

    const taskboardData = [];
    const tabData = [];
    const inboxData = [{ headers: [], rows: [] }];

    const requestBody = [{ key: "tenantId", value: tenantId }];
    const responseData = await httpRequest("egov-workflow-v2/egov-wf/process/_search", "_search", requestBody);

    const assignedData = _.filter(responseData.ProcessInstances, (item) => _.get(item.assignee, "uuid") === uuid);
    const allData = _.get(responseData, "ProcessInstances", []);

    const assignedDataRows = prepareInboxDataRows(assignedData);
    const allDataRows = prepareInboxDataRows(allData);

    inboxData[0].headers = ["Module/Service", "Task ID", "Status", "Assigned By", "Assigned To", "SLA (Days Remaining)"];
    inboxData[0].rows = assignedDataRows;

    const taskCount = allDataRows.length;
    const overSla = _.filter(responseData.ProcessInstances, (item) => item.businesssServiceSla < 0).length;

    taskboardData.push({ head: taskCount, body: "Total Task" }, { head: "0", body: "Nearing SLA" }, { head: overSla, body: "Over SLA" });

    tabData.push(`Assigned to me (${assignedDataRows.length})`);
    tabData.push(`All (${allDataRows.length})`);

    inboxData.push({ headers: ["Module/Service", "Task ID", "Status", "Assigned By", "Assigned To", "SLA (Days Remaining)"], rows: allDataRows });
    this.setState({ inboxData, taskboardData, tabData });
  };

  render() {
    const { name } = this.props;
    const { value, taskboardData, tabData, inboxData } = this.state;
    return (
      <div className="col-sm-12">
        <Label className="landingPageUser" label={` Welcome ${name}, `} />
        <Taskboard data={taskboardData} />
        <div className="col-sm-12">
          <Tabs value={value} onChange={this.handleChange} className="">
            {tabData.map((item) => {
              return <Tab className="inbox-tab" label={item} />;
            })}
          </Tabs>
          {<InboxData data={inboxData[value]} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { userInfo } = auth;
  const name = auth && userInfo.name;

  return { name };
};

export default connect(
  mapStateToProps,
  null
)(Inbox);
