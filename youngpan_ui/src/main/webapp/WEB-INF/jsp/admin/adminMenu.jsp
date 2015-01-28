<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="requestURI">${requestScope['javax.servlet.forward.servlet_path']}</c:set>
<div class="sidebar" id="sidebar">
	<script type="text/javascript">
		try {
			ace.settings.check('sidebar', 'fixed')
		} catch (e) {
		}
	</script>

	<div class="sidebar-shortcuts" id="sidebar-shortcuts">
		<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
			<button class="btn btn-success">
				<i class="icon-signal"></i>
			</button>

			<button class="btn btn-info">
				<i class="icon-pencil"></i>
			</button>

			<button class="btn btn-warning">
				<i class="icon-group"></i>
			</button>

			<button class="btn btn-danger">
				<i class="icon-cogs"></i>
			</button>
		</div>

		<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
			<span class="btn btn-success"></span> <span class="btn btn-info"></span> <span class="btn btn-warning"></span> <span class="btn btn-danger"></span>
		</div>
	</div>
	<!-- #sidebar-shortcuts -->
	<ul class="nav nav-list">
		<c:set var="indexMenu" value="${requestURI.indexOf('admin/index.do') >= 0 }"></c:set>
		<li name="index" class="${indexMenu ? 'active' : '' }"><a href="${contextPath}admin/index.do"> <i class="icon-dashboard"></i> <span class="menu-text"> 首页 </span>
		</a></li>
		<c:set var="userMenu" value="${requestURI.indexOf('admin/user/index.do') >= 0 }"></c:set>
		<li name="user" class="${userMenu ? 'active' : '' }"><a href="${contextPath}admin/user/index.do"> <i class="icon-user"></i> <span class="menu-text"> 用户管理</span>
		</a></li>
		<c:set var="nodeMenu" value="${requestURI.indexOf('admin/node/index.do') >= 0 }"></c:set>
		<li name="node" class="${nodeMenu ? 'active' : '' }"><a href="${contextPath}admin/node/index.do"> <i class="icon-desktop"></i> <span class="menu-text"> 节点管理</span>
		</a></li>
		<c:set var="nodeMenu" value="${requestURI.indexOf('admin/log/index.do') >= 0 }"></c:set>
		<li name="log" class="${logMenu ? 'active' : '' }"><a href="${contextPath}admin/log/index.do"> <i class="icon-desktop"></i> <span class="menu-text"> 操作日志</span>
		</a></li>
		<c:set var="nodeMenu" value="${requestURI.indexOf('admin/log/index.do') >= 0 }"></c:set>
		<li name="log" class="${logMenu ? 'active' : '' }"><a href="${contextPath}admin/log/index.do"> <i class="icon-desktop"></i> <span class="menu-text"> 操作日志</span>
		</a></li>
		<li><a href="#" class="dropdown-toggle"> <i class="icon-bar-chart"></i> <span class="menu-text"> 查询统计 </span> <b class="arrow icon-angle-down"></b>
		</a>

			<ul class="submenu">
				<li><a href="elements.html"> <i class="icon-double-angle-right"></i> 组件
				</a></li>

				<li><a href="#" class="dropdown-toggle"> <i class="icon-double-angle-right"></i> 三级菜单 <b class="arrow icon-angle-down"></b>
				</a>

					<ul class="submenu">
						<li><a href="#"> <i class="icon-leaf"></i> 第一级
						</a></li>
					</ul></li>
			</ul></li>

		<li><a href="#" class="dropdown-toggle"> <i class="icon-gears"></i> <span class="menu-text"> 系统管理 </span> <b class="arrow icon-angle-down"></b>
		</a>

			<ul class="submenu">
				<li><a href="tables.html"> <i class="icon-double-angle-right"></i> 系统配置
				</a></li>

				<li><a href="jqgrid.html"> <i class="icon-double-angle-right"></i> 日志管理
				</a></li>
			</ul></li>
	</ul>
	<!-- /.nav-list -->

	<div class="sidebar-collapse" id="sidebar-collapse">
		<i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
	</div>

	<script type="text/javascript">
		try {
			ace.settings.check('sidebar', 'collapsed')
		} catch (e) {
		}
	</script>
</div>
