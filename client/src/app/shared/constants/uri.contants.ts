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
    deleteUser: 'users//delete',
    updateUser: 'users/updateuser/{id}'
  },
  products: {
    getAll: 'products',
    get: 'products/{id}',
    add: 'products',
    update: 'products/update/{id}',
    delete: 'products/delete',
    returnItems: 'products/returnProducts',
    getRecommendations: 'recommendations/{id}'
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
    productsList: 'users/productsList',
    ordersList: 'users/ordersList',
    getUserById: 'users/getUserById/{id}',
    updateUser: 'users/update/{id}'
  },
  development: {
    releaseRented: 'products/_releaseRented',
    releaseDeleted: 'products/_releaseDeleted'
  },
  shops: {
    getAll: 'shops'
  }
};
