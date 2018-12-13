import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Footer from "../FooterContainer";
import Stepper from "../../ui-molecules-local/Stepper";
import StepperContent from "./components/StepperContent";

const styles = theme => ({
  root: {
    backgroundColor: "transparent"
  }
});

class EmployeeCreate extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Stepper classes={classes.root} />
        <StepperContent />
        <Footer
          variant={"contained"}
          color={"primary"}
          label1={"Previous"}
          label2={"NEXT"}
          style={{
            minWidth: "200px",
            height: "48px",
            marginRight: "45px"
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeCreate);
