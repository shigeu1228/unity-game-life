'use strict';

/**
 * count checkTime
 * ex) d1 : 2013-01-01 10:58:00
 *    now : 2013-01-01 11:03:00
 *  return: 1
 */
var countCheckTime = function(dt1) {
  var data = {
    count: 0,
    times: []
  };

  var dt2 = Date.now();
  if (dt2 - dt1 > (1000 * 60 * 60 * 24 * 7)) {
    dt1 = dt2 - (1000 * 60 * 60 * 24 * 7); // max 1 week
  }

  var d1 = new Date(dt1);

  var m = d1.getMinutes();
  var s = d1.getSeconds();
  var ms = d1.getMilliseconds();

  var c = ((9 - (m % 10)) * 60 * 1000) + ((59 - s) * 1000) + (1000 - ms);

  var ndt = dt1 + c;

  var count = 0;
  while (ndt <= dt2) {
    count++;
    data.times.push(ndt);
    ndt+= (1000 * 60 * 10); // 10 minute
  }

  data.count = count;

  return data;
};


/**
 * choose action pattern
 */
var chooseAction = function() {
  var between = function(s, b, a) {
    return s >= b && s < a;
  };

  var seed = Math.random() * 100;
  var actionType = {};

  var user = User.getUser();
  // if low enegy
  if (user.enegy <= 0) {

    if (between(seed, 0, 60)) {
      actionType.type = LIFE.entity.ActionType.NONE;
    } else if (between(seed, 60, 90)) {
      actionType.type = LIFE.entity.ActionType.RIOT;
    } else if (between(seed, 90, 95)) {
      actionType.type = LIFE.entity.ActionType.METEO;
    } else if (between(seed, 95, 100)) {
      actionType.type = LIFE.entity.ActionType.MONEY;
    }
    return actionType;
  }

  if (between(seed, 0, 20)) {
    actionType.type = LIFE.entity.ActionType.NONE;
  } else if (between(seed, 20, 50)) {
    actionType.type = LIFE.entity.ActionType.ADVENT;
  } else if (between(seed, 50, 80)) {
    actionType.type = LIFE.entity.ActionType.GROWTH;
  } else if (between(seed, 80, 85)) {
    actionType.type = LIFE.entity.ActionType.RIOT;
  } else if (between(seed, 85, 90)) {
    actionType.type = LIFE.entity.ActionType.METEO;
  } else if (between(seed, 90, 100)) {
    actionType.type = LIFE.entity.ActionType.MONEY;
  }
  return actionType;
};


/**
 * action
 */
 var logicAction = function(actionType, time) {
  if (actionType.type === LIFE.entity.ActionType.NONE) {
    // NONE
    return;

  } else if (actionType.type === LIFE.entity.ActionType.ADVENT) {
    // ADVENT TENT
    var userMap = User.getUserMap();

    var count = 0;
    while (count < LIFE.config.ADVENT_TRY_COUNT) {
      var xy = getXY();

      if (userMap[xy.x][xy.y] === LIFE.entity.MapType.PLANE) {
        userMap[xy.x][xy.y] = LIFE.entity.MapType.TENT;
        var text = '[' + xy.x + '][' + xy.y + ']';
        text += 'に' + LIFE.config.NAME.TENT + 'が建ちました!';
        createHistory(text, time);
        return;
      }

      count++;
    }
  } else if (actionType.type === LIFE.entity.ActionType.GROWTH) {
    // GROWTH
    var userMap = User.getUserMap();

    var count = 0;
    while (count < LIFE.config.GROWTH_TRY_COUNT) {
      var xy = getXY();
      var map = userMap[xy.x][xy.y];
      var text = '[' + xy.x + '][' + xy.y + ']';

      if (map === LIFE.entity.MapType.TENT) {
        userMap[xy.x][xy.y] = LIFE.entity.MapType.HOUSE;
        text += 'が' + LIFE.config.NAME.HOUSE + 'に成長しました!';
        createHistory(text, time);
        return;
      } else if (map === LIFE.entity.MapType.HOUSE) {
        userMap[xy.x][xy.y] = LIFE.entity.MapType.BILL;
        text += 'が' + LIFE.config.NAME.BILL + 'に成長しました!';
        createHistory(text, time);
        return;
      } else if (map === LIFE.entity.MapType.BILL) {
        userMap[xy.x][xy.y] = LIFE.entity.MapType.CITY;
        text += 'が' + LIFE.config.NAME.CITY + 'に成長しました!';
        createHistory(text, time);
        return;
      }

      count++;
    }


  } else if (actionType.type === LIFE.entity.ActionType.RIOT) {
    // RIOT
    var userMap = User.getUserMap();

    var count = 0;
    while (count < LIFE.config.GROWTH_TRY_COUNT) {
      var xy = getXY();
      var map = userMap[xy.x][xy.y];
      var text = '[' + xy.x + '][' + xy.y + ']';

      if (map === LIFE.entity.MapType.TENT) {
        userMap[xy.x][xy.y] = LIFE.entity.MapType.PLANE;
        text += 'が' + LIFE.config.NAME.RIOT + 'により' +  LIFE.config.NAME.PLANE + 'に減退しました...';
        createHistory(text, time);
        return;
      } else if (map === LIFE.entity.MapType.HOUSE) {
        userMap[xy.x][xy.y] = LIFE.entity.MapType.TENT;
        text += 'が' + LIFE.config.NAME.RIOT + 'により' +  LIFE.config.NAME.TENT + 'に減退しました...';
        createHistory(text, time);
        return;
      } else if (map === LIFE.entity.MapType.BILL) {
        userMap[xy.x][xy.y] = LIFE.entity.MapType.HOUSE;
        text += 'が' + LIFE.config.NAME.RIOT + 'により' +  LIFE.config.NAME.HOUSE + 'に減退しました...';
        createHistory(text, time);
        return;
      } else if (map === LIFE.entity.MapType.CITY) {
        userMap[xy.x][xy.y] = LIFE.entity.MapType.BILL;
        text += 'が' + LIFE.config.NAME.RIOT + 'により' +  LIFE.config.NAME.BILL + 'に減退しました...';
        createHistory(text, time);
        return;
      }

      count++;
    }


  } else if (actionType.type === LIFE.entity.ActionType.METEO) {
    // METEO
    var userMap = User.getUserMap();
    var xy = getXY();
    var map = userMap[xy.x][xy.y];
    var text = '[' + xy.x + '][' + xy.y + ']';
    text += 'に' + LIFE.config.NAME.METEO + 'が墜落しました。';
    createHistory(text, time);
    return;

  } else if (actionType.type === LIFE.entity.ActionType.MONEY) {
    // MONEY
    var user = User.getUser();
    var number = countNumberOfPeople();
    var money = number * LIFE.config.NUMBER.MONEY_RATE;
    user.money += money;
    User.setUser(user);
    var text = '住民が' + money + '円をわけてくれました！';
    createHistory(text, time);
    return;
  }
 };



/**
 * add enegy
 */
var addEnegy = function() {
  var user = User.getUser();
  var number = countNumberOfEnegy();
  var add = LIFE.config.ADD_ENEGY_POINT * number;
  user.enegy = user.enegy + add;
  User.setUser(user);
};

/**
 * reduce enegy
 */
var reduceEnegy = function() {
  var user = User.getUser();
  var reduce = countNumberOfPeople();
  user.enegy = user.enegy - reduce;
  User.setUser(user);
};

var correctEnegy = function() {
  var user = User.getUser();
  if (user.enegy > 0) {
    var number = countNumberOfEnegy();
    var max = LIFE.config.MAX_ENEGY * number;
    var after = Math.min(user.enegy, max);
    if (user.enegy !== after) {
      user.enegy = after;
      User.setUser(user);
    }
  } else if (user.enegy < 0) {
    user.enegy = 0;
    User.setUser(user);
  }
}


 var getXY = function() {
  var x = Math.random() * LIFE.config.MAP_LENGTH;
  var y = Math.random() * LIFE.config.MAP_LENGTH;
  return {x: Math.floor(x), y: Math.floor(y)};
 };


var countNumberOfPeople = function() {
  var userMap = User.getUserMap();
  var number = 0;
  for (var i = 0; i < LIFE.config.MAP_LENGTH; i++) {
    for (var j = 0; j < LIFE.config.MAP_LENGTH; j++) {

      var map = userMap[i][j];

      if (map === LIFE.entity.MapType.TENT) {
        number += LIFE.config.NUMBER.TENT;
      } else if (map === LIFE.entity.MapType.HOUSE) {
        number += LIFE.config.NUMBER.HOUSE;
      } else if (map === LIFE.entity.MapType.BILL) {
        number += LIFE.config.NUMBER.BILL;
      } else if (map === LIFE.entity.MapType.CITY) {
        number += LIFE.config.NUMBER.CITY;
      }

    }
  }
  return number;
}

var countNumberOfEnegy = function() {
  var userMap = User.getUserMap();
  var number = 0;
  for (var i = 0; i < LIFE.config.MAP_LENGTH; i++) {
    for (var j = 0; j < LIFE.config.MAP_LENGTH; j++) {

      var map = userMap[i][j];

      if (map === LIFE.entity.MapType.ENEGY) {
        number++;
      }

    }
  }
  return number;
}


/**
 * create new history and keep length 10
 */
var createHistory = function(text, time) {
  var userHistory = User.getUserHistory();
  userHistory.unshift({text: text, time: time});
  if (userHistory.length > LIFE.config.HISTORY_LENGTH) {
    userHistory.splice(LIFE.config.HISTORY_LENGTH, (userHistory.length - LIFE.config.HISTORY_LENGTH));
  }
  User.setUserHistory(userHistory);
};


/**
 * buy enegy
 */
var buyEnegy = function(x, y) {
  var user = User.getUser();
  var data = {};

  if (user.money < LIFE.config.ENEGY_PRICE) {
    data.result = false;
    data.reason = 'お金が足りません';
    return data;
  }

  var userMap = User.getUserMap();

  if (userMap[x][y] === LIFE.entity.MapType.EMPTY) {
    data.result = false;
    data.reason = '土地がありません';
    return data;
  }

  userMap[x][y] = LIFE.entity.MapType.ENEGY;
  User.updateUserMap(userMap);
  user.money -= LIFE.config.ENEGY_PRICE;
  User.updateUser(user);

  data.result = true;
  return data;
}

/**
 * buy plane
 */
var buyPlane = function(x, y) {
  var user = User.getUser();
  var data = {};

  if (user.money < LIFE.config.PLANE_PRICE) {
    data.result = false;
    data.reason = 'お金が足りません';
    return data;
  }

  var userMap = User.getUserMap();

  if (userMap[x][y] !== LIFE.entity.MapType.EMPTY) {
    data.result = false;
    data.reason = 'すでに土地があります！';
    return data;
  }

  userMap[x][y] = LIFE.entity.MapType.PLANE;
  User.updateUserMap(userMap);
  user.money -= LIFE.config.PLANE_PRICE;
  User.updateUser(user);

  data.result = true;
  return data;
}
