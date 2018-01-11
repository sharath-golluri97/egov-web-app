import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { withRouter } from 'react-router';

import Header from './common/Header';
import Footer from './common/Footer';
import Snackbar from 'material-ui/Snackbar';
import LoadingIndicator from './common/LoadingIndicator';
import router from '../router';
import Api from '../api/api';

class App extends Component {
  componentDidMount() {
    window.addEventListener(
      'message',
      e => {
        const { type, message } = e.data;
        switch (type) {
          case 'api_error':
            this.props.history.replace('/');
            this.props.onRedirect();
            break;
          default:
            break;
        }
      },
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      console.log('Redirect Url');
      console.log(nextProps.redirectTo);
      this.props.history.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  tenantSearch = async () => {};

  componentWillMount() {
    let { setTenantInfo, setActionList } = this.props;

    if (localStorage.getItem('token') && localStorage.getItem('userRequest')) {
      this.props.onLoad({ UserRequest: JSON.parse(localStorage.getItem('userRequest')) }, localStorage.getItem('token'));
      Api.commonApiPost('tenant/v1/tenant/_search', {
        code: localStorage.getItem('tenantId') ? localStorage.getItem('tenantId') : 'default',
      }).then(
        function(res) {
          setActionList(JSON.parse(localStorage.getItem('actions')));
          setTenantInfo(res.tenant);
        },
        function(err) {
          console.log(err);
        }
      );
    } else {
      var hash = window.location.hash.split('/');
      var urlCode = hash[1];
      if (hash[1].match('/?')) {
        var codeArray = hash[1].split('?');
        urlCode = codeArray[0];
      }
      Api.commonApiPost(
        'tenant/v1/tenant/_search',
        {
          code: hash[1] ? urlCode : 'default',
          tenantId: hash[1] ? urlCode : 'default',
        },
        {},
        true
      ).then(
        function(res) {
          setTenantInfo(res.tenant);
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }

  handleClose = () => {
    this.props.toggleDailogAndSetText(false, '');
  };

  render() {
    var {
      toggleDailogAndSetText,
      toggleSnackbarAndSetText,
      isDialogOpen,
      msg,
      isSnackBarOpen,
      toastMsg,
      loadingStatus,
      isSuccess,
      isError,
      showMenu,
      actionList,
    } = this.props;

    const actions = [<FlatButton label="Ok" primary={true} onTouchTap={this.handleClose} />];
    return (
      <div className="App">
        <div className={classnames('app-content', { expanded: showMenu || false })}>
          <Header />
          {router}
          <Footer />
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
        <LoadingIndicator status={loadingStatus || 'hide'} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  redirectTo: state.common.redirectTo,
  token: state.common.token,
  isDialogOpen: state.form.dialogOpen,
  msg: state.form.msg,
  isSnackBarOpen: state.form.snackbarOpen,
  toastMsg: state.form.toastMsg,
  loadingStatus: state.form.loadingStatus,
  isSuccess: state.form.isSuccess,
  isError: state.form.isError,
  showMenu: state.common.showMenu,
  actionList: state.common.actionList,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: 'REDIRECT' }),
  setRoute: route => dispatch({ type: 'SET_ROUTE', route }),
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
  setTenantInfo: tenantInfo => {
    dispatch({ type: 'SET_TENANT_INFO', tenantInfo });
  },
  setActionList: actionList => {
    dispatch({ type: 'SET_ACTION_LIST', actionList });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
