var React = require('react'),
  UserStore = require('../stores/users'),
  ChirpStore = require('../stores/chirps'),
  utils = require('../utils'),
  FollowButton = require('./FollowButton');

var UserProfile = React.createClass({
  getInitialState: function () {
    var id = parseInt(this.props.params.id, 10),
      user = UserStore.get(id);
    console.log('userid: ', id);
    console.log('user: ', user);

    return {
      user:  user,
      chirps: ChirpStore.byUserId(id)
    }
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this.onChange);
    ChirpStore.addChangeListener(this.onChange);
  },

  onChange: function () {
    this.setState(this.getInitialState());
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this.onChange);
    ChirpStore.removeChangeListener(this.onChange);
  },

  render: function () {
    var chirps = this.state.chirps.map(function (chirp) {
      return (<li key={chirp.cid}>{chirp.text}</li>);
    });
    return (
      <div>
        <img className='two columns' src={utils.avatar(this.state.user.email)} />
        <div className='ten columns'>
          <h1>{this.state.user.fullname}</h1>
          <h3 className='timestamp'> @{this.state.user.username}</h3>
          <p><FollowButton userId={this.state.user.cid} /></p>
          <ul>
            {chirps}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = UserProfile;