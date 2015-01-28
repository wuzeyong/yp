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
		<c:set var="indexMenu" value="${requestURI.indexOf('operator/index.do') >= 0 }"></c:set>
		<li name="index" class="${indexMenu ? 'active' : '' }"><a href="${contextPath}operator/index.do"> <i class="icon-columns"></i> <span class="menu-text"> 全部文件 </span>
		</a></li>
		<c:set var="docMenu" value="${requestURI.indexOf('operator/doc/index.do') >= 0 }"></c:set>
		<li name="doc" class="${docMenu ? 'active' : '' }"><a href="${contextPath}operator/doc/index.do"> <i class="icon-list-alt"></i> <span class="menu-text"> 文档</span>
		</a></li>
		<c:set var="pictureMenu" value="${requestURI.indexOf('operator/picture/index.do') >= 0 }"></c:set>
		<li name="picture" class="${pictureMenu ? 'active' : '' }"><a href="${contextPath}operator/picture/index.do"> <i class="icon-picture"></i> <span class="menu-text"> 图片</span>
		</a></li>
		<c:set var="filmMenu" value="${requestURI.indexOf('operator/film/index.do') >= 0 }"></c:set>
		<li name="film" class="${filmMenu ? 'active' : '' }"><a href="${contextPath}operator/film/index.do"> <i class="icon-film"></i> <span class="menu-text"> 视频</span>
		</a></li>
		<c:set var="musicMenu" value="${requestURI.indexOf('operator/music/index.do') >= 0 }"></c:set>
		<li name="music" class="${musicMenu ? 'active' : '' }"><a href="${contextPath}operator/music/index.do"> <i class="icon-music"></i> <span class="menu-text"> 音乐</span>
		</a></li>
		<li class="divider"></li>
		<c:set var="trashMenu" value="${requestURI.indexOf('operator/trash/index.do') >= 0 }"></c:set>
		<li name="trash" class="${trashMenu ? 'active' : '' }"><a href="${contextPath}operator/trashc/index.do"> <i class="icon-trash"></i> <span class="menu-text"> 垃圾箱</span>
		</a></li>
		<!-- <li><a href="#" class="dropdown-toggle"> <i class="icon-trash"></i> <span class="menu-text"> 查询统计 </span> <b class="arrow icon-angle-down"></b>
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
			</ul></li> -->
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
