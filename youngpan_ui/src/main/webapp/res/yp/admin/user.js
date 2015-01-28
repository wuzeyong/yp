ftm.admin = ftm.admin || {};

ftm.admin.UserGrid = ftm.Core.extend({
	constructor : function(config){
		$.extend(this,config)
		this.operate  = ftm.utils.createDelegate(this.operate,this);
		this.actionGrid = new ftm.ActionGrid(this);
		this.dialog = new ftm.AjaxValidationDialog({
			el : "#dialog",
			title : "创建用户",
			width : 500,
			height:460,
			extraData : function(form){
				var salt = "%t&f";
				var passwordText = form.password + salt + form.name;
				form.password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(passwordText))
				form.confirmPassword = form.password;
				return form;
			}
		})
		// for confirmPassword validate
		jQuery.validator.addMethod("confirmPassword", function(value, element) {
			var password = $("input[name=password]").val();
			var confirmPassword = $("input[name=confirmPassword]").val();
			return password == confirmPassword;
		}, '确认密码与密码不一致！');
	},
	gridEL:"#grid-table",
	pagerEL:"#grid-pager",
	searcherEL:"#ftm-grid-searcher",
	navEL:"#ftm-grid-nav",
	rowButtons:[ftm.buttons.edit,ftm.buttons.remove,$.extend({enable:{state:'NORMAL'}},ftm.buttons.lock),$.extend({enable:{state:'LOCK'}},ftm.buttons.unlock)],
	navButtons:[ftm.buttons.add,ftm.buttons.batchRemove],
	gridOptions : {
		caption : "",
		url : "list.do",
		colNames : ['id','用户名','姓名', '角色', '状态', '状态描述'],
		colModel : [ 
			{name:'id',index:'id', width:50,editable: false,hidden:true},
			{name:'name',index:'name', width:100,editable: false},
			{name:'realName',index:'realName', width:100, editable: false},
			{name:'roleLabel',index:'roleLabel', width:50, editable: false},
			{name:'stateLabel',index:'stateLabel', width:50, editable: false},
			{name:'stateDesc',index:'stateDesc', width:50, editable: false}
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
			case "lock" :
				var data = {id : rowId};
				this.actionGrid.execute("lock.do",data);
				break;
			case "unlock" :
				var data = {id : rowId};
				this.actionGrid.execute("unlock.do",data);
				break;	
			case "add" :
				this.dialog.setTitle("创建用户");
				ftm.Service.addByDialog2Grid(this.dialog,this.actionGrid,"createView.do","create.do");
				break;
			case "edit" :
				this.dialog.setTitle("修改用户信息");
				ftm.Service.addByDialog2Grid(this.dialog,this.actionGrid,"updateView.do?id="+rowId,"update.do");
				break;	
		}
	}
});
