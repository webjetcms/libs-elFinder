"use strict";

/**
 * @class elFinder command "wjeditswitch".
 * 
 * By file type, switch between wjedit and wjresize. 
 * 
 * Purpose is to remove redundant icons.
 */
elFinder.prototype.commands.wjeditswitch = function() {
	
    this.updateOnSelect = true;

	this.getstate = function(sel) {
		var sel = this.files(sel);

		if (sel.length == 1 && typeof sel[0].mime != "undefined" && sel[0].mime != "directory") {
			return 0;
		}

		return -1;
	};

    this.exec = function(hashes) {
		var fm    = this.fm,
			files = this.files(hashes),
			dfrd  = $.Deferred();

        if (!files.length) {
            return dfrd.reject();
        }

        if(files[0].mime.indexOf('image/') === 0) {
            console.log("CALL wjresize");
            $('#finder').elfinder('instance').exec('resize', files[0].hash); //Its wjresize BUT it's registre as resize
        } else {
            $('#finder').elfinder('instance').exec('wjedit', files[0].hash);
        }

        return dfrd;
    };
};