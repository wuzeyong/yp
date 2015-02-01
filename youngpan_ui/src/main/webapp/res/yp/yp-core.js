;
(function(name, $, root) {
    root.yp = {};
    var utils = root.yp.utils = {};

    
    /**
     * 继承
     * @param protoProps
     * @param staticProps
     * @returns
     */
    utils.extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by
        // you
        // (the "constructor" property in your `extend` definition), or
        // defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function() {
                return parent.apply(this, arguments);
            };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function() {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps)
            _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };
    
    utils.getBooleanRender = function() {
    	var f = function renderBoolean(colValue,options, rowData) {
    		return (colValue == "true" || colValue == true)  ? "是" : "否";
    	};
    	return f;
    };
    
    utils.getDateRender = function(format) {
        var f = function(colValue) {
            if (!colValue) {
                return "";
            }
            if (typeof colValue != "number") {
                return colValue;
            }
            var date = new Date(colValue);
            format = format || "yyyy-MM-dd";
            var result = format.replace("yyyy",date.getFullYear())
                         .replace("MM",date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
                         .replace("dd",date.getDate() < 10 ? "0" + (date.getDate()) : (date.getDate()))
                         .replace("HH",date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
                         .replace("mm",date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
                         .replace("ss",date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
            return result;
        };
        return f;
    };
    
    utils.getDateTimeRender = function() {
    	return utils.getDateRender("yyyy-MM-dd HH:mm:ss");
    };
    
    /**
     * 将 表单参数 转为 json  
     */
    utils.form2Json = function($obj, ignoreEmpty) {
        var json = {}, serializeArray = $obj.find(":input").serializeArray();
        $.each(serializeArray, function(k, v) {
            var name = v.name, value = $.trim(v.value);
            if (ignoreEmpty && _.isEmpty(value)) {
                return;
            }

            if (json[name]) {
                (!_.isArray(json[name])) && (json[name] = [ json[name] ]);
                json[name].push(value);
            } else {
                json[name] = value;
            }
        });

        return json;
    };
    
    utils.json2Form = function(json, el, filter) {
    	_.each(json, function(v, k) {
    		if (!_.contains(filter, k)) {
    			if($("input[name='" + k + "']", el).length > 0) { 
    				$("input[name='" + k + "']", el).each(function() {
    					if($(this).is(":checkbox")) {
    						$(this).attr("checked", (v == "true" || v == true));
    					} else {
    						$(this).val(v);
    					}
    				});
    			} else if($("select[name='" + k + "']", el).length > 0) {
    				$("select[name='" + k + "']", el).val(v);
    			} else if($("textarea[name='" + k + "']", el).length > 0) {
    				$("textarea[name='" + k + "']", el).val(v);
    			}
    		}
		});
    };

    /**
     * 往url 后面添加 json 才参数
     * 
     */
    utils.url = function(url, json, traditional) {
        if (_.isEmpty(url) || !_.isObject(json)) {
            return url;
        }

        var param = $.param(json);

        if (param.length <= 0) {
            return url;
        }
        
        var anchorIndex = url.indexOf("#") ,
            anchor = '';
            if(anchorIndex >0 ){
                anchor = url.substring(anchorIndex);
                url = url.substring( 0 ,  anchorIndex);
            }
            
        url = (url += (url.indexOf("?") === -1 ? "?" : "&") + param)  + anchor;

        if (!traditional) {
            url = decodeURIComponent(url);
        }
        return url;

    };
    
    //*************************for genId**********************************
    var id = new Date().getTime();
    utils.genId = function(){
    	return id++;
    };
    //**************************for notice**********************************
    utils.notice = {
    	successTime : 2000,
    	infoTime : 6000,
		success : function(message,title,time){
			$.gritter.add({
				title: title || '操作成功！',
				text: message || '操作成功!',
				time: time || utils.notice.successTime,
				class_name: 'gritter-success gritter-light'
			});
	    },
	    info : function(message,title,time){
	    	$.gritter.add({
				title: title || '提示信息！',
				text: message,
				time: time || utils.notice.infoTime,
				class_name: 'gritter-center gritter-light'
			});
	    },
	    error : function(message,f){
	    	bootbox.dialog({
				message: "<span class='bigger-110 gritter-error'>"+(message)+"</span>",
				buttons : {
					"click" :
					{
						"label" : "关闭",
						"className" : "btn-sm btn-primary",
						"callback": function() { 
							if(f){
								f();
							}
						}
					}
				}
	    	});
	    	
	    },
	    confirm : function(message,handler,handlerContext){
	    	bootbox.confirm(message || "确定执行吗?", function(result) {
				if(result) {
					handlerContext ? handler.call(handlerContext) : handler();
				}
			});
	    }
    };
    
    //******************************for events************************************
    /**
     * 事件中心  , 详细查看 backbone events
     */
    var Events = utils.events = {

        // Bind an event to a `callback` function. Passing `"all"` will bind
        // the callback to all events fired.
        on : function(name, callback, context) {
            if (!eventsApi(this, 'on', name, [ callback, context ]) || !callback)
                return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({
                callback : callback,
                context : context,
                ctx : context || this
            });
            return this;
        },

        // Bind an event to only be triggered a single time. After the first
        // time
        // the callback is invoked, it will be removed.
        once : function(name, callback, context) {
            if (!eventsApi(this, 'once', name, [ callback, context ]) || !callback)
                return this;
            var self = this;
            var once = _.once(function() {
                self.off(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
            return this.on(name, once, context);
        },

        // Remove one or many callbacks. If `context` is null, removes all
        // callbacks with that function. If `callback` is null, removes all
        // callbacks for the event. If `name` is null, removes all bound
        // callbacks for all events.
        off : function(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, 'off', name, [ callback, context ]))
                return this;
            if (!name && !callback && !context) {
                this._events = {};
                return this;
            }

            names = name ? [ name ] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                name = names[i];
                if (events = this._events[name]) {
                    this._events[name] = retain = [];
                    if (callback || context) {
                        for (j = 0, k = events.length; j < k; j++) {
                            ev = events[j];
                            if ((callback && callback !== ev.callback && callback !== ev.callback._callback)
                                    || (context && context !== ev.context)) {
                                retain.push(ev);
                            }
                        }
                    }
                    if (!retain.length)
                        delete this._events[name];
                }
            }

            return this;
        },

        // Trigger one or many events, firing all bound callbacks. Callbacks are
        // passed the same arguments as `trigger` is, apart from the event name
        // (unless you're listening on `"all"`, which will cause your callback
        // to
        // receive the true name of the event as the first argument).
        trigger : function(name) {
            if (!this._events)
                return this;
            var args = [].slice.call(arguments, 1);
            if (!eventsApi(this, 'trigger', name, args))
                return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events)
                triggerEvents(events, args);
            if (allEvents)
                triggerEvents(allEvents, arguments);
            return this;
        },

        // Tell this object to stop listening to either specific events ... or
        // to every object it's currently listening to.
        stopListening : function(obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners)
                return this;
            var deleteListener = !name && !callback;
            if (typeof name === 'object')
                callback = this;
            if (obj)
                (listeners = {})[obj._listenerId] = obj;
            for ( var id in listeners) {
                listeners[id].off(name, callback, this);
                if (deleteListener)
                    delete this._listeners[id];
            }
            return this;
        }

    };

    var eventsApi = function(obj, action, name, rest) {
        if (!name)
            return true;

        // Handle event maps.
        if (typeof name === 'object') {
            for ( var key in name) {
                obj[action].apply(obj, [ key, name[key] ].concat(rest));
            }
            return false;
        }

        return true;
    };

    var triggerEvents = function(events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        switch (args.length) {
        case 0:
            while (++i < l)
                (ev = events[i]).callback.call(ev.ctx);
            return;
        case 1:
            while (++i < l)
                (ev = events[i]).callback.call(ev.ctx, a1);
            return;
        case 2:
            while (++i < l)
                (ev = events[i]).callback.call(ev.ctx, a1, a2);
            return;
        case 3:
            while (++i < l)
                (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
            return;
        default:
            while (++i < l)
                (ev = events[i]).callback.apply(ev.ctx, args);
        }
    };

    var listenMethods = {
        listenTo : 'on',
        listenToOnce : 'once'
    };

    // Inversion-of-control versions of `on` and `once`. Tell *this* object to
    // listen to an event in another object ... keeping track of what it's
    // listening to.
    _.each(listenMethods, function(implementation, method) {
        Events[method] = function(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
            listeners[id] = obj;
            if (typeof name === 'object')
                callback = this;
            obj[implementation](name, callback, this);
            return this;
        };
    });
    //***************************other*************************
    /**
     * core 基类
     */
    var Core = yp.Core = function(setting) {
    };
    
    Core.extend = utils.extend;
    /**
     * 基类的 原型
     */
    Core.prototype = {

        name : 'core',
        
        showSuccess : function(message) {
            Events.trigger("success" , message);
        },

        showError : function(message) {
            Events.trigger("error" , message);
        }
    };
    
    _.extend(Core.prototype, Events);
    /**
     * 创建委托方法，使得f中所获得的this为context
     */
    utils.createDelegate = function(f,context,args){
        return function(){
        	f.apply(context,args || arguments)
        }; 
    };
    
    /**
     * 统一的错误处理，默认回调 
     */
    var errorHandler = function ( content ){
        utils.notice.error(content || "未知异常,请联系管理员!");
    };
    
    /**
     * 当 message 为 string 时候
     * message 信息
     * textStatus 为回调 ，不存在则调用默认
     * 
     * 
     * 当 message 为 obj 时候  
     * message 为 ajax xhr
     * textStatus 状态，  ajax 的状态
     * replaceCallback 替换的 错误回调。
     */
    Events.on("error" , function (message , textStatus , replaceCallBack  ){
        callback = replaceCallBack || errorHandler;
        if(_.isObject(message)){
            if(textStatus === 'timeout'){ // 超时
                callback("请求超时");
            }else if(message.status == 404){
            	callback("所请求的资源不存在!");
            }else if(message.status == 403){
            	callback("无访问权限!");
            }else if (message.readyState === 0 &&  message.status === 0){ // 网络断开
            	//callback("网络中断或服务器已关闭");
            }else {
                try{
                    // 403 错误也会进入这里
                    callback(JSON.parse(message.responseText).message);
                }catch (e){
                    callback();
                }
            }
            return ;
        }
        
        if(_.isFunction (textStatus)){
            callback = textStatus;
        }
        
        callback(message);
    });
    
    /**
     * 统一成功处理
     */
    Events.on("success" , function (message ){
        utils.notice.success(message);
    });
    /**
     * ajax 默认配置
     */
    $.ajaxSetup({
        cache : false,
        traditional : true,
        error : function (xhrRequest,textStatus){
            Events.trigger("error" , xhrRequest , textStatus);
        }
    });
    
	var constant = yp.constant = {
		// 下拉列表的最大高度
		comboListMaxHeight: 100,
		// 单列内容的弹窗宽度
		singleColWindowWidth: 265,
		// 饼图默认色系
		pieChartColors: ["#FF0000","#00FF00","#0000FF","#FFFF00","#8600FF","#DB70DB","#AD5A5A","#46A3FF","#467500"],
		
		uploadImgStart : "_yp_file_upload_start",
		 
		uploadImgSuccess : "_yp_file_upload_success",
		 
		uploadImgFail : "_yp_file_upload_fail",
		//应用的URL前缀，由页面初始化时赋值
		URL_PREFIX : '',
		//应用上下文路径
		CONTEXT_PATH : ''
	};
    
})("Core", jQuery, this);
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
		extraData:null,
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
                modal : false
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
;(function(name,$,yp,_){
	buttons = yp[name] = {
		remove : {key:"remove",iconClazz:"icon-trash red",title:"删除"},
		batchRemove : {key:"batchRemove",iconClazz:"icon-trash red",title:"删除"},
		edit : {key:"edit",iconClazz:"icon-edit",title:"编辑"},
		copy : {key:"copy",iconClazz:"icon-copy",title:"拷贝"},
		add : {key:"add",iconClazz:"icon-plus",title:"添加"},
		lock : {key:"lock",iconClazz:"icon-lock orange",title:"锁定"},
		unlock : {key:"unlock",iconClazz:"icon-unlock",title:"解锁"},
		share:{key:'share',iconClazz:'icon-share-alt',title:'分享'},
		download:{key:'download',iconClazz:'icon-download-alt',title:'下载'},
		batchDownload:{key:'batchDownload',iconClazz:'icon-download-alt',title:'下载'},
		rename:{key:'rename',iconClazz:'icon-edit',title:'重命名'},
		move:{key:"move",iconClazz:"icon-external-link orange",title:"移动"},
		ok:{key:'ok',iconClazz:'icon-ok green',title:'确定'},
		cancel:{key:'cancel',iconClazz:'icon-remove red',title:'取消'},
	};
})("buttons",jQuery,yp,_);

//**********************************override jquery***********************************
;(function($){
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title: function(title) {
			var $title = this.options.title || '&nbsp;'
			if( ("titleHtml" in this.options) && this.options.titleHtml == true )
				title.html($title);
			else title.text($title);
		}
	}));
})(jQuery);
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
/**
 * yp 通用业务方法
 */
;
(function(name, yp , _ ,window) {
    var utils = yp.utils, Service = yp[name] ={

        /**
         * grid 和 dialog 结合 添加规范操作
         * 
         * @param dialog - dialog-ajax
         * @param grid - grid
         * @param url - dialog 打开的连接
         * @param submitUrl - dialog 提交的连接
         * @param data - 打开时候的附加参数
         */
        addByDialog2Grid : function(dialog, grid, url, submitUrl, data) {
            saveByDialog2Grid(dialog, grid, url, submitUrl, data);
        },

        /**
         * grid 和 dialog 结合 添加规范操作
         * 
         * @param dialog - dialog-ajax
         * @param grid - grid
         * @param url - dialog 打开的连接
         * @param submitUrl - dialog 提交的连接
         * @param data - 打开时候的附加参数
         */
        updateByDialog2Grid : function(dialog, grid, url, submitUrl, data) {
            var reloadUrl = !grid.generateSearchUrl ? null : grid.generateSearchUrl();
            saveByDialog2Grid(dialog, grid, url, submitUrl, data, reloadUrl);
        }
    };

    function saveByDialog2Grid(dialog, grid, url, submitUrl, data, reloadUrl) {
        dialog.once("onSuccess" , function() {
            grid.reload();
        });
        dialog.url = yp.utils.url(url, data);
        dialog.submitUrl = submitUrl;
        dialog.open();
    }

})("Service", yp, _ ,window);

//*********************************for template***************************************
;(function(name, yp , _ ,window){
	var Template = yp[name] = {
		init:function(){
			//update content
			$("#page-content-tmp").appendTo($("#page-content-main"))
			$("#page-content-tmp").css("display","block");
			this.renderBreadcrumb();
		},
		renderBreadcrumb : function(){
			this.indexHREF = $(".breadcrumb").find("a").attr("href");
			if(Template.breadcrumbs){
				var navList = $(".nav-list");
				for(var i = 0;i < Template.breadcrumbs.length;i++){
					var breakcrumb = Template.breadcrumbs[i];
					if(breakcrumb.url){
						$('<li class=""><a href="'+breakcrumb.url+'">'+breakcrumb.name+'</li>').appendTo($(".breadcrumb"));
						continue;
					}
					var menuItems = navList.find("li[name="+breakcrumb+"]")
					var active = i == (Template.breadcrumbs.length - 1);
					if(menuItems.length > 0){
						this.createBreadcrumbFromMenuItem(menuItems[i],active);
					}else{
						$('<li class="'+(active ? 'active' : '')+'">'+breakcrumb+'</li>').appendTo($(".breadcrumb"));
					}
				}
				return;
			}
			var activeMenu = $(".nav-list .active")
			if(activeMenu.length > 0){
				var menuItem = activeMenu[0];
				this.createBreadcrumbFromMenuItem(menuItem,true);
			}
		},
		createBreadcrumbFromMenuItem : function(menuItem,active){
			var el = $(menuItem).addClass("active");
			var href = el.find("a").attr("href");
			if(href == this.indexHREF){
				return;
			}
			var text = el.find(".menu-text").text();
			$('<li class="'+(active ? 'active' : '')+'"></li>').append('<a href="'+href+'">'+text+'</a>').appendTo($(".breadcrumb"));
		}
	}
})("Template", yp, _ ,window);
