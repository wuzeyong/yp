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
		<c:set var="pictureMenu" value="${requestURI.indexOf('operator/picture/index.do') >= 0 }"></c:set>
		<li name="picture" class="${pictureMenu ? 'active' : '' }"><a href="${contextPath}operator/picture/index.do"> <i class="icon-picture"></i> <span class="menu-text"> 图片</span>
		</a></li>
		<c:set var="documentMenu" value="${requestURI.indexOf('operator/document/index.do') >= 0 }"></c:set>
		<li name="document" class="${documentMenu ? 'active' : '' }"><a href="${contextPath}operator/document/index.do"> <i class="icon-list-alt"></i> <span class="menu-text"> 文档</span>
		</a></li>
		<c:set var="videoMenu" value="${requestURI.indexOf('operator/video/index.do') >= 0 }"></c:set>
		<li name="video" class="${videoMenu ? 'active' : '' }"><a href="${contextPath}operator/video/index.do"> <i class="icon-film"></i> <span class="menu-text"> 视频</span>
		</a></li>
		<c:set var="musicMenu" value="${requestURI.indexOf('operator/music/index.do') >= 0 }"></c:set>
		<li name="music" class="${musicMenu ? 'active' : '' }"><a href="${contextPath}operator/music/index.do"> <i class="icon-music"></i> <span class="menu-text"> 音乐</span>
		</a></li>
		<c:set var="otherMenu" value="${requestURI.indexOf('operator/other/index.do') >= 0 }"></c:set>
		<li name="other" class="${otherMenu ? 'active' : '' }"><a href="${contextPath}operator/other/index.do"> <i class="icon-ellipsis-horizontal"></i> <span class="menu-text"> 其它</span>
		</a></li>
		<li class="divider"></li>
		<c:set var="trashMenu" value="${requestURI.indexOf('operator/trash/index.do') >= 0 }"></c:set>
		<li name="trash" class="${trashMenu ? 'active' : '' }"><a href="${contextPath}operator/trash/index.do"> <i class="icon-trash"></i> <span class="menu-text"> 回收站</span>
		</a></li>
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
