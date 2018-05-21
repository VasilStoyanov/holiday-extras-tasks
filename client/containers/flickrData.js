import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlickrData } from './../actions/flickDataActions';

class FlickrData extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <img src="https://farm1.staticflickr.com/828/40454311670_860a470fd6_m.jpg" />
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
