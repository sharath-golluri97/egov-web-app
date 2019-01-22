import React from "react";
import Switch from "@material-ui/core/Switch";

const MUISwitch = props => {
  const { ...rest } = props;
  return <Switch {...rest} />;
};

export default MUISwitch;
