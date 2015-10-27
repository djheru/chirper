var constants = require('../constants'),
  ChirpStore = require('./store').extend({
    init: function () {
      this.bind(constants.GOT_CHIRPS, this.set);
      this.bind(constants.CHIRPED, this.add);
    }
  });

module.exports = ChirpStore;
