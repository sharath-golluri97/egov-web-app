import React from "react";
import { Form } from "mihy-ui-framework/ui-atoms";
import { Card, Grid } from "@material-ui/core";
import { TextFieldContainer } from "mihy-ui-framework/ui-containers";
import createEmployee from "./createEmployee";
import { OwnerInfoCard } from "../../../../ui-config/screens/specs/tradelicence/applyResource/tradeOwnerDetails";
import { getCommonTitle } from "mihy-ui-framework/ui-config/screens/specs/utils";
import {
  ComponentInterface,
  RenderScreen
} from "mihy-ui-framework/ui-molecules";

// const header = getCommonTitle(
//   {
//     labelName: "Required Documents",
//     labelKey: "TL_NEW-UPLOAD-DOCS_HEADER"
//   },
//   {
//     style: {
//       marginBottom: 18
//     }
//   }
// );
const inputLabelProps = {
  shrink: true
};

const StepperContent = () => {
  const { name, mobileNo, emailId, dob, aadhaar, pan } = createEmployee;
  console.log("OwnerInfoCard is....", OwnerInfoCard);
  return (
    <Form>
      <Card style={{ padding: "16px" }}>
        <Grid container="true" sm="12" spacing={16}>
          <Grid sm="4">
            <TextFieldContainer
              label={name.label}
              placeholder={name.placeholder}
            />
          </Grid>
          <Grid sm="4">
            <TextFieldContainer
              label={mobileNo.label}
              placeholder={mobileNo.placeholder}
            />
          </Grid>
          <Grid sm="4">
            <TextFieldContainer
              label={emailId.label}
              placeholder={emailId.placeholder}
            />
          </Grid>
          <Grid sm="4">
            <TextFieldContainer
              label={dob.label}
              placeholder={dob.placeholder}
            />
          </Grid>

          <Grid sm="4">
            <TextFieldContainer
              label={aadhaar.label}
              placeholder={aadhaar.placeholder}
            />
          </Grid>
          <Grid sm="4">
            <TextFieldContainer
              label={pan.label}
              placeholder={pan.placeholder}
            />
          </Grid>
        </Grid>
      </Card>
    </Form>
  );
};

export default StepperContent;
