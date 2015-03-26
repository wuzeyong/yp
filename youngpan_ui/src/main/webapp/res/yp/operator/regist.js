yp.operator = yp.operator || {};

yp.operator.RegistDialog = yp.Core.extend({
	constructor : function(config){
		$.extend(this,config);
		var dialog=new yp.AjaxValidationDialog({
			el : "#regist-editor",
			title : "注册",
			url:yp.constant.CONTEXT_PATH + "login/registView.do",
			submitUrl:yp.constant.CONTEXT_PATH + "login/regist.do",
			successURL:yp.constant.CONTEXT_PATH + "login/index.do",
			width : 600,
			height:400,
			extraData : function(form){
				var salt = "%t&f";
				var passwordText = form.passWord + salt + form.name;
				form.passWord = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(passwordText))
				form.confirmPassword = form.password;
				return form;
			},
		});
		jQuery.validator.addMethod("confirmPassword", function(value, element) {
			var password = $("input[name=passWord]").val();
			var confirmPassword = $("input[name=confirmPassword]").val();
			console.log(password);
			console.log(confirmPassword);
			return password == confirmPassword;
		}, '确认密码与密码不一致！');
		dialog.open();
	},
}); 