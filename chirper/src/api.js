var actions = require('./actions'),
  dispatcher = require('./dispatcher'),
  constants = require('./constants');

var API = {

  fetchChirps: function () {
    get('/api/chirps')
      .then(actions.gotChirps.bind(actions));
  },

  fetchUsers: function () {
    console.log('fetch users');
    get('/api/users')
      .then(actions.gotUsers.bind(actions));
  },

  saveChirp: function (text) {
    text = text.trim();
    if (text === '') {
      return;
    }

    post('/api/chirps', { text: text })
      .then(actions.chirped.bind(actions));
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
      break
  }

})

module.exports = API;
