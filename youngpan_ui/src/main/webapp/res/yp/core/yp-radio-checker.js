;(function(name,yp,_){
	var RadioChecker = yp[name] = yp.Core.extend({
		constructor:function(config){
			var containerEL = $(config.el);
			function changeForRadio(name){
				var checkedValue = containerEL.find("input[name='"+name+"']:checked").val();
				containerEL.find("[checkField='"+name+"']").each(function(){
					var el = $(this);
					var items = el.attr("checkValue").split(",");
					var found = false;
					for(var i = 0;i < items.length;i++){
						if(items[i] == checkedValue){
							found = true;
							break;
						}
					}
					if(el.attr("disableMode") == "none"){
						el.css("display",found ? "block" : "none");
					}
					var field = el;
					if(!el.is("input,select")){
						field = el.find("input,select");
					}
					field.attr("disabled",found ? false : true);
				})
			}
			
			function onRadioChange(){	
				var name = $(this).attr("name");
				changeForRadio(name);
			}
			
			containerEL.find("input[type='radio'][checkRelated=true]").click(onRadioChange);
			containerEL.find("input[type='radio'][checkRelated=true]:checked").each(function(){
				changeForRadio($(this).attr("name"));
			})
		}
	});
})("RadioChecker",yp,_);