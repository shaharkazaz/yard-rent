export const URI_CONSTANTS = {
  auth: {
    login: 'users/login',
    signup: 'users/signup',
    getUser: 'users/getuser'
  },
  management: {
    getWeeklyData: 'statistics/weekly-data',
    getOrdersPerCategory: 'statistics/orders-per-category',
    getAllUsers: 'users/getAll',
    deleteUser: 'users/deleteuser/{id}',
    updateUser: 'users/updateuser/{id}'
  },
  products: {
    getAllProducts: 'products',
    getProduct: 'products/{id}'
  },
  orders: {
    placeOrder: 'orders'
  },
  twitter: {
    postTwitt: 'twitter'
  },
  development: {
    releaseProducts: 'products/_release'
  }
};
