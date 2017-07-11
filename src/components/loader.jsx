import React from 'react';
import { Alert } from 'react-bootstrap';
import '../styling/loader.css';

const Loader = props => (
  <div className="loader">
    <Alert bsStyle="info">
      {props.loaderStatus}...
    </Alert>
    <div className="spinner">
      <div className="cube1" />
      <div className="cube2" />
    </div>
  </div>
);

Loader.propTypes = {
  loaderStatus: React.PropTypes.string.isRequired,
};

export default Loader;
