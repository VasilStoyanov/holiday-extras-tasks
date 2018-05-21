import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlickrData } from './../actions/flickDataActions';

class FlickrData extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.fetchFlickrData()}>Get</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  flickrData: state.flickrDataReducer,
});

const mapDispatchToProps = dispatch => ({
  fetchFlickrData: () => console.log('here') || dispatch(fetchFlickrData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlickrData);
