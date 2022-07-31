// For Node-Red Web Socket
var ws;
var wsUri = "ws:";
var loc = window.location;
console.log(loc);
if (loc.protocol === "https:") {
  wsUri = "wss:";
}
// This needs to point to the web socket in the Node-RED flow
wsUri += "//" + loc.host + loc.pathname.replace("manager", "ws/manager");

function wsConnect() {
  console.log("connect", wsUri);
  ws = new WebSocket(wsUri);
  //var line = "";    // either uncomment this for a building list of messages
  ws.onmessage = function (msg) {
    var line = ""; // or uncomment this to overwrite the existing message
    // parse the incoming message as a JSON object
    var data = msg.data;
    parking(data);
    console.log(data);
    // build the output from the topic and payload parts of the object
    line += "<p>" + data + "</p>";
    // replace the messages div with the new "line"
    // document.getElementById('messages').innerHTML = line;
    //ws.send(JSON.stringify({data:data}));
  };
  ws.onopen = function () {
    // update the status div with the connection status
    // document.getElementById('status').innerHTML = "connected";
    //ws.send("Open for data");
    console.log("connected");
    sendToNodered();
    sendToUser();
  };
  ws.onclose = function () {
    // update the status div with the connection status
    // document.getElementById('status').innerHTML = "not connected";
    // in case of lost connection tries to reconnect every 3 secs
    setTimeout(wsConnect, 3000);
  };
}
////////
var areaCount = 8;
var redColor = "#ff0000";
var greenColor = "#00c700";
var blueColor = "#009dff";
var yellowColor = "#f0d264";
var purpleColor = "#cb99c5";
var cyanColor = "#7fccde";
var defaultColor = "#d3d3d3";

var allColorList = [
  redColor,
  greenColor,
  blueColor,
  yellowColor,
  purpleColor,
  cyanColor,
];
var existColorList = ["red", "green", "blue"];
var existNameList = ["Student", "Professor", "Visitor"];

updateSectionCount();
sendToNodered();
sendToUser();

function changeColor(color) {
  for (var i = 1; i <= areaCount; i++) {
    var id = "r" + i;
    var area = "A0" + i;
    if (document.getElementById(id).checked) {
      document.getElementById(area).style.backgroundColor = color;
      document.getElementById(id).checked = false;
    }
  }
  //   var x = document.getElementById("snackbar");
  //   snackbar.className = "hide";
  //   setTimeout(function () {
  //     snackbar.className = snackbar.className.replace("hide", "");
  //   }, 500);
  updateSectionCount();
  sendToNodered();
  sendToUser();
}

function selectSpot() {
  var check = 0;
  var x = document.getElementById("snackbar");
  for (var i = 1; i <= areaCount; i++) {
    var id = "r" + i;
    if (document.getElementById(id).checked) {
      check = 1;
    }
  }
  //   if (check == 1) {
  //     document.getElementsByClassName("choose-message")[0].style.display = "none";
  //     document.getElementsByClassName("color")[0].style.display = "block";
  //   } else {
  //     document.getElementsByClassName("choose-message")[0].style.display =
  //       "block";
  //     document.getElementsByClassName("color")[0].style.display = "none";
  //   }
}

function updateSectionCount() {
  var countArr = [0, 0, 0, 0, 0, 0, 0];
  for (var i = 1; i <= areaCount; i++) {
    var area = "A0" + i;
    var backgroundColor = document.getElementById(area).style.backgroundColor;
    var hex = rgbToHex(backgroundColor);
    if (hex == redColor) {
      countArr[0]++;
    } else if (hex == greenColor) {
      countArr[1]++;
    } else if (hex == blueColor) {
      countArr[2]++;
    } else if (hex == yellowColor) {
      countArr[3]++;
    } else if (hex == purpleColor) {
      countArr[4]++;
    } else if (hex == cyanColor) {
      countArr[5]++;
    } else {
      countArr[6]++;
    }
  }
  var sectionNumber = document.getElementsByClassName("section-number");

  for (let i = 0; i < sectionNumber.length; i++) {
    var sectionNumberClass = sectionNumber[i].classList[1];

    if (sectionNumberClass == "number-red") {
      sectionNumber[i].innerHTML = countArr[0];
    } else if (sectionNumberClass == "number-green") {
      sectionNumber[i].innerHTML = countArr[1];
    } else if (sectionNumberClass == "number-blue") {
      sectionNumber[i].innerHTML = countArr[2];
    } else if (sectionNumberClass == "number-yellow") {
      sectionNumber[i].innerHTML = countArr[3];
    } else if (sectionNumberClass == "number-purple") {
      sectionNumber[i].innerHTML = countArr[4];
    } else if (sectionNumberClass == "number-cyan") {
      sectionNumber[i].innerHTML = countArr[5];
    }
  }
  document.getElementsByClassName("number-default")[0].innerHTML = countArr[6];
  document.getElementsByClassName("number-total")[0].innerHTML = areaCount;
}

function rgbToHex(rgbType) {
  var rgb = rgbType.replace(/[^%,.\d]/g, "").split(",");

  rgb.forEach(function (str, x, arr) {
    if (str.indexOf("%") > -1) str = Math.round(parseFloat(str) * 2.55);
    str = parseInt(str, 10).toString(16);
    if (str.length === 1) str = "0" + str;
    arr[x] = str;
  });
  return "#" + rgb.join("");
}

function nameToHex(name) {
  if (name === "red") {
    return redColor;
  } else if (name === "green") {
    return greenColor;
  } else if (name === "blue") {
    return blueColor;
  } else if (name === "yellow") {
    return yellowColor;
  } else if (name === "purple") {
    return purpleColor;
  } else if (name === "cyan") {
    return cyanColor;
  }
}

function rgbToName(rgb) {
  if (rgb === "rgb(255, 0, 0)") {
    return "red";
  } else if (rgb === "rgb(0, 199, 0)") {
    return "green";
  } else if (rgb === "rgb(0, 157, 255)") {
    return "blue";
  } else if (rgb === "rgb(240, 210, 100)") {
    return "yellow";
  } else if (rgb === "rgb(203, 153, 197)") {
    return "purple";
  } else if (rgb === "rgb(127, 204, 222)") {
    return "cyan";
  }
}

function hexToName(hex) {
  if (hex == redColor) {
    return "red";
  } else if (hex == greenColor) {
    return "green";
  } else if (hex == blueColor) {
    return "blue";
  } else if (hex == yellowColor) {
    return "yellow";
  } else if (hex == purpleColor) {
    return "purple";
  } else if (hex == cyanColor) {
    return "cyan";
  }
}

function openPalette() {
  var paletteStyle = document.getElementsByClassName("color-palette")[0].style;
  var snackbar = document.getElementById("snackbar");
  var modeIcon = document.getElementById("mode-icon");

  if (paletteStyle.maxHeight) {
    paletteStyle.maxHeight = null;
    for (var i = 1; i <= areaCount; i++) {
      var inputId = "r" + i;
      var labelId = "A0" + i;
      document.getElementById(inputId).disabled = true;
      document.getElementById(inputId).checked = false;
      document.getElementById(labelId).className = "viewmode col";
    }
    document.getElementsByClassName("snackbar-item")[0].innerHTML =
      "<i class='fa fa-eye'></i> View Mode";
    snackbar.className = "show";
    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
    modeIcon.className = "fa fa-eye";
  } else {
    paletteStyle.maxHeight =
      document.getElementsByClassName("color-palette")[0].scrollHeight + "px";
    for (var i = 1; i <= areaCount; i++) {
      var inputId = "r" + i;
      var labelId = "A0" + i;
      document.getElementById(inputId).disabled = false;
      document.getElementById(labelId).className = "whatever col";
    }
    document.getElementsByClassName("snackbar-item")[0].innerHTML =
      "<i class='fa fa-edit'></i> Color Setting Mode";
    snackbar.className = "show";
    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
    modeIcon.className = "fa fa-edit";
  }
  sendToUser();
}

function reset() {
  for (var i = 1; i <= areaCount; i++) {
    var id = "r" + i;
    var area = "A0" + i;
    document.getElementById(area).style.backgroundColor = "#d3d3d3";
    document.getElementById(id).checked = false;
  }
  sendToNodered();
  updateSectionCount();
  sendToUser();
}

function parking(receive) {
  var car = document.getElementsByClassName("car");
  var area = receive.split("");
  for (var i = 0; i < areaCount; i++) {
    var car = document.getElementsByClassName("car")[i];
    if (area[i] == 1 && car.className == "car in") {
      car.className = "car out";
    } else if (area[i] == 0) {
      car.className = "car in";
    }
  }
}

function addSection() {
  var sectionPopMenu = document.getElementsByClassName(
    "sectionList-add-popmenu"
  )[0];
  var sectionAdd = document.getElementById("section-add");
  // alert(sectionPopMenu.className == "sectionList-add-popmenu show");
  if (sectionPopMenu.className == "sectionList-add-popmenu show") {
    sectionAdd.innerHTML =
      '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
    sectionPopMenu.className = "sectionList-add-popmenu hide";
    setTimeout(function () {
      sectionPopMenu.className = sectionPopMenu.className.replace(
        "sectionList-add-popmenu hide",
        "sectionList-add-popmenu"
      );
    }, 500);
  } else {
    sectionPopMenu.className = "sectionList-add-popmenu show";
    sectionAdd.innerHTML =
      '<i class="fa fa-angle-right" aria-hidden="true"></i>';
  }
}

function modifySection() {
  var sectionList = document.getElementsByClassName("section-list")[0];
  var sectionItem = document.getElementsByClassName("section-item");
  var sectionCircle = document.getElementsByClassName("section-circle");
  var sectionName = document.getElementsByClassName("section-name");
  var edit = document.getElementsByClassName("edit")[0].style;
  var sectionModify = document.getElementById("section-modify");

  if (edit.maxHeight) {
    edit.maxHeight = null;
    sectionModify.innerHTML = '<i class="fa fa-edit" aria-hidden="true"></i>';
  } else {
    edit.maxHeight =
      document.getElementsByClassName("edit")[0].scrollHeight + "px";
    for (let i = 0; i < sectionItem.length - 2; i++) {
      sectionCircle[i].style.cursor = "pointer";
      sectionCircle[i].setAttribute("onClick", "changeSection(event)");
      sectionName[i].innerHTML =
        '<input type="text" class = "editName" value="' +
        sectionName[i].innerHTML +
        '">';
      var button = document.createElement("div");
      button.classList.add("removeButton");
      button.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
      button.setAttribute("onClick", "removeSection(event)");
      button.setAttribute("style", "cursor: pointer; margin-right : 15px");
      // sectionItem[i].appendChild(button);
      sectionItem[i].insertBefore(button, sectionItem[i].childNodes[2]);
    }
    sectionModify.setAttribute("onClick", "");
    sectionModify.style.cursor = "default";
    sectionModify.innerHTML =
      '<i class="fa fa-angle-down" aria-hidden="true"></i>';
  }
  // var button = document.createElement("button");
  // button.id = "sectionListChangeButton";
  // button.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
  // button.setAttribute("onClick", "confirmSectionListModify()");
  // sectionList.appendChild(button);
}

function changeSection(event) {
  var targetColor = getComputedStyle(event.target).backgroundColor;

  for (let i = 0; i < allColorList.length; i++) {
    if (allColorList[i] == rgbToHex(targetColor)) {
      for (let j = 0; j < existColorList.length; j++) {
        if (nameToHex(existColorList[j]) == allColorList[(i + 1) % 6]) {
          i++;
        }
      }
      event.target.style.backgroundColor = allColorList[(i + 1) % 6];
      return;
    }
  }
  sendToNodered();
  sendToUser();
}

function removeSection(event) {
  var sectionList = document.getElementsByClassName("section-list")[0];
  var color = document.getElementsByClassName("color")[0];
  var targetNode = event.target;
  var parentNode = event.target.parentNode.parentNode;
  var targetColor = getComputedStyle(
    parentNode.children[0].children[0]
  ).backgroundColor;

  for (let i = 0; i < existColorList.length; i++) {
    if (rgbToName(targetColor) === existColorList[i]) {
      sectionList.removeChild(parentNode);
      color.removeChild(color.children[i]);
      existColorList.splice(i, 1);
      existNameList.splice(i, 1);
    }
  }

  for (var i = 1; i <= areaCount; i++) {
    var id = "r" + i;
    var area = "A0" + i;
    var removedColor = document.getElementById(area).style.backgroundColor;
    if (removedColor == targetColor) {
      document.getElementById(area).style.backgroundColor = defaultColor;
      document.getElementById(id).checked = false;
    }
  }
  sendToNodered();
  updateSectionCount();
  sendToUser();
}

function confirmSectionListModify() {
  var color = document.getElementsByClassName("color")[0].children;
  var sectionList = document.getElementsByClassName("section-list")[0];
  var sectionItem = document.getElementsByClassName("section-item");
  var sectionCircle = document.getElementsByClassName("section-circle");
  var sectionName = document.getElementsByClassName("section-name");
  var sectionNumber = document.getElementsByClassName("section-number");
  var edit = document.getElementsByClassName("edit")[0].style;
  var sectionModify = document.getElementById("section-modify");

  var previousColorList = existColorList;
  existColorList = [];
  existNameList = [];
  for (let i = 0; i < sectionName.length - 2; i++) {
    sectionCircle[i].style.cursor = "default";
    sectionCircle[i].removeAttribute("onClick");
    var sectionColor = getComputedStyle(sectionCircle[i]).backgroundColor;
    sectionColor = rgbToName(sectionColor);

    sectionCircle[i].classList.remove(sectionCircle[i].classList[1]);
    sectionNumber[i].classList.remove(sectionNumber[i].classList[1]);
    sectionCircle[i].classList.add("circle-" + sectionColor);
    sectionNumber[i].classList.add("number-" + sectionColor);

    existColorList.push(sectionColor);
    existNameList.push(sectionName[i].children[0].value);

    color[i].classList.remove(color[i].classList[0]);
    color[i].classList.add(sectionColor);
    color[i].setAttribute(
      "onClick",
      'changeColor("' + nameToHex(sectionColor) + '")'
    );
    color[i].style.backgroundColor = getComputedStyle(
      sectionCircle[i]
    ).backgroundColor;

    sectionName[i].innerHTML = sectionName[i].children[0].value;
    sectionItem[i].removeChild(sectionItem[i].childNodes[2]);

    for (var j = 1; j <= areaCount; j++) {
      var id = "r" + j;
      var area = "A0" + j;
      var areaColor = document.getElementById(area).style.backgroundColor;
      if (rgbToHex(areaColor) == nameToHex(previousColorList[i])) {
        document.getElementById(area).style.backgroundColor =
          nameToHex(sectionColor);
      }
    }
  }
  sectionModify.setAttribute("onClick", "modifySection()");
  sectionModify.style.cursor = "pointer";
  sectionModify.innerHTML = '<i class="fa fa-edit" aria-hidden="true"></i>';
  edit.maxHeight = null;
  // sectionList.removeChild(sectionList.lastChild);
  sendToNodered();
  sendToUser();
}

function confirmSectionListAdd() {
  var colorList = document.getElementsByClassName(
    "sectionList-add-popmenu-color"
  )[0].children;
  var sectionPopMenu = document.getElementsByClassName(
    "sectionList-add-popmenu"
  )[0];
  var sectionList = document.getElementsByClassName("section-list")[0];

  var newSectionInput = document.getElementById("newSectionName").value;
  var newSectionColor =
    document.getElementsByClassName("selectedColor")[0].style.backgroundColor;
  var colorCheck = document.getElementsByClassName("color-check");
  var sectionAdd = document.getElementById("section-add");
  for (let i = 0; i < existNameList.length; i++) {
    if (existNameList[i] == newSectionInput) {
      return alert("Name is duplicated!");
    }
    if (existColorList[i] == rgbToName(newSectionColor)) {
      return alert("Color is duplicated!");
    }
  }

  var newSectionItem =
    sectionList.children[sectionList.children.length - 2].cloneNode(true);
  newSectionItem.children[0].children[0].classList.remove("circle-default");
  newSectionItem.children[1].classList.remove("number-default");
  newSectionItem.children[0].children[0].classList.add(
    "circle-" + rgbToName(newSectionColor)
  );
  newSectionItem.children[1].classList.add(
    "number-" + rgbToName(newSectionColor)
  );
  newSectionItem.children[1].innerHTML = 0;
  newSectionItem.children[0].children[1].childNodes[0].data = newSectionInput;
  newSectionItem.children[0].children[0].style.backgroundColor =
    newSectionColor;

  existColorList.push(rgbToName(newSectionColor));
  existNameList.push(newSectionInput);
  sectionList.insertBefore(
    newSectionItem,
    sectionList.children[sectionList.children.length - 2]
  );

  var color = document.getElementsByClassName("color")[0];
  var li = color.children[0].cloneNode(true);
  li.style.backgroundColor = newSectionColor;
  li.classList.remove(li.classList[0]);
  li.classList.add(rgbToName(newSectionColor));
  li.attributes[1].nodeValue =
    "changeColor('" + rgbToHex(newSectionColor) + "')";
  color.insertBefore(li, color.children[color.children.length - 1]);

  for (let i = 0; i < colorList.length; i++) {
    colorList[i].classList.remove("selectedColor");
    colorCheck[i].style.display = "none";
  }
  sectionPopMenu.className = "sectionList-add-popmenu hide";
  setTimeout(function () {
    sectionPopMenu.className = sectionPopMenu.className.replace(
      "sectionList-add-popmenu hide",
      "sectionList-add-popmenu"
    );
  }, 500);
  document.getElementById("newSectionName").value = "";
  sectionAdd.innerHTML =
    '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';

  sendToUser();
}

function newColorSelect(event) {
  var colorList = document.getElementsByClassName(
    "sectionList-add-popmenu-color"
  )[0].children;
  var colorCheck = document.getElementsByClassName("color-check");
  var target = event.target;

  for (let i = 0; i < colorCheck.length; i++) {
    if (colorCheck[i].style.display == "block") {
      colorList[i].classList.remove("selectedColor");
      colorCheck[i].style.display = "none";
      break;
    }
  }
  target.children[0].style.display = "block";
  target.className = "selectedColor";
}

function closeAddPopMenu() {
  var sectionAdd = document.getElementById("section-add");
  var colorList = document.getElementsByClassName(
    "sectionList-add-popmenu-color"
  )[0].children;
  var colorCheck = document.getElementsByClassName("color-check");
  var sectionPopMenu = document.getElementsByClassName(
    "sectionList-add-popmenu"
  )[0];
  sectionPopMenu.className = "sectionList-add-popmenu hide";
  setTimeout(function () {
    sectionPopMenu.className = sectionPopMenu.className.replace(
      "sectionList-add-popmenu hide",
      "sectionList-add-popmenu"
    );
  }, 500);
  for (let i = 0; i < colorList.length; i++) {
    colorList[i].classList.remove("selectedColor");
    colorCheck[i].style.display = "none";
  }
  document.getElementById("newSectionName").value = "";
  sectionAdd.innerHTML =
    '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
}

function sendToNodered() {
  var areaArr = [];
  for (var i = 1; i <= areaCount; i++) {
    var area = "A0" + i;
    var backgroundColor = document.getElementById(area).style.backgroundColor;
    var hex = rgbToHex(backgroundColor);
    if (hex == redColor) {
      areaArr[i - 1] = 1;
    } else if (hex == greenColor) {
      areaArr[i - 1] = 2;
    } else if (hex == blueColor) {
      areaArr[i - 1] = 3;
    } else if (hex == yellowColor) {
      areaArr[i - 1] = 4;
    } else if (hex == purpleColor) {
      areaArr[i - 1] = 5;
    } else if (hex == cyanColor) {
      areaArr[i - 1] = 6;
    } else {
      areaArr[i - 1] = 0;
    }
  }
  var sendmsg = areaArr.join(" ");
  if (ws) {
    ws.send(sendmsg);
  }
}

function sendToUser() {
  var areaArr = [];
  for (var i = 1; i <= areaCount; i++) {
    var area = "A0" + i;
    var backgroundColor = document.getElementById(area).style.backgroundColor;
    var hex = rgbToHex(backgroundColor);
    if (hex == redColor) {
      areaArr[i - 1] = 1;
    } else if (hex == greenColor) {
      areaArr[i - 1] = 2;
    } else if (hex == blueColor) {
      areaArr[i - 1] = 3;
    } else if (hex == yellowColor) {
      areaArr[i - 1] = 4;
    } else if (hex == purpleColor) {
      areaArr[i - 1] = 5;
    } else if (hex == cyanColor) {
      areaArr[i - 1] = 6;
    } else {
      areaArr[i - 1] = 0;
    }
  }
  var area = areaArr.join("");
  var text =
    '{"area":"' +
    area +
    '", "color":"' +
    existColorList +
    '", "name":"' +
    existNameList +
    '"}';
  if (ws) {
    ws.send(text);
  }
}
