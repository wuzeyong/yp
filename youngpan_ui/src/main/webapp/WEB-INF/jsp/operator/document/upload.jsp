<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<c:if test="${isPage}">
	<div class="yp-grid-searcher">
		<form  class="form-inline" enctype="multipart/form-data">
			<div class="yp-search-field ">
				<input type="file" id="file" name="file" style="display:none"> 
				<button class="btn btn-primary upload-icon ace-icon" id="upload"><i class="icon-cloud-upload bigger-125"></i>上传文件</button>
			</div>		
		</form>	
	</div>
</c:if>
<div  id="yp-grid-searcher" class="yp-grid-searcher">
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
<c:if test="${isPage}">
	<div id="submit-file" class="yp-grid-searcher">
		<form class="form-inline" enctype="multipart/form-data">
			<p id="buttons">
				<span id="submit" class="btn btn-info btn-sm tooltip-info" data-rel="tooltip" data-placement="bottom" title="上传">上传</span>
				<span id="cancel" class="btn btn-sm" data-rel="tooltip" title="Default">取消</span>
			</p>
		</form>
	</div>
</c:if>
<div id="newfile-editor"></div>

<script src="${contextPath}res/yp/operator/upload.js?v=${v}"></script>
<script src="${contextPath}res/assets/js/dropzone.min.js"></script>
<script type="text/javascript">
yp.constant.CURRENTID = '${current.id}';
function initBread(){
	var breads = new Array(); 
	var  i = 0;
	<c:forEach items="${ancestors}" var="a" >
     	breads[i] = {url:'index.do?id='+'${a.id}',name:'${a.fileName}'};
     	i++;
	</c:forEach> 
	if("${current}"){
		breads[i] = "${current.fileName}";
	}
	yp.Template.breadcrumbs =breads; 
}
initBread();
$(function(){
	new yp.operator.FileSubmitForm();
});
$("#createDir").click(function(){
	new yp.operator.CreateDirectory();
});
</script>
