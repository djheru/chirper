var React = require('react'),
  utils = require('../utils'),
  Link = require('react-router').Link;

var ChirpBox = React.createClass({
  render: function () {
    var user = this.props.user,
      userId = user.userId || user.cid,
      timestamp = this.props.timestamp ?
      ' ' + String.fromCharCode(8226) + ' ' + this.props.timestamp : '';

    console.log('user ID: ', userId, user);
    return (

      <li className='row chirp'>
        <Link className='two columns' to='user' params={ {id: userId} }>
          <img src={utils.avatar(user.email)} />
        </Link>
        <div className='ten columns'>
          <p>
            <strong>{user.fullname}</strong>
            <span className='timestamp'>
              @{user.username} {timestamp}
            </span>
          </p>
          <p>{this.props.children}</p>
        </div>
      </li>

    );
  }
});

module.exports = ChirpBox;
