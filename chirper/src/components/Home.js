var React = require('react'),
  ChirpInput = require('./ChirpInput'),
  ChirpStore = require('../stores/chirps'),
  ChirpList = require('./ChirpList'),
  actions = require('../actions');

var Home = React.createClass({

  getInitialState: function () {
    return {
      chirps: ChirpStore.all()
    };
  },

  componentDidMount: function () {
    ChirpStore.addChangeListener(this.onChange);
  },

  onChange: function () {
    this.setState(this.getInitialState());
  },

  componentWillUnmount: function () {
    ChirpStore.removeChangeListener(this.onChange);
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

