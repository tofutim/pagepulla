var self = require("sdk/self");
var pageMod = require("sdk/page-mod");

exports.main = function(options, callbacks) {
  pageMod.PageMod({
	  include: "*",
	  contentScriptWhen: "ready",
	  contentScriptFile: ["./worker.js"],
	//  attachTo: ["existing", "top"],
	  onAttach: function(pageWorker) {
			pageWorker.id = Date.now();
		  console.log('attaching pageWorker', pageWorker.id,'in tab.ids',pageWorker.tab.id);
			pageWorker.on('pageshow', function() {
				console.log('showing pageWorker', pageWorker.id,'in tab.ids',pageWorker.tab.id);
			});
			pageWorker.on('pagehide', function() {
				console.log('hiding pageWorker', pageWorker.id,'in tab.ids',pageWorker.tab.id);
			});
	    pageWorker.on('detach', function() {
				console.log('detaching pageWorker', pageWorker.id,'in tab.ids',pageWorker.tab.id);
	      detachPageWorker(pageWorker);
	    });
	  }
  });
}
