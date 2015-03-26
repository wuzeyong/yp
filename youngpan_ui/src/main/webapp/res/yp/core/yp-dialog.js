(function(name, $, yp, _) {
    var utils = yp.utils, Dialog = yp[name] = yp.Core.extend({
    	name : 'Dialog',
    	
        _dialog : null,
        _button : null,
        _options : null,

        submitUrl : null,
        
        _submiting : false,
        cancelButtonClazz : "btn btn-xs",
        submitButtonClazz : "btn btn-primary btn-xs",
        constructor : function(setting) {
        	$.extend(this,setting);
            var self = this;
            this._options = setting;

            var dialogOptions = $.extend({
                height : 300,
                width : 490,
                dialogClass : "yp-dialog",
                titleHtml : true,
                buttons : [ {
                    text : "确定",
                    "class" : this.submitButtonClazz, 
                    click : yp.utils.createDelegate(this.onSubmitClick,this)
                }, {
                    text : "取消",
                    "class" : this.cancelButtonClazz,
                    click : yp.utils.createDelegate(this.onCancelClick,this)
                } ]
            }, setting,

            {
                autoOpen : false,
                close : function() {
                    self.trigger('onClose');
                },
                open : function() {
                    self.trigger('onOpen');
                },
                modal : true
            });
            
            this._dialog = $(setting.el).dialog(dialogOptions);
            this._bindEvent();
            if(this._options.title){
            	this.setTitle(this._options.title);
            }
        },
        onSubmitClick : function(){
        	this.submit(this.toJson(this._dialog));
        },
        onCancelClick : function(){
        	this.close();
        },
        _bindEvent : function (){
            var dialog = this._dialog.closest(".ui-dialog"),
            dialogOverlay = null;
            
            this.once("onOpen" , function (){
                dialogOverlay = $(document).find(".ui-widget-overlay");
                dialogOverlay.css({textAlign : 'center' , fontSize : '24px' , color:'#000' , lineHeight : dialogOverlay.height()+"px"});
            });
            this.on("beforeSubmit" , function (){
            	dialog.addClass("yp-dialog-hidden");
                dialogOverlay.text("正在处理...");
                this._submiting = true;
            });
            this.on("onSuccess" , function (){
            	dialog.removeClass("yp-dialog-hidden");
                dialogOverlay.text("");
                this._submiting = false;
            }).on("onError" , function (){
            	dialog.removeClass("yp-dialog-hidden");
                dialogOverlay.text("");
                this._submiting = false;
            });
        },

        open : function() {
            this._dialog.dialog('open');
        },

        close : function() {
            this._dialog.dialog('close');
            this._dialog.empty();
        },

        toJson : function(form) {
            return utils.form2Json($(form));
        },
        
        setTitle : function(title) {
        	this._dialog.dialog({'title' : "<div class='widget-header widget-header-small'><h4 class='smaller'>"+(title)+"</h4></div>"});
        },
        extraData : function(form){
        	return form
        },
        submit : function(form) {
        	form = this.extraData(form);
            var self = this;
            if(this._submiting){
                return ;
            }
            var startUploadImgs = $("*[name^='" + yp.constant.uploadImgStart + "']");
            if (startUploadImgs && startUploadImgs.length > 0) {
            	this.showError("正在上传文件...请稍后");
            	return;
            }
            this.trigger('beforeSubmit' );
            $.ajax({
                data : form,
                type : "POST",
                url : this.submitUrl,
                dataType : "json",
                success : function(data) {
                    self.showSuccessTip(data, form);
                },
                error : function(xhr , textStatus) {
                	try{
                	    self.trigger('onError' ,JSON.parse(xhr.responseText).message , form);
                	}catch(e){
                	    self.trigger('onError' , xhr.statusText, form);
                	}
                	yp.utils.events.trigger("error" , xhr , textStatus);
                }
            });
            
        },

        showSuccessTip : function(data, form) {
        	if (data.status === 'success') {
                this.showSuccess(data.message);
                this.trigger('onSuccess' ,data);
                this.close();
            } else {
                this.showErrorTip(data, form);
            }
        },

        showErrorTip : function(data, form) {
        	this.trigger('onError' ,data);
            this.showError(data.message);
        }
    });

}("Dialog", jQuery, yp, _));