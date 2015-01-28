ftm.admin = ftm.admin || {};

ftm.admin.DirectoryGrid = ftm.Core.extend({
	constructor : function(config){
		$.extend(this,config)
		this.operate  = ftm.utils.createDelegate(this.operate,this);
		this.gridOptions.url = "list.do?nodeId=" + this.nodeId,
		this.actionGrid = new ftm.ActionGrid(this);
		this.dialog = new ftm.AjaxValidationDialog({
			el : "#dialog",
			title : "创建目录",
			width : 500,
			height:350
		})
	},
	nodeId : null,
	gridEL:"#grid-table",
	pagerEL:"#grid-pager",
	navEL:"#ftm-grid-nav",
	rowButtons:[ftm.buttons.edit,ftm.buttons.remove,ftm.buttons.copy],
	navButtons:[ftm.buttons.add,ftm.buttons.batchRemove],
	gridOptions : {
		caption : "",
		colNames : ['id','路径','类型', '描述'],
		colModel : [ 
			{name:'id',index:'id', width:50,editable: false,hidden:true},
			{name:'path',index:'path', width:200,editable: false},
			{name:'typeLabel',index:'typeLabel', width:100, editable: false},
			{name:'desc',index:'desc', width:100, editable: false}
		]
	},
	operate : function(buttonKey, rowId,rowData,e){
		switch (buttonKey) {
			case "remove" :
				var data = {ids : rowId}; 
				this.actionGrid.execute("remove.do",data,"请确认要删除吗？");
				break;
			case "batchRemove" :
				this.actionGrid.executeBatch("remove.do","请确认要删除吗？");
				break;	
			case "add" :
				this.dialog.setTitle("创建目录");
				ftm.Service.addByDialog2Grid(this.dialog,this.actionGrid,"createView.do?nodeId="+this.nodeId,"create.do");
				break;
			case "copy" :
				this.dialog.setTitle("创建目录");
				ftm.Service.addByDialog2Grid(this.dialog,this.actionGrid,"copyView.do?id="+rowId,"create.do");
				break;	
			case "edit" :
				this.dialog.setTitle("修改目录信息");
				ftm.Service.addByDialog2Grid(this.dialog,this.actionGrid,"updateView.do?id="+rowId,"update.do");
				break;	
		}
	}
});
