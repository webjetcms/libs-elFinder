/**
 * @class  elFinder command "paste"
 * Paste filesfrom clipboard into directory.
 * If files pasted in its parent directory - files duplicates will created
 **/
elFinder.prototype.commands.wjfileprops = function() {
	"use strict";
	var fm = this.fm;

	this.getstate = function(sel) {
		var sel = this.files(sel);

		if (sel.length == 1 && typeof sel[0].mime != "undefined" && sel[0].mime != "directory") {
			return 0;
		}

		return -1;
	};

	this.exec = function(hashes) {
		var dfrd  = $.Deferred().fail(function(error) { error && fm.error(error); });

		//return dfrd.reject("KOKOS");

		if(hashes === null || hashes === undefined || hashes.length < 1) { 
			return dfrd.reject("Hashes are not valid.");
		}

		var fileVirtualPath;
		try {
			var file = this.files(hashes)[0];
			fileVirtualPath = file.virtualPath;
		} catch(e) {
			return dfrd.reject("File not found.");
		}

		var dir = fileVirtualPath.substring(0, fileVirtualPath.lastIndexOf('/') + 1);
		var file = fileVirtualPath.substring(fileVirtualPath.lastIndexOf('/') + 1);

		var modal = $('#elfinder-modal');
		modal.find('#modalLabel').text(this.title);
		modal.find('.modal-body').html('<iframe id="elfinderIframe" src="/admin/fbrowser/fileprop/?prop=yes&dir=' + dir + '&file=' + file + '" class="iframe" />');
		modal.find('.action').show();

		if (typeof modal.modal == 'function') {
			modal.modal('show');
		}
		else {
			modal.modal({});
		}

		return dfrd.resolve();
	}

}
