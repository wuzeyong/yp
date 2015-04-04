yp.operator = yp.operator || {};

yp.operator.DocTree = yp.Core.extend({
	id:null,
	actionGrid:null,
	constructor : function(config){
		$.extend(this,config);
		var id = this.id;
		var actionGrid = this.actionGrid;
		var dialog=new yp.AjaxValidationDialog({
			el : "#docTree",
			title : "移动文件到",
			url:yp.constant.CONTEXT_PATH + "operator/fileinfo/moveView.do",
			submitUrl:yp.constant.CONTEXT_PATH + "operator/fileinfo/move.do?id="+id,
			width : 500,
			height:400,
			 extraValid : function(){
				 var des = $('#docTree').find('input[name="des"]').val();
					if(des == ""){
						yp.utils.notice.info("未选择文件！","提示信息",1000);
						return false;
					}
					if(des == id){
						yp.utils.notice.info("当前文件夹不移到当前文件夹","提示信息",1000);
						return false;
					}
					return true;
             },
		});
		dialog.open();
		dialog.once("onClose" , function (){
			actionGrid.reload();
         });
	},
}); 