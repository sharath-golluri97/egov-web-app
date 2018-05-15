import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon } from "components";
import Label from "utils/translationNode";
import "./index.css";

const ServiceList = () => {
  return (
    <Card
      className="service-list col-xs-12"
      style={{ padding: "12px 8px" }}
      textChildren={
        <div>
          <div className="row upper-row">
            <Link to="/citizen/pt-payment-step-one">
              <div className="col-xs-4 service-item text-center">
                <div>
                  <Icon className="service-icon" action="custom" name="property-tax" />
                </div>
                <Label dark={true} className="service-label" label="Property Tax" />
              </div>
            </Link>
            <Link to="/citizen/my-complaints">
              <div className="col-xs-4 service-item text-center">
                <div>
                  <Icon className="service-icon" action="custom" name="water-tap" />
                </div>
                <Label dark={true} className="service-label" label="Water Charges" />
              </div>
            </Link>
            <Link to="/citizen/my-complaints">
              <div className="col-xs-4 service-item text-center">
                <div>
                  <Icon className="service-icon" action="custom" name="licenses" />
                </div>
                <Label dark={true} className="service-label" label="Licenses" />
              </div>
            </Link>
          </div>
          <div className="row lower-row">
            <Link to="/citizen/my-complaints">
              <div className="col-xs-4 service-item text-center file-complaint">
                <div>
                  <Icon className="service-icon" action="alert" name="warning" />
                </div>
                <Label dark={true} className="service-label" label="Complaints" />
              </div>
            </Link>
            <Link to="/citizen/my-complaints">
              <div className="col-xs-4 service-item text-center">
                <div>
                  <Icon className="service-icon" action="custom" name="birth-death" />
                </div>
                <Label dark={true} className="service-label" label="Birth & Death" />
              </div>
            </Link>
            <Link to="/citizen/my-complaints">
              <div className="col-xs-4 service-item text-center">
                <div>
                  <Icon className="service-icon" action="custom" name="fire" />
                </div>
                <Label dark={true} className="service-label" label="Fire NOC" />
              </div>
            </Link>
          </div>
        </div>
      }
    />
  );
};

export default ServiceList;
