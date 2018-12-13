import React from "react";
import { Button } from "@material-ui/core";
import "./index.css";

const FooterContainer = ({ label1, label2, color, variant, style }) => {
  return (
    <div className="col-xs-12 stepper-footer" style={{ textAlign: "right" }}>
      <div className="col-xs-6" style={{ float: "right", padding: 0 }}>
        {label1 && (
          <Button color={color} variant={variant} style={style}>
            {label1}
          </Button>
        )}
        <Button color={color} variant={variant} style={style}>
          {label2}
        </Button>
      </div>
    </div>
  );
};

export default FooterContainer;
