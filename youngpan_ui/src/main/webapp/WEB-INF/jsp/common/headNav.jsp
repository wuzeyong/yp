<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div class="navbar navbar-default" id="navbar">
	<script type="text/javascript">
		try{ace.settings.check('navbar' , 'fixed')}catch(e){}
	</script>

	<div class="navbar-container" id="navbar-container">
		<div class="navbar-header pull-left">
			<a href="#" class="navbar-brand">
				<small>
					<i class="icon-cloud  green"></i>
					${consoleTitle}
				</small>
			</a><!-- /.brand -->
		</div><!-- /.navbar-header -->

		<div class="navbar-header pull-right" role="navigation">
			<ul class="nav ace-nav">
				<li class="purple">
					<a data-toggle="dropdown" class="dropdown-toggle" href="#">
						<i class="icon-bell-alt icon-animated-bell"></i>
						<span class="badge badge-important">8</span>
					</a>

					<ul class="pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">
						<li class="dropdown-header">
							<i class="icon-warning-sign"></i>
							8 Notifications
						</li>

						<li>
							<a href="#">
								<div class="clearfix">
									<span class="pull-left">
										<i class="btn btn-xs no-hover btn-pink icon-comment"></i>
										New Comments
									</span>
									<span class="pull-right badge badge-info">+12</span>
								</div>
							</a>
						</li>

						<li>
							<a href="#">
								<i class="btn btn-xs btn-primary icon-user"></i>
								Bob just signed up as an editor ...
							</a>
						</li>

						<li>
							<a href="#">
								<div class="clearfix">
									<span class="pull-left">
										<i class="btn btn-xs no-hover btn-success icon-shopping-cart"></i>
										New Orders
									</span>
									<span class="pull-right badge badge-success">+8</span>
								</div>
							</a>
						</li>

						<li>
							<a href="#">
								<div class="clearfix">
									<span class="pull-left">
										<i class="btn btn-xs no-hover btn-info icon-twitter"></i>
										Followers
									</span>
									<span class="pull-right badge badge-info">+11</span>
								</div>
							</a>
						</li>

						<li>
							<a href="#">
								See all notifications
								<i class="icon-arrow-right"></i>
							</a>
						</li>
					</ul>
				</li>

				

				<li class="light-blue">
					<a data-toggle="dropdown" href="#" class="dropdown-toggle">
						
						<span class="user-info">
							<small>欢迎,</small>
							${sessionScope["yp_user"].realName}							
						</span>

						<i class="icon-caret-down"></i>
					</a>

					<ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
						<li>
							<a id="peronInfoEditting"  href="javascript:void(0);">
								<i class="icon-user"></i>
								个人信息
							</a>
							<div id="personInfoEdittingDialog"></div>
						</li>
						<li class="divider"></li>
						<li >
							<a id="passwordResetting"  href="javascript:void(0);">
								<i class="icon-edit"></i>
								修改密码
							</a>
							<div id="passwordResettingDialog"></div>
						</li>

						<li class="divider"></li>

						<li>
							<a href="${contextPath}logout/logout.do">
								<i class="icon-off"></i>
								退出
							</a>
						</li>
					</ul>
				</li>
			</ul><!-- /.ace-nav -->
		</div><!-- /.navbar-header -->
	</div><!-- /.container -->
</div>