import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Footer from "../../ui-containers-local/FooterContainer";

const styles = theme => ({
  root: {
    width: "90%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class HorizontalStepper extends React.Component {
  handleNext = activeStep => {
    const { onFieldChange } = this.props;
    onFieldChange(
      "create-update",
      "components.stepper",
      "activeStep",
      activeStep + 1
    );
  };

  handleBack = activeStep => {
    const { onFieldChange } = this.props;
    onFieldChange(
      "create-update",
      "components.stepper",
      "activeStep",
      activeStep - 1
    );
  };

  render() {
    const { classes, stepData } = this.props;
    const { steps, activeStep } = stepData;
    const { handleBack, handleNext } = this;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Footer
          activeStep={activeStep}
          disabled={activeStep === 0}
          onPreviousClick={handleBack}
          onNextClick={handleNext}
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

HorizontalStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalStepper);
