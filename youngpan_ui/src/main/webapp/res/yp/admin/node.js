ftm.admin = ftm.admin || {};

ftm.admin.NodeGrid = ftm.Core.extend({
	constructor : function(config){
		$.extend(this,config)
		this.operate  = ftm.utils.createDelegate(this.operate,this);
		this.actionGrid = new ftm.ActionGrid(this);
		this.dialog = new ftm.AjaxValidationDialog({
			el : "#dialog",
			width : 600,
			height:500,
			extraData : function(form){
				var salt = "%t&f";
				var passwordText = form.password + salt + form.username;
				form.password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(passwordText))
				return form;
			}
		})
		//若编辑的时候，设定用户密码必须同时输入或同时不输入
		var self = this;	
		this.dialog.on("onDomComplete",function(){
			if(self.dialog._dialog.find("input[name='id']").val() == "0"){
				return;
			}
			self.dialog._dialog.find("input[name='username']").blur(function(){
				if($(this).val().length > 0){
					self.dialog._dialog.find("input[name='password']").attr("required","true");
				}else{
					self.dialog._dialog.find("input[name='password']").removeAttr("required");
				}
			});
			self.dialog._dialog.find("input[name='password']").blur(function(){
				if($(this).val().length > 0){
					self.dialog._dialog.find("input[name='username']").attr("required","true");
				}else{
					self.dialog._dialog.find("input[name='username']").rmeoveAttr("required");
				}
			});
		})
	},
	gridEL:"#grid-table",
	pagerEL:"#grid-pager",
	searcherEL:"#ftm-grid-searcher",
	navEL:"#ftm-grid-nav",
	rowButtons:[ftm.buttons.edit,ftm.buttons.remove,
	            {key:"directory",iconClazz:"icon-folder-open-alt",title:"管理节点目录",href:function(cellValue,options,rowObject){
	            	return "../directory/index.do?nodeId="+rowObject.id;
	            }}],
	navButtons:[ftm.buttons.add,ftm.buttons.batchRemove],
	gridOptions : {
		caption : "",
		url : "list.do",
		colNames : ['id','节点名','IP', '端口', '主动连接','状态','描述'],
		colModel : [ 
			{name:'id',index:'id', width:50,editable: false,hidden:true},
			{name:'name',index:'name', width:100,editable: false},
			{name:'ip',index:'ip', width:100, editable: false},
			{name:'port',index:'port', width:50, editable: false},
			{name:'volunteerConnect',index:'volunteerConnect', width:50,editable: false,formatter:function(colValue){
				return (colValue == "true" || colValue == true)  ? "节点-&gt;中心" : "中心-&gt;节点";
			}},
			{name:'state',index:'state', width:50,editable: false},
			{name:'desc',index:'desc', width:50, editable: false}
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
				this.dialog.setTitle("创建节点");
				ftm.Service.addByDialog2Grid(this.dialog,this.actionGrid,"createView.do","create.do");
				break;
			case "edit" :
				this.dialog.setTitle("修改节点信息");
				ftm.Service.addByDialog2Grid(this.dialog,this.actionGrid,"updateView.do?id="+rowId,"update.do");
				break;	
		}
	}
});
