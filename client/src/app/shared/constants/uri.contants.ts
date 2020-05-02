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
    getAll: 'products',
    get: 'products/{id}',
    add: 'products',
    update: 'products:/{id}'
  },
  categories: {
    getAll: 'categories',
    getSubCategories: 'categories/{id}/subCategories'
  },
  orders: {
    placeOrder: 'orders'
  },
  twitter: {
    postTwitt: 'twitter'
  },
  users: {
    productsList: 'users/productsList'
  },
  development: {
    releaseRented: 'products/_releaseRented',
    releaseDeleted: 'products/_releaseDeleted'
  },
  shops: {
    getAll: 'shops',
    getAllProducts: 'products',
    getProduct: 'products/{productId}'
  },
  pollutionIndicator: {
    getAirPollution: 'airPollution'
  }
};
