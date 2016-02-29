"use strict";
var Sequelize = require('sequelize');
var es5 = require("./async");

var sequelize = new Sequelize(
  "aurafit",
  "fitnes",
  "fitnes", {
    host: "localhost",
    dialect: "mysql",
    logging:false
  });

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  news: Sequelize.STRING,
});

es5.async(function * n() {

  yield * es5.await(sequelize.sync({
    force: true
  }));
  var promises = []
  for (var i =0 ; i < 100; i++) {
    promises[i] = User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    });
  }
  var peoples = yield * es5.await.apply(null, promises);
  console.log(peoples[99].get({
    plain: true
  }))
  var jane = yield * es5.await(User.findById(16));
  console.log(jane.get({
    plain: true
  }));
});
