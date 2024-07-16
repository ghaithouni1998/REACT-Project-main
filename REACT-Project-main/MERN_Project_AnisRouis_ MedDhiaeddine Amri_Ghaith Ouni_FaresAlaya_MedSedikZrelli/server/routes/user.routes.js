const { register, login, logout, getLoggedUser, updateUser,registerAdmin,buyAuction,getBoughtAuctions, getAllUserAuctions, addFav, getAllFavorites } = require('../controllers/user.controller');

module.exports = app => {
  app.post('/api/register', register);
  app.post('/api/admin/register', registerAdmin);
  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.get('/api/user/:id', getLoggedUser);
  app.put('/api/user/edit/:id', updateUser);
  app.post('/api/buy', buyAuction)
  
  // app.get('/api/user/auctions', getBoughtAuctions)      //commented the old function out
  app.get('/api/user/auctions/:id', getAllUserAuctions)
  app.post('/api/favorite', addFav)
  app.get('/api/allFav/:id', getAllFavorites)


};
