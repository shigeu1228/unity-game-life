$(document).ready(function(){
  if (window.navigator.cookieEnabled) {
    test();
  }
  else {
    alert("Cookieを有効にしてください");
  }
});


var test = function() {

  console.log(LIFE.entity.UserMap.initialize());

  var userData = {
    name: 'sample01',
    grade: 150,
    money: 1000
  };

  setData('userData', userData);
  setTimeout(function() {
    var data = getData('userData');
    console.log("name: " + data.name);
  }, 1000);
};
