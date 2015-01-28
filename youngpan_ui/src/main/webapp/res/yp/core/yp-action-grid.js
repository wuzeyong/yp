;(function(name,$,yp,_){	
	var ActionGrid = yp[name] = yp.Grid.extend({
		searcherEL : null,
		navEL : null,
		searcherSelector : null,
		navSelector : null,
		navButtons : [],
		rowButtons : [],
		init : function(){
			var rowButtons = this.rowButtons;
			if(rowButtons && rowButtons.length > 0){
				this.gridOptions.colNames.push("操作");
				var colModel = this.gridOptions.colModel;
				colModel.push({name:'act',index:'act', width:150,sortable:false,align:"center",editable: false,formatter:this.createRowButtonsFormatter()});
			}
			
			if(this.searcherEL){
				this.prepareSearch();
			}
			if(this.navEL){
				this.prepareNav();
			}
			ActionGrid.__super__.init.call(this);
		},
		prepareNav : function(){
			this.navSelector = $(this.navEL);
			this.createNavButtons();
		},
		prepareSearch : function(){
			var self = this;
			this.searcherSelector = $(this.searcherEL);
			var trigerSearch = function(e){
				e.stopPropagation();
				var data = yp.utils.form2Json(self.searcherSelector);
				self.gridSelector.jqGrid("setGridParam",{postData:data});
				self.reload();
			}
	        // 监听页面form的自动提交，阻止让其提交，只能触发表格搜索才能提交
	        this.searcherSelector.on('submit', function(e){
	        	return false;
	        });
	        // 监听查询按钮点击
	        this.searcherSelector.find(".yp-search").click(trigerSearch)
	        // 监听 回车
	        this.searcherSelector
	            .delegate(':input:not(:button, :submit, :reset, :hidden)' , 'keypress' , function (e){
	            e.which == 13 && self.triggerSearch();
	        });
			
		},
		createRowButtonsFormatter:function(){
			var self = this;
			return function(cellvalue, options, rowObject){
				var rowButtons = self.rowButtons;
				var result = "";
				for(var i = 0;i < rowButtons.length;i++){
					var rowButton = rowButtons[i];
					if(rowButton.render){
						result += rowButton.render(rowButtons[i],cellvalue, options, rowObject,self);
					}else{
						result += self.createButtonUI(rowButtons[i],cellvalue, options, rowObject);
					}
				}
				return result;
			}
		},
		
		createButtonUI : function(button,cellvalue, options, rowObject){
			var enable = true;
			if(button.enable){
	        	_.each(button.enable , function (v,k){
        	        if(enable) {
        	            if(_.isFunction(v)){
                            enable = v(rowObject[k],k);
                        }else if(rowObject[k] != v) {
                            enable = false;
                        }
        	        }
        	    });
			}
			var buttonUI = '<div title="'+(button.title || "")+'" style="float: left; margin-left: 5px; display: block;" '+
				'class="ui-pg-div rowButton '+(enable ? "" : "disabled")+' " id="'+yp.utils.genId()+'"'+' rowId="'+(rowObject ? rowObject.id : "")+'"'+
				'buttonKey="'+button.key+'" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');">'+
				(button.href ? '<a href="'+button.href(cellvalue,options,rowObject)+'">' : '') +
				'<span class="ui-icon '+button.iconClazz+' '+(enable ? "" : "disabled")+'"></span>'+
				(button.href ? '</a>' : '') +
			'</div>';
			return buttonUI;
		},
		
		createRenameButtonUI : function(button,cellvalue, options, rowObject){
			var enable = true;
			if(button.enable){
	        	_.each(button.enable , function (v,k){
        	        if(enable) {
        	            if(_.isFunction(v)){
                            enable = v(rowObject[k],k);
                        }else if(rowObject[k] != v) {
                            enable = false;
                        }
        	        }
        	    });
			}
			var buttonUI = '<div title="'+(button.title || "")+'" style="float: left; margin-left: 5px; display: block;" '+
				'class="ui-pg-div rowButton '+(enable ? "" : "disabled")+' " id="'+yp.utils.genId()+'"'+' rowId="'+(rowObject ? rowObject.id : "")+'"'+
				'buttonKey="'+button.key+'" onmouseover="jQuery(this).addClass(\'ui-state-hover\');" onmouseout="jQuery(this).removeClass(\'ui-state-hover\');">'+
				(button.href ? '<a href="'+button.href(cellvalue,options,rowObject)+'">' : '') +
				'<span class="ui-icon '+button.iconClazz+' '+(enable ? "" : "disabled")+'"></span>'+
				(button.href ? '</a>' : '') +
			'</div>';
			return buttonUI;
		},
		
		onGridComplete : function(gridTable){
			this.bindActionForRowButtons(gridTable);
		},
		createNavButtons : function(){
			for(var i = 0;i < this.navButtons.length;i++){
				var navButton = this.navButtons[i];
				var buttonHTML = this.createButtonUI(navButton);
				$(buttonHTML).appendTo(this.navSelector).click(yp.utils.createDelegate(this.operate,this,[navButton.key]));
			}
		},
		bindActionForRowButtons : function(gridTable){
			var self = this;
			$(gridTable).find(".rowButton").each(function(){
				if($(this).hasClass("disabled")){
					return;
				}
				if($(this).find("a").length > 0){
					return;
				}
				var rowId = $(this).attr("rowId");
				var rowData = self.gridSelector.getRowData(rowId);
				var buttonKey = $(this).attr("buttonKey");
				$(this).click(function(e){
	                e.stopPropagation();
	                self.operate(buttonKey, rowId,rowData,e);
				})
			});
		},
		operate : function(buttonKey, rowId,rowData,e){
			
		}
	})
	
})("ActionGrid",jQuery,yp,_);