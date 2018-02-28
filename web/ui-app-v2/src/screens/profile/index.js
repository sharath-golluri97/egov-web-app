import React, { Component } from "react";
import { Card, Button, Label } from "../../components";
import Track from "material-ui/svg-icons/maps/my-location";
import FlatButton from "material-ui/FlatButton";
import "./index.css";

class Profile extends Component {
  render() {
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8" style={{ padding: "0px" }}>
        <div className="cardContainer" style={cardContainers}>
          <Card
            card={{
              style: {
                margin: "3%",
              },
            }}
            textChildren={
              <div className="cardWrapper">
                <div className="left">
                  <span className="label">Name</span>
                  <span>Jaswinder</span>
                </div>
              </div>
            }
          />
          <Card
            card={{
              style: {
                margin: "3%",
              },
            }}
            textChildren={
              <div className="cardWrapper">
                <div className="left">
                  <span className="label">Address</span>
                  <span>#12,Model town,Ludhiana</span>
                </div>
                <div className="right">
                  <FlatButton disableTouchRipple={true} className="iconButton" icon={<Track color="#73aacc" />} />
                </div>
              </div>
            }
          />
          <Button primary={true} label="next" style={{ width: "95%", margin: "28% 2% 5% 2%" }} />
        </div>
      </div>
    );
  }
}

export default Profile;

const cardContainers = {
  backgroundColor: " #f2f2f2",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "350px",
  border: "1px solid #e6e6e6",
  padding: "0px",
};
