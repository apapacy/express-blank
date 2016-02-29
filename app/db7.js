"use strict";
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  "aurafit",
  "fitnes",
  "fitnes", {
    host: "localhost",
    dialect: "mysql",
    logging: false
  });

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  news: Sequelize.STRING,
});
var test = null;
try{
console.log(test.get({
  plain: true
}));
}catch(ex){
  console.error(ex)
}

(async function() {
try {

  await sequelize.sync({
    force: true
  });
  var promises = []
  for (var i = 0; i < 100; i++) {
    promises[i] = User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    });
  }
  var peoples = await Promise.all(promises);
  console.log(peoples[99].get({
    plain: true
  }))
  var jane = await User.findById(160);
  console.log(jane)
  console.log(jane.get({
    plain: true
  }));
  console.log("*****************")
} catch (ex) {
console.error(ex)
}

})();
