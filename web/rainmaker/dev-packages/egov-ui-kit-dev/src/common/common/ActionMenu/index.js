import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import ActionMenuComp from "../ActionMenu/components";
import "./index.css";
import { fetchActionItems,updateActiveRoute } from "egov-ui-kit/redux/app/actions";

class ActionMenu extends Component {
  componentDidMount = async () => {
    let userInfo = JSON.parse(localStorage.getItem("user-info"));
    let { fetchActionMenu } = this.props;
    const roles = get(userInfo, "roles");
    const roleCodes = roles ? roles.map((role) => role.code) : [];
    await fetchActionMenu(
      {
        roleCodes: roleCodes,
        tenantId: "pb",
        actionMaster: "actions-test",
        enabled: true,
      },
      {
        ts: new Date().getTime(),
      }
    );
  };

  render() {
    let { actionListArr,activeRoutePath,updateActiveRoute,toggleDrawer} = this.props;
    let transformedRole = "";
    // actionListArr.push({url:"https://www.google.com",navigationURL:"newTab",path:"test.new tab"});
    return actionListArr && actionListArr.length > 0 ? 
    <ActionMenuComp role={transformedRole} 
    actionListArr={actionListArr}          
    activeRoutePath = {activeRoutePath}
    toggleDrawer={toggleDrawer}
    updateActiveRoute={updateActiveRoute}/> : null;
  }
}

const mapStateToProps = ({ app }) => {
  const actionListArr = app.menu || [];
  const activeRoutePath = app.activeRoutePath

  return { actionListArr ,activeRoutePath};
};

const mapDispatchToProps = (dispatch) => ({
  handleToggle: (showMenu) => dispatch({ type: "MENU_TOGGLE", showMenu }),
  setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
  fetchActionMenu: (role, ts) => dispatch(fetchActionItems(role, ts)),
  updateActiveRoute :(routepath,routeName) =>dispatch(updateActiveRoute(routepath,routeName))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionMenu);
