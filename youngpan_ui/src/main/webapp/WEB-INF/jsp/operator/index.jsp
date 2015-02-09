<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div  class="yp-grid-searcher">
	<div class="yp-search-field ">
			<input type="file" id="file" name="file" style="display:none"> 
			<!-- <input type="file" id="file" name="file" style="display:none">  -->
			<button class="btn btn-primary upload-icon ace-icon" id="upload"><i class="icon-cloud-upload bigger-125"></i>上传文件</button>
	</div>
	<div class="yp-search-field">
			<button class="btn btn-default" id="newFile"><i class="icon-folder-open bigger-125"></i>新建文件</button>
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
	yp.constant.CURRENTID = '${current.id}';
	var fileGrid;
	jQuery(function($) { 
		fileGrid = new yp.common.FileGrid();
	});
	$("#upload").click(function(){
		new yp.common.Upload();
	});
	$("#newFile").click(function(){
		fileGrid.addRowData();
	});
	
	function initBread(){
		var ancestors = '${ancestors}';
		var fileBread =  '${fileBread}';
		if(fileBread){
			if(ancestors.length > 0){
				for(var i = 0 ; i < ancestors.length;i++){
					var id = ancestors[i].id;
					var fileName = ancestors[i].fileName;
					yp.Template.breadcrumbs = [{url:'index.do?id='+id+'&fileBread=true',name:fileName}];
				}
				yp.Template.breadcrumbs = ['${current.fileName}'];
			}
		}else{
			yp.Template.breadcrumbs = ['${current.fileName}'];
		}
	}
	initBread();
</script>