/**
 * 带有验证的窗口,用的是jquery validator,验证用法参考http://validation.bassistance.de/documentation/,建议用属性验证  
 * * usage:
 * 
 * html :
 * 
 * <div id="dialog-modal" title="模态窗口"> // form 表单 </div>
 * 
 * js:
 * 
 * <pre>
 * 	$(function (){
 * 		var dialog = new yp.AjaxValidationDialog({
		   	el : "dialog-modal"
 *		});
 *
 *      dialog.url = yp.utils.url("xxxx",data);	
 *      
 *      dialog.open();
 *		dialog.submit = function (data){
 *			$.ajax({
 *				data : data,
 *				type:"POST",
 *				url : url,
 *				dataType : "json",
 *				success : function (data){
 *					if (data.status === 'success'){						
 *						dialog.close();
 *						return ;
 *					}  
 *				}
 *			});
 *		}
 *	});
 *  </pre>
 */
;(function(name, $, yp, _, AjaxDialog) {
    var utils = yp.utils, AjaxValidationDialog = yp[name] = AjaxDialog
            .extend({
            	name : 'AjaxValidationDialog',
            	validOptions : {},
            	_$form : null,
                onSubmitClick : function(){
                	if(!this._$form){
                        return ;
                    }
                	this._$form.validate(this.validOptions || {});
					var result = this.valid();
					if(result == true){
						this.submit(this.toJson(this._dialog));
					}
                },
                valid : function(){
                	var result = this._$form.valid() && this.extraValid();
					this.trigger("onFormValid",result,this._$form);
					return result;
                },
                extraValid : function(){
                	return true;
                },
                open : function() {
                    var self = this;
                    self._dialog.html(self.defaultContent);
                    if (self.url != null) {
                        $.ajax({
                            url : self.url,
                            success : function(data) {
                                self._dialog.empty().append(data);
                                self.trigger('onDomComplete',data);
                                self._validation($(self._dialog).find('form'));
                            },
                            error : function(xhr , textstatus) {
                                self.showContentError(xhr , textstatus);
                            }
                        });
                    }
                    AjaxDialog.__super__.open.call(self);
                },
                _validation : function ($form){
                	this._$form = $form;
                	$form.validate(this.validOptions || {});
                }
            });

}("AjaxValidationDialog", jQuery, yp, _, yp.AjaxDialog));
