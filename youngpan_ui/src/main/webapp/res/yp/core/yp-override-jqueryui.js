//**********************************override jquery***********************************
;(function($){
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title: function(title) {
			var $title = this.options.title || '&nbsp;'
			if( ("titleHtml" in this.options) && this.options.titleHtml == true )
				title.html($title);
			else title.text($title);
		}
	}));
})(jQuery);