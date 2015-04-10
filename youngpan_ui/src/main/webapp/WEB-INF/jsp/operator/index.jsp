<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div  class="yp-grid-searcher" style="height:60px">
	<div class="yp-search-field " >
		<button class="btn btn-default" id="newFile" ><i class="icon-folder-open bigger-125"></i>新建文件</button>
	</div>
	<div class="yp-search-field">
		<button class="btn btn-primary upload-icon ace-icon" id="upload_file"><i class="icon-cloud-upload bigger-125"></i>上传文件</button>
	</div>
</div>
<div id="yp-grid-nav" class="yp-grid-nav"></div>
<div style="clear:both"></div>
<table id="grid-table"></table>
<div id="grid-pager"></div>
<div id="dialog"></div>
<div id="upload-editor"></div>
<div id="docTree"></div>

<script type="text/javascript">
	yp.constant.CONTEXT_PATH = "${contextPath}";
	yp.constant.CURRENTID = '${current.id}';
	var uploadUrl = yp.constant.CONTEXT_PATH+ 'operator/fileinfo/upload.do';
	var fileGrid;
	$(function() { 
		fileGrid = new yp.common.FileGrid();
	});
	 $("#upload_file").click(function(){
		new yp.operator.UploadDialog({modal : false});
	}); 
	
	$("#newFile").click(function(){
		if(!fileGrid.rowFlag){
			fileGrid.addRowData();
			fileGrid.rowFlag = true;
		}else{
			yp.utils.notice.info("新文件未提交!","提示",1500);
		}
	});
	
	function initBread(){
		var breads = new Array(); 
		var  i = 0;
		<c:forEach items="${ancestors}" var="a">
	     	breads[i] = {url:'index.do?id='+'${a.id}',name:'${a.fileName}'};
	     	i++;
		</c:forEach> 
		if("${current}"){
			breads[i] = "${current.fileName}";
		}
		yp.Template.breadcrumbs =breads; 
	}
	initBread();
</script>