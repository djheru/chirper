var React = require('react'),
  ReactRouter = require('react-router'),
  Route = ReactRouter.Route,
  App = require('./components/App'),
  Home = require('./components/Home'),
  API = require('./api');

var routes = (
  <Route handler={App}>
    <Route name='home' path='/' handler={Home} />
  </Route>
);
API.fetchChirps();
ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Root) {
  React.render(<Root />, document.getElementById('app'));
})
