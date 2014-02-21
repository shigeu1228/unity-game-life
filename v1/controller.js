$(document).ready(function(){
  if (window.navigator.cookieEnabled) {
    load();
  }
  else {
    alert("Cookieを有効にしてください");
  }



  /////

  $('#bpb').on('click', function() {
    var x = $('#bpx').val();
    var y = $('#bpy').val();
    var result = buyPlane(x, y);
    console.log(result);
  });

  $('#beb').on('click', function() {
    var x = $('#bex').val();
    var y = $('#bey').val();
    var result = buyEnegy(x, y);
    console.log(result);
  });

  /////
});

var login = function() {
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

  }
  // send unity chenge scene
};


var load = function() {
  var user = User.getUser();
  var userMap, userHistory;

  if (user === null) {
    console.log("not exists user");
    return;
  }

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
};


var logic = function(user, callback) {
  var t1 = Date.now();
  var checkActionTime = countCheckTime(user.time.access);
  var actionCount = checkActionTime.count || 0;
  console.log(actionCount);
  user.time.access = Date.now();
  User.setUser(user);

  console.log("count:" + (t1 - Date.now()) + "ms");

  if (actionCount === 0) {
    return callback();
  }



  for (var i = 0; i < actionCount; i++) {
    var t = Date.now();
    addEnegy();
    var actionType = chooseAction();
    logicAction(actionType, checkActionTime.times[i]);
    reduceEnegy();
    correctEnegy();

    console.log("action:" + actionType.type + "  :" + (t - Date.now()) + "ms");
  }

  return callback();
};
