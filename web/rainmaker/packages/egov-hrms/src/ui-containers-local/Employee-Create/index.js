import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { screenHoc } from "mihy-ui-framework/ui-hocs";
import Stepper from "../../ui-molecules-local/Stepper";
import StepperContent from "./components/StepperContent";
import get from "lodash/get";

const styles = theme => ({
  root: {
    backgroundColor: "transparent"
  }
});

class EmployeeCreate extends React.Component {
  render() {
    const { classes, employeeConfig } = this.props;
    const stepOne = get(employeeConfig, "components.step-one");
    const stepData = get(employeeConfig, "components.stepper");
    return (
      <div>
        <Stepper classes={classes.root} stepData={stepData} />
        <StepperContent stepOne={stepOne} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { screenConfig } = screenConfiguration;
  const employeeConfig = screenConfig["create-update"];
  return { employeeConfig };
};

export default screenHoc({ screenKey: "create-update", hasRemoteConfig: true })(
  withStyles(styles)(connect(mapStateToProps)(EmployeeCreate))
);
