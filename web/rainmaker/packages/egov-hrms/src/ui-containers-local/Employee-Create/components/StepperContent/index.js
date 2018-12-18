import React from "react";
import { Form } from "mihy-ui-framework/ui-atoms";
import { Card, Grid } from "@material-ui/core";
import {
  TextFieldContainer,
  LabelContainer
} from "mihy-ui-framework/ui-containers";
import { RadioGroupContainer } from "../../../index";

const genderOptions = ["Male", "Female", "Transgender"];

const StepperContent = ({ stepOne }) => {
  const cardOne = stepOne["card-one"];
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
    <Form>
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
    </Form>
  );
};

export default StepperContent;
