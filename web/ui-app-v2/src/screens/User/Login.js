import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Image, DropDown, TextField, Card } from "../../components";
import logoMuncipal from "../../assets/images/logo-muncipal.png";
import "./index.css";

const cardStyle = {
  style: {
    position: "absolute",
    top: "35%",
    left: "7%",
    right: "6%",
  },
};
class Login extends Component {
  state = {
    name: "",
    phoneNumber: "",
  };

  dropDownData = [
    {
      value: 1,
      label: "Amritsar",
    },
    {
      value: 2,
      label: "Patiala",
    },
  ];

  login = () => {
    this.props.history.push("/otp");
  };

  onNameChanged = (e, value) => {
    this.setState({ name: value });
  };

  onPhoneNumberChanged = (e, value) => {
    this.setState({ phoneNumber: value });
  };

  render() {
    const { login, dropDownData, onNameChanged, onPhoneNumberChanged } = this;
    const { name, phoneNumber } = this.state;

    return (
      <div className="user-login col-xs-12 col-lg-6 col-sm-6 col-md-6 col-lg-offset-3 col-sm-offset-3 col-md-offset-3">
        <div className="imageContainer" />
        <div className="cardBackground" />
        <Image className="logo" circular={true} source={`${logoMuncipal}`} />
        <Card
          card={cardStyle}
          textChildren={
            <div style={{ marginTop: "50px" }}>
              <form>
                <TextField value={name} onChange={onNameChanged} name="name" id="name" fullWidth={true} placeholder="Name" />
                <DropDown
                  name="cities"
                  value={1}
                  dropDownData={dropDownData}
                  fullWidth={true}
                  floatingLabelText="City"
                  floatingLabelStyle={{ textAlign: "left", color: "#6090ae" }}
                  style={{ border: "1px solid #e6e6e6" }}
                />
                <TextField
                  onChange={onPhoneNumberChanged}
                  value={phoneNumber}
                  name="phone-number"
                  id="phone-number"
                  underlineShow={false}
                  fullWidth={true}
                  placeholder="Phone Number"
                />
                <Button onClick={login} primary={true} label="Submit" fullWidth={true} />
              </form>
            </div>
          }
        />
      </div>
    );
  }
}

export default withRouter(Login);
