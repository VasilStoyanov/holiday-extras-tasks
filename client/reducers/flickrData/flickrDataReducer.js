export default function flickrDataReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_FLICKR_DATA_COMPLETED':
      return { ...state, flickrData: action.payload };
    default:
      return { ...state };
  }
}
