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
    const iframe = this.ifr;

    iframe.onload = () => {
      const localStorage = Object.assign({}, window.localStorage);
      iframe.contentWindow.postMessage(localStorage, '*');
    };
  }

  getIframeUrl = () => {
    const paramsString = this.props.location.search;
    const hash = this.props.location.hash;
    const params = new URLSearchParams(paramsString);
    const url = params.get('url');
    return url + hash;
  };

  generateFullUrl = url => {
    let base = window.localStorage.baseUrl;

    if (typeof baseUrl === 'undefined') {
      base = window.location.origin;
    }
    if (process.env.NODE_ENV === 'development') {
      base = process.env.REACT_APP_MODULE_URL;
    }
    url = `${base}${url}`;
    return url;
  };

  render() {
    const url = this.getIframeUrl();
    const { generateFullUrl } = this;

    return (
      <div id="container" style={styles.container} className="col-lg-12">
        {
          <iframe
            style={styles.iframe}
            ref={f => {
              this.ifr = f;
            }}
            frameBorder="0"
            src={generateFullUrl(url)}
            allowFullScreen
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  route: state.common.route,
});

export default connect(mapStateToProps, null)(ComponentLoader);
