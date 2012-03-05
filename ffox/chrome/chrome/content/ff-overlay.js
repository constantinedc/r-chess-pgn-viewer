rchesspgnviewer.onFirefoxLoad = function(event) {
  //document.getElementById("contentAreaContextMenu")
  //        .addEventListener("popupshowing", function (e){ rchesspgnviewer.showFirefoxContextMenu(e); }, false);
};

//rchesspgnviewer.showFirefoxContextMenu = function(event) {
//  // show or hide the menuitem based on what the context menu is on
//  document.getElementById("context-rchesspgnviewer").hidden = gContextMenu.onImage;
//};

window.addEventListener("load", function () { rchesspgnviewer.onFirefoxLoad(); }, false);
