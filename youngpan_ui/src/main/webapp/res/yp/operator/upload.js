yp.operator = yp.operator || {};

yp.operator.FileSubmitForm = yp.Core.extend({
	el:null,
	constructor : function(config){
		$.extend(this,config);
		this.el = $("#submit-file");
		var form = new yp.PageAjaxForm({
			el:"#submit-file",
			submitUrl : "fileinfo/uploadAll.do?id="+yp.constant.CURRENTID,
			cancelURL:"fileinfo/cancelAll.do",
			successURL:yp.constant.CONTEXT_PATH+"index.do?id="+yp.constant.CURRENTID,
			cancelURL:yp.constant.CONTEXT_PATH+"index.do?id="+yp.constant.CURRENTID,
			submitButtonEL:"#submit",
			cancelButtonEL:"#cancel",
		});
	}
});

yp.operator.CreateDirectory = yp.Core.extend({
	constructor : function(config){
		$.extend(this,config);
		var dialog=new yp.AjaxValidationDialog({
			el : "#newfile-editor",
			title : "上传文件",
			url:yp.constant.CONTEXT_PATH + "fileinfo/createDirectoryFirstlyView.do",
			submitUrl:yp.constant.CONTEXT_PATH + "fileinfo/createDirectoryFirstly.do?id="+yp.constant.CURRENTID,
			width : 200,
			height:200,
		});
		dialog.open();
	},
}); 

yp.operator.UploadDialog = yp.Core.extend({
	constructor : function(config){
		$.extend(this,config);
		var dialog=new yp.AjaxValidationDialog({
			el : "#upload-editor",
			title : "上传文件",
			url:yp.constant.CONTEXT_PATH + "operator/fileinfo/uploadView.do?id="+yp.constant.CURRENTID,
			submitUrl:yp.constant.CONTEXT_PATH + "operator/index.do?id="+yp.constant.CURRENTID,
			width : 500,
			height:450,
		});
		dialog.open();
	},
}); 