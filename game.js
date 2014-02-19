$(document).ready(function(){
  if (window.navigator.cookieEnabled) {
    test();
  }
  else {
    alert("Cookieを有効にしてください");
  }
});


var test = function() {
  var user = User.getUser();
  var userMap, userHistory;

  if (user === null) {
    // create new user
    user = LIFE.entity.User.initialize('sampleさん');
    userMap = LIFE.entity.UserMap.initialize();
    userHistory = LIFE.entity.UserHistory.initialize();

    console.log("はじめまして");
  } else {

    console.log("こんにちは、" + user.name + "さん");

  }
  // prepare display


  User.updateUser(user);
  User.updateUserMap(userMap);
  User.updateUserHistory(userHistory);
};
