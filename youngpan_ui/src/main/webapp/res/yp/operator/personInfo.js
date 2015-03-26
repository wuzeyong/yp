yp.operator = yp.operator || {};

yp.operator.PasswordResetting = yp.Core.extend({
	
	constructor : function(config){
		$.extend(this,config);
		var dialog=new yp.AjaxValidationDialog({
			el : "#passwordResettingDialog",
			title : "修改密码",
			url:yp.constant.CONTEXT_PATH + "operator/user/resetPasswordView.do",
			submitUrl:yp.constant.CONTEXT_PATH + "operator/user/resetPassword.do",
			width : 500,
			height:400,
			extraData : function(form){
				var salt = "%t&f";
				var passwordText = form.passWord + salt + form.name;
				var oldPasswordText = form.oldPassword + salt +form.name;
				form.oldPassword = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(oldPasswordText));
				form.passWord = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(passwordText));
				form.passWord = form.passWord;
				form.confirmPassword = form.passWord;
				return form;
			},
		});
		/*dialog.on("onDomComplete",function(){
			new yp.common.PasswordStrength({
				containerEl : $("#passwordResettingDialog"),
				passwordEl : $("#passwordResettingDialog").find("input[name='passWord']")
			});
		})*/
		jQuery.validator.addMethod("confirmPassword", function(value, element) {
			var password = $("input[name=passWord]").val();
			var confirmPassword = $("input[name=confirmPassword]").val();
			return password == confirmPassword;
		}, '确认密码与密码不一致！');
		
		dialog.open();
	},
}); 


yp.operator.PersonInfoEditting = yp.Core.extend({
	
	constructor : function(config){
		$.extend(this,config);
		var dialog=new yp.AjaxValidationDialog({
			el : "#personInfoEdittingDialog",
			title : "个人信息",
			url:yp.constant.CONTEXT_PATH + "operator/user/editPersonInfoView.do",
			submitUrl:yp.constant.CONTEXT_PATH + "operator/user/editPersonInfo.do",
			width : 500,
			height:400,
		});
		dialog.open();
	},
});