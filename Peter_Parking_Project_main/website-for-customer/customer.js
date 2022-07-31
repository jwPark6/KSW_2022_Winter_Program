var areaCount = 8;
var redColor = "#ff0000";
var greenColor = "#00c700";
var blueColor = "#009dff";
var yellowColor = "#f0d264";
var purpleColor = "#cb99c5";
var cyanColor = "#7fccde";
var defaultColor = "#d3d3d3";

//Change the color of parking spot through data received from manager web
function colorSetting(color) {
  var arr = color.split("");
  for (var i = 0; i < areaCount; i++) {
    var id = "A0" + (i + 1);
    var areaStyle = document.getElementById(id).style;
    if (arr[i] == 0) {
      areaStyle.backgroundColor = defaultColor;
    } else if (arr[i] == 1) {
      areaStyle.backgroundColor = redColor;
    } else if (arr[i] == 2) {
      areaStyle.backgroundColor = greenColor;
    } else if (arr[i] == 3) {
      areaStyle.backgroundColor = blueColor;
    } else if (arr[i] == 4) {
      areaStyle.backgroundColor = yellowColor;
    } else if (arr[i] == 5) {
      areaStyle.backgroundColor = purpleColor;
    } else if (arr[i] == 6) {
      areaStyle.backgroundColor = cyanColor;
    }
  }
}

// Changed section name and color through data received from manager web
function statusSetting(colorArr, nameArr) {
  var html = "";
  var item = document.getElementsByClassName("section-list");
  for (var i = 0; i < colorArr.length; i++) {
    html +=
      '<div class="section-item"><div class="section-information"><div class="section-circle circle-' +
      colorArr[i] +
      '"></div><div class="section-name">' +
      nameArr[i] +
      '</div></div><div class="section-number number-' +
      colorArr[i] +
      "></div></div>";
  }
  html +=
    '<div class="section-item"><div class="section-information"><div class="section-circle circle-default"></div><div class="section-name">No Section</div></div><div class="section-number number-default"></div></div><div class="section-item"><div class="section-name">Total</div><div class="section-number number-total"></div></div>';
  item[0].innerHTML = html;
}

//Update the number of parking spot's color on the Section part
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

//Convert RGB value into Hex value
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
