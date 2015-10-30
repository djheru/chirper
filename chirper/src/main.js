var React = require('react'),
  ReactRouter = require('react-router'),
  Route = ReactRouter.Route,
  App = require('./components/App'),
  Home = require('./components/Home'),
  UserProfile = require('./components/UserProfile'),
  UserList = require('./components/UserList'),
  API = require('./api');

var routes = (
  <Route handler={App}>
    <Route name='home' path='/' handler={Home} />
    <Route name='users' handler={UserList} />
    <Route name='user' path='/user/:id' handler={UserProfile} />
  </Route>
);

var initializeRouter = function () {
  ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Root) {
    React.render(<Root />, document.getElementById('app'));
  });
};

API.startFetchingUsers()
  .then(API.startFetchingChirps)
  .then(initializeRouter);


