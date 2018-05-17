export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_ALL_USERS':
      console.log('action: ', action);
      console.log('magic happended!');
      return { ...state };
    default:
      console.log('in default');
      return { ...state };
  }
}
