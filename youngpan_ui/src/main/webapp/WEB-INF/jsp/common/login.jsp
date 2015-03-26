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

		<link rel="stylesheet" href="${contextPath}res/assets/css/jquery-ui-1.10.3.full.min.css" />
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
									<i class="icon-leaf green"></i>
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
														<label class="inline">
															<input type="checkbox" class="ace" />
															<span class="lbl"> 记住我</span>
														</label>

														<button type="submit" class="width-35 pull-right btn btn-sm btn-primary">
															<i class="icon-key"></i>
															登录
														</button>
													</div>

													<div class="space-4"></div>
													<div class="has-error">
														<div class="help-block">
															${message}
														</div>
													</div>
													
												</fieldset>
											</form>
										</div><!-- /widget-main -->

										<div class="toolbar clearfix">
											<div>
												<a href="#" onclick="show_box('forgot-box'); return false;" class="forgot-password-link">
													<i class="icon-arrow-left"></i>
													忘记密码
												</a>
											</div>

											<div>
												<a href="#" onclick="show_box('signup-box'); return false;" class="user-signup-link">
													没有帐号？注册
													<i class="icon-arrow-right"></i>
												</a>
											</div>
										</div>
									</div><!-- /widget-body -->
								</div><!-- /login-box -->

								<div id="forgot-box" class="forgot-box widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header red lighter bigger">
												<i class="icon-key"></i>
												获取密码
											</h4>

											<div class="space-6"></div>
											<p>
												请输入您的邮箱
											</p>

											<form>
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" id="email" name="email" placeholder="请输入邮箱"  class="form-control" email="true"/>
															<i class="icon-envelope"></i>
														</span>
													</label>

													<div class="clearfix">
														<button type="button" class="width-35 pull-right btn btn-sm btn-danger">
															<i class="icon-lightbulb"></i>
															发送
														</button>
													</div>
												</fieldset>
											</form>
										</div><!-- /widget-main -->

										<div class="toolbar center">
											<a href="#" onclick="show_box('login-box'); return false;" class="back-to-login-link">
												登录
												<i class="icon-arrow-right"></i>
											</a>
										</div>
									</div><!-- /widget-body -->
								</div><!-- /forgot-box -->

								<div id="signup-box" class="signup-box widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header green lighter bigger">
												<i class="icon-group blue"></i>
												注册
											</h4>

											<div class="space-6"></div>
											<p> 请输入注册信息: </p>

											<form id="registForm" action="regist.do" method="post" accept-charset="utf-8">
												<fieldset>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" id="name" name="name" required  placeholder="请输入用户名"  class="form-control"/>
															<i class="icon-user"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" id="passWord" name="passWord" required  placeholder="请输入密码" class="form-control"/>
															<i class="icon-lock"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" id="confirmPassword" name="confirmPassword" required confirmPassword="true" placeholder="请再次输入密码" class="form-control"/>
															<i class="icon-retweet"></i>
														</span>
													</label>
													
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" id="realName" name="realName"  required placeholder="请输入姓名"   class="form-control"/>
															<i class="icon-user"></i>
														</span>
													</label>
													

													<label class="block">
														<input type="checkbox" class="ace" />
														<span class="lbl">
															我接受
															<a href="#">用户准则</a>
														</span>
													</label>

													<div class="space-24"></div>
													<div class="has-error">
														<div class="help-block">
															${message}
														</div>
													</div>
													<div class="clearfix">
														<button type="reset" class="width-30 pull-left btn btn-sm">
															<i class="icon-refresh"></i>
															重置
														</button>

														<button type="submit" class="width-65 pull-right btn btn-sm btn-success">
															注册
															<i class="icon-arrow-right icon-on-right"></i>
														</button>
													</div>
												</fieldset>
											</form>
										</div>

										<div class="toolbar center">
											<a href="#" onclick="show_box('login-box'); return false;" class="back-to-login-link">
												<i class="icon-arrow-left"></i>
												退回登录
											</a>
										</div>
									</div><!-- /widget-body -->
								</div><!-- /signup-box -->
							</div><!-- /position-relative -->
						</div>
					</div><!-- /.col -->
				</div><!-- /.row -->
			</div>
		</div><!-- /.main-container -->
		<div id="regist-editor"></div>>
		<!-- basic scripts -->

		<!--[if !IE]> -->

		<script src="${contextPath}res/assets/js/jquery-2.0.3.min.js"></script>

		<!-- <![endif]-->

		<!--[if IE]>
		<script src="${contextPath}res/assets/js/jquery-1.10.2.min.js"></script>
		<![endif]-->
		<script src="${contextPath}res/assets/js/jquery-ui-1.10.3.full.min.js"></script>
		<script src="${contextPath}res/assets/js/bootstrap.min.js"></script>
		<script src="${contextPath}res/assets/js/jquery.validate.min.js"></script>
		<script src="${contextPath}res/assets/js/underscore.js"></script>
		<script src="${contextPath}res/yp/yp-core.js"></script>
		<script src="${contextPath}res/yp/yp-validate.js"></script>
		<script src="${contextPath}res/yp/operator/regist.js?v=${v}"></script>
		<script src="${contextPath}res/assets/js/sjcl.js"></script>
		<script type="text/javascript">
			if("ontouchend" in document) document.write("<script src='${contextPath}res/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>

		<!-- inline scripts related to this page -->

		<script type="text/javascript">
			yp.constant.CONTEXT_PATH = "${contextPath}";
			$(function(){
				var regist = '${regist}';
				if(regist){
					show_box('signup-box');
				}
				
				$("#loginForm").find("input[name=username]").focus();
				$("#loginForm").submit(function(){
					var username = $("#loginForm").find("input[name=username]").val();
					var password = $("#loginForm").find("input[name=password]").val();
					var salt = "%t&f";
					password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password + salt + username));
					$(this).find("input[name=password]").val(password);
				});
				
				$("#registForm").submit(function(){
					var username = $("#registForm").find("input[name=name]").val();
					var password = $("#registForm").find("input[name=passWord]").val();
					var salt = "%t&f";
					password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password + salt + username));
					$("#registForm").find("input[name=passWord]").val(password);
				});
				
				jQuery.validator.addMethod("confirmPassword", function(value, element) {
					var password = $("#registForm").find("input[name=passWord]").val();
					var confirmPassword = $("#registForm").find("input[name=confirmPassword]").val();
					console.log(password);
					console.log(confirmPassword);
					return password == confirmPassword;
				}, '确认密码与密码不一致！');
				
			});
			function show_box(id) {
			 jQuery('.widget-box.visible').removeClass('visible');
			 jQuery('#'+id).addClass('visible');
			}
			
		</script>

</body>
</html>
