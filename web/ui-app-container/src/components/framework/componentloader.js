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
  state = {
    url: '',
  };

  componentDidMount() {
    const iframe = this.ifr;

    iframe.onload = () => {
      const localStorage = Object.assign({}, window.localStorage);
      iframe.contentWindow.postMessage(localStorage, '*');
    };

    const url = this.getIframeUrl(this.props);
    this.setState({ url });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.hash !== this.props.location.hash) {
      const url = this.getIframeUrl(nextProps);
      this.setState({ url });
    }
  }

  // very hacky method
  getIframeUrl = props => {
    const paramsString = props.location.search;
    const hash = props.location.hash;
    const params = new URLSearchParams(paramsString);
    const url = params.get('url');
    return url + hash;
  };

  generateFullUrl = url => {
    if (process.env.NODE_ENV === 'development') {
      const MODULE_URL = process.env.REACT_APP_MODULE_URL;
      url = `${MODULE_URL}${url}`;
    }
    return url;
  };

  render() {
    const { url } = this.state;
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
            src={url}
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
