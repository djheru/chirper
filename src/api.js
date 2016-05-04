var actions = require('./actions'),
  dispatcher = require('./dispatcher'),
  constants = require('./constants');

var API = {

  fetchChirps: function () {
    return get('/api/chirps')
      .then(actions.gotChirps.bind(actions));
  },

  fetchUsers: function (cb) {
    return get('/api/users')
      .then(actions.gotUsers.bind(actions));
  },

  startFetchingChirps: function () {
    this.fetchChirps();
    return setInterval(this.fetchChirps, 1000);
  },

  startFetchingUsers: function () {
    this.fetchUsers();
    return setInterval(this.fetchUsers, 1000);
  },

  saveChirp: function (text) {
    text = text.trim();
    if (text === '') {
      return;
    }

    post('/api/chirps', { text: text })
      .then(actions.chirped.bind(actions));
  },

  follow: function (id) {
    post('/api/follow/' + id)
      .then(actions.followed.bind(actions));
  },

  unfollow: function (id) {
    post('/api/unfollow/' + id)
      .then(actions.unfollowed.bind(actions));
  }
};

var get = function (url) {
  return fetch(url, {
    credentials: 'same-origin'
  }).then(function (res) {
    return res.json();
  });
};

var post = function (url, body) {
  return fetch(url, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body || {}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  });
};

dispatcher.register(function (action) {

  switch (action.actionType) {

    case constants.CHIRP:
      API.saveChirp(action.data);
      break;
    case constants.FOLLOW:
      API.follow(action.data);
      break;
    case constants.UNFOLLOW:
      API.unfollow(action.data);
      break;
  }

})

module.exports = API;
