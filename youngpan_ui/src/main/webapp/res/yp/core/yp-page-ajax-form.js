;(function(name,yp,_){
	var PageAjaxForm = yp[name] = yp.AjaxValidationDialog.extend({
		el : null,
		validOptions : {ignore: ""},
		submitUrl : "creat.do",
		submitButtonEL : null,
		cancelButtonEL : null,
		constructor:function(config){
			$.extend(this,config)
			$(this.submitButtonEL).click(yp.utils.createDelegate(this.onSubmitClick,this))
			$(this.cancelButtonEL).click(yp.utils.createDelegate(this.onCancelClick,this))
			this._validation($(this.el).find('form'));
			this._bindEvent();
		},
		toJson : function() {
            return yp.utils.form2Json(this._$form);
        },
		onClose : function(){},
		_bindEvent : function (){
	        this.once("onOpen" , function (){
	        });
	        this.on("beforeSubmit" , function (){
	        	bootbox.dialog({
					message: '<span class="bigger-110"><i class="icon-spinner icon-spin orange bigger-125"></i>正在处理...</span>'
				});
	        	this._submiting = true;
	        });
	        this.on("onError" , function (){
	        	bootbox.hideAll();
	        	this._submiting = false;
	        });
	    },
	    onCancelClick : function(){
	    	window.location.href = this.cancelURL;
		},
		close:function(data){
			var self = this;
			setTimeout(function(){
				window.location.href = self.getSuccessURL(data);
			},1000)
		},
		getSuccessURL : function(data){
			return this.successURL;
		}
	    /*showSuccessTip : function(data, form) {
	    	if (data.status === 'success') {
	            this.showSuccess(data.message);
	            window.location.href = this.successURL;
	        } else {
	            this.showErrorTip(data, form);
	        }
	    }*/
	});
})("PageAjaxForm",yp,_);