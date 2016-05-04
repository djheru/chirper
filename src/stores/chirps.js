var constants = require('../constants'),
  UserStore = require('./users'),
  ChirpStore = require('./store').extend({
    init: function () {
      this.bind(constants.GOT_CHIRPS, this.set);
      this.bind(constants.CHIRPED, this.add);
    },
    timeline: function () {
      var ids = [UserStore.currentUser.cid]
        .concat(UserStore.currentUser.following);

      return this._data.filter(function (chirp) {
        return ids.indexOf(chirp.userId) >= 0;
      });
    },
    byUserId: function (id) {
      return this._data.filter(function (chirp) {
        return chirp.userId === id;
      });
    }
  });

module.exports = ChirpStore;
