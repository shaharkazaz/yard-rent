export const URI_CONSTANTS = {
  auth: {
    login: 'users/login',
    signup: 'users/signup',
    getUser: 'users/getuser'
  },
  management: {
    getWeeklyData: 'statistics/graph-1',
    getAllUsers: 'users/getAll',
    deleteUser: 'users/deleteuser/{id}',
    updateUser: 'users/updateuser/{id}'
  },
  products: {
    getAllProducts: 'products',
    getProduct: 'products/{productId}'
  },
  pollutionIndicator: {
    getAirPollution: 'airPollution'
  }
};
