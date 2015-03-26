;(function(name,$,yp,_){
	buttons = yp[name] = {
		remove : {key:"remove",iconClazz:"icon-trash red",title:"删除"},
		batchRemove : {key:"batchRemove",iconClazz:"icon-trash red",title:"删除"},
		edit : {key:"edit",iconClazz:"icon-edit",title:"编辑"},
		copy : {key:"copy",iconClazz:"icon-copy",title:"拷贝"},
		add : {key:"add",iconClazz:"icon-plus",title:"添加"},
		lock : {key:"lock",iconClazz:"icon-lock orange",title:"锁定"},
		unlock : {key:"unlock",iconClazz:"icon-unlock",title:"解锁"},
		undo:{key:"undo",iconClazz:"icon-undo green",title:"撤销"},
		download:{key:'download',iconClazz:'icon-download-alt',title:'下载'},
		batchDownload:{key:'batchDownload',iconClazz:'icon-download-alt',title:'下载'},
		rename:{key:'rename',iconClazz:'icon-edit',title:'重命名'},
		move:{key:"move",iconClazz:"icon-external-link orange",title:"移动"},
		ok:{key:'ok',iconClazz:'icon-ok green',title:'确定'},
		cancel:{key:'cancel',iconClazz:'icon-remove red',title:'取消'},
	};
})("buttons",jQuery,yp,_);
