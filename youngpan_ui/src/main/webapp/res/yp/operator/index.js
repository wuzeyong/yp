yp.common = yp.operator || {};

yp.common.FileGrid = yp.Core.extend({
	constructor : function(config){
		$.extend(this,config);
		this.prepareGridOptions();
		this.prepareGridOptionsType();
		this.operate  = yp.utils.createDelegate(this.operate,this);
		this.gridOptions.url =this.gridOptions.url+yp.constant.CURRENTID;
		this.actionGrid = new yp.ActionGrid(this);
		//this.initDocumentTreeDialog();
	},
	/*initDocumentTreeDialog : function(){
		this.dialog = new yp.AjaxValidationDialog({
			el : "#docTree-editor",
			title : "移动到",
			width : 500,
			height:460,
		});
	},*/
	gridEL:"#grid-table",
	pagerEL:"#grid-pager",
	searcherEL:"#yp-grid-searcher",
	navEL:"#yp-grid-nav",
	rowButtons:[yp.buttons.download,yp.buttons.move,yp.buttons.rename,yp.buttons.remove],
	navButtons:[yp.buttons.batchDownload,yp.buttons.batchRemove],
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
		case "download" :
			var data = {id : rowId}; 
			this.actionGrid.execute("fileinfo/download.do",data);
			break;
		case "remove" :
			var data = {ids : rowId}; 
			this.actionGrid.execute("fileinfo/remove.do",data,"请确认要删除吗？");
			break;
		case "batchRemove" :
			this.actionGrid.executeBatch("fileinfo/remove.do","请确认要删除吗？");
			break;	
		case "move" :
			//this.dialog.setTitle("移动到");
			//yp.Service.addByDialog2Grid(this.dialog,this.actionGrid,"fileinfo/moveView.do","fileinfo/move.do");
			var docTree = new yp.operator.DocTree( {id : rowId,actionGrid:this.actionGrid});
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
		console.log(fileName);
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
		$('#rename-editor').find('input[name="fileName"]').focus().select();
		var ajaxForm = new yp.PageAjaxForm({
			el : "#rename-editor",
			submitUrl : yp.constant.CONTEXT_PATH + "operator/fileinfo/updateFileName.do",
			submitButtonEL : "#submit",
			cancelButtonEL : "#cancel",
			successURL:yp.constant.CONTEXT_PATH + "operator/index.do?id="+yp.constant.CURRENTID+"&fileBread=true",
			onCancelClick : function(){
				$("tr[id=" + rowId
						+ "] td[aria-describedby='grid-table_fileName']")
						.replaceWith("<td aria-describedby='grid-table_fileName' title='"+fileName+"' style='' role='gridcell'>"+rowData.fileName+"</td>");
			},
			extraValid:function(){
				var fileName = $('#rename-editor').find('input[name="fileName"]').val();
				if(fileName == ""){
					yp.utils.notice.info("文件名不能为空","提示信息",1000);
					return false;
				}
				return true;
			}
		});
	},
	
	prepareGridOptions : function(){
		var self = this;
		//column of name
		this.gridOptions.colModel[2].formatter = function(colValue,options,rowObject){
			var isDirectory = rowObject.directory;
			if(isDirectory){
				 var href = "index.do?id=" + rowObject.id;
				 return '<a  href="' + href + '" >'+colValue+'</a>';
			}else{
				 return colValue;
			}
		};
	},
	
	prepareGridOptionsType : function(){
		var self = this;
		//column of fileType
		this.gridOptions.colModel[1].formatter = function(colValue,options,rowObject){
			return '<span class="col-xs-2 ' + colValue + '" ></span>';
		};
	},
	
	rowFlag:false,
	
	addRowData:function(){
		var self = this;
		 var ids = $(self.gridEL).jqGrid('getDataIDs');
		 //获得当前最大行号（数据编号）
		 var rowid = Math.max.apply(Math,ids);
		 //获得新添加行的行号（数据编号）
		 var newrowid = rowid+1;
		 var date = new Date();
		 format = "yyyy-MM-dd HH:mm:ss";
		 var lastModify = format.replace("yyyy",date.getFullYear())
         .replace("MM",date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
         .replace("dd",date.getDate() < 10 ? "0" + (date.getDate()) : (date.getDate()))
         .replace("HH",date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
         .replace("mm",date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
         .replace("ss",date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
		 var rowData = [{
			 id:"",
			 fileTypeLabel:"dir",
			 fileName:"<div id='createDir-editor'><form>"
					+"<input type='hidden' name='id' value='"+yp.constant.CURRENTID+"'/>"
					+"<input id='fileName' name='fileName'  class='box' type='text' value='新建文件夹' ></input>"
					+"<input type='hidden' id='lastModify' name='lastModify'   value='"+lastModify+"' />"
					+"<span id='create'  class='btn   btn-xs badge badge-success' ><i class='icon-ok white'></i></span>"
					+"<span id='cancel' class='btn  btn-xs badge badge-warning' ><i class='icon-remove  whilt'></i></span></td>"
					+"</form></div>",
			 fileSize:"4096",
			 lastModify:lastModify,
			 操作:[yp.buttons.download,yp.buttons.move,yp.buttons.rename,yp.buttons.remove],
		 }];
		 $(self.gridEL).jqGrid("addRowData", newrowid, rowData, "last");
		 $('#createDir-editor').find('input[name="fileName"]').focus().select();
		 var ajaxForm = new yp.PageAjaxForm({
				el : "#createDir-editor",
				submitUrl : yp.constant.CONTEXT_PATH + "operator/fileinfo/createDirectory.do",
				submitButtonEL : "#create",
				cancelButtonEL : "#cancel",
				successURL:yp.constant.CONTEXT_PATH + "operator/index.do?id="+yp.constant.CURRENTID+"&fileBread=true",
				onCancelClick : function(){
					var ids = $(self.gridEL).jqGrid('getDataIDs');
					var rows = $(self.gridEL).getGridParam("reccount");
					var rowid = Math.max.apply(Math,ids);
					$(self.gridEL).jqGrid('delRowData', ids[rows-1]);  
					$(self.gridEL).trigger("reloadGrid");
					self.rowFlag = false;
				},
				successCallBack:function(data){
					if (data.status === 'success') {yp.constant.CONTEXT_PATH + "operator/fileinfo/createDirectory.do",
						self.rowFlag = false;
						console.log(self.rowFlag);
					}
					return true;
				},
				//when create directory,name not empty
				extraValid:function(){
					var fileName = $('#createDir-editor').find('input[name="fileName"]').val();
					if(fileName == ""){
						yp.utils.notice.info("文件名不能为空","提示信息",1000);
						return false;
					}
					return true;
				}
		});
	}
});

yp.common.Upload = yp.Core.extend({
	
	constructor : function(config){
		$.extend(this,config);
		var dialog=new yp.AjaxValidationDialog({
			el : "#upload-editor",
			modal : false,
			title : "上传文件",
			url:yp.constant.CONTEXT_PATH + "operator/fileinfo/uploadView.do",
			submitUrl:yp.constant.CONTEXT_PATH + "operator/fileinfo/uploadAll.do",
			width : 500,
			height:400,
		});
		dialog.open();
	},
}); 

