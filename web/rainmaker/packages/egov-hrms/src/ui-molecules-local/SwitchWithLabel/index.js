import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "../../ui-atoms-local/Switch";
import "./index.css";

class SwitchWithLabel extends Component {
  render() {
    const { items, FormControlProps, SwitchProps } = this.props;
    return (
      <FormGroup>
        {items.map((item, index) => {
          return (
            <FormControlLabel
              className={"form-control-switch"}
              key={`form-${index}`}
              control={<Switch {...SwitchProps} />}
              label={item.label}
              {...FormControlProps}
            />
          );
        })}
      </FormGroup>
    );
  }
}
export default SwitchWithLabel;
