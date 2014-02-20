$(document).ready(function(){
  if (window.navigator.cookieEnabled) {
    load();
  }
  else {
    alert("Cookieを有効にしてください");
  }
});


var load = function() {
  var user = User.getUser();
  var userMap, userHistory;

  if (user === null) {
  //if (true) {
    // create new user
    var name = prompt("ようこそ！\n名前をおしえてね！");;
    var count = 0;
    while (!name && count < 5) {
      count++;
    }
    name = name || 'オーナーさん';

    user = LIFE.entity.User.initialize(name);
    userMap = LIFE.entity.UserMap.initialize();
    userHistory = LIFE.entity.UserHistory.initialize();

    User.updateUser(user);
    User.updateUserMap(userMap);
    User.updateUserHistory(userHistory);

    //location.href = location.href;
  } else {

    // on cache
    User.getUserMap();
    User.getUserHistory();

    logic(user, function() {
      user = User.getUser();
      userMap = User.getUserMap();
      userHistory = User.getUserHistory();

      User.updateUser(user);
      User.updateUserMap(userMap);
      User.updateUserHistory(userHistory);

      console.log(user);
      console.log(userMap);
      console.log(userHistory);

      // TODO send for unity
    });
  }
};


var logic = function(user, callback) {
  var checkActionTime = countCheckTime(user.time.access);
  var actionCount = checkActionTime.count || 0;
  console.log(actionCount);
  user.time.access = Date.now();
  User.updateUser(user);
  if (actionCount === 0) {
    return callback();
  }

  for (var i = 0; i < actionCount; i++) {
    addEnegy();
    var actionType = chooseAction();
    logicAction(actionType, checkActionTime.times[i]);
    reduceEnegy();
    correctEnegy();
  }

  return callback();
};
