"use strict";
var Sequelize = require('sequelize');
var async = require("./async").async;
var await = require("./async").await;
var sequelize = new Sequelize(
  "aurafit",
  "fitnes",
  "fitnes", {
    host: "localhost",
    dialect: "mysql"
  });

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  news: Sequelize.STRING,
});

async(function*(){
  try {
    yield * await(sequelize.sync({force:true}));
    let jane = yield * await(User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    }), "ininininini");
    console.log(jane)
    yield * await(console.log(jane[0].get({
      plain: true
    })));
    var stri = yield * await("test")
    console.log("++++" + str)
    var one = yield * await (User.findById(1, {
      plain: true
    }));
    console.log("***************");
    console.log(one.get({
      plain: true
    }));
    var none = yield * await (User.findById(200000, {
      plain: true
    }));
    console.log("***************");
    console.log(two.get({
      plain: true
    }));
    var two = yield * await (User.findById(2, {
      plain: true
    }));
    console.log("***************");
    console.log(two.get({
      plain: true
    }));
  } catch (ex) {
    console.log(ex)
  }
});
