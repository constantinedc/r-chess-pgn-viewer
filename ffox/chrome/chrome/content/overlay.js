var rchesspgnviewer = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("rchesspgnviewer-strings");

		var appcontent = document.getElementById('appcontent');
		appcontent.addEventListener('DOMContentLoaded', rchesspgnviewer.onPageLoad, true);
  },

	onPageLoad: function(){
		if (content.location.host == 'www.reddit.com'){
			var loader = Components.classes['@mozilla.org/moz/jssubscript-loader;1'].getService(Components.interfaces.mozIJSSubScriptLoader);

			loader.loadSubScript('chrome://rchesspgnviewer/content/rchesspgn.js', content)
		}
	}
};

window.addEventListener("load", function () { rchesspgnviewer.onLoad(); }, false);
