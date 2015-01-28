/**
 *  * usage:
 * 	html :
 * 		<div id="dialog-modal" title="模态窗口">
 * 				// form 表单
 * 		</div>
 * 
 * js:
 * 	$(function (){
 * 			var dialog = yp.AjaxDialog ({
 *		
 *			el : "#dialog-modal",
 *			options:{
 *				height: 300
 *			}
 *		});
 *
 *      dialog.domUrl = "xxxxx";
 *      
 *      dialog.formUrl = "xxxxx";
 *		
 *		$("#button").click(function (){
 *			dialog.open();
 *		});
 *	});
 */
;(function (name , $ ,yp , _ , Dialog){
	var utils = yp.utils,
	AjaxDialog = yp[name] = Dialog.extend({
		
		name : 'AjaxDialog',
	
		/**
		 * 记载数据 url
		 */
		url : null,
		
		
		/*
		 * 默认显示内容 
		 */
		defaultContent : "<span>正在加载...</span>",
		
		defaultErrorContent : "<span>加载失败...</span>",
		
		open : function (){
			var self = this;
			self._dialog.empty().html(self.defaultContent);
			if(self.url != null){
				$.ajax({
					url : self.url,
					success:function (data){
						self._dialog.empty().append(data);
						self.trigger('onDomComplete',data);
					},
					error : function (xhr , textstatus){
						self.showContentError(xhr , textstatus);
					}
				});
			}
			//调用父类的open 方法
			AjaxDialog.__super__.open.call(self);
		},
		
		
		showContentError : function (xhr , textstatus){
		    var self = this;
		    utils.events.trigger("error", xhr , textstatus ,function (message){
		        self._dialog.html(message || self.defaultErrorContent );
		    });
		}
	});
}("AjaxDialog",jQuery,yp,_,yp.Dialog));