export const URI_CONSTANTS = {
  auth: {
    login: 'users/login',
    signup: 'users/signup',
    getUser: 'users/getuser',
    sendVerification: 'users/sendVerification',
    verifyCode: 'users/verifyCode'
  },
  management: {
    getWeeklyData: 'statistics/weekly-data',
    getOrdersPerCategory: 'statistics/orders-per-category',
    getAllUsers: 'users/getAll',
    deleteUser: 'users//delete',
    updateUser: 'users/updateuser/{id}'
  },
  products: {
    getAll: 'products/get',
    get: 'products/{id}',
    add: 'products',
    update: 'products/update/{id}',
    delete: 'products/delete',
    returnItems: 'products/returnProducts',
    getRecommendations: 'recommendations/{id}',
    addToWatchlist: 'products/addToFavorites',
    removeFromWatchlist: 'products/removeFromFavorites'
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
    rentedProductsList: 'users/rentedProductsList',
    ordersList: 'users/ordersList',
    getUserById: 'users/getUserById/{id}',
    updateUser: 'users/update/{id}',
    getWatchlist: 'users/getUserFavorites'
  },
  messages: {
    messages: 'messages/all/{id}',
    newMessages: 'messages/newMessages/{id}',
    updateOpen: 'messages/updateIsOpened/{id}',
    updateArchive: 'messages/updateIsArchived/{id}',
    updateReturnStatus: 'messages/updateReturnProcess'
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
