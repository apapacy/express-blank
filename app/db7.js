"use strict";
var Sequelize = require('sequelize');
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

(async function(){
  await(sequelize.sync({force:true}))
})();
