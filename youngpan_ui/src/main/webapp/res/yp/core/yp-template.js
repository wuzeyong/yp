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