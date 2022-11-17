const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});
//clock js
function showTime() {
  let date = new Date();
  let hours = date.getHours(); // 0 - 23
  let minuits = date.getMinutes(); // 0 - 59
  let seconds = date.getSeconds(); // 0 - 59

  let formatHours = convertFormat(hours);

  hours = checkTime(hours);

  hours = addZero(hours);
  minuits = addZero(minuits);
  seconds = addZero(seconds);

  document.getElementById(
    "clock"
  ).innerHTML = `${hours} : ${minuits} : ${seconds} : ${formatHours}`;
}

function convertFormat(time) {
  let format = "AM";

  if (time >= 12) {
    format = "PM";
  }
  return format;
}

function checkTime(time) {
  if (time > 12) {
    time = time - 12;
  }

  if (time === 0) {
    time = 12;
  }

  return time;
}

function addZero(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}

showTime();
setInterval(showTime, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("movable"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//animation