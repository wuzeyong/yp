yp.common = yp.operator || {};

yp.common.FileGrid = yp.Core.extend({
	constructor : function(config){
		$.extend(this,config)
		this.prepareGridOptions();
		this.prepareGridOptionsType();
		this.operate  = yp.utils.createDelegate(this.operate,this);
		this.actionGrid = new yp.ActionGrid(this);
	},
	gridEL:"#grid-table",
	pagerEL:"#grid-pager",
	searcherEL:"#yp-grid-searcher",
	navEL:"#yp-grid-nav",
	rowButtons:[yp.buttons.download,yp.buttons.move,yp.buttons.rename,yp.buttons.remove],
	navButtons:[yp.buttons.batchDownload,yp.buttons.batchRemove],
	gridOptions : {
		caption : "",
		url : "list.do",
		colNames : ['id','类型','文件名','大小', '修改日期'],
		colModel : [
			{name:'id',index:'id', width:20,editable: false,hidden:true},
			{name:'fileTypeLabel',index:'fileTypeLabel',width:20,editable:false},
			{name:'fileName',index:'fileName', width:100,editable: false},
			{name:'fileSize',index:'fileSize', width:20, editable: false},
			{name:'lastModify',index:'lastModify',formatter:yp.utils.getDateTimeRender(), width:50, editable: false},
		]
	},
	operate : function(buttonKey, rowId,rowData,e){
		switch (buttonKey) {
		case "download" :
			this.actionGrid.execute("download.do",data);
			break;
		case "remove" :
			var data = {ids : rowId}; 
			this.actionGrid.execute("fileinfo/remove.do",data,"请确认要删除吗？");
			break;
		case "batchRemove" :
			this.actionGrid.executeBatch("fileinfo/remove.do","请确认要删除吗？");
			break;	
		case "move" :
			this.dialog.setTitle("移动到");
			yp.Service.addByDialog2Grid(this.dialog,this.actionGrid,"moveView.do","move.do");
			break;
		case "rename" :
			this.rename(rowId,rowData);
			break;	
		default:
			console.log(buttonKey);
			console.log(rowId);
			console.log(rowData);
			break;
		}
	},
	rename:function(rowId,rowData){
		//获取a标签中的值
		var fileNameText = rowData.fileName;
		var reg = "(<a\.*>)(\.*)(</a>)";
		var fileName = fileNameText.match(reg)[2];
		$("tr[id=" + rowId
				+ "] td[aria-describedby='grid-table_fileName']")
				.replaceWith(
						"<td aria-describedby='grid-table_fileName'  style='' role='gridcell'>"
						+"<div id='rename-editor'><form>"
						+"<input type='hidden' name='id' value='"+rowId+"'/>"
						+"<input id='fileName' name='fileName'  class='box' type='text' value='"+fileName+"' >"
						+"</input><span id='submit'  class='btn   btn-xs badge badge-success' ><i class='icon-ok white'></i></span>"
						+"<span id='cancel' class='btn  btn-xs badge badge-warning' ><i class='icon-remove  whilt'></i></span></td>"
						+"</form></div>");
		var ajaxForm = new yp.PageAjaxForm({
			el : "#rename-editor",
			submitUrl : yp.constant.CONTEXT_PATH + "operator/fileinfo/updateFileName.do",
			submitButtonEL : "#submit",
			cancelButtonEL : "#cancel",
			successURL:yp.constant.CONTEXT_PATH + "operator/index.do",
			onCancelClick : function(){
				$("tr[id=" + rowId
						+ "] td[aria-describedby='grid-table_fileName']")
						.replaceWith("<td aria-describedby='grid-table_fileName' title='"+fileName+"' style='' role='gridcell'>"+rowData.fileName+"</td>");
			},
		});
	},
	prepareGridOptions : function(){
		var self = this;
		//column of name
		this.gridOptions.colModel[2].formatter = function(colValue,options,rowObject){
			var href = "detailView.do?id=" + rowObject.id + "&fileBread=true";
			return '<a href="' + href + '" >'+colValue+'</a>';
		};
	},
	prepareGridOptionsType : function(){
		var self = this;
		//column of fileType
		this.gridOptions.colModel[1].formatter = function(colValue,options,rowObject){
			return '<span class="col-xs-2 ' + colValue + '" ></span>';
		};
	}
});
