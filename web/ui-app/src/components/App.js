import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-bootstrap';
import Drawer from 'material-ui/Drawer';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import LoadingIndicator from './common/LoadingIndicator';
import router from '../router';
import Api from '../api/api';
import UiLogo from './framework/components/UiLogo';

class App extends Component {
  constructor(props) {
    super(props);
    window.addEventListener('message', this.handleFrameTasks);
  }

  handleFrameTasks = e => {
    const localStorage = e.data;
    Object.keys(localStorage).forEach((index, key) => {
      try {
        window.localStorage.setItem(index, localStorage[index]);
      } catch (error) {
        console.log(error);
      }
    });

    const token = e.data.token;
    const userRequest = e.data.userRequest;

    if (token && userRequest) {
      this.props.login(token, userRequest);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  handleClose = () => {
    this.props.toggleDailogAndSetText(false, '');
  };

  render() {
    const {
      toggleDailogAndSetText,
      toggleSnackbarAndSetText,
      isDialogOpen,
      msg,
      isSnackBarOpen,
      toastMsg,
      loadingStatus,
      isSuccess,
      isError,
    } = this.props;

    const { authenticated } = this.props;

    const actions = [<FlatButton label="Ok" primary={true} onTouchTap={this.handleClose} />];
    return (
      <div className="App">
        <div className="app-content">
          {authenticated ? router : <LoadingIndicator status={'loading'} />}
          <div className="row">
            <div className="col-md-12 text-right">
              <UiLogo src={require('../images/logo.png')} alt="logo" />
            </div>
          </div>
        </div>

        {msg && (
          <Dialog
            style={{ zIndex: 2000 }}
            actions={actions}
            modal={true}
            open={isDialogOpen}
            onRequestClose={() => toggleDailogAndSetText(false, '')}
          >
            {msg}
          </Dialog>
        )}
        {toastMsg && (
          <Snackbar
            open={isSnackBarOpen}
            message={toastMsg}
            style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
            bodyStyle={{
              pointerEvents: 'initial',
              maxWidth: 'none',
              backgroundColor: isSuccess ? '#3ca23c' : isError ? '#e83e36' : 'rgb(95, 92, 98)',
              textAlign: 'center',
            }}
            autoHideDuration={6000}
            onRequestClose={() => toggleSnackbarAndSetText(false, '', false, false)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  redirectTo: state.common.redirectTo,
  token: state.common.token,
  isDialogOpen: state.form.dialogOpen,
  msg: state.form.msg,
  isSnackBarOpen: state.form.snackbarOpen,
  toastMsg: state.form.toastMsg,
  loadingStatus: state.form.loadingStatus,
  isSuccess: state.form.isSuccess,
  isError: state.form.isError,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: 'REDIRECT' }),
  setRoute: route => dispatch({ type: 'SET_ROUTE', route }),
  login: (token, currentUser) => dispatch({ type: 'LOGIN', token, currentUser }),
  toggleDailogAndSetText: (dailogState, msg) => {
    dispatch({ type: 'TOGGLE_DAILOG_AND_SET_TEXT', dailogState, msg });
  },
  toggleSnackbarAndSetText: (snackbarState, toastMsg, isSuccess, isError) => {
    dispatch({
      type: 'TOGGLE_SNACKBAR_AND_SET_TEXT',
      snackbarState,
      toastMsg,
      isSuccess,
      isError,
    });
  },
  setLoadingStatus: loadingStatus => {
    dispatch({ type: 'SET_LOADING_STATUS', loadingStatus });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
