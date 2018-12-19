import React from "react";
import { Form } from "mihy-ui-framework/ui-atoms";
import { Card, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import get from "lodash/get";
import {
  TextFieldContainer,
  LabelContainer
} from "mihy-ui-framework/ui-containers";
import { RadioGroupContainer } from "../../../index";

const genderOptions = ["Male", "Female", "Transgender"];

class StepperContent extends React.Component {
  getStepOneData = cardOne => {
    const {
      aadhaar,
      correspondenceAddress,
      dateofAppointment,
      department,
      designation,
      dob,
      emailId,
      employeeCode,
      fromDate,
      mobileNo,
      name,
      pan,
      permanentAddress,
      toDate
    } = cardOne;
    return (
      <Card style={{ padding: "16px" }}>
        <LabelContainer labelName="Employee Details" />
        <div style={{ margin: 16 }}>
          <Grid container="true" sm="12" spacing={16}>
            <Grid sm="4">
              <TextFieldContainer {...name} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...mobileNo} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...employeeCode} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...department} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...designation} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...emailId} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...dob} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...permanentAddress} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...correspondenceAddress} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...aadhaar} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...pan} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...dateofAppointment} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...dateofAppointment} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...fromDate} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...toDate} />
            </Grid>
            <Grid sm="4">
              <LabelContainer
                labelName="Gender"
                style={{
                  fontSize: "14px",
                  fontFamily: "Roboto",
                  color: "rgba(0,0,0,0.60)"
                }}
              />
              <RadioGroupContainer
                buttons={genderOptions}
                style={{ marginTop: 10 }}
              />
            </Grid>
          </Grid>
        </div>
      </Card>
    );
  };

  getStepTwoData = (cardOne, onFieldChange) => {
    const { department, designation, dob } = cardOne;
    return (
      <Card style={{ padding: "16px" }}>
        <LabelContainer labelName="Employee Details" />
        <div style={{ margin: 16 }}>
          <Grid container="true" sm="12" spacing={16}>
            <Grid sm="4">
              <TextFieldContainer {...department} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...designation} />
            </Grid>
            <Grid sm="4">
              <TextFieldContainer {...dob} />
            </Grid>
          </Grid>
        </div>
      </Card>
    );
  };

  getStepData = () => {
    const { activeStep, stepOne, onFieldChange } = this.props;

    const { getStepOneData, getStepTwoData } = this;
    const cardOne = stepOne["card-one"];
    switch (activeStep) {
      case 0:
        return getStepOneData(cardOne);

      case 1:
        return getStepTwoData(cardOne, onFieldChange);
    }
  };

  render() {
    return <Form>{this.getStepData()}</Form>;
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { screenConfig } = screenConfiguration;
  const employeeConfig = screenConfig["create-update"];
  const activeStep = get(employeeConfig, "components.stepper.activeStep");
  return { activeStep };
};

export default connect(mapStateToProps)(StepperContent);
