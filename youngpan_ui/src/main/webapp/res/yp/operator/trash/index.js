yp.common = yp.operator || {};

yp.common.FileGrid = yp.Core.extend({
	constructor : function(config){
		$.extend(this,config);
		this.prepareGridOptions();
		this.prepareGridOptionsType();
		this.operate  = yp.utils.createDelegate(this.operate,this);
		this.gridOptions.url =this.gridOptions.url+yp.constant.CURRENTID;
		this.actionGrid = new yp.ActionGrid(this);
	},
	gridEL:"#grid-table",
	pagerEL:"#grid-pager",
	searcherEL:"#yp-grid-searcher",
	navEL:"#yp-grid-nav",
	rowButtons:[yp.buttons.undo,yp.buttons.remove],
	navButtons:[],
	gridOptions : {
		caption : "",
		url : "list.do?id="+yp.constant.CURRENTID,
		colNames : ['id','类型','文件名','大小', '修改日期'],
		colModel : [
			{name:'id',index:'id', width:20,editable: false,hidden:true},
			{name:'contentType',index:'contentType',width:20,editable:false},
			{name:'fileName',index:'fileName', width:100,editable: false},
			{name:'fileSize',index:'fileSize', width:20, editable: false},
			{name:'lastModify',index:'lastModify',formatter:yp.utils.getDateTimeRender(), width:50, editable: false},
		]
	},
	operate : function(buttonKey, rowId,rowData,e){
		switch (buttonKey) {
		case "undo" :
			var data = {id : rowId}; 
			this.actionGrid.execute("undo.do",data,"请确认要恢复吗？");
			break;
		case "remove" :
			var data = {id : rowId}; 
			this.actionGrid.execute("removeForever.do",data,"请确认要彻底删除吗？");
			break;
		default:
			console.log(buttonKey);
			console.log(rowId);
			console.log(rowData);
			break;
		}
	},
	
	prepareGridOptions : function(){
		var self = this;
		//column of name
		this.gridOptions.colModel[2].formatter = function(colValue,options,rowObject){
			return colValue;
		};
	},
	
	prepareGridOptionsType : function(){
		var self = this;
		//column of fileType
		this.gridOptions.colModel[1].formatter = function(colValue,options,rowObject){
			return '<span class="col-xs-2 ' + colValue + '" ></span>';
		};
	},
});


