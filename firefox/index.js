var pageMod = require("sdk/page-mod");
var self = require('sdk/self');

pageMod.PageMod({
  include: "*.reddit.com",
  contentStyleFile: [
    self.data.url("board-min.css"),
    self.data.url("rchess.css")
  ],
  contentScriptFile: [
    self.data.url("jquery-2.1.4.min.js"),
    self.data.url("pgnyui.js"),
    self.data.url("pgnviewer.js"),
    self.data.url("rchesspgn.js")
  ]
});
