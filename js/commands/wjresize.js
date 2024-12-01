"use strict";
/**
 * @class  elFinder command "resize"
 * Open dialog to resize image
 *
 * @author Dmitry (dio) Levashov
 * @author Alexey Sukhotin
 * @author Naoki Sawada
 * @author Sergio Jovani
 **/
elFinder.prototype.commands.resize = function() {

	this.updateOnSelect = false;

	this.getstate = function() {
		var sel = this.fm.selectedFiles();
		return !this._disabled && sel.length == 1 && sel[0].read && sel[0].write && sel[0].mime.indexOf('image/') !== -1 ? 0 : -1;
	};

	this.exec = function(hashes) {
		var fm    = this.fm,
			files = this.files(hashes),
			dfrd  = $.Deferred(),

			open = function(file) {
				var index = file.virtualPath.lastIndexOf("/");
				var dir = file.virtualPath.substring(0, index);
				var name = file.virtualPath.substring(index + 1);

				var width = 990;
				var height = 720;
				if (screen.height > 1200)
				{
					width=1300;
					height = screen.height - 150;
				}
				else if (screen.height > 800)
				{
					width = 1200;
					height = screen.height - 150;
				}

				window.addEventListener("WJ.AdminUpload.ImageEditor.success", function(e) {
					console.log("Upload success", e);
				});

				WJ.openIframeModalDatatable({
					url: '/admin/v9/apps/image-editor?id=-1&dir=' + dir + '&name=' + name + '&showOnlyEditor=true',
					width: width,
					height: height,
					buttonTitleKey: "button.save",
					okclick: function() {
						let isEditorActiveTab = $('#modalIframeIframeElement').contents().find("#pills-dt-galleryTable-photoeditor-tab").hasClass("active");
						if(isEditorActiveTab) {
							//Handle EDITOR tab
							$('#modalIframeIframeElement').contents().find('div.modal.DTED.show div.DTE_Footer button.btn-primary').trigger("click");
							$("#modalIframe").find(".modal-header").hide();
							$("#modalIframe").find(".modal-footer").hide();

							let loaderText = WJ.translate("components.image_editor.saving.js");
							$(".hide-while-loading").hide();
							let loaderEl = $("#webjetAnimatedLoader");
							if (loaderEl.length<1) {
								let loaderText = WJ.translate("webjetjs.webjetAnimatedLoader.text.js");
								loaderEl = $(`
								<div id="webjetAnimatedLoader">
									<div class="lds-dual-ring"></div>
									<p class="loaderText">${loaderText}</p>
								</div>`);
								loaderEl.insertAfter( $('#modalIframeIframeElement').contents().find("#modalIframeLoader") );
							}
							if (loaderText != null) loaderEl.find(".loaderText").text(loaderText);
							loaderEl.show();

							return false;
						} else {
							// basic submit and close modal
							$('#modalIframeIframeElement').contents().find('div.modal.DTED.show div.DTE_Footer button.btn-primary').trigger("click");

							setTimeout(function() { $('#finder').elfinder('instance').exec('reload'); }, 1000);

							return true;
						}
					},
					onload: function(detail) {
						let iframeWindow = detail.window;
						iframeWindow.addEventListener("WJ.AdminUpload.ImageEditor.success", function(e) {
							WJ.closeIframeModal();

							$("#modalIframe").find(".modal-header").show();
							$("#modalIframe").find(".modal-footer").show();

							$('#finder').elfinder('instance').exec('reload');
						});
					}
				});
			};

		if (!files.length || files[0].mime.indexOf('image/') === -1) {
			return dfrd.reject();
		}

		open(files[0]);

		return dfrd;
	};

};
