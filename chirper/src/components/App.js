var React = require('react');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <h1>Chirper</h1>
        </div>

        <div className="row">
          <div className="three columns">
            Navigation
          </div>
          <div className="nineColumns">
            Nested Content Coming soon
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
