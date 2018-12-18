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

function getSteps() {
  return ["Employee Details", "Address Info", "Summary"];
}

const header = function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Uknown stepIndex";
  }
};

class HorizontalStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes, stepData } = this.props;
    const steps = stepData.steps || [];
    const { activeStep } = this.state;
    console.log("stepper is....", stepData);
    console.log("step data is....", steps);

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
        <div>
          {this.state.activeStep === steps.length ? (
            <div>{/* <Button onClick={this.handleReset}>Reset</Button> */}</div>
          ) : (
            <div>
              {/* <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography> */}
              {/* <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div> */}
            </div>
          )}
        </div>
        <Footer
          disabled={activeStep === 0}
          onPreviousClick={this.handleBack}
          onNextClick={this.handleNext}
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
