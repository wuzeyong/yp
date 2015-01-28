yp.operator = yp.operator || {};

yp.operator.FileSubmitForm = yp.Core.extend({
	el:null,
	constructor : function(config){
		$.extend(this,config);
		this.el = $("#submit-file");
		var form = new yp.PageAjaxForm({
			el:"#submit-file",
			submitUrl : "fileinfo/uploadAll.do",
			cancelURL:"fileinfo/cancelAll.do",
			successURL:yp.constant.CONTEXT_PATH+"operator/index.do",
			//cancelURL:yp.constant.CONTEXT_PATH+"operator/index.do",
			submitButtonEL:"#submit",
			cancelButtonEL:"#cancel",
		});
	}
});