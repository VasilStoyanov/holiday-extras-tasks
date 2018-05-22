import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlickrData } from './../actions/flickDataActions';
import './../css/flickrData.css';

class FlickrData extends Component {
  componentDidMount() {
    this.props.fetchFlickrData();
  }

  render() {
    const flickrData = this.props.flickrData.items || [];
    const flickrDataCards = flickrData.map((item, i) => {
      const imageStyles = {
        background: `url("${item.media.m}") center / cover`,
      };

      return (
        <div key={i} className="demo-card-wide mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title flickr-images" style={imageStyles}>
            <h2 className="mdl-card__title-text">
              { item.title.length < 25 ? item.title : `${item.title.substr(0, 25)}...` }
            </h2>
          </div>
          <div className="mdl-card__supporting-text">
            <a href={`https://www.flickr.com/people/${item.author_id}`} target="_blank">
              { item.author.substr(20, item.author.length).replace(/['"]+/g, '').split(')') }
            </a> posted a <a href={item.link} target="_blank">photo</a>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            Tags: { item.tags.length > 0 ? item.tags : 'No tags'}
          </div>
        </div>
      );
    });

    return (
      <div id="flickr-data-container">
        { flickrDataCards }
      </div>
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
