// Copy selected text
var copyBtn = document.querySelector('.context-menu__link');
copyBtn.addEventListener('click', function(text) {
  // Text selection
  var range = document.createRange();
  window.getSelection().addRange(range);

  try {
    // Copy + console message
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copy command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  // removing the text selection
  // removeRange(range)
  window.getSelection().removeAllRanges();
});

(function() {
  "use strict";
  // Function to check if we clicked inside an element with a particular class name

  function clickInsideElement(e, className) {
    var el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
      return el;
    } else {
      while (el = el.parentNode) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }

    return false;
  }


  // Gets exact position of event
  function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }


  // Variables
  var contextMenuClassName = "context-menu";
  var contextMenuItemClassName = "context-menu__item";
  var contextMenuLinkClassName = "context-menu__link";
  var contextMenuActive = "context-menu--active";

  var taskItemClassName = "";
  var taskItemInContext;

  var clickCoords;
  var clickCoordsX;
  var clickCoordsY;

  var menu = document.querySelector("#context-menu");
  var menuItems = menu.querySelectorAll(".context-menu__item");
  var menuState = 0;
  var menuWidth;
  var menuHeight;
  var menuPosition;
  var menuPositionX;
  var menuPositionY;
  var windowWidth;
  var windowHeight;

  // Initialise application's code

  function init() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
  }


  // Listens for contextmenu events

  function contextListener() {
    document.addEventListener("contextmenu", function(e) {
      taskItemInContext = clickInsideElement(e, taskItemClassName);

      if (window.getSelection != "taskItemInContext") { // taskItemInContext || window.getSelection?
        e.preventDefault();
        toggleMenuOn();
        positionMenu(e);
      } else {
        taskItemInContext = null;
        toggleMenuOff();
      }
    });
  }

  // Listens for click events

  function clickListener() {
    document.addEventListener("click", function(e) {
      var clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);

      if (clickeElIsLink) {
        e.preventDefault();
        menuItemListener(clickeElIsLink);
      } else {
        var button = e.which || e.button;
        if (button === 1) {
          toggleMenuOff();
        }
      }
    });
  }

  // Listens for keyup events. Esc for close contextmenu

  function keyupListener() {
    window.onkeyup = function(e) {
      if (e.keyCode === 27) {
        toggleMenuOff();
      }
    }
  }


  // Window resize event listener
  function resizeListener() {
    window.onresize = function(e) {
      toggleMenuOff();
    };
  }

  // Open contextmenu
  function toggleMenuOn() {
    if (menuState !== 1) {
      menuState = 1;
      menu.classList.add(contextMenuActive);
    }
  }


  // Close contextmenu

  function toggleMenuOff() {
    if (menuState !== 0) {
      menuState = 0;
      menu.classList.remove(contextMenuActive);
    }
  }


  /*
   * Correct positioning of the menu when clicking in the
   * extreme corners and scrolling
   */

  function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menuWidth = menu.innerWidth + 4;
    menuHeight = menu.innerHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ((windowWidth - clickCoordsX) < menuWidth) {
      menu.style.left = windowWidth - menuWidth + "px";
    } else {
      menu.style.left = clickCoordsX + "px";
    }

    if ((windowHeight - clickCoordsY) < menuHeight) {
      menu.style.top = windowHeight - menuHeight + "px";
    } else {
      menu.style.top = clickCoordsY + "px";
    }
  }

  /*
   * Action when clicking on the selected item in the context menu
   * After copyBtn, the menu closes
   */
  function menuItemListener(link) {
    toggleMenuOff();
  }

  // start

  init();

})();