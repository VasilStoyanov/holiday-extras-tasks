export default function flickrDataReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_FLICKR_DATA_COMPLETED':
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}
