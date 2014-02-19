var entity = {};

entity.MapType = {
  EMPTY: 0,
  PLANE: 1,
  TENT: 2,
  HOUSE: 3,
  CITY: 4
};


entity.User = {
  initialize: function(name) {
    return {
      name: name,
      point: 0,
      time: {
        create: Date.now()
      }
    };
  }
};


entity.UserMap = {
  initialize: function() {
    var e = entity.MapType.EMPTY;
    var p = entity.MapType.PLANE;
    return [
      [e, e, e, e, e, e, e, e, e],
      [e, e, e, e, e, e, e, e, e],
      [e, e, e, e, p, e, e, e, e],
      [e, e, e, p, p, p, e, e, e],
      [e, e, p, p, p, p, p, e, e],
      [e, e, e, p, p, p, e, e, e],
      [e, e, e, e, p, e, e, e, e],
      [e, e, e, e, e, e, e, e, e],
      [e, e, e, e, e, e, e, e, e]
    ];
  }
};

LIFE.entity = entity;
