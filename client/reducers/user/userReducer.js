export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_ALL_USERS_COMPLETED':
      return { ...state, users: action.payload };
    case 'CREATE_NEW_USER_SUCCESS':
      state.users.push(action.payload);
      return { ...state };
    case 'CREATE_NEW_USER_FAIL':
      return { ...state };
    default:
      return { ...state };
  }
}
