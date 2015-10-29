var React = require('react'),
  UserStore = require('../stores/users'),
  actions = require('../actions'),
  Box = require('./ChirpBox'),
  FollowButton = require('./FollowButton'),
  Link = require('react-router').Link;

var UserList = React.createClass({
  getInitialState: function () {
    return {
      users: UserStore.all(),
      user: UserStore.currentUser
    }
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this.onChange);
  },

  onChange: function () {
    this.setState(this.getInitialState());
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this.onChange);
  },
  render: function () {
    var items = this.state.users.filter(function (user) {
      return this.state.user.cid !== user.cid;
    }.bind(this)).map(function (user) {
      return (
        <Box
          key={user.cid}
          user={user}>
            <FollowButton userId={user.cid} />
        </Box>
      );
    });
    return (
      <ul>{items}</ul>
    )
  }
});

module.exports = UserList;
