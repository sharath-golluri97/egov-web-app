import React, { Component } from 'react';
import { connect } from 'react-redux';

const styles = {
  container: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '75%',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
};

class ComponentLoader extends Component {
  componentDidMount() {
    this.ifr.addEventListener('load', this.sendMessage);
  }

  sendMessage = () => {
    const message = Object.assign({}, window.localStorage);
    this.ifr.contentWindow.postMessage(message, '*');
  };

  getIframeUrl = () => {
    const base =
      typeof window.localStorage.baseUrl === 'undefined'
        ? typeof process.env.REACT_APP_MODULE_URL === 'undefined' ? window.location.origin : process.env.REACT_APP_MODULE_URL
        : base;

    const path = window.location.pathname;
    return `${base}${path}`;
  };

  render() {
    const url = this.getIframeUrl();
    const { generateFullUrl } = this;

    return (
      <div style={styles.container} className="col-lg-12">
        <iframe
          style={styles.iframe}
          ref={f => {
            this.ifr = f;
          }}
          frameBorder="0"
          src={url}
          allowFullScreen
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  route: state.common.route,
});

export default connect(mapStateToProps, null)(ComponentLoader);
