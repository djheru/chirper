var React = require('react'),
  ReactRouter = require('react-router'),
  Route = ReactRouter.Route,
  App = require('./components/App'),
  API = require('./api'),
  chirps = require('./stores/chirps');

var routes = (
  <Route handler={App}></Route>
);
API.fetchChirps();
ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Root) {
  React.render(<Root />, document.getElementById('app'));
});
