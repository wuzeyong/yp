yp.operator = yp.operator || {};

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