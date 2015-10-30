var assign = require('object-assign'),
  dispatcher = require('../dispatcher')
  EventEmitterProto = require('events').EventEmitter.prototype;

var CHANGE_EVENT = 'CHANGE';

var storeMethods = {
  init: function () {},
  set: function (arr) {
    console.log('setting: ', arr);
    var currentIds = this._data.map(function (m) { return m.cid; });
    arr.filter(function (item) {
      return (currentIds.indexOf(item.cid) === -1);
    }).forEach(this.add.bind(this));

    this.sort();

  },
  add: function (item) {
    console.log(item);
    this._data.push(item);
    console.log(this._data);
    this.sort();
  },
  sort: function () {
    this._data.sort(function (a, b) {
      return +new Date(b.$created) - +new Date(a.$created);
    });
  },
  all: function () {
    return this._data;
  },
  get: function (cid) {
    console.log('this user data: ', this._data, cid);
    return this._data.filter(function (item) {
      return (item.cid === cid);
    })[0] || {};
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
        store.emitChange();
      });
    }
  });

  return store;

};
