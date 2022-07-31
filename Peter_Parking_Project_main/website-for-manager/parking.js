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

function changeColor(color) {
  //Change the color of parking spot in the "View part"
  for (var i = 1; i <= areaCount; i++) {
    var id = "r" + i;
    var area = "A0" + i;
    if (document.getElementById(id).checked) {
      //If the parking spot is selected, change the color into argument
      document.getElementById(area).style.backgroundColor = color;
      document.getElementById(id).checked = false;
    }
  }

  updateSectionCount();
}
/*
function selectSpot() {//
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
*/
function updateSectionCount() {
  //Update the number of parking spot's color on the Section("Control part")
  var countArr = [0, 0, 0, 0, 0, 0, 0];
  for (var i = 1; i <= areaCount; i++) {
    //Add the each color's number of selected parking spot
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
    //Set the innerHTML of each list
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
  //Convert RGB value into Hex value
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
  //Convert String value into Hex value
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
  //Convert RGB value into String value
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
  //Convert Hex value into String value
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
  //Open the "Color Setting"
  var paletteStyle = document.getElementsByClassName("color-palette")[0].style;
  var snackbar = document.getElementById("snackbar");
  var modeIcon = document.getElementById("mode-icon");

  if (paletteStyle.maxHeight) {
    //If the mode is edit mode, change into view mode
    paletteStyle.maxHeight = null;
    for (var i = 1; i <= areaCount; i++) {
      //Set the each parking spot to unclickable state
      var inputId = "r" + i;
      var labelId = "A0" + i;
      document.getElementById(inputId).disabled = true;
      document.getElementById(inputId).checked = false;
      document.getElementById(labelId).className = "viewmode col";
    }
    //Inform the manager that the mode is changed into view mode
    document.getElementsByClassName("snackbar-item")[0].innerHTML =
      "<i class='fa fa-eye'></i> View Mode";
    snackbar.className = "show";
    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
    modeIcon.className = "fa fa-eye";
  } else {
    //If the mode is view mode, change into edit mode
    paletteStyle.maxHeight =
      document.getElementsByClassName("color-palette")[0].scrollHeight + "px";
    for (var i = 1; i <= areaCount; i++) {
      //Set the each parking spot to clickable state
      var inputId = "r" + i;
      var labelId = "A0" + i;
      document.getElementById(inputId).disabled = false;
      document.getElementById(labelId).className = "whatever col";
    }
    //Inform the manager that the mode is changed into edit mode
    document.getElementsByClassName("snackbar-item")[0].innerHTML =
      "<i class='fa fa-edit'></i> Color Setting Mode";
    snackbar.className = "show";
    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
    modeIcon.className = "fa fa-edit";
  }
}

function reset() {
  //reset data of parking spot
  for (var i = 1; i <= areaCount; i++) {
    //Reset to default color
    var id = "r" + i;
    var area = "A0" + i;
    document.getElementById(area).style.backgroundColor = "#d3d3d3";
    document.getElementById(id).checked = false;
  }
  updateSectionCount();
}

function parking() {
  //Check the presence of vehicle
  var receive = document.getElementById("temp-text").value;
  var car = document.getElementsByClassName("car");
  var area = receive.split(""); //Split the sent serial message from IR Infrared module
  for (var i = 1; i < areaCount; i++) {
    //Check whether the parking spot is parked
    var car = document.getElementsByClassName("car")[i];
    if (area[i] == 0 && car.className == "car in") {
      car.className = "car out";
    } else if (area[i] == 0) {
      car.className = "car in";
    }
  }
}

function addSection() {
  //Add new list of the parking spot on the "Section"
  var sectionPopMenu = document.getElementsByClassName(
    "sectionList-add-popmenu"
  )[0];
  var sectionAdd = document.getElementById("section-add");
  // alert(sectionPopMenu.className == "sectionList-add-popmenu show");
  if (sectionPopMenu.className == "sectionList-add-popmenu show") {
    //Close popup window
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
    //Open popup window
    sectionPopMenu.className = "sectionList-add-popmenu show";
    sectionAdd.innerHTML =
      '<i class="fa fa-angle-right" aria-hidden="true"></i>';
  }
}

function modifySection() {
  //Modify the list of parking spot in the "Section"
  var sectionList = document.getElementsByClassName("section-list")[0];
  var sectionItem = document.getElementsByClassName("section-item");
  var sectionCircle = document.getElementsByClassName("section-circle");
  var sectionName = document.getElementsByClassName("section-name");
  var edit = document.getElementsByClassName("edit")[0].style;
  var sectionModify = document.getElementById("section-modify");

  if (edit.maxHeight) {
    //If the "Section" is modify mode
    edit.maxHeight = null;
    sectionModify.innerHTML = '<i class="fa fa-edit" aria-hidden="true"></i>';
  } else {
    //If the "Section" is view mode
    edit.maxHeight =
      document.getElementsByClassName("edit")[0].scrollHeight + "px";
    for (let i = 0; i < sectionItem.length - 2; i++) {
      //Set the list to editable state
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
  //Change the color of parking spot list in the "Section"
  var targetColor = getComputedStyle(event.target).backgroundColor;

  for (let i = 0; i < allColorList.length; i++) {
    //Change the color among remained color
    if (allColorList[i] == rgbToHex(targetColor)) {
      for (let j = 0; j < existColorList.length; j++) {
        //If the color is already exist, move on the next color
        if (nameToHex(existColorList[j]) == allColorList[(i + 1) % 6]) {
          i++;
        }
      }
      //Change the color
      event.target.style.backgroundColor = allColorList[(i + 1) % 6];
      return;
    }
  }
}

function removeSection(event) {
  //Remove the parking spot list of the "Section"
  var sectionList = document.getElementsByClassName("section-list")[0];
  var color = document.getElementsByClassName("color")[0];
  var targetNode = event.target;
  var parentNode = event.target.parentNode.parentNode;
  var targetColor = getComputedStyle(
    parentNode.children[0].children[0]
  ).backgroundColor;

  for (let i = 0; i < existColorList.length; i++) {
    //When the color which will be remove is same
    if (rgbToName(targetColor) === existColorList[i]) {
      //Remove all the data of parking spot
      sectionList.removeChild(parentNode);
      color.removeChild(color.children[i]);
      existColorList.splice(i, 1);
      existNameList.splice(i, 1);
    }
  }
  //If the color of parking spot which will be remove is set in the "View part"
  for (var i = 1; i <= areaCount; i++) {
    //Change to default value
    var id = "r" + i;
    var area = "A0" + i;
    var removedColor = document.getElementById(area).style.backgroundColor;
    if (removedColor == targetColor) {
      document.getElementById(area).style.backgroundColor = defaultColor;
      document.getElementById(id).checked = false;
    }
  }
  updateSectionCount();
}

function confirmSectionListModify() {
  //Confirm modifying of parking spot list
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
    //Undo the list to original state in the "Section"
    sectionCircle[i].style.cursor = "default";
    sectionCircle[i].removeAttribute("onClick");
    var sectionColor = getComputedStyle(sectionCircle[i]).backgroundColor;
    sectionColor = rgbToName(sectionColor);
    sectionCircle[i].classList.remove(sectionCircle[i].classList[1]);
    sectionNumber[i].classList.remove(sectionNumber[i].classList[1]);

    //Change the color data of parking spot in the "Section"
    sectionCircle[i].classList.add("circle-" + sectionColor);
    sectionNumber[i].classList.add("number-" + sectionColor);
    existColorList.push(sectionColor);
    existNameList.push(sectionName[i].children[0].value);

    //Change the color data in the "Color Setting"
    color[i].classList.remove(color[i].classList[0]);
    color[i].classList.add(sectionColor);
    color[i].setAttribute(
      "onClick",
      'changeColor("' + nameToHex(sectionColor) + '")'
    );
    color[i].style.backgroundColor = getComputedStyle(
      sectionCircle[i]
    ).backgroundColor;

    //Change the name data of parking spot in the "Section"
    sectionName[i].innerHTML = sectionName[i].children[0].value;
    //remove the confirm button
    sectionItem[i].removeChild(sectionItem[i].childNodes[2]);

    //Change the data of parking spot in the "View part"
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
}

function confirmSectionListAdd() {
  //Confirm adding of parking spot list
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

  //Check the duplicated value
  for (let i = 0; i < existNameList.length; i++) {
    if (existNameList[i] == newSectionInput) {
      return alert("Name is duplicated!");
    }
    if (existColorList[i] == rgbToName(newSectionColor)) {
      return alert("Color is duplicated!");
    }
  }

  //First clone the existing parking spot in the "Section"
  var newSectionItem =
    sectionList.children[sectionList.children.length - 2].cloneNode(true);

  //Remove it's original data
  newSectionItem.children[0].children[0].classList.remove("circle-default");
  newSectionItem.children[1].classList.remove("number-default");

  //Set the data of parking spot
  newSectionItem.children[0].children[0].classList.add(
    "circle-" + rgbToName(newSectionColor)
  );
  newSectionItem.children[1].classList.add(
    "number-" + rgbToName(newSectionColor)
  );

  //Add the data of parking spot on the "Section"
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

  //First clone the existing parking spot in the "Color Setting"
  var color = document.getElementsByClassName("color")[0];
  var li = color.children[0].cloneNode(true);

  //Remove it's original data
  li.classList.remove(li.classList[0]);

  //Set the data of parking spot
  li.style.backgroundColor = newSectionColor;
  li.classList.add(rgbToName(newSectionColor));
  li.attributes[1].nodeValue =
    "changeColor('" + rgbToHex(newSectionColor) + "')";

  //Add the data of parking spot on the "Color Setting"
  color.insertBefore(li, color.children[color.children.length - 1]);

  //Undo all the values to original value in popup window
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
}

function newColorSelect(event) {
  //When select the color in the popup window
  var colorList = document.getElementsByClassName(
    "sectionList-add-popmenu-color"
  )[0].children;
  var colorCheck = document.getElementsByClassName("color-check");
  var target = event.target;
  //If the color is selected, style of selected color is changed
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
  //When the X button is clicked, close the add popup window
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
  //Reset the selected color in the popup window
  for (let i = 0; i < colorList.length; i++) {
    colorList[i].classList.remove("selectedColor");
    colorCheck[i].style.display = "none";
  }
  document.getElementById("newSectionName").value = "";
  sectionAdd.innerHTML =
    '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
}
