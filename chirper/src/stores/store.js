var assign = require('object-assign'),
  dispatcher = require('../dispatcher')
  EventEmitterProto = require('events').EventEmitter.prototype;

var CHANGE_EVENT = 'CHANGE';

var storeMethods = {
  init: function () {},
  set: function (arr) {
    console.log(this);
    var currentIds = this._data.map(function (m) { return m.cid; });
    arr.filter(function (item) {
      return (currIds.indexOf(item.cid) === -1);
    }).forEach(this.add.bind(this));

    console.log('set data: ', this._data);

  },
  add: function (item) {
    this._data.push(item);
  },
  all: function () {
    return this._data;
  },
  get: function (cid) {
    return this._data.filter(function (item) {
      return (item.cid === cid);
    })[0];
  },
  addChangeListener: function (cb) {
    this.on(CHANGE_EVENT, cb)
  },
  removeChangeListener: function (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  bind: function (actionType, cb) {
    if (this.actions[actionType]) {
      this.actions[actionType].push(cb);
    } else {
      this.actions[actionType] = [ cb ];
    }
  }
};

exports.extend = function (methods) {

  var store = {
    _data: [],
    actions: {}
  };

  assign(store, EventEmitterProto, storeMethods, methods);
  store.init();
  dispatcher.register(function (action) {
    if (store.actions[action.actionType]) {
      store.actions[action.actionType].forEach(function (cb) {
        cb.call(store, action.data);
      });
    }
  });

  return store;

};
