var React = require('react'),
  moment = require('moment'),
  Box = require('./ChirpBox'),
  UserStore = require('../stores/users');

var ChirpList = React.createClass({
  render: function () {

    var items = this.props.chirps.map(function (chirp) {
      return (
        <Box
          key={chirp.cid}
          user={chirp}
          timestamp={moment(chirp.$created).fromNow()}>

          {chirp.text}

        </Box>
      );
    });
    return (
      <ul>
        {items}
      </ul>
    );
  }
});

module.exports = ChirpList;
