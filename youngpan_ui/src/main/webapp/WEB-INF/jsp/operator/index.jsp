<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div id="ftm-grid-searcher" class="ftm-grid-searcher">
		<form id="ftm-search-form" class="form-inline" enctype="multipart/form-data">
					<div class="ftm-search-field ">
							<input type="file" id="file" name="file" style="display:none"> 
							<button class="btn btn-primary upload-icon ace-icon" id="upload"><i class="icon-cloud-upload bigger-125"></i>上传文件</button>
					</div>
					<div class="ftm-search-field">
							<button class="btn btn-default"><i class="icon-folder-open bigger-125"></i>新建文件</button>
					</div>		
		</form>	
	</div>
				
	<div id="yp-grid-nav" class="ftm-grid-nav"></div>
	
	<div style="clear:both"></div>
	<table id="grid-table"></table>
	<div id="grid-pager"></div>
	<div id="dialog"></div>
	
	<script src="${contextPath}res/yp/operator/index.js?v=${v}"></script>
	<script type="text/javascript">
		yp.constant.CONTEXT_PATH = "${contextPath}";
		jQuery(function($) { 
			new yp.common.FileGrid();
		});
		$("#upload").click(function(){
			$("#file").click();
		});
	</script>
