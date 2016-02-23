"use strict";
var Sequelize = require('sequelize');
var async = require("./async").async;
var await = require("./async").await;
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
async(function*(){
for (var j =1; j<20;j++)
yield * await(async(function*(){
    var jane = [];
        for(var i =0; i<1000; i++)

    jane[jane.length]=User.create({
      username: 'janedoe' + i,
      birthday: new Date(1980, 6, 20)
    });
    yield * await.apply(null, jane)
    console.log("**********")
    yield * await(console.log(jane[0].get({
      plain: true
    })));
}));
yield * await(async(function*(){
    var jane = [];
        for(var i =0; i<10000; i++) {

    yield * await(User.create({
      username: 'janedoe' + i,
      birthday: new Date(1980, 6, 20)
    }));
    async(function*(){
        var jane = [];
            for(var i =0; i<1000; i++)

        jane[jane.length]=User.create({
          username: 'janedoe' + i,
          birthday: new Date(1980, 6, 20)
        });
        yield * await.apply(null, jane)
        console.log("**********")
        yield * await(console.log(jane[0].get({
          plain: true
        })));
    });
  }

}));
});
