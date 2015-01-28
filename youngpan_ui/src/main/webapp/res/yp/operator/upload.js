yp.operator = yp.operator || {};

yp.operator.FileSubmitForm = yp.Core.extend({
	el:null,
	constructor : function(config){
		$.extend(this,config);
		this.el = $("#submit-file");
		var form = yp.PageAjaxForm({
			el:"#submit-file",
			submitUrl : "fileinfo/uploadAll.do",
			successURL:yp.constant.CONTEXT_PATH+"operator/fileinfo/index.do",
			submitButtonEL:"#submit",
			cancelButtonEL:"#cancel",
		});
	}
});