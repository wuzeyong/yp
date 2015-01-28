/**
 * 将jquery validator的errorPlacement重写，让错误样式及位置统一
 * 将jquery validator的showErrors重写，在全部验证的时候不要显示错误信息，只显示红色框框
 * */
jQuery.validator.setDefaults({
	errorElement: 'div',
	errorClass: 'help-block',
	focusInvalid: false,
	highlight: function (e) {
		var fieldGroup = $(e).closest(".ftm-field-group");
		if(fieldGroup.length == 0){
			fieldGroup = $(e).closest('.form-group'); 
		}
		
		fieldGroup.removeClass('has-info').addClass('has-error');
	},

	success: function (e) {
		var fieldGroup = $(e).closest(".ftm-field-group");
		if(fieldGroup.length == 0){
			fieldGroup = $(e).closest('.form-group'); 
		}
		fieldGroup.removeClass('has-error').addClass('has-info');
		$(e).remove(); 
	},

	errorPlacement: function (error, element) {
		if(element.is(':checkbox') || element.is(':radio')) {
			var controls = element.closest('div[class*="col-"]');
			if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
			else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
		}
		else if(element.is('.select2')) {
			error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
		}
		else if(element.is('.chosen-select')) {
			error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
		}else{
			var fieldParent = element.closest(".ftm-field-group");
			if(fieldParent.length > 0){
				error.appendTo(fieldParent);
			}else{
				error.insertAfter(element.parent());
			}
		}
		
	}
});

/**
 * 信息提示改为中文提示，以后要国际化的话，可以独立成一个js，用哪种语言就加载哪种信息提示
 * */
jQuery.extend(jQuery.validator.messages, {
    required: "此项不能为空",
    email: "请填写有效的邮箱",
    url: "请填写有效的URL",
    absolutePath: "请填写有效的绝对文件路径",
    date: "只能填日期",
    number: "只能填数字",
    code: "必须以字母开始可以包含数字、-、_",
    password : "请输入至少六位",
    username: "只能填写3位及以上数字、字母或横线、下划线、@",
    maxlength: jQuery.validator.format("最大长度不能超过 {0} 字符"),
    minlength: jQuery.validator.format("最小长度为 {0} 字符"),
    max: jQuery.validator.format("不能超过最大值 {0}"),
    min: jQuery.validator.format("不能小于最小值 {0}"),
    integer: "只能填整数"
});

/**
 * 如果想加自己的验证方法，可以像下面的代码jQuery.validator.addMethod加在这个js 
jQuery.validator.addMethod("userNameCheck", function(value) {
    return value != "admin";
}, '此用户名已经被注册！');		
*/

jQuery.validator.addMethod("password", function(value, element) {
    if($.trim(value).length > 0){
    	return /^.{6,}$/.test(value);
	}
	return true;
}, '请输入至少六位密码！');

jQuery.validator.addMethod("absolutePath", function(value, element) {
    if($.trim(value).length > 0){
    	return /(^\/.*$)|(^[a-zA-Z]\:[\\\/].*$)/.test(value);
	}
	return true;
}, '请填写有效的绝对文件路径！');

jQuery.validator.addMethod("mobile", function(value, element) {
    if($.trim(value).length > 0){
		return /^1[3|4|5|8]\d{9}$/.test(value);
	}
	return true;
}, '请填写有效的手机号码！');	

jQuery.validator.addMethod("telphone", function(value, element) {
	if($.trim(value).length > 0){
		return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value);
	}
	return true;
}, '请填写有效的电话号码！');		

jQuery.validator.addMethod("phone", function(value, element) {
	if($.trim(value).length > 0){
		return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value) || /^1[3|4|5|8]\d{9}$/.test(value);
	}
	return true;
}, '请填写有效的电话号码或手机号码！');

jQuery.validator.addMethod("code", function(value, element) {
    if($.trim(value).length > 0){
        return /^[a-zA-Z]+[a-zA-Z0-9-_]*$/.test(value);
    }
    return true;
}, '必须以字母开始可以包含数字、-、_');

jQuery.validator.addMethod("username", function(value, element) {
    if($.trim(value).length > 0){
        return this.optional(element)  || /^[a-zA-Z0-9-_@]{3,}$/.test(value);
    }
    return this.optional(element)  || true;
}, '只能填写3位及以上数字、字母或横线、下划线、@！');

jQuery.validator.addMethod("standard", function(value, element) {
    if($.trim(value).length > 0){
        return /^([0-9a-zA-Z\u4e00-\u9fa5-\_]+[0-9a-zA-Z\u4e00-\u9fa5\s-\_]*[0-9a-zA-Z\u4e00-\u9fa5-\_]+)$|^[0-9a-zA-Z\u4e00-\u9fa5-\_]$/.test(value);
    }
    return true;
}, '前后不能有空格，且不能包含特殊字符！');

jQuery.validator.addMethod("csv", function(value, element) {
    if($.trim(value).length > 0){
        return /^([0-9a-zA-Z\u4e00-\u9fa5-\_]+[0-9a-zA-Z\u4e00-\u9fa5\s-\_、，。\.]*[0-9a-zA-Z\u4e00-\u9fa5-\_]+)$|^[0-9a-zA-Z\u4e00-\u9fa5-\_、，。\.]$/.test(value);
    }
    return true;
}, '前后不能有空格，且不能包含特殊字符与英文的逗号！');

jQuery.validator.addMethod("image", function(value, element) {
    if($.trim(value).length > 0){
        return /^.*?\.(png|bmp|jpg|jpeg|PNG|BMP|JPG|JPEG)$/.test(value);
    }
    return true;
}, '请选择图片文件！');

jQuery.validator.addMethod("dm", function(value, element) {
    if($.trim(value).length > 0){
        return /^.*?\.(dm)$/.test(value);
    }
    return true;
}, '请选择一个正确的文件（dm后缀）！');

jQuery.validator.addMethod("ip", function(value, element) {
    if($.trim(value).length > 0){
        return /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);
    }
    return true;
}, '请输入正确的ip地址！');

jQuery.validator.addMethod("port", function(value, element){
	if($.trim(value).length > 0){
		// 是否是整数
		var isInt = /^\d+$/.test(value);
		if(!isInt){
			return false;
		}else{
			// 判断是否在0到65535之间
			var num = parseInt(value);
			return (num >= 0 & num <= 65535);
		}
	}
	return true;
}, '端口必须为数字且在0到65535之间！');

jQuery.validator.addMethod("timeout", function(value, element){
	if($.trim(value).length > 0){
		// 是否是整数
		var isInt = /^\d+$/.test(value);
		if(!isInt){
			return false;
		}else{
			// 判断是否大于1
			var num = parseInt(value);
			return (num >= 1);
		}
	}
	return true;
}, '超时时间必须为数字且须大于1！ ');

jQuery.validator.addMethod("wsdl", function(value, element) {
    if($.trim(value).length > 0){
		return this.optional(element) || /^(https?):\/\/((((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?)\?wsdl$/i.test(value);
	}
    return true;
}, '请填写有效的wsdl！');

jQuery.validator.addMethod("cronexp", function(value, element) {
        var errorMessage = jQuery.validator.messages;
	    if($.trim(value).length > 0){
		    value=value.replace(/(^\s*)|(\s*$)/g, ""); //去掉前后空白
		    var arr=value.split(/\s+/); //用空白分割		   
		            
		    if(arr.length!=6 && arr.length!=7){		       
		            errorMessage.cronexp= "表达式必须是 由5个或者6个空格隔开，如0 0 12 * * ?";		            
		            return false;
		         }
		    else{
		         // 为了清晰起见，我将规则拆分来写
		         var reg1=/^([0-5]?\d)([\/\-][0-5]?\d)?$/;      //形如23 23/34 45-59
		         var reg2=/^[0-5]?\d(,[0-5]?\d)*$/ ;         //形如 12,43,56  
		         var reg3=/^\*$/;                            //匹配 *		             
		         
		         if(arr[0]!=0){		               
		                    errorMessage.cronexp="第1位是秒，只允许是0";		                    
		                    return false;
		                }
		         if(!(reg1.test(arr[1])||reg2.test(arr[1])||reg3.test(arr[1]))){
		                    errorMessage.cronexp="第2位是分，允许的值(0-59 ,-*/)";		                    
		                     return false;
		                }
		         //reg1=/^(([0-1]?\d)|(2[0-3]))$/;   //ok的 0-23 注意最外层有一个括号
		         reg1=/^(([0-1]?\d)|(2[0-3]))([\/\-](([0-1]?\d)|(2[0-3])))?$/;  //形如23 12/18 7-19
		         reg2=/^(([0-1]?\d)|(2[0-3]))(,(([0-1]?\d)|(2[0-3])))*$/;       //形如12,15,20
				 
		        if(!(reg1.test(arr[2])||reg2.test(arr[2])||reg3.test(arr[2]))){
		                    errorMessage.cronexp="第3位是小时，允许的值(0-23 ,-*/)";
		                    return false;
		                }
						
		        //reg1=/^(([1-9])|([12]\d)|(3[01]))$/;  ok 1-31
		        reg1=/^(([1-9])|([12]\d)|(3[01]))([\/\-](([1-9])|([12]\d)|(3[01])))?$/;  //形如1 12/18 7-26
		        reg2=/^(([1-9])|([12]\d)|(3[01]))(,(([1-9])|([12]\d)|(3[01])))*$/;       //形如23,25,30
		        reg3=/^(\*|\?)$/;                                                        //形如 *  ?
				
		        var reg4=/^(((([1-9])|([12]\d)|(3[01]))[WC])|(LW?))$/;                  //形如12W 13C L LW
				
		        if(!(reg1.test(arr[3])||reg2.test(arr[3])||reg3.test(arr[3])||reg4.test(arr[3]))){		            
		                    errorMessage.cronexp="第4位是日，允许的值(1-31 ,-*/？L W C)";		                    
		                     return false;
		                } 
		         
				 //reg1=/^(([1-9])|(1[0-2]))$/;  ok 1-12
		         reg1=/^(([1-9])|(1[0-2]))([\/\-](([1-9])|(1[0-2])))?$/;                //形如1 3/6 7-10
		         reg2=/^(([1-9])|(1[0-2]))(,(([1-9])|(1[0-2])))*$/ ;                    //形如3,5,8
		         reg3=/^\*$/;
		         reg4=/^((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEPT)|(OCT)|(NOV)|(DEC))(\-((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEPT)|(OCT)|(NOV)|(DEC)))?$/i; //12个月份
				 
		         var reg5=/^((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEPT)|(OCT)|(NOV)|(DEC))(,((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEPT)|(OCT)|(NOV)|(DEC)))*$/i; //12个月份
		                 
		         if(!(reg1.test(arr[4])||reg2.test(arr[4])||reg3.test(arr[4])||reg4.test(arr[4])||reg5.test(arr[4]))){
		                   errorMessage.cronexp="第5位是月，允许的值(1-12 ,-*/ JAN-DEC)";		                   
		                   return false;                    
		                }
						
		         reg1=/^([1-7])([\/\-](([1-7])))?$/;                 //形如1 3/6 2-5
		         reg2=/^([1-7])(,([1-7]))*$/ ;   //形如3,5,6
		         reg3=/^(\*|\?|L)$/;                         //形如 * ? L
		         reg4=/^((MON)|(TUES)|(WED)|(THUR)|(FRI)|(SAT)|(SUN))([\-]((MON)|(TUES)|(WED)|(THUR)|(FRI)|(SAT)|(SUN)))?$/i; //形如 7个星期 -连接
		         reg5=/^((MON)|(TUES)|(WED)|(THUR)|(FRI)|(SAT)|(SUN))(,((MON)|(TUES)|(WED)|(THUR)|(FRI)|(SAT)|(SUN)))*$/i;    //形如 7个星期 ，枚举
		         var reg6=/^[1-7][LC]$/;                     //形如 3L 4C
		         var reg7=/^[1-7]?#[1-5]$/;                  //形如 #4  6#3		            
		  
		         if(!(reg1.test(arr[5])||reg2.test(arr[5])||reg3.test(arr[5])||reg4.test(arr[5])||reg5.test(arr[5])||reg6.test(arr[5])||reg7.test(arr[5]))){		                  
		                    errorMessage.cronexp="第6位是周儿，允许的值(1-7,-*/? L C # SUN-SAT)";
		                    return false;
		                } 
						
		         if(arr.length==7){
		                    //reg1=/^((19[7-9]\d)|(20\d\d))$/; //  1979-2099
		                    reg1=/^((19[7-9]\d)|(20\d\d))([\/\-]((19[7-9]\d)|(20\d\d)))?$/; 
		                    reg2=/^((19[7-9]\d)|(20\d\d))(,((19[7-9]\d)|(20\d\d)))*$/; 
		                    reg3=/^(\*|(empty))$/i;
		                    if(!(reg1.test(arr[6])||reg2.test(arr[6])||reg3.test(arr[6]))){		                       
		                        errorMessage.cronexp="第7位是年(可选)，允许值(empty,1979-2099 ,-*/)";
		                        return false;
		                   }

		                }   
				}
			}
	      return true;
		}, '');
		
jQuery.extend(jQuery.validator.methods,{
	email: function(value,element,param){
		if($.trim(value).length > 0){
			return /^[0-9a-z_][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$/.test(value.toLowerCase());
		}
		return true;
	}
});

//make sure remote at last
delete jQuery.validator.methods.remote;
jQuery.extend(jQuery.validator.methods,{
	remote: function( value, element, param ) {
		if ( this.optional(element) ) {
			return "dependency-mismatch";
		}

		var previous = this.previousValue(element);
		if (!this.settings.messages[element.name] ) {
			this.settings.messages[element.name] = {};
		}
		previous.originalMessage = this.settings.messages[element.name].remote;
		this.settings.messages[element.name].remote = previous.message;

		param = typeof param === "string" && {url:param} || param;

		if ( previous.old === value ) {
			return previous.valid;
		}

		previous.old = value;
		var validator = this;
		this.startRequest(element);
		var data = {};
		data[element.name] = value;
		$.ajax($.extend(true, {
			url: param,
			mode: "abort",
			port: "validate" + element.name,
			dataType: "json",
			data: data,
			success: function( response ) {
				validator.settings.messages[element.name].remote = previous.originalMessage;
				var valid = response.success === true || response.success === "true";
				if ( valid ) {
					var submitted = validator.formSubmitted;
					validator.prepareElement(element);
					validator.formSubmitted = submitted;
					validator.successList.push(element);
					delete validator.invalid[element.name];
					validator.showErrors();
				} else {
					var errors = {};
					var message = response.message || validator.defaultMessage( element, "remote" );
					errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
					validator.invalid[element.name] = true;
					validator.showErrors(errors);
				}
				previous.valid = valid;
				validator.stopRequest(element, valid);
			}
		}, param));
		return "pending";
	}
});
