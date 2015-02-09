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
		CONTEXT_PATH : '',
		//当前文件id
		CURRENTID:'',
	};
    
})("Core", jQuery, this);