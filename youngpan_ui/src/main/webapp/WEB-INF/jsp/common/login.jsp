<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
	<head>
		<c:set var="consoleTitle">Young盘</c:set>
		<meta http-equiv="content-type" content="text/html;charset=utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- basic styles -->

		<link href="${contextPath}res/assets/css/bootstrap.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="${contextPath}res/assets/css/font-awesome.min.css" />

		<!--[if IE 7]>
		  <link rel="stylesheet" href="${contextPath}res/assets/css/font-awesome-ie7.min.css" />
		<![endif]-->

		<!-- page specific plugin styles -->


		<!-- ace styles -->

		<link rel="stylesheet" href="${contextPath}res/assets/css/ace.min.css" />
		<link rel="stylesheet" href="${contextPath}res/assets/css/ace-rtl.min.css" />

		<!--[if lte IE 8]>
		  <link rel="stylesheet" href="${contextPath}res/assets/css/ace-ie.min.css" />
		<![endif]-->

		<!-- inline styles related to this page -->

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

		<!--[if lt IE 9]>
		<script src="${contextPath}res/assets/js/html5shiv.js"></script>
		<script src="${contextPath}res/assets/js/respond.min.js"></script>
		<![endif]-->
	</head>

	<body class="login-layout">
		<div class="main-container">
			<div class="main-content">
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="login-container">
							<div class="center">
								<h1>
									<i class="icon-cloud  green"></i>
									<span class="white">Young盘</span>
								</h1>
								<h4 class="blue">&copy; WuZeYong</h4>
							</div>

							<div class="space-6"></div>

							<div class="position-relative">
								<div id="login-box" class="login-box visible widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header blue lighter bigger">
												<i class="icon-coffee green"></i>
												请输入登录信息
											</h4>

											<div class="space-6"></div>

											<form id="loginForm" action="login.do" method="post" accept-charset="utf-8">
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="username" value="${username}" class="form-control" placeholder="用户名" />
															<i class="icon-user"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" name="password" class="form-control" placeholder="密码" />
															<i class="icon-lock"></i>
														</span>
													</label>

													<div class="space"></div>

													<div class="clearfix">
														<!-- <label class="inline">
															<input type="checkbox" class="ace" />
															<span class="lbl"> Remember Me</span>
														</label> -->
														

														<button type="submit" class="width-35 pull-right btn btn-sm btn-primary">
															<i class="icon-key"></i>
															登录
														</button>
														
													</div>
													
													<div class="has-error">
														<div class="help-block">
															${message}
														</div>
													</div>

												</fieldset>
											</form>

											<!-- <div class="social-or-login center">
												<span class="bigger-110">Or Login Using</span>
											</div>

											<div class="social-login center">
												<a class="btn btn-primary">
													<i class="icon-facebook"></i>
												</a>

												<a class="btn btn-info">
													<i class="icon-twitter"></i>
												</a>

												<a class="btn btn-danger">
													<i class="icon-google-plus"></i>
												</a>
											</div> -->
										</div><!-- /widget-main -->

										<!-- <div class="toolbar clearfix">
											<div>
												<a href="#" onclick="show_box('forgot-box'); return false;" class="forgot-password-link">
													<i class="icon-arrow-left"></i>
													I forgot my password
												</a>
											</div>

											<div>
												<a href="#" onclick="show_box('signup-box'); return false;" class="user-signup-link">
													I want to register
													<i class="icon-arrow-right"></i>
												</a>
											</div>
										</div> -->
									</div><!-- /widget-body -->
								</div><!-- /login-box -->
							</div><!-- /position-relative -->
						</div>
					</div><!-- /.col -->
				</div><!-- /.row -->
			</div>
		</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->

		<script src="${contextPath}res/assets/js/jquery-2.0.3.min.js"></script>

		<!-- <![endif]-->

		<!--[if IE]>
		<script src="${contextPath}res/assets/js/jquery-1.10.2.min.js"></script>
		<![endif]-->
		<script src="${contextPath}res/assets/js/sjcl.js"></script>
		<script type="text/javascript">
			if("ontouchend" in document) document.write("<script src='${contextPath}res/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>

		<!-- inline scripts related to this page -->

		<script type="text/javascript">
			$(function(){
				$("#loginForm").find("input[name=username]").focus();
				$("#loginForm").submit(function(){
					var username = $(this).find("input[name=username]").val();
					var password = $(this).find("input[name=password]").val();
					var salt = "%t&f";
					password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password + salt + username));
					$(this).find("input[name=password]").val(password);
				})
			});
			function show_box(id) {
			 jQuery('.widget-box.visible').removeClass('visible');
			 jQuery('#'+id).addClass('visible');
			}
			
		</script>

</body>
</html>
