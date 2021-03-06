LIFE.entity = {};
LIFE.entity.MapType = {
  EMPTY: 0,
  PLANE: 1,
  TENT: 2,
  HOUSE: 3,
  BILL: 4,
  CITY: 5,
  ENEGY: 6
};

LIFE.entity.ActionType = {
  NONE: 0,
  ADVENT: 1,
  GROWTH: 2,
  RIOT: 3,
  METEO: 4,
  MONEY: 5
}


LIFE.entity.User = {
  initialize: function(name) {
    return {
      name: name,
      money: 0,
      enegy: 0,
      v: LIFE.v,
      time: {
        create: Date.now(),
        access: Date.now()
      }
    };
  }
};


LIFE.entity.UserMap = {
  initialize: function() {
    var e = LIFE.entity.MapType.EMPTY;
    var p = LIFE.entity.MapType.PLANE;
    var g = LIFE.entity.MapType.ENEGY;
    return [
      [e, e, e, e, e, e, e, e, e, e, e, e, e],
      [e, e, e, e, e, e, e, e, e, e, e, e, e],
      [e, e, e, e, e, e, e, e, e, e, e, e, e],
      [e, e, e, e, e, e, g, e, e, e, e, e, e],
      [e, e, e, e, e, p, p, p, e, e, e, e, e],
      [e, e, e, e, p, p, p, p, p, e, e, e, e],
      [e, e, e, p, p, p, p, p, p, p, e, e, e],
      [e, e, e, e, p, p, p, p, p, e, e, e, e],
      [e, e, e, e, e, p, p, p, e, e, e, e, e],
      [e, e, e, e, e, e, p, e, e, e, e, e, e],
      [e, e, e, e, e, e, e, e, e, e, e, e, e],
      [e, e, e, e, e, e, e, e, e, e, e, e, e],
      [e, e, e, e, e, e, e, e, e, e, e, e, e]
    ];
  }
};

LIFE.entity.UserHistory = {
  initialize: function() {
    return [];
  }
};

