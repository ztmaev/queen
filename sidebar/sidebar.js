
        const body = document.querySelector('body'),
        sidebar = body.querySelector('nav'),
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text");
  
  
  toggle.addEventListener("click" , () =>{
      sidebar.classList.toggle("close");
  })
  
  searchBtn.addEventListener("click" , () =>{
      sidebar.classList.remove("close");
  })
  
  modeSwitch.addEventListener("click" , () =>{
      body.classList.toggle("dark");
      
      if(body.classList.contains("dark")){
          modeText.innerText = "Light mode";
      }else{
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
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  //animation
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
          || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());

(function() {

  var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

  // Main
  initHeader();
  addListeners();

  function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = {x: 0, y: height};

      largeHeader = document.getElementById('large-header');
      largeHeader.style.height = height+'px';

      canvas = document.getElementById('demo-canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      // create particles
      circles = [];
      for(var x = 0; x < width*0.5; x++) {
          var c = new Circle();
          circles.push(c);
      }
      animate();
  }

  // Event handling
  function addListeners() {
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
  }

  function scrollCheck() {
      if(document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
  }

  function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height+'px';
      canvas.width = width;
      canvas.height = height;
  }

  function animate() {
      if(animateHeader) {
          ctx.clearRect(0,0,width,height);
          for(var i in circles) {
              circles[i].draw();
          }
      }
      requestAnimationFrame(animate);
  }

  // Canvas manipulation
  function Circle() {
      var _this = this;

      // constructor
      (function() {
          _this.pos = {};
          init();
          console.log(_this);
      })();

      function init() {
          _this.pos.x = Math.random()*width;
          _this.pos.y = height+Math.random()*100;
          _this.alpha = 0.1+Math.random()*0.3;
          _this.scale = 0.1+Math.random()*0.3;
          _this.velocity = Math.random();
      }

      this.draw = function() {
          if(_this.alpha <= 0) {
              init();
          }
          _this.pos.y -= _this.velocity;
          _this.alpha -= 0.0005;
          ctx.beginPath();
          ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
          ctx.fill();
      };
  }

})();