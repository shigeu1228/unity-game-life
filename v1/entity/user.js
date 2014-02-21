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

  setUser: function(data) {
    self.user = data;
  },
  setUserMap: function(data) {
    self.userMap = data;
  },
  setUserHistory: function(data) {
    self.userHistory = data;
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
