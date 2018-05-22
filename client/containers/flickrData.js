import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlickrData } from './../actions/flickDataActions';

class FlickrData extends Component {
  componentDidMount() {
    this.props.fetchFlickrData();
  }

  render() {
    console.log(this.props);
    return (
      <div>ASDAsssS</div>
    );
  }
}

const mapStateToProps = state => ({
  flickrData: state.flickrDataReducer,
});

const mapDispatchToProps = dispatch => ({
  fetchFlickrData: () => dispatch(fetchFlickrData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlickrData);
