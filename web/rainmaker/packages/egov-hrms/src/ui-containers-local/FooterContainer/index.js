import React from "react";
import { Button } from "@material-ui/core";
import "./index.css";

const FooterContainer = ({
  activeStep,
  disabled,
  onPreviousClick,
  onNextClick,
  label1,
  label2,
  color,
  variant,
  style
}) => {
  return (
    <div className="col-xs-12 stepper-footer" style={{ textAlign: "right" }}>
      <div className="col-xs-6" style={{ float: "right", padding: 0 }}>
        {label1 && (
          <Button
            disabled={disabled}
            color={color}
            variant={variant}
            style={style}
            onClick={() => onPreviousClick(activeStep)}
          >
            {label1}
          </Button>
        )}
        <Button
          color={color}
          variant={variant}
          style={style}
          onClick={() => onNextClick(activeStep)}
        >
          {label2}
        </Button>
      </div>
    </div>
  );
};

export default FooterContainer;
