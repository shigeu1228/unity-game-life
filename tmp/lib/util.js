'use strict';

/**
 * count checkTime
 * ex) d1 : 2013-01-01 10:58:00
 *    now : 2013-01-01 11:03:00
 *  return: 1
 */
var countCheckTime = function(dt1) {
  var d1 = new Date(dt1);
  var dt2 = Date.now();

  var count = 0;

  var m = d1.getMinutes();
  var s = d1.getSeconds();
  var ms = d1.getMilliseconds();

  var c = ((9 - (m % 10)) * 60 * 1000) + ((59 - s) * 1000) + (1000 - ms);

  var ndt = dt1 + c;

  while (ndt <= dt2) {
    count++;
    ndt+= (1000 * 60 * 10); // 10 minute
  }

  return count;
};


/**
 * judge action pattern
 */
var action = function() {
  var between = function(s, b, a) {
    return s >= b && s < a;
  };

  var seed = Math.random() * 100;
  action = {};

  if (between(seed, 0, 20)) {
    action.type = LIFE.entity.ActionType.NONE;
  } else if (between(seed, 20, 50)) {
    action.type = LIFE.entity.ActionType.ADVENT;
  } else if (between(seed, 50, 80)) {
    action.type = LIFE.entity.ActionType.GROWTH;
  } else if (between(seed, 80, 90)) {
    action.type = LIFE.entity.ActionType.RIOT;
  } else if (between(seed, 90, 100)) {
    action.type = LIFE.entity.ActionType.METEO;
  }
  return action;
};

