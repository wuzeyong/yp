;(function(name,$,yp,_){
	yp[name] = yp.Core.extend({
		constructor : function(config){
			//merge gridOptions
			var tmpConfig = $.extend({},config);
			var gridOptions = tmpConfig.gridOptions || {};
			tmpConfig.gridOptions = $.extend({},this.gridOptions,tmpConfig.gridOptions)
			//copy all config
			$.extend(this,tmpConfig);
			this.init();
		},
		gridEL : "",
		pagerEL : "",
		gridOptions : {
			caption : "",
			colNames : [],
			colModel : [],
			rownumbers : true,
			url : "",
			datatype : "json",
			mytype : "post",
			viewrecords : true,
			rowNum : 10,
			height : 400,
			rowList : [ 10, 20, 30 ],
			altRows : true,
			multiselect : true,
			multiboxonly : true,
			autowidth : true,
			emptyrecords : "没有数据"
		},
		init : function(){
			this.gridSelector = $(this.gridEL);
			this.pagerSelector = $(this.pagerEL);
			this.gridOptions.gridComplete = this.createOnGridCompleteCallback();
			this.gridOptions.pager = this.gridOptions.pager || this.pagerEL;  
			this.gridSelector.jqGrid(this.gridOptions);
			
			this.gridSelector
					.jqGrid('navGrid',this.pageEL,{edit:true,add:true,search:true,refresh:true,del:true})
					.jqGrid('navButtonAdd',this.pageEL,{	
						id:'addDS',
						caption:'sdfsdf',
						title:'创建数据源',
						position:'first',
						onClickButton:null,
						buttonicon:'icon-plus-sign orange'
					});
			
		},
		createOnGridCompleteCallback : function(){
			var self = this;
			return function(){
				var gridTable = this;
				self.onGridComplete(gridTable);
				self.styleCheckbox(gridTable);
				self.updatePagerIcons(gridTable);
			}
		},
		onGridComplete : function(gridTable){
			console.log(gridTable);
		},
		updatePagerIcons:function (table) {
			var replacement = 
			{
				'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
				'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
				'ui-icon-seek-next' : 'icon-angle-right bigger-140',
				'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
			};
			$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
				var icon = $(this);
				var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
				
				if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
			});
		},
		styleCheckbox:function(table) {
			$(table).find('input:checkbox').addClass('ace')
			.wrap('<label />')
			.after('<span class="lbl align-top" />')
			$('.ui-jqgrid-labels th[id*="_cb"]:first-child')
			.find('input.cbox[type=checkbox]').addClass('ace')
			.wrap('<label />').after('<span class="lbl align-top" />');
		},
		reload : function(){
			this.gridSelector.trigger("reloadGrid");
		},
        /**
         * execute : function(grid , url, [data], [confirmMessage] )
         * @param grid
         * @param url
         * @param data  必须为json对象。  
         * @param confirmMessage  可选 , 可以是string 也可以是boolean <br/>
         *        当data 为string 或 boolean 时候 ，当做 confirMessage 处理
         */
        execute : function(url, data, confirmMessage ) {
            // 传入的 data 为 confirMessage
            if(_.isString(data) || _.isBoolean(data)){
                confirmMessage =  data ;
                data = {};
            }
            var self = this;
            var ajax = function(){
            	$.ajax({
                    url : url,
                    data : data,
                    type : "post",
                    success : function(data) {
                    	console.log(data);
                        self.showSuccess(data.message);
                        self.reload();
                    }
            	});
            };
            
            if (confirmMessage ) {
                yp.utils.notice.confirm(confirmMessage,ajax);
            } else {
                ajax();
            }
        },
        executeBatch : function(url,confirmMessage){
        	var ids = this.gridSelector.jqGrid("getGridParam","selarrrow");
        	if(ids.length == 0){
        		yp.utils.notice.info("请选择记录！",null,1000); 
        		return;
        	}
        	this.execute(url,{ids:ids},confirmMessage);
        }
	});
	
})("Grid",jQuery,yp,_);