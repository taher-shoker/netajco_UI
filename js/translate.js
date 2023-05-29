function Translate() {
  //initialization
  this.init = function (attribute, lng) {
    this.attribute = attribute;
    this.lng = lng;
  };
  //translate
  this.process = function () {
    _self = this;
    var xrhFile = new XMLHttpRequest();
    //load content data
    xrhFile.open("GET", "lng/" + this.lng + ".json", false);
    xrhFile.onreadystatechange = function () {
      if (xrhFile.readyState === 4) {
        if (xrhFile.status === 200 || xrhFile.status == 0) {
          var LngObject = JSON.parse(xrhFile.responseText);
          var allDom = document.getElementsByTagName("*");
          for (var i = 0; i < allDom.length; i++) {
            var elem = allDom[i];
            var key = elem.getAttribute(_self.attribute);
            if (key != null) {
              if (key.includes(".")) {
                var arrStr = key.split(".");
                if (arrStr.length === 3) {
                  var grandParent = arrStr[0];
                  var parent = arrStr[1];
                  var child = arrStr[2];
                  var grandParentObj = LngObject[grandParent];
                  var parentObj = grandParentObj[parent];
                  var childTxt = parentObj[child];
                  elem.innerHTML = childTxt;
                } else {
                  var parent = arrStr[0];
                  var child = arrStr[1];
                  var parentObj = LngObject[parent];
                  var childTxt = parentObj[child];
                  elem.innerHTML = childTxt;
                }
              } else {
                elem.innerHTML = LngObject[key];
              }
            }
          }
        }
      }
    };
    xrhFile.send();
  };
}
