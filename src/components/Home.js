var React = require('react'),
  ChirpInput = require('./ChirpInput'),
  ChirpStore = require('../stores/chirps'),
  ChirpList = require('./ChirpList'),
  actions = require('../actions');

var Home = React.createClass({

  mixins: [ChirpStore.mixin()],

  getInitialState: function () {
    return {
      chirps: ChirpStore.timeline()
    };
  },

  onChange: function () {
    this.setState(this.getInitialState());
  },

  render: function () {
    return (
      <div>
        <ChirpInput onSave={this.saveChirp} />
        <ChirpList chirps={this.state.chirps} />
      </div>
    );
  },

  saveChirp: function (text) {
    actions.chirp(text);
  }
});

module.exports = Home;

