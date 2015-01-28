<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="ftm-grid-searcher">
	<form  class="form-inline" enctype="multipart/form-data">
		<div class="ftm-search-field ">
			<input type="file" id="file" name="file" style="display:none"> 
			<button class="btn btn-primary upload-icon ace-icon" id="upload"><i class="icon-cloud-upload bigger-125"></i>上传文件</button>
		</div>
		<div class="ftm-search-field">
			<button class="btn btn-default"><i class="icon-folder-open bigger-125"></i>新建文件</button>
		</div>		
	</form>	
</div>
<div  id="ftm-grid-searcher" class="ftm-grid-searcher">
    <form id="dropzone" class="dropzone dz-clickable" action="fileinfo/upload.do">
        <div class="dz-default dz-message">
            <span>
                <span class="bigger-150 bolder">
                    <i class="ace-icon icon-caret-right red "></i>
                     Drop files
                </span>
                 to upload 				
                <span class="smaller-80 grey">
                    (or click)
                </span>
                <br></br>
                <i class="ace-icon icon-cloud-upload blue"></i>
            </span>
        </div>
    </form>
</div>
<div id="submit-file" class="ftm-grid-searcher">
	<form class="form-inline" enctype="multipart/form-data">
		<p id="buttons">
			<span id="submit" class="btn btn-info btn-sm tooltip-info" data-rel="tooltip" data-placement="bottom" title="上传">上传</span>
			<span id="cancel" class="btn btn-sm" data-rel="tooltip" title="Default">取消</span>
		</p>
	</form>
</div>
<script type="text/javascript">
	yp.constant.CONTEXT_PATH = "${contextPath}";
	jQuery(function($) { 
		new yp.operator.FileSubmitForm();
	});
</script>