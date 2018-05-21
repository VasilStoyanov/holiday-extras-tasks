const getAllUsers = () => ({ type: 'FETCH_ALL_USERS' });
const createNewUser = payload => ({ type: 'CREATE_NEW_USER', payload });

export {
  getAllUsers,
  createNewUser,
};
