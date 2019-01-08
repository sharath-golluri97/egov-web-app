import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { screenHoc } from "mihy-ui-framework/ui-hocs";
import Stepper from "../../ui-molecules-local/Stepper";
import StepperContent from "./components/StepperContent";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

import get from "lodash/get";

const styles = theme => ({
  root: {
    backgroundColor: "transparent"
  }
});

class EmployeeCreate extends React.Component {
  render() {
    const { classes, employeeConfig, handleField } = this.props;
    const stepOne = get(employeeConfig, "components.step-one");
    const stepData = get(employeeConfig, "components.stepper");
    return (
      <div>
        <Stepper
          classes={classes.root}
          stepData={stepData}
          onFieldChange={handleField}
        />
        <StepperContent stepOne={stepOne} onFieldChange={handleField} />
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

const mapDispatchToProps = dispatch => {
  return {
    handleField: (screenKey, path, field, value) =>
      dispatch(handleField(screenKey, path, field, value))
  };
};

export default screenHoc({ screenKey: "create-update", hasRemoteConfig: true })(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(EmployeeCreate)
  )
);
