<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
	<head>
		<c:set var="consoleTitle" scope="request">Apusic文件传输中心管理台</c:set>
		<meta http-equiv="content-type" content="text/html;charset=utf-8">
		<title>${consoleTitle}</title>
		<meta name="keywords" content="${consoleTitle }" />
		<meta name="description" content="${consoleTitle }" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<!-- basic styles -->

		<link href="${contextPath}res/assets/css/bootstrap.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="${contextPath}res/assets/css/font-awesome.min.css" />

		<!--[if IE 7]>
		  <link rel="stylesheet" href="${contextPath}res/assets/css/font-awesome-ie7.min.css" />
		<![endif]-->

		<link rel="stylesheet" href="${contextPath}res/assets/css/jquery-ui-1.10.3.full.min.css" />	
		<link rel="stylesheet" href="${contextPath}res/assets/css/ui.jqgrid.css" />
		<link rel="stylesheet" href="${contextPath}res/assets/css/jquery.gritter.css" />
		
		<!-- ace styles -->

		<link rel="stylesheet" href="${contextPath}res/assets/css/ace.min.css" />
		<link rel="stylesheet" href="${contextPath}res/assets/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="${contextPath}res/assets/css/ace-skins.min.css" />
		
		<!--[if lte IE 8]>
		  <link rel="stylesheet" href="${contextPath}res/assets/css/ace-ie.min.css" />
		<![endif]-->
		
		<!-- ftm styles -->
		<link rel="stylesheet" href="${contextPath}res/css/yp-main.css?v=1" />
				
		<!-- ace settings handler -->

		<script src="${contextPath}res/assets/js/ace-extra.min.js"></script>

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

		<!--[if lt IE 9]>
		<script src="${contextPath}res/assets/js/html5shiv.js"></script>
		<script src="${contextPath}res/assets/js/respond.min.js"></script>
		<![endif]-->
	</head>

	<body>
		<!-- 顶部导航栏 -->
		<jsp:include page="../common/headNav.jsp"></jsp:include>

		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try{ace.settings.check('main-container' , 'fixed')}catch(e){}
			</script>

			<div class="main-container-inner">
				<a class="menu-toggler" id="menu-toggler" href="#">
					<span class="menu-text"></span>
				</a>
				
				<!-- 左侧菜单 -->
				<jsp:include page="adminMenu.jsp"></jsp:include>
				
				<div class="main-content">
					<!-- 面包屑 -->
					<div class="breadcrumbs" id="breadcrumbs">
						<script type="text/javascript">
							try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
						</script>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home home-icon"></i>
								<a href="${contextPath}admin/index.do">首页</a>
							</li>
							
						</ul><!-- .breadcrumb -->

					</div>
					<!-- 页面主内容 -->
					<div class="page-content">
						<div class="row">
							<div class="col-xs-12" id="page-content-main">
								<!-- PAGE CONTENT BEGINS -->
								
								<!-- PAGE CONTENT ENDS -->
							</div><!-- /.col -->
						</div><!-- /.row -->
					</div><!-- /.page-content -->
				</div><!-- /.main-content -->
				
				<jsp:include page="../common/aceSetting.jsp"></jsp:include>
				
				<!-- /#ace-settings-container -->
			</div><!-- /.main-container-inner -->

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="icon-double-angle-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->

		<script src="${contextPath}res/assets/js/jquery-2.0.3.min.js"></script>
	
		<!-- <![endif]-->

		<!--[if IE]>
		<script src="${contextPath}res/assets/js/jquery-1.10.2.min.js"></script>
		<![endif]-->

		<script type="text/javascript">
			if("ontouchend" in document) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="${contextPath}res/assets/js/jquery-ui-1.10.3.full.min.js"></script>
		<script src="${contextPath}res/assets/js/jquery.validate.min.js"></script>
		<script src="${contextPath}res/assets/js/bootstrap.min.js"></script>
		<script src="${contextPath}res/assets/js/typeahead-bs2.min.js"></script>

		<!-- ace scripts -->
		<script src="${contextPath}res/assets/js/ace-elements.min.js"></script>
		<script src="${contextPath}res/assets/js/ace.min.js"></script>
		<script src="${contextPath}res/assets/js/date-time/bootstrap-datepicker.min.js"></script>
		<script src="${contextPath}res/assets/js/jqGrid/jquery.jqGrid.min.js"></script>
		<script src="${contextPath}res/assets/js/jqGrid/i18n/grid.locale-en.js"></script>
		<script src="${contextPath}res/assets/js/underscore.js"></script>
		<script src="${contextPath}res/assets/js/bootbox.min.js"></script>
		<script src="${contextPath}res/assets/js/jquery.gritter.min.js"></script>
		<script src="${contextPath}res/yp/yp-core.js?v=${v}"></script>
		<script src="${contextPath}res/yp/yp-validate.js?v=${v}"></script>
		
		<script type="text/javascript">
			$(function(){
				ftm.Template.init();
			})
		</script>
		
		<div id="page-content-tmp" style="display:none">
			<jsp:include page="${MAIN_PAGE_PARAM }"></jsp:include>
		</div>
		
						
</body>
</html>
