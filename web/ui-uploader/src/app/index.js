import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { login } from "./actions";

// component
const App = () => {
  return (
    <div className="App">
      <Main />
    </div>
  );
};

// container
class AppContainer extends Component {
  constructor(props) {
    super(props);
    window.addEventListener("message", this.handleFrameTasks);
  }

  handleFrameTasks = e => {
    const { origin, data: message } = e;
    if (origin !== window.origin && message.token && message.userRequest) {
      this.props.login(message);
    }
  };

  render() {
    return <App />;
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  login: message => dispatch(login(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
