var entity = {};

entity.MapType = {
  EMPTY: 0,
  PLANE: 1,
  TENT: 2,
  HOUSE: 3,
  CITY: 4,
  ENEGY: 5
};

entity.ActionType = {
  NONE: 0,
  ADVENT: 1,
  GROWTH: 2,
  RIOT: 3,
  METEO: 4
}


entity.User = {
  initialize: function(name) {
    return {
      name: name,
      money: 0,
      enegy: 0,
      time: {
        create: Date.now(),
        access: Date.now()
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

entity.UserHistory = {
  initialize: function() {
    return [];
  }
};

LIFE.entity = entity;



User = {
  self: this,
  user: null,
  userMap: null,
  userHistory: null,


  getUser: function() {
    if (self.user) {
      return self.user;
    }
    self.user = getData('ugl_user');
    return self.user;
  },
  getUserMap: function() {
    if (self.userMap) {
      return self.userMap;
    }
    self.userMap = getData('ugl_userMap');
    return self.userMap;
  },
  getUserHistory: function() {
    if (self.userHistory) {
      return self.userHistory;
    }
    self.userHistory = getData('ugl_userHistory');
    return self.userHistory;
  },

  updateUser: function(data) {
    self.user = data;
    setData('ugl_user', data);
  },
  updateUserMap: function(data) {
    self.userMap = data;
    setData('ugl_userMap', data);
  },
  updateUserHistory: function(data) {
    self.userHistory = data;
    setData('ugl_userHistory', data);
  }
};
