<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div  class="yp-grid-searcher">
	<div class="yp-search-field ">
			<input type="file" id="file" name="file" style="display:none"> 
			<!-- <input type="file" id="file" name="file" style="display:none">  -->
			<button class="btn btn-primary upload-icon ace-icon" id="upload"><i class="icon-cloud-upload bigger-125"></i>上传文件</button>
	</div>
</div>
<div id="yp-grid-nav" class="yp-grid-nav"></div>
<div style="clear:both"></div>
<table id="grid-table"></table>
<div id="grid-pager"></div>
<div id="dialog"></div>
<div id="upload-editor"></div>

<script src="${contextPath}res/yp/operator/index.js?v=${v}"></script>
<script src="${contextPath}res/assets/js/dropzone.min.js"></script>
<script src="${contextPath}res/yp/operator/upload.js?v=${v}"></script>
<script type="text/javascript">
	yp.constant.CONTEXT_PATH = "${contextPath}";
	var fileGrid;
	jQuery(function($) { 
		fileGrid = new yp.common.FileGrid();
	});
	$("#upload").click(function(){
		new yp.common.Upload();
	});
</script>